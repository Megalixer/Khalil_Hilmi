"use client";

import styles from "./page.module.css";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import React from "react";

interface SiswaData {
  id: number;
  nama: string;
  nik: string;
  nisn: string;
  jurusan: string;
  penerimaan: number;
  tempatLahir: string;
  tanggalLahir: string;
  jenisKelamin: string;
  asalSekolah: string;
  tahunlulus: string;
  dokumen?: string;
}

export default function DashboardA() {
  const router = useRouter();
  const [data, setData] = useState<SiswaData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updating, setUpdating] = useState<number | null>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userStr = localStorage.getItem('user');
        
        if (!userStr) {
          setError('Anda harus login terlebih dahulu');
          router.push('/home');
          return;
        }

        const response = await fetch('/api/dashboardA', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        const result = await response.json();

        if (response.ok && result.success) {
          setData(result.data);
        } else {
          setError(result.message || 'Gagal memuat data');
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Terjadi kesalahan saat memuat data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  const updatePenerimaan = async (siswaId: number, penerimaan: number) => {
    try {
      setUpdating(siswaId);
      const response = await fetch('/api/updatePenerimaan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          siswaId,
          penerimaan
        })
      });

      const result = await response.json();

      if (response.ok) {
        // Update local state
        setData(data.map(item => 
          item.id === siswaId ? { ...item, penerimaan } : item
        ));
        alert('Status berhasil diperbarui!');
      } else {
        alert(result.message || 'Gagal memperbarui status');
      }
    } catch (err) {
      console.error('Error updating:', err);
      alert('Terjadi kesalahan saat memperbarui status');
    } finally {
      setUpdating(null);
    }
  };

  const getStatusColor = (penerimaan: number) => {
    switch(penerimaan) {
      case 1: return '#d1d5db';
      case 2: return '#d1fae5';
      case 3: return '#fee2e2';
      default: return '#d1d5db';
    }
  };

  const getStatusTextColor = (penerimaan: number) => {
    switch(penerimaan) {
      case 1: return '#1f2937';
      case 2: return '#065f46';
      case 3: return '#991b1b';
      default: return '#1f2937';
    }
  };

  const getStatusText = (penerimaan: number) => {
    switch(penerimaan) {
      case 1: return '❌ Belum';
      case 2: return '✅ Lolos';
      case 3: return '❌ Tidak Lolos';
      default: return '❌ Belum';
    }
  };

  return (
    <main className={styles.body}>
      <div className={styles.container1}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Image src="/image 1.png" alt="Logo SMK Citra Negara" width={35} height={35} className={styles.image} />
            <h1 className={styles.title}>SMK CITRA NEGARA</h1>
          </div>
          <button 
            onClick={() => {
              localStorage.removeItem('user');
              localStorage.removeItem('userNik');
              localStorage.removeItem('userNisn');
              router.push('/app');
            }}
            style={{
              padding: '8px 16px',
              backgroundColor: '#ef4444',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '14px',
              transition: 'all 0.15s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#dc2626'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ef4444'}
          >
            Logout
          </button>
        </div>
      </div>

      <nav className={styles.navbar}>
      </nav>

      <div className={styles.dataContainer}>
          <h2 className={styles.dataTitle}>Data Pendaftaran Siswa - Admin Panel</h2>
          
          {loading && (
            <div className={styles.emptyMessage}>
              <p>Memuat data...</p>
            </div>
          )}

          {error && (
            <div className={styles.emptyMessage} style={{ color: '#dc2626' }}>
              <p>{error}</p>
            </div>
          )}
          
          {!loading && !error && data && data.length > 0 ? (
            <div style={{ overflowX: 'auto' }}>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                marginTop: '20px'
              }}>
                <thead>
                  <tr style={{ backgroundColor: '#f3f4f6', borderBottom: '2px solid #d1d5db' }}>
                    <th style={{ padding: '12px', textAlign: 'center', fontWeight: '600', color: '#1f2937' }}>Expand</th>
                    <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: '#1f2937' }}>No</th>
                    <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: '#1f2937' }}>Nama</th>
                    <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: '#1f2937' }}>NIK</th>
                    <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: '#1f2937' }}>NISN</th>
                    <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: '#1f2937' }}>Jurusan</th>
                    <th style={{ padding: '12px', textAlign: 'center', fontWeight: '600', color: '#1f2937' }}>Status</th>
                    <th style={{ padding: '12px', textAlign: 'center', fontWeight: '600', color: '#1f2937' }}>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((siswa, index) => (
                    <React.Fragment key={siswa.id}>
                      <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                        <td style={{ padding: '12px', textAlign: 'center', color: '#374151' }}>
                          <button
                            onClick={() => setExpandedId(expandedId === siswa.id ? null : siswa.id)}
                            style={{
                              padding: '6px 10px',
                              backgroundColor: '#e5e7eb',
                              border: 'none',
                              borderRadius: '8px',
                              cursor: 'pointer',
                              fontSize: '12px',
                              fontWeight: '600',
                              color: '#374151',
                              transition: 'all 0.15s ease'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d1d5db'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#e5e7eb'}
                          >
                            {expandedId === siswa.id ? '▼' : '▶'}
                          </button>
                        </td>
                        <td style={{ padding: '12px', color: '#374151' }}>{index + 1}</td>
                        <td style={{ padding: '12px', color: '#374151' }}>{siswa.nama}</td>
                        <td style={{ padding: '12px', color: '#374151' }}>{siswa.nik}</td>
                        <td style={{ padding: '12px', color: '#374151' }}>{siswa.nisn}</td>
                        <td style={{ padding: '12px', color: '#374151' }}>{siswa.jurusan}</td>
                        <td style={{ 
                          padding: '12px', 
                          textAlign: 'center',
                          backgroundColor: getStatusColor(siswa.penerimaan),
                          color: getStatusTextColor(siswa.penerimaan),
                          fontWeight: '600',
                          borderRadius: '4px'
                        }}>
                          {getStatusText(siswa.penerimaan)}
                        </td>
                        <td style={{ padding: '12px', textAlign: 'center' }}>
                          <button
                            onClick={() => updatePenerimaan(siswa.id, 2)}
                            disabled={updating === siswa.id || siswa.penerimaan === 2}
                            style={{
                              padding: '8px 14px',
                              marginRight: '8px',
                              backgroundColor: siswa.penerimaan === 2 ? '#d1d5db' : '#10b981',
                              color: siswa.penerimaan === 2 ? '#6b7280' : 'white',
                              border: 'none',
                              borderRadius: '8px',
                              cursor: updating === siswa.id || siswa.penerimaan === 2 ? 'not-allowed' : 'pointer',
                              fontSize: '13px',
                              fontWeight: '600',
                              transition: 'all 0.15s ease'
                            }}
                            onMouseEnter={(e) => {
                              if (!updating || siswa.penerimaan !== 2) {
                                e.currentTarget.style.backgroundColor = '#059669';
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (siswa.penerimaan !== 2) {
                                e.currentTarget.style.backgroundColor = '#10b981';
                              }
                            }}
                          >
                            Terima
                          </button>
                          <button
                            onClick={() => updatePenerimaan(siswa.id, 3)}
                            disabled={updating === siswa.id || siswa.penerimaan === 3}
                            style={{
                              padding: '8px 14px',
                              backgroundColor: siswa.penerimaan === 3 ? '#d1d5db' : '#ef4444',
                              color: siswa.penerimaan === 3 ? '#6b7280' : 'white',
                              border: 'none',
                              borderRadius: '8px',
                              cursor: updating === siswa.id || siswa.penerimaan === 3 ? 'not-allowed' : 'pointer',
                              fontSize: '13px',
                              fontWeight: '600',
                              transition: 'all 0.15s ease'
                            }}
                            onMouseEnter={(e) => {
                              if (!updating || siswa.penerimaan !== 3) {
                                e.currentTarget.style.backgroundColor = '#dc2626';
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (siswa.penerimaan !== 3) {
                                e.currentTarget.style.backgroundColor = '#ef4444';
                              }
                            }}
                          >
                            Tolak
                          </button>
                        </td>
                      </tr>
                      {expandedId === siswa.id && (
                        <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                          <td colSpan={8} style={{ padding: '20px' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                              <div>
                                <p style={{ margin: '0 0 4px 0', fontWeight: '600', color: '#6b7280', fontSize: '12px' }}>Tempat Lahir</p>
                                <p style={{ margin: '0', color: '#1f2937' }}>{siswa.tempatLahir}</p>
                              </div>
                              <div>
                                <p style={{ margin: '0 0 4px 0', fontWeight: '600', color: '#6b7280', fontSize: '12px' }}>Tanggal Lahir</p>
                                <p style={{ margin: '0', color: '#1f2937' }}>{siswa.tanggalLahir}</p>
                              </div>
                              <div>
                                <p style={{ margin: '0 0 4px 0', fontWeight: '600', color: '#6b7280', fontSize: '12px' }}>Jenis Kelamin</p>
                                <p style={{ margin: '0', color: '#1f2937' }}>{siswa.jenisKelamin}</p>
                              </div>
                              <div>
                                <p style={{ margin: '0 0 4px 0', fontWeight: '600', color: '#6b7280', fontSize: '12px' }}>SMP Asal</p>
                                <p style={{ margin: '0', color: '#1f2937' }}>{siswa.asalSekolah}</p>
                              </div>
                              <div>
                                <p style={{ margin: '0 0 4px 0', fontWeight: '600', color: '#6b7280', fontSize: '12px' }}>Tahun Lulus</p>
                                <p style={{ margin: '0', color: '#1f2937' }}>{siswa.tahunlulus}</p>
                              </div>
                              {siswa.dokumen && (
                                <div>
                                  <p style={{ margin: '0 0 4px 0', fontWeight: '600', color: '#6b7280', fontSize: '12px' }}>Berkas Pendaftaran</p>
                                  <a 
                                    href={siswa.dokumen} 
                                    download
                                    style={{
                                      display: 'inline-block',
                                      padding: '8px 14px',
                                      backgroundColor: '#3b82f6',
                                      color: 'white',
                                      textDecoration: 'none',
                                      borderRadius: '8px',
                                      fontSize: '13px',
                                      fontWeight: '600',
                                      transition: 'all 0.15s ease',
                                      cursor: 'pointer'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'}
                                  >
                                    Download
                                  </a>
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          ) : !loading && !error ? (
            <div className={styles.emptyMessage}>
              <p>Tidak ada data pendaftaran siswa.</p>
            </div>
          ) : null}
      </div>

      <div className={styles.container3}>
        <h1 className={styles.h1} style={{ marginBottom: '8px' }}>SMK CITRA NEGARA</h1>
        <p style={{ color: 'rgba(255,255,255,0.95)', fontSize: '16px', lineHeight: '1.6', margin: 0 }}>Mewujudkan generasi unggul dan berakhlak mulia</p>
      </div>
      

    </main>
  );
}

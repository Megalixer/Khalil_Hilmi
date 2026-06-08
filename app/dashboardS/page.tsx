"use client";

import styles from "./page.module.css";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface UserData {
  id: number;
  nama: string;
  nik: string;
  tempatLahir: string;
  tanggalLahir: string;
  jenisKelamin: string;
  asalSekolah: string;
  tahunlulus: string;
  nisn: string;
  jurusan: string;
  dokumen?: string;
  penerimaan?: number;
}

export default function DashboardS() {
  const router = useRouter();
  const [data, setData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Get user info from localStorage
        const userStr = localStorage.getItem('user');
        
        if (!userStr) {
          setError('Anda harus login terlebih dahulu');
          router.push('/home');
          return;
        }

        const user = JSON.parse(userStr);

        // Fetch full user data from API
        const response = await fetch('/api/dashboardS', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nama: user.nama,
            nik: localStorage.getItem('userNik') || '',
            nisn: localStorage.getItem('userNisn') || ''
          })
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

    fetchUserData();
  }, [router]);

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
        <h2 className={styles.dataTitle}>Data Pendaftaran Siswa</h2>

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

        {!loading && !error && data ? (
          <>
            {data.penerimaan && (
              <div style={{
                padding: '16px',
                borderRadius: '8px',
                marginBottom: '20px',
                textAlign: 'center',
                fontWeight: '600',
                fontSize: '16px',
                backgroundColor: data.penerimaan === 1 ? '#d1d5db' : data.penerimaan === 2 ? '#d1fae5' : '#fee2e2',
                color: data.penerimaan === 1 ? '#1f2937' : data.penerimaan === 2 ? '#065f46' : '#991b1b'
              }}>
                Status: {data.penerimaan === 1 ? '❌ Belum' : data.penerimaan === 2 ? '✅ Lolos' : '❌ Tidak Lolos'}
              </div>
            )}

            <div className={styles.section}>
              <p className={styles.sectionTitle}>Data Pribadi</p>
              <div className={styles.dataGrid}>
                <div className={styles.dataItem}>
                  <span className={styles.dataLabel}>Nama Lengkap</span>
                  <span className={styles.dataValue}>{data.nama}</span>
                </div>
                <div className={styles.dataItem}>
                  <span className={styles.dataLabel}>NIK</span>
                  <span className={styles.dataValue}>{data.nik}</span>
                </div>
                <div className={styles.dataItem}>
                  <span className={styles.dataLabel}>Tempat Lahir</span>
                  <span className={styles.dataValue}>{data.tempatLahir}</span>
                </div>
                <div className={styles.dataItem}>
                  <span className={styles.dataLabel}>Tanggal Lahir</span>
                  <span className={styles.dataValue}>{data.tanggalLahir}</span>
                </div>
                <div className={styles.dataItem}>
                  <span className={styles.dataLabel}>Jenis Kelamin</span>
                  <span className={styles.dataValue}>{data.jenisKelamin}</span>
                </div>
              </div>
            </div>

            <div className={styles.section}>
              <p className={styles.sectionTitle}>Data Akademik</p>
              <div className={styles.dataGrid}>
                <div className={styles.dataItem}>
                  <span className={styles.dataLabel}>SMP Asal</span>
                  <span className={styles.dataValue}>{data.asalSekolah}</span>
                </div>
                <div className={styles.dataItem}>
                  <span className={styles.dataLabel}>Tahun Lulus</span>
                  <span className={styles.dataValue}>{data.tahunlulus}</span>
                </div>
                <div className={styles.dataItem}>
                  <span className={styles.dataLabel}>NISN</span>
                  <span className={styles.dataValue}>{data.nisn}</span>
                </div>
                <div className={styles.dataItem}>
                  <span className={styles.dataLabel}>Jurusan Dipilih</span>
                  <span className={styles.dataValue}>{data.jurusan}</span>
                </div>
              </div>
            </div>

            {data.dokumen && (
              <div className={styles.section}>
                <p className={styles.sectionTitle}>Berkas</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', backgroundColor: '#f3f4f6', borderRadius: '8px' }}>
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: '0 0 4px 0', fontWeight: '500', color: '#1f2937' }}>Berkas Pendaftaran</p>
                    <p style={{ margin: '0', fontSize: '14px', color: '#6b7280' }}>{data.dokumen.split('/').pop()}</p>
                  </div>
                  <a
                    href={data.dokumen}
                    download
                    style={{
                      padding: '8px 16px',
                      backgroundColor: '#3b82f6',
                      color: 'white',
                      textDecoration: 'none',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'}
                  >
                    Download
                  </a>
                </div>
              </div>
            )}
          </>
        ) : !loading && !error ? (
          <div className={styles.emptyMessage}>
            <p>Tidak ada data pendaftaran. Silakan<a href="/register" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 700 }}> daftar terlebih dahulu</a>.</p>
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
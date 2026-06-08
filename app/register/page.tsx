"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from './page.module.css';
import Image from 'next/image';

export default function Register() {
    const router = useRouter();
    
      const [nama, setNama] = useState("");
      const [nik, setNIK] = useState("");
      const [tempatLahir, setTempatLahir] = useState("");
      const [tanggalLahir, setTanggalLahir] = useState("");
      const [jenisKelamin, setJenisKelamin] = useState("");
      const [asalSekolah, setAsalSekolah] = useState("");
      const [tahunlulus, setTahunLulus] = useState("");
      const [nisn, setNISN] = useState("");
      const [jurusan, setJurusan] = useState("");
      const [dokumen, setDokumen] = useState<File | null>(null);
      
    
      const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
    
        if (!nama || !nik || !tempatLahir || !tanggalLahir || !jenisKelamin || !asalSekolah || !tahunlulus || !nisn || !jurusan || !dokumen) {
          alert("Semua data termasuk dokumen harus diisi!");
          return;
        }

        // Validate file type
        if (!dokumen.type.includes('pdf')) {
          alert("File harus berformat PDF!");
          return;
        }

        // Validate file size (max 5MB)
        if (dokumen.size > 5 * 1024 * 1024) {
          alert("Ukuran file maksimal 5MB!");
          return;
        }
    
        try {
          const formData = new FormData();
          formData.append('nama', nama);
          formData.append('nik', nik);
          formData.append('tempatLahir', tempatLahir);
          formData.append('tanggalLahir', tanggalLahir);
          formData.append('jenisKelamin', jenisKelamin);
          formData.append('asalSekolah', asalSekolah);
          formData.append('tahunlulus', tahunlulus);
          formData.append('nisn', nisn);
          formData.append('jurusan', jurusan);
          formData.append('dokumen', dokumen);

          const response = await fetch('/api/post', {
            method: 'POST',
            body: formData
          });

          const result = await response.json();

          if (response.ok) {
            alert("Pendaftaran berhasil!");
            // Reset form
            setNama("");
            setNIK("");
            setTempatLahir("");
            setTanggalLahir("");
            setJenisKelamin("");
            setAsalSekolah("");
            setTahunLulus("");
            setNISN("");
            setJurusan("");
            setDokumen(null);
            // Redirect to dashboard or login
            router.push("/login");
          } else {
            alert(result.message || "Pendaftaran gagal!");
          }
        } catch (error) {
            console.error("Error during registration:", error);
            alert("Terjadi kesalahan: " + (error instanceof Error ? error.message : 'Unknown error'));
        }
      };

    return (
        <main className={styles.body}>
            <div className={styles.container1}>
                <Image src="/image 1.png" alt="Logo SMK Citra Negara" width={35} height={35} className={styles.image} />
                <h1 className={styles.title}>SMK CITRA NEGARA</h1>
            </div>

            <div>
                <form onSubmit={handleRegister} className={styles.container6}>
                    <h1 className="text-2xl font-bold text-center mb-6 text-black"> Fomulir Pendaftaran Siswa Baru</h1>

                <p className={styles.h1}>Data Pribadi</p>

                <input type="text" placeholder="Nama Lengkap" style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  marginBottom: '12px',
                  fontFamily: 'inherit',
                  fontSize: '14px',
                  color: '#111827',
                  boxSizing: 'border-box'
                }} value={nama} onChange={(e) => setNama(e.target.value)}/>

                <input type="text" placeholder="NIK" style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  marginBottom: '12px',
                  fontFamily: 'inherit',
                  fontSize: '14px',
                  color: '#111827',
                  boxSizing: 'border-box'
                }} value={nik} onChange={(e) => setNIK(e.target.value)}/>

                <input type="text" placeholder="Tempat Lahir" style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  marginBottom: '12px',
                  fontFamily: 'inherit',
                  fontSize: '14px',
                  color: '#111827',
                  boxSizing: 'border-box'
                }} value={tempatLahir} onChange={(e) => setTempatLahir(e.target.value)}/>

                <input type="date" style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  marginBottom: '12px',
                  fontFamily: 'inherit',
                  fontSize: '14px',
                  color: '#111827',
                  boxSizing: 'border-box'
                }} value={tanggalLahir} onChange={(e) => setTanggalLahir(e.target.value)}/>

                <select style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  marginBottom: '12px',
                  fontFamily: 'inherit',
                  fontSize: '14px',
                  color: '#111827',
                  boxSizing: 'border-box'
                }} value={jenisKelamin} onChange={(e) => setJenisKelamin(e.target.value)}>
                    <option value="">Pilih Jenis Kelamin</option>
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                </select>

                <p className={styles.h1}>Data Akademik</p>

                <input type="text" placeholder="SMP Asal" style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  marginBottom: '12px',
                  fontFamily: 'inherit',
                  fontSize: '14px',
                  color: '#111827',
                  boxSizing: 'border-box'
                }} value={asalSekolah} onChange={(e) => setAsalSekolah(e.target.value)}/>

                <input type="text" placeholder="Tahun Lulus" style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  marginBottom: '12px',
                  fontFamily: 'inherit',
                  fontSize: '14px',
                  color: '#111827',
                  boxSizing: 'border-box'
                }} value={tahunlulus} onChange={(e) => setTahunLulus(e.target.value)}/>

                <input type="text" placeholder="NISN" style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  marginBottom: '12px',
                  fontFamily: 'inherit',
                  fontSize: '14px',
                  color: '#111827',
                  boxSizing: 'border-box'
                }} value={nisn} onChange={(e) => setNISN(e.target.value)}/>

                <select style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  marginBottom: '12px',
                  fontFamily: 'inherit',
                  fontSize: '14px',
                  color: '#111827',
                  boxSizing: 'border-box'
                }} value={jurusan} onChange={(e) => setJurusan(e.target.value)}>
                    <option value="">Pilih Jurusan</option>
                    <option value="PPLG">Pengembangan Perangkat Lunak dan Game</option>
                    <option value="TKJ">Teknik Komputer Jaringan</option>
                    <option value="DKV">Desain Komunikasi Visual</option>
                </select>

                <p className={styles.h1}>Upload Berkas</p>

                <input 
                  type="file" 
                  accept=".pdf, .jpeg, .jpg, .png"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    marginBottom: '12px',
                    fontFamily: 'inherit',
                    fontSize: '14px',
                    color: '#111827',
                    boxSizing: 'border-box'
                  }}
                  onChange={(e) => setDokumen(e.target.files ? e.target.files[0] : null)}
                  required
                />
                {dokumen && <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '12px' }}>✓ File: {dokumen.name} ({(dokumen.size / 1024).toFixed(2)} KB)</p>}


                <button style={{
                  width: '100%',
                  padding: '10px 16px',
                  backgroundColor: '#0eb026',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontSize: '14px',
                  transition: 'all 0.15s ease'
                }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0a6f1a'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0eb026'}>
                    Register
                </button>
                </form>
            </div>

            <div className={styles.container3}>
                <h1 className={styles.h1}>SMK CITRA NEGARA</h1>
                <center><p  className={styles.p}>Mewujudkan generasi unggul dan berakhlak mulia</p></center>
            </div>
        </main>
    );
}
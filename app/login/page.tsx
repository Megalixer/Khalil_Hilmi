"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from './page.module.css';
import Image from 'next/image';

export default function Login() {
    const router = useRouter();
    
      const [nama, setNama] = useState("");
      const [nik, setNIK] = useState("");
      const [nisn, setNISN] = useState("");
    
      const handleLogin = async (e: any) => {
        e.preventDefault();
    
        if (!nama || !nik || !nisn) {
          alert("Data harus diisi lengkap!");
          return;
        }
    
        try {
          const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              nama,
              nik,
              nisn
            })
          });

          const result = await response.json();

          if (response.ok) {
            alert("Login berhasil!");
            // Store user info
            localStorage.setItem('user', JSON.stringify(result.user));
            localStorage.setItem('userNik', nik);
            localStorage.setItem('userNisn', nisn);
            
            // Redirect based on user type
            if (result.user.type === 'admin') {
              router.push("/dashboardA");
            } else {
              router.push("/dashboardS");
            }
          } else {
            alert(result.message || "Login gagal!");
          }
        } catch (error) {
          console.error("Login error:", error);
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
                <form onSubmit={handleLogin} className={styles.container6}>
                    <h1 className="text-2xl font-bold text-center mb-6 text-black"> Login</h1>

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
                    Login
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
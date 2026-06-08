import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";


export default function Home() {
  return (
    <main className={styles.body}>
      <div className={styles.container1}>
        <Image src="/image 1.png" alt="Logo SMK Citra Negara" width={35} height={35} className={styles.image} />
        <h1 className={styles.title}>SMK CITRA NEGARA</h1>
      </div>

      <nav className={styles.navbar}>
        <p className={styles.navText}>Alur pendaftaran   Jurusan</p>
        <div className={styles.navLinks}>
          <Link href="/login" className={styles.link}>Login</Link>
          <Link href="/register" className={styles.link}>Register</Link>
        </div>
      </nav>

      <div className={styles.container}>
        <div className={styles.heroContent}>
          <h1 className={styles.h1}>Wujudkan Masa Depan Di SMK CITRA NEGARA</h1>
          <p className={styles.p}>Penerimaan peserta didik baru (PPDB) tahun ajaran 2026/2027 telah dibuka.</p>
        </div>
      </div>

      <div className={styles.container2}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 className={styles.h3} style={{ color: '#0f172a', marginBottom: '12px' }}>Kenapa SMK Citra Negara?</h1>
          <p style={{ color: '#6b7280', fontSize: '16px', lineHeight: '1.6', maxWidth: '600px', margin: '0 auto' }}>Kami menyediakan lingkungan belajar yang inovatif dan fasilitas modern untuk mendukung kompetensi siswa</p>
        </div>
      </div>

      <div className={styles.containerRow}>
        <div className={styles.container4}>
          <h1 className={styles.h2}>Akreditasi A</h1>
        </div>
        <div className={styles.container4}>
          <h1 className={styles.h2}>Kemitraan Industri</h1>
        </div>
        <div className={styles.container4}>
          <h1 className={styles.h2}>Laboratorium Modern</h1>
        </div>
      </div>

      <div className={styles.container5}>
        <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '24px', color: '#0f172a', margin: 0 }}>Program Keahlian</h2>
        <div className={styles.containerRow}>
          <Image src="/Rectangle 14.png" alt="Logo RPL" width={200} height={200} className={styles.image1} />
          <Image src="/Rectangle 15.png" alt="Logo TKJ" width={200} height={200} className={styles.image1} />
          <Image src="/Rectangle 18.png" alt="Logo MM" width={200} height={200} className={styles.image1} />
        </div>
      </div>

      <div className={styles.container3}>
        <h1 className={styles.h1} style={{ marginBottom: '8px' }}>SMK CITRA NEGARA</h1>
        <p style={{ color: 'rgba(255,255,255,0.95)', fontSize: '16px', lineHeight: '1.6', margin: 0 }}>Mewujudkan generasi unggul dan berakhlak mulia</p>
      </div>
      

    </main>
  );
}
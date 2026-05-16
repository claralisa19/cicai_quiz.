const daftarSoal = [
    { pertanyaan: "1. Look at the sky! It ___ going to rain soon.", pilihan: ["is", "am", "are", "was"], jawabanBenar: 0 },
    { pertanyaan: "2. What is the antonym (lawan kata) of 'Big'?", pilihan: ["Large", "Small", "Tall", "Heavy"], jawabanBenar: 1 },
    { pertanyaan: "3. My mother ___ delicious food in the kitchen right now.", pilihan: ["cook", "cooks", "is cooking", "cooked"], jawabanBenar: 2 },
    { pertanyaan: "4. Which animal can fly in the air?", pilihan: ["Fish", "Cat", "Bird", "Snake"], jawabanBenar: 2 },
    { pertanyaan: "5. I have an English exam tomorrow, so I ___ study tonight.", pilihan: ["must", "can", "may", "will"], jawabanBenar: 0 },
    { pertanyaan: "6. Pineapple in Indonesian means...", pilihan: ["Semangka", "Nanas", "Melon", "Apel"], jawabanBenar: 1 },
    { pertanyaan: "7. How do you say 'Selamat Pagi' in English?", pilihan: ["Good Afternoon", "Good Evening", "Good Night", "Good Morning"], jawabanBenar: 3 },
    { pertanyaan: "8. This is my sister. ___ name is Alicia.", pilihan: ["His", "Her", "Its", "Your"], jawabanBenar: 1 },
    { navigation: "9. We use our ___ to listen to music.", pilihan: ["Eyes", "Nose", "Ears", "Mouth"], jawabanBenar: 2 },
    { pertanyaan: "10. Yesterday, My brother ___ a new bicycle.", pilihan: ["buy", "buys", "buying", "bought"], jawabanBenar: 3 }
];

let indeksSekarang = 0;
let skor = 0;
let nickname = "";

// Alur Halaman 1 -> Halaman 2
function pindahKeNickname() {
    document.getElementById("halaman-welcome").style.display = "none";
    document.getElementById("halaman-nickname").style.display = "block";
}

// Alur Halaman 2 -> Halaman 3 (Countdown)
function mulaiCountdown() {
    let inputNama = document.getElementById("input-nama").value.trim();
    
    if (inputNama === "") {
        document.getElementById("peringatan-nama").style.display = "block";
        return;
    }
    
    nickname = inputNama; // Simpan nama user
    document.getElementById("halaman-nickname").style.display = "none";
    document.getElementById("halaman-countdown").style.display = "block";

    // Mulai hitung mundur 3 2 1
    let hitungan = 3;
    let elemenAngka = document.getElementById("angka-countdown");
    
    let intervalTimer = setInterval(() => {
        hitungan--;
        if (hitungan > 0) {
            elemenAngka.innerText = hitungan;
        } else {
            clearInterval(intervalTimer); // Hentikan hitungan mundur
            masukKeKuis(); // Pindah ke halaman soal kuis
        }
    }, 1000);
}

// Alur Halaman 3 -> Masuk Halaman Kuis Utama
function masukKeKuis() {
    document.getElementById("halaman-countdown").style.display = "none";
    document.getElementById("halaman-kuis").style.display = "block";
    document.getElementById("halo-user").innerText = "Hi, " + nickname + "! 👋";
    tampilkanSoal();
}

function tampilkanSoal() {
    let soalAktif = daftarSoal[indeksSekarang];

    document.getElementById("btn-next").style.display = "none";
    document.getElementById("pertanyaan").innerText = soalAktif.pertanyaan;
    document.getElementById("info-nomor").innerText = "Soal " + (indeksSekarang + 1) + "/" + daftarSoal.length;

    let persenProgress = ((indeksSekarang + 1) / daftarSoal.length) * 100;
    document.getElementById("progress-isi").style.width = persenProgress + "%";

    for (let i = 0; i < 4; i++) {
        let tombol = document.getElementById("opsi" + i);
        tombol.innerText = soalAktif.pilihan[i];
        tombol.style.backgroundColor = "#ffffff";
        tombol.style.borderColor = "#e8ecf1";
        tombol.style.color = "#57606f";
        tombol.disabled = false;
    }
}

// LOGIKA BARU: Sekali klik langsung kunci & muncul button next (tidak usah cari jawaban benar)
function pilihJawaban(indeksDipilih) {
    let soalAktif = daftarSoal[indeksSekarang];
    
    // Matikan semua tombol setelah diklik sekali
    for (let i = 0; i < 4; i++) {
        document.getElementById("opsi" + i).disabled = true;
    }

    if (indeksDipilih === soalAktif.jawabanBenar) {
        // Jika Jawaban Benar (Warna Hijau)
        document.getElementById("opsi" + indeksDipilih).style.backgroundColor = "#d4edda";
        document.getElementById("opsi" + indeksDipilih).style.borderColor = "#c3e6cb";
        document.getElementById("opsi" + indeksDipilih).style.color = "#155724";
        skor += 10;
    } else {
        // Jika Jawaban Salah (Warna Merah)
        document.getElementById("opsi" + indeksDipilih).style.backgroundColor = "#f8d7da";
        document.getElementById("opsi" + indeksDipilih).style.borderColor = "#f5c6cb";
        document.getElementById("opsi" + indeksDipilih).style.color = "#721c24";
        
        // Tunjukkan juga mana jawaban asli yang benar (Warna Hijau)
        document.getElementById("opsi" + soalAktif.jawabanBenar).style.backgroundColor = "#d4edda";
        document.getElementById("opsi" + soalAktif.jawabanBenar).style.borderColor = "#c3e6cb";
        document.getElementById("opsi" + soalAktif.jawabanBenar).style.color = "#155724";
    }

    // Tampilkan tombol Next secara instan
    document.getElementById("btn-next").style.display = "block";
}

function pertanyaanSelanjutnya() {
    indeksSekarang++;

    if (indeksSekarang < daftarSoal.length) {
        tampilkanSoal();
    } else {
        tampilkanHalamanHasil();
    }
}

function tampilkanHalamanHasil() {
    document.getElementById("halaman-kuis").style.display = "none";
    document.getElementById("halaman-hasil").style.display = "block";

    let elemenVisual = document.getElementById("reward-visual");
    let elemenPesan = document.getElementById("pesan-reward");

    document.getElementById("nama-pemenang").innerText = nickname;
    document.getElementById("skor-akhir").innerText = skor;

    // Logika Evaluasi Reward Akhir
    if (skor === 100) {
        elemenVisual.innerText = "🏆"; 
        elemenPesan.innerText = "Luar Biasa! Kamu Juara Cicai Quiz, Benar Semua!";
    } else if (skor >= 60) { // Lebih dari 5 soal benar (mulai dari 6 soal ke atas)
        elemenVisual.innerText = "🤗"; 
        elemenPesan.innerText = "Hebat banget! Ini pelukan hangat karena kamu berhasil lulus!";
    } else { // Kurang dari 5 soal benar (5 ke bawah)
        elemenVisual.innerText = "💪"; 
        elemenPesan.innerText = "Jangan berkecil hati! Tetap semangat belajar lagi ya!";
    }
}

function ulangiKuis() {
    indeksSekarang = 0;
    skor = 0;
    document.getElementById("input-nama").value = "";
    document.getElementById("peringatan-nama").style.display = "none";
    document.getElementById("halaman-hasil").style.display = "none";
    document.getElementById("halaman-welcome").style.display = "block";
}
let lemburlist = [
    { id: 1, kode: "K001", nama: "Ahmad Iqbal", tanggal: "2024-12-10", jamMulai: "15:00", jamSelesai: "18:00", totalJam: "3 Jam" },
    { id: 2, kode: "K002", nama: "Sony Won", tanggal: "2024-12-10", jamMulai: "15:00", jamSelesai: "19:00", totalJam: "4 Jam" },
    { id: 3, kode: "K003", nama: "Selly Rose", tanggal: "2024-12-10", jamMulai: "15:00", jamSelesai: "19:30", totalJam: "4 Setengah Jam" },
    { id: 4, kode: "K004", nama: "Rahman Hakim", tanggal: "2024-12-10", jamMulai: "15:00", jamSelesai: "20:00", totalJam: "5 Jam" },
    { id: 5, kode: "K005", nama: "Ridwan Zul", tanggal: "2024-12-10", jamMulai: "15:00", jamSelesai: "20:30", totalJam: "5 Setengah Jam" }
];

function renderTabelLembur() {
    const tabelBody = document.querySelector("#tabelLembur tbody");
    tabelBody.innerHTML = "";

    lemburlist.forEach((lembur, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${lembur.kode}</td>
            <td>${lembur.nama}</td>
            <td>${lembur.tanggal}</td>
            <td>${lembur.jamMulai}</td>
            <td>${lembur.jamSelesai}</td>
            <td>${lembur.totalJam}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editLembur(${lembur.id})"><i class="fas fa-edit"></i></button>
                <button class="btn btn-danger btn-sm" onclick="hapusLembur(${lembur.id})"><i class="fas fa-trash"></i></button>
            </td>
        `;
        tabelBody.appendChild(row);
    });
}

function tambahLembur() {
    const kode = document.getElementById("kode_karyawan").value;
    const nama = document.getElementById("nama").value;
    const tanggal = document.getElementById("tanggal").value;
    const jamMulai = document.getElementById("jam_mulai").value;
    const jamSelesai = document.getElementById("jam_selesai").value;

    if (!kode || !nama || !tanggal || !jamMulai || !jamSelesai) {
        alert("Semua kolom harus diisi!");
        return;
    }

    const lemburBaru = {
        id: lemburlist.length + 1,
        kode: kode,
        nama: nama,
        tanggal: tanggal,
        jamMulai: jamMulai,
        jamSelesai: jamSelesai,
        totalJam: `${(new Date(`1970-01-01T${jamSelesai}:00`) - new Date(`1970-01-01T${jamMulai}:00`)) / 3600000} Jam`
    };

    lemburlist.push(lemburBaru);
    renderTabelLembur();

    document.getElementById("formLembur").reset();
    $("#tambahLemburModal").modal("hide");
}

function editLembur(id) {
    const lembur = lemburlist.find(l => l.id === id);

    if (lembur) {
        document.getElementById("kode_karyawan").value = lembur.kode;
        document.getElementById("nama").value = lembur.nama;
        document.getElementById("tanggal").value = lembur.tanggal;
        document.getElementById("jam_mulai").value = lembur.jamMulai;
        document.getElementById("jam_selesai").value = lembur.jamSelesai;

        $("#tambahLemburModal").modal("show");
        document.getElementById("simpanLembur").onclick = function () {
            simpanPerubahanLembur(id);
        };
    }
}

function simpanPerubahanLembur(id) {
    const lembur = lemburlist.find(l => l.id === id);

    if (lembur) {
        lembur.kode = document.getElementById("kode_karyawan").value;
        lembur.nama = document.getElementById("nama").value;
        lembur.tanggal = document.getElementById("tanggal").value;
        lembur.jamMulai = document.getElementById("jam_mulai").value;
        lembur.jamSelesai = document.getElementById("jam_selesai").value;
        lembur.totalJam = `${(new Date(`1970-01-01T${lembur.jamSelesai}:00`) - new Date(`1970-01-01T${lembur.jamMulai}:00`)) / 3600000} Jam`;

        renderTabelLembur();
        document.getElementById("formLembur").reset();
        $("#tambahLemburModal").modal("hide");
    }
}

function hapusLembur(id) {
    if (confirm("Apakah Anda yakin ingin menghapus data lembur ini?")) {
        lemburlist = lemburlist.filter(l => l.id !== id);
        renderTabelLembur();
    }
}

document.addEventListener("DOMContentLoaded", renderTabelLembur);
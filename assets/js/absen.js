let dataAbsensi = [
    { id: 1, kode: "K001", nama: "Ahmad Iqbal", tanggal: "2024-12-10", jamMasuk: "07:00", jamKeluar: "15:00", status: "Hadir" },
    { id: 2, kode: "K002", nama: "Sony Won", tanggal: "2024-12-10", jamMasuk: "07:00", jamKeluar: "15:00", status: "Hadir" },
    { id: 3, kode: "K003", nama: "Selly Rose", tanggal: "2024-12-10", jamMasuk: "07:20", jamKeluar: "15:00", status: "Terlambat" },
    { id: 4, kode: "K004", nama: "Rahman Hakim", tanggal: "2024-12-10", jamMasuk: "10:00", jamKeluar: "15:00", status: "Izin" },
    { id: 5, kode: "K005", nama: "Ridwan Zul", tanggal: "2024-12-10", jamMasuk: "00:00", jamKeluar: "00:00", status: "Tidak Hadir" }
];

function renderTabelAbsensi() {
    const tabelBody = document.querySelector("#tabelAbsensi tbody");
    tabelBody.innerHTML = "";

    dataAbsensi.forEach((absensi, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${absensi.kode}</td>
            <td>${absensi.nama}</td>
            <td>${absensi.tanggal}</td>
            <td>${absensi.jamMasuk}</td>
            <td>${absensi.jamKeluar}</td>
            <td>${absensi.status}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editAbsensi(${absensi.id})"><i class="fas fa-edit"></i></button>
                <button class="btn btn-danger btn-sm" onclick="hapusAbsensi(${absensi.id})"><i class="fas fa-trash"></i></button>
            </td>
        `;
        tabelBody.appendChild(row);
    });
}

function tambahAbsensi() {
    const kode = document.getElementById("kode_karyawan").value;
    const nama = document.getElementById("nama").value;
    const tanggal = document.getElementById("tanggal").value;
    const jamMasuk = document.getElementById("jam_masuk").value;
    const jamKeluar = document.getElementById("jam_keluar").value;
    const status = document.getElementById("status").value;

    if (!kode || !nama || !tanggal || !jamMasuk || !jamKeluar || !status) {
        alert("Semua kolom harus diisi!");
        return;
    }

    const absensiBaru = {
        id: dataAbsensi.length + 1,
        kode: kode,
        nama: nama,
        tanggal: tanggal,
        jamMasuk: jamMasuk,
        jamKeluar: jamKeluar,
        status: status
    };

    dataAbsensi.push(absensiBaru);
    renderTabelAbsensi();

    document.getElementById("formAbsensi").reset();
    $("#tambahAbsensiModal").modal("hide");
}

function editAbsensi(id) {
    const absensi = dataAbsensi.find(a => a.id === id);

    if (absensi) {
        document.getElementById("kode_karyawan").value = absensi.kode;
        document.getElementById("nama").value = absensi.nama;
        document.getElementById("tanggal").value = absensi.tanggal;
        document.getElementById("jam_masuk").value = absensi.jamMasuk;
        document.getElementById("jam_keluar").value = absensi.jamKeluar;
        document.getElementById("status").value = absensi.status;

        $("#tambahAbsensiModal").modal("show");
        document.getElementById("simpanAbsensi").onclick = function () {
            simpanPerubahanAbsensi(id);
        };
    }
}

function simpanPerubahanAbsensi(id) {
    const absensi = dataAbsensi.find(a => a.id === id);

    if (absensi) {
        absensi.kode = document.getElementById("kode_karyawan").value;
        absensi.nama = document.getElementById("nama").value;
        absensi.tanggal = document.getElementById("tanggal").value;
        absensi.jamMasuk = document.getElementById("jam_masuk").value;
        absensi.jamKeluar = document.getElementById("jam_keluar").value;
        absensi.status = document.getElementById("status").value;

        renderTabelAbsensi();
        document.getElementById("formAbsensi").reset();
        $("#tambahAbsensiModal").modal("hide");

        document.getElementById("simpanAbsensi").onclick = tambahAbsensi;
    }
}

function hapusAbsensi(id) {
    if (confirm("Apakah Anda yakin ingin menghapus data absensi ini?")) {
        dataAbsensi = dataAbsensi.filter(a => a.id !== id);
        renderTabelAbsensi();
    }
}

document.addEventListener("DOMContentLoaded", renderTabelAbsensi);
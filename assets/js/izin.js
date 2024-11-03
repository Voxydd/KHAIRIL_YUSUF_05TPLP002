let dataIzin = [
    { id: 1, kode: "K001", nama: "Ahmad Iqbal", tanggal: "2024-12-011", alasan: "Liburan", status: "Menunggu" },
    { id: 2, kode: "K002", nama: "Selly Rose", tanggal: "2024-12-011", alasan: "Sakit", status: "Disetujui" },
    { id: 3, kode: "K003", nama: "Rahman Hakim", tanggal: "2024-12-10", alasan: "Perawatan Keluarga", status: "Ditolak" },
    { id: 4, kode: "K004", nama: "Ridwan Zul", tanggal: "2024-12-10", alasan: "Perawatan Keluarga", status: "Ditolak" }
];

function renderTabelIzin() {
    const tabelBody = document.querySelector("#tabelIzin tbody");
    tabelBody.innerHTML = "";

    dataIzin.forEach((izin, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${izin.kode}</td>
            <td>${izin.nama}</td>
            <td>${izin.tanggal}</td>
            <td>${izin.alasan}</td>
            <td>${izin.status}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editIzin(${izin.id})"><i class="fas fa-edit"></i></button>
                <button class="btn btn-danger btn-sm" onclick="hapusIzin(${izin.id})"><i class="fas fa-trash"></i></button>
            </td>
        `;
        tabelBody.appendChild(row);
    });
}

function tambahIzin() {
    const kode = document.getElementById("kode_karyawan").value;
    const nama = document.getElementById("nama").value;
    const tanggal = document.getElementById("tanggal_izin").value;
    const alasan = document.getElementById("alasan").value;
    const status = document.getElementById("status").value;

    if (!kode || !nama || !tanggal || !alasan || !status) {
        alert("Semua kolom harus diisi!");
        return;
    }

    const izinBaru = {
        id: dataIzin.length + 1,
        kode: kode,
        nama: nama,
        tanggal: tanggal,
        alasan: alasan,
        status: status
    };

    dataIzin.push(izinBaru);
    renderTabelIzin();

    document.getElementById("formIzin").reset();
    $("#tambahIzinModal").modal("hide");
}

function editIzin(id) {
    const izin = dataIzin.find(i => i.id === id);

    if (izin) {
        document.getElementById("kode_karyawan").value = izin.kode;
        document.getElementById("nama").value = izin.nama;
        document.getElementById("tanggal_izin").value = izin.tanggal;
        document.getElementById("alasan").value = izin.alasan;
        document.getElementById("status").value = izin.status;

        $("#tambahIzinModal").modal("show");
        document.getElementById("simpanIzin").onclick = function () {
            simpanPerubahanIzin(id);
        };
    }
}

function simpanPerubahanIzin(id) {
    const izin = dataIzin.find(i => i.id === id);

    if (izin) {
        izin.kode = document.getElementById("kode_karyawan").value;
        izin.nama = document.getElementById("nama").value;
        izin.tanggal = document.getElementById("tanggal_izin").value;
        izin.alasan = document.getElementById("alasan").value;
        izin.status = document.getElementById("status").value;

        renderTabelIzin();
        document.getElementById("formIzin").reset();
        $("#tambahIzinModal").modal("hide");

        document.getElementById("simpanIzin").onclick = tambahIzin;
    }
}

function hapusIzin(id) {
    if (confirm("Apakah Anda yakin ingin menghapus data izin ini?")) {
        dataIzin = dataIzin.filter(i => i.id !== id);
        renderTabelIzin();
    }
}

document.addEventListener("DOMContentLoaded", renderTabelIzin);
let dataDivisi = [
    { id: 1, kode: "D001", nama: "Pemasaran" },
    { id: 2, kode: "D002", nama: "Produksi" },
    { id: 3, kode: "D003", nama: "Penjualan" },
    { id: 4, kode: "D004", nama: "Keuangan" }
];

function renderTabelDivisi() {
    const tabelBody = document.querySelector("#tabelDivisi tbody");
    tabelBody.innerHTML = "";

    dataDivisi.forEach((divisi, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${divisi.kode}</td>
            <td>${divisi.nama}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editDivisi(${divisi.id})"><i class="fas fa-edit"></i></button>
                <button class="btn btn-danger btn-sm" onclick="hapusDivisi(${divisi.id})"><i class="fas fa-trash"></i></button>
            </td>
        `;
        tabelBody.appendChild(row);
    });
}

function tambahDivisi() {
    const kode = document.getElementById("kode_divisi").value;
    const nama = document.getElementById("nama_divisi").value;

    if (!kode || !nama) {
        alert("Semua kolom harus diisi!");
        return;
    }

    const divisiBaru = {
        id: dataDivisi.length + 1,
        kode: kode,
        nama: nama
    };

    dataDivisi.push(divisiBaru);
    renderTabelDivisi();

    document.getElementById("formDivisi").reset();
    $("#tambahDivisiModal").modal("hide");
}

function editDivisi(id) {
    const divisi = dataDivisi.find(d => d.id === id);

    if (divisi) {
        document.getElementById("kode_divisi").value = divisi.kode;
        document.getElementById("nama_divisi").value = divisi.nama;

        $("#tambahDivisiModal").modal("show");
        document.getElementById("simpanDivisi").onclick = function () {
            simpanPerubahanDivisi(id);
        };
    }
}

function simpanPerubahanDivisi(id) {
    const divisi = dataDivisi.find(d => d.id === id);

    if (divisi) {
        divisi.kode = document.getElementById("kode_divisi").value;
        divisi.nama = document.getElementById("nama_divisi").value;

        renderTabelDivisi();
        document.getElementById("formDivisi").reset();
        $("#tambahDivisiModal").modal("hide");

        document.getElementById("simpanDivisi").onclick = tambahDivisi;
    }
}

function hapusDivisi(id) {
    if (confirm("Apakah Anda yakin ingin menghapus data divisi ini?")) {
        dataDivisi = dataDivisi.filter(d => d.id !== id);
        renderTabelDivisi();
    }
}

document.addEventListener("DOMContentLoaded", renderTabelDivisi);
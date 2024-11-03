let dataJabatan = [
    { id: 1, kode: "J001", nama: "CEO", gajiPokok: 25000000 },
    { id: 2, kode: "J002", nama: "Manajer", gajiPokok: 15000000 },
    { id: 3, kode: "J003", nama: "Supervisor", gajiPokok: 10000000 },
    { id: 4, kode: "J004", nama: "HRD", gajiPokok: 6000000 },
    { id: 5, kode: "J005", nama: "Staff", gajiPokok: 2500000 }
];

function renderTabelJabatan() {
    const tabelBody = document.querySelector("#tabelJabatan tbody");
    tabelBody.innerHTML = "";

    dataJabatan.forEach((jabatan, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${jabatan.kode}</td>
            <td>${jabatan.nama}</td>
            <td>Rp ${jabatan.gajiPokok.toLocaleString()}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editJabatan(${jabatan.id})"><i class="fas fa-edit"></i></button>
                <button class="btn btn-danger btn-sm" onclick="hapusJabatan(${jabatan.id})"><i class="fas fa-trash"></i></button>
            </td>
        `;
        tabelBody.appendChild(row);
    });
}

function tambahJabatan() {
    const kode = document.getElementById("kode_jabatan").value;
    const nama = document.getElementById("nama_jabatan").value;
    const gajiPokok = parseInt(document.getElementById("gaji_pokok").value);

    if (!kode || !nama || isNaN(gajiPokok)) {
        alert("Semua kolom harus diisi dengan benar!");
        return;
    }

    const jabatanBaru = {
        id: dataJabatan.length + 1,
        kode: kode,
        nama: nama,
        gajiPokok: gajiPokok
    };

    dataJabatan.push(jabatanBaru);
    renderTabelJabatan();

    document.getElementById("formJabatan").reset();
    $("#tambahJabatanModal").modal("hide");
}

function editJabatan(id) {
    const jabatan = dataJabatan.find(j => j.id === id);

    if (jabatan) {
        document.getElementById("kode_jabatan").value = jabatan.kode;
        document.getElementById("nama_jabatan").value = jabatan.nama;
        document.getElementById("gaji_pokok").value = jabatan.gajiPokok;

        $("#tambahJabatanModal").modal("show");
        document.getElementById("simpanJabatan").onclick = function () {
            simpanPerubahanJabatan(id);
        };
    }
}

function simpanPerubahanJabatan(id) {
    const jabatan = dataJabatan.find(j => j.id === id);

    if (jabatan) {
        jabatan.kode = document.getElementById("kode_jabatan").value;
        jabatan.nama = document.getElementById("nama_jabatan").value;
        jabatan.gajiPokok = parseInt(document.getElementById("gaji_pokok").value);

        renderTabelJabatan();
        document.getElementById("formJabatan").reset();
        $("#tambahJabatanModal").modal("hide");

        document.getElementById("simpanJabatan").onclick = tambahJabatan;
    }
}

function hapusJabatan(id) {
    if (confirm("Apakah Anda yakin ingin menghapus data jabatan ini?")) {
        dataJabatan = dataJabatan.filter(j => j.id !== id);
        renderTabelJabatan();
    }
}

document.addEventListener("DOMContentLoaded", renderTabelJabatan);
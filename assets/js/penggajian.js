let dataPenggajian = [
    { id: 1, kode: "K001", nama: "Ahmad Iqbal", jabatan: "CEO", gajiPokok: 25000000, lembur: 0, potongan: 0 },
    { id: 2, kode: "K002", nama: "Sony Won", jabatan: "Manajer", gajiPokok: 15000000, lembur: 1, potongan: 1 },
    { id: 3, kode: "K003", nama: "Selly Rose", jabatan: "Supervisor", gajiPokok: 10000000, lembur: 1, potongan: 0 },
    { id: 4, kode: "K004", nama: "Rahman Hakim", jabatan: "HRD", gajiPokok: 6000000, lembur: 2, potongan: 0 },
    { id: 5, kode: "K005", nama: "Ridwan Zul", jabatan: "Staff", gajiPokok: 2500000, lembur: 5, potongan: 1 }
];

function renderTabelPenggajian() {
    const tabelBody = document.querySelector("#tabelPenggajian tbody");
    tabelBody.innerHTML = "";

    dataPenggajian.forEach((penggajian, index) => {
        const totalGaji = penggajian.gajiPokok + (penggajian.lembur * 150000) - (penggajian.potongan * 200000);
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${penggajian.kode}</td>
            <td>${penggajian.nama}</td>
            <td>${penggajian.jabatan}</td>
            <td>Rp ${penggajian.gajiPokok.toLocaleString()}</td>
            <td>${penggajian.lembur} kali</td>
            <td>${penggajian.potongan} kali</td>
            <td>Rp ${totalGaji.toLocaleString()}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editPenggajian(${penggajian.id})"><i class="fas fa-edit"></i></button>
                <button class="btn btn-danger btn-sm" onclick="hapusPenggajian(${penggajian.id})"><i class="fas fa-trash"></i></button>
            </td>
        `;
        tabelBody.appendChild(row);
    });
}

function tambahPenggajian() {
    const kode = document.getElementById("kode_karyawan").value;
    const nama = document.getElementById("nama").value;
    const jabatan = document.getElementById("jabatan").value;
    const gajiPokok = parseInt(document.getElementById("gaji_pokok").value);
    const lembur = parseInt(document.getElementById("jumlah_lembur").value);
    const potongan = parseInt(document.getElementById("jumlah_potongan").value);

    const penggajianBaru = {
        id: dataPenggajian.length + 1,
        kode: kode,
        nama: nama,
        jabatan: jabatan,
        gajiPokok: gajiPokok,
        lembur: lembur,
        potongan: potongan
    };

    dataPenggajian.push(penggajianBaru);
    renderTabelPenggajian();

    document.getElementById("formPenggajian").reset();
    $("#tambahPenggajianModal").modal("hide");
}

function editPenggajian(id) {
    const penggajian = dataPenggajian.find(p => p.id === id);

    if (penggajian) {
        document.getElementById("kode_karyawan").value = penggajian.kode;
        document.getElementById("nama").value = penggajian.nama;
        document.getElementById("jabatan").value = penggajian.jabatan;
        document.getElementById("gaji_pokok").value = penggajian.gajiPokok;
        document.getElementById("jumlah_lembur").value = penggajian.lembur;
        document.getElementById("jumlah_potongan").value = penggajian.potongan;

        $("#tambahPenggajianModal").modal("show");
        document.getElementById("simpanPenggajian").onclick = function () {
            simpanPerubahanPenggajian(id);
        };
    }
}

function simpanPerubahanPenggajian(id) {
    const penggajian = dataPenggajian.find(p => p.id === id);

    if (penggajian) {
        penggajian.kode = document.getElementById("kode_karyawan").value;
        penggajian.nama = document.getElementById("nama").value;
        penggajian.jabatan = document.getElementById("jabatan").value;
        penggajian.gajiPokok = parseInt(document.getElementById("gaji_pokok").value);
        penggajian.lembur = parseInt(document.getElementById("jumlah_lembur").value);
        penggajian.potongan = parseInt(document.getElementById("jumlah_potongan").value);

        renderTabelPenggajian();
        document.getElementById("formPenggajian").reset();
        $("#tambahPenggajianModal").modal("hide");
    }
}

function hapusPenggajian(id) {
    if (confirm("Apakah Anda yakin ingin menghapus data penggajian ini?")) {
        dataPenggajian = dataPenggajian.filter(p => p.id !== id);
        renderTabelPenggajian();
    }
}

document.addEventListener("DOMContentLoaded", renderTabelPenggajian);
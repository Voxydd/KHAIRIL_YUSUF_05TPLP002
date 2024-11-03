let dataKaryawan = [
    { id: 1, kode: "K001", nama: "Ahmad Iqbal", email: "ahmd@gmail.com", alamat: "Jl. Bogor Raya No.20"},
    { id: 2, kode: "K002", nama: "Sony Won", email: "won@gmail.com", alamat: "Jl. Jawa No.1"},
    { id: 3, kode: "K003", nama: "Selly Rose", email: "rose@gmail.com", alamat: "Jl. Citayam No.15"},
    { id: 4, kode: "K004", nama: "Rahman Hakim", email: "hakim@gmail.com", alamat: "Jl. Asia Afrika No.26"},
    { id: 5, kode: "K005", nama: "Riwdan Zul", email: "zul@gmail.com", alamat: "Jl. Sudirman No.5"}
];

function renderTabelKaryawan() {
    const tabelBody = document.querySelector("#tabelKaryawan tbody");
    tabelBody.innerHTML = "";

    dataKaryawan.forEach((karyawan, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${karyawan.kode}</td>
            <td>${karyawan.nama}</td>
            <td>${karyawan.email}</td>
            <td>${karyawan.alamat}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editKaryawan(${karyawan.id})"><i class="fas fa-edit"></i></button>
                <button class="btn btn-danger btn-sm" onclick="hapusKaryawan(${karyawan.id})"><i class="fas fa-trash"></i></button>
            </td>
        `;
        tabelBody.appendChild(row);
    });
}

function tambahKaryawan() {
    const kode = document.getElementById("kode_karyawan").value;
    const nama = document.getElementById("nama").value;
    const email = document.getElementById("email").value;
    const alamat = document.getElementById("alamat").value;

    if (!kode || !nama || !email || !alamat) {
        alert("Semua kolom harus diisi!");
        return;
    }

    const karyawanBaru = {
        id: dataKaryawan.length + 1,
        kode: kode,
        nama: nama,
        email: email,
        alamat: alamat
    };

    dataKaryawan.push(karyawanBaru);
    renderTabelKaryawan();

    document.getElementById("formKaryawan").reset();
    $("#tambahKaryawanModal").modal("hide");
}

function editKaryawan(id) {
    const karyawan = dataKaryawan.find(k => k.id === id);

    if (karyawan) {
        document.getElementById("kode_karyawan").value = karyawan.kode;
        document.getElementById("nama").value = karyawan.nama;
        document.getElementById("email").value = karyawan.email;
        document.getElementById("alamat").value = karyawan.alamat;

        $("#tambahKaryawanModal").modal("show");
        document.getElementById("simpanKaryawan").onclick = function () {
            simpanPerubahanKaryawan(id);
        };
    }
}

function simpanPerubahanKaryawan(id) {
    const karyawan = dataKaryawan.find(k => k.id === id);

    if (karyawan) {
        karyawan.kode = document.getElementById("kode_karyawan").value;
        karyawan.nama = document.getElementById("nama").value;
        karyawan.email = document.getElementById("email").value;
        karyawan.alamat = document.getElementById("alamat").value;

        renderTabelKaryawan();
        document.getElementById("formKaryawan").reset();
        $("#tambahKaryawanModal").modal("hide");

        document.getElementById("simpanKaryawan").onclick = tambahKaryawan;
    }
}

function hapusKaryawan(id) {
    if (confirm("Apakah Anda yakin ingin menghapus data karyawan ini?")) {
        dataKaryawan = dataKaryawan.filter(k => k.id !== id);

        renderTabelKaryawan();
    }
}

document.addEventListener("DOMContentLoaded", renderTabelKaryawan);
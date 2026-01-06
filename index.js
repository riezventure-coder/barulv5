let dataArray = [];

Papa.parse("data.csv", {
  download: true,
  delimiter: ",",
  header: true,
  skinEmptyLines: true,
  complete: function (results) {
    data = results.data;
    const searchBtn = document.getElementById("search-btn");
    searchBtn.addEventListener("click", () => {
      const IP_ADDRESS = document.getElementById("ip").value;
      const SLOT = document.getElementById("slot").value;
      const PORT = document.getElementById("port").value;

      //Search VLAN & ID_PORT
      const filteredData = data.filter((item) => {
        return (
          item.IP === IP_ADDRESS && item.SLOT === SLOT && item.PORT === PORT
        );
      });

      getData(filteredData);
    });
  },
});

const getData = (data) => {
  dataArray.push(data);
  renderTable(data);
};

const renderTable = (data) => {
  const tbody = document.getElementById("result-body");
  const emptyMsg = document.getElementById("empty-msg");

  tbody.innerHTML = "";
  emptyMsg.textContent = "";

  if (data.length === 0) {
    emptyMsg.textContent = "Tidak ada data yang ditemukan.";
    return;
  }

  data.forEach((data) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${data.IP}</td>
            <td>${data.SLOT}</td>
            <td>${data.PORT}</td>
            <td>${data.VLAN}</td>
            <td>${data.ID_PORT}</td>
        `;
    tbody.appendChild(row);
  });
};

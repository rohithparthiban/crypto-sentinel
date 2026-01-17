const API_BASE = "";

$(document).ready(function () {
  loadAlerts();

  $("#alertForm").submit(function (e) {
    e.preventDefault();

    const data = {
      coin: $("#coin").val(),
      targetPrice: $("#targetPrice").val(),
      condition: $("#condition").val()
    };

    $.ajax({
      url: `${API_BASE}/alerts`,
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify(data),
      success: function () {
        $("#alertForm")[0].reset();
        loadAlerts();
      }
    });
  });

  $("#refreshBtn").click(loadAlerts);
});

function loadAlerts() {
  $.get(`${API_BASE}/alerts`, function (alerts) {
    const table = $("#alertTable");
    table.empty();

    alerts.forEach((a) => {
      table.append(`
        <tr>
          <td>${a.id}</td>
          <td>${a.coin}</td>
          <td>${a.target_price}</td>
          <td>${a.condition}</td>
          <td>
            <span class="badge ${
              a.status === "TRIGGERED" ? "bg-danger" : "bg-success"
            }">
              ${a.status}
            </span>
          </td>
          <td>
            ${
              a.status === "TRIGGERED"
                ? `<button class="btn btn-sm btn-warning me-1"
                    onclick="resetAlert(${a.id})">
                    Reset
                   </button>`
                : ""
            }
            <button class="btn btn-sm btn-danger"
              onclick="deleteAlert(${a.id})">
              Delete
            </button>
          </td>
        </tr>
      `);
    });
  });
}

function deleteAlert(id) {
  $.ajax({
    url: `${API_BASE}/alerts/${id}`,
    method: "DELETE",
    success: loadAlerts
  });
}

function resetAlert(id) {
  $.ajax({
    url: `${API_BASE}/alerts/${id}/reset`,
    method: "PUT",
    success: loadAlerts
  });
}

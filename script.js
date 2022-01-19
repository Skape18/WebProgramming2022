const baseUrl = "http://localhost:3000";

function getData() {
  const count = document.getElementById("amount-input").value;
  const content = document.getElementById("content-input").value;

  const data = {
    count,
    content,
  };
  return data;
}

function getParams(data, method) {
  return {
    headers: {
      "content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(data),
    method: method,
  };
}

function post(event) {
  event.stopPropagation();
  const url = `${baseUrl}/post`;

  const data = getData();
  const params = getParams(data, "POST");

  fetch(url, params).then((res) => console.log(res));
}

function get(event) {
  event.stopPropagation();

  const url = `${baseUrl}/get`;
  fetch(url).then((res) => {
    res.json().then((j) => {
      console.log(j);
      document.getElementById("amount-input").value = j.count;
      document.getElementById("content-input").value = j.content;
      create();
    });
  });
}

function create(event) {
  event?.stopPropagation();

  const count = document.getElementById("amount-input").value;
  const content = document.getElementById("content-input").value;

  const tabset = document.createElement("div");
  tabset.className = "tabset";

  const tabsPanels = document.createElement("div");
  tabsPanels.className = "tab-panels";

  for (let index = 0; index < count; index++) {
    createForm(content, index, tabset, tabsPanels);
  }

  tabset.appendChild(tabsPanels);
  document.getElementById("block-3").appendChild(tabset);
}

function createForm(contentText, index, tabset, tabPanels) {
  const tab = document.createElement("input");
  tab.name = "tabset";
  tab.type = "radio";
  tab.id = `tab${index+1}`;
  const label = document.createElement("label");
  label.htmlFor = tab.id;
  label.textContent = contentText;

  tabset.appendChild(tab);
  tabset.appendChild(label);

  const section = document.createElement("section");
  section.className = "tab-panel";
  const p = document.createElement("p");
  p.textContent += contentText;
  section.appendChild(p);
  tabPanels.appendChild(section);
}
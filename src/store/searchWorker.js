import * as JsSearch from "js-search";

const jsSearch = new JsSearch.Search("name");
jsSearch.addIndex("name");
jsSearch.addIndex(["vendor", "abbreviation"]);

onmessage = (e) => {
  let data = null;
  if (e.action === "index") {
    const f = e.flavors;
    jsSearch.addDocuments(f);
  }

  if (e.action === "search") {
    data = jsSearch.search(e.query);
  }

  postMessage({ action: e.action, data });
};

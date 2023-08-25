const useInfoBoxData = (wikiData) => {
  const getInfoBoxData = (term) => {
    let startStr = `${term}</a></th>`;
    let flag;

    if (wikiData.indexOf(startStr) === -1) {
      startStr = `${term}</th>`;
    }

    if (wikiData.indexOf(startStr) === -1 && term === "Technical director") {
      startStr = `Technical Directors</th>`;
      flag = "ferrari";
    }

    const pos = wikiData.indexOf(startStr) + startStr.length;
    const xmlString = wikiData
      .substring(pos, wikiData.indexOf("</tr>", pos))
      .replaceAll("<br />", " | ");

    const node = new DOMParser().parseFromString(
      xmlString,
      "text/xml"
    ).firstChild;
    let text = node.textContent;

    if (text.indexOf("[") !== -1) {
      text = text.substring(0, text.indexOf("["));
    }

    if (text.indexOf(" | ") !== -1) {
      text = text.split(" | ")[0];
    }

    if (flag === "ferrari" && term === "Technical director") {
      text = text.substring(0, text.indexOf("("));
    }

    if (text.indexOf(".mw-parser-output") !== -1) {
      text = text.substring(text.indexOf("WCC:") + "WCC:".length);
    }

    return text;
  };

  const getInfoBoxImage = () => {
    let startStr = 'class="mw-file-description"';

    const pos = wikiData.indexOf(startStr) + startStr.length;
    const firstXmlString = wikiData.substring(
      pos,
      wikiData.indexOf("</a>", pos)
    );
    const xmlString = firstXmlString.substring(firstXmlString.indexOf(">") + 1);

    const node = new DOMParser().parseFromString(
      xmlString,
      "text/xml"
    ).firstChild;

    return "https:" + node.attributes.src.textContent;
  };

  return { getInfoBoxData, getInfoBoxImage };
};

export default useInfoBoxData;

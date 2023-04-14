const useInfoBoxData = (wikiData) => {
  const getInfoBoxData = (term) => {
    let startStr = `${term}</a></th>`;

    if (wikiData.indexOf(startStr) === -1) {
      startStr = `${term}</th>`;
    }

    const pos = wikiData.indexOf(startStr) + startStr.length;
    const xmlString = wikiData
      .substring(pos, wikiData.indexOf("</tr>", pos))
      .replaceAll("<br />", " | ");

    const node = new DOMParser().parseFromString(
      xmlString,
      "text/xml"
    ).firstChild;
    const text = node.textContent;

    if (text.indexOf("[") !== -1) {
      return text.substring(0, text.indexOf("["));
    }

    if (text.indexOf(" | ") !== -1) {
      return text.split(" | ")[0];
    }

    return text;
  };

  const getInfoBoxImage = () => {
    let startStr = 'class="image"';

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

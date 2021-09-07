document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("getTags").addEventListener('click', () => {
    function getTags() {
      var select = document.getElementById("StyleLibraryValue0LibraryValueId");
      if (!select) {
        return;
      }
      var ids = {};
      for (var i = 0; i < select.options.length; i++) {
        if (!select.options[i].text || !select.options[i].value) {
          continue;
        }
        ids[select.options[i].text] = select.options[i].value
      }
      console.log(ids);
      return ids;
    }

    // We have permission to access the activeTab, so we can call chrome.tabs.executeScript:
    chrome.tabs.executeScript({
      code: '(' + getTags + ')();' //argument here is a string but function.toString() returns function's code
    }, (results) => {
      console.log(results[0]);
      const tags = results[0];
      if (!tags) {
        console.log('Can\'t find tags.  Are you in a Style page?')
      }
      const table = document.getElementById("tagResults");
      table.style.display = 'table';
      for (const tagName in tags) {
        if (Object.hasOwnProperty.call(tags, tagName)) {
          
          const tagNameTd = document.createElement("td");
          tagNameTd.append(tagName);

          const tagId = tags[tagName];
          const tagIdTd = document.createElement("td");
          tagIdTd.append(tagId);

          let tr = document.createElement("tr");
          tr.append(tagIdTd);
          tr.append(tagNameTd);
          table.append(tr);
        }
      }
    });
  });
}, false);
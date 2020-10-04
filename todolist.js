let list = []; // inköpslistan

document.getElementById('addButton').addEventListener('click', addArticle);

function addArticle() {
// Lägg till en artikel i listan
  let articleText = document.getElementById('inputText').value;
  if(articleText !== '') {
    // Skapa nytt artikelobjekt med text och överstrykningsflagga
    list.push(
      {
        text: articleText,
        crossedOver: false
      }
    );
    viewArticleList();
    clearAndFocus();
  }
}

function viewArticleList() {
// Visa listan med artiklar
let html = '';
  // Fixa HTML för alla artiklar
  for(let i=0; i<list.length; i++) {
    let theClass = list[i].crossedOver ? 'crossedOverArticle': 'activeArticle';
    html += `<div class="deleteArticle float-left" id="del${i}">x </div><div class="${theClass}" id="art${i}">${list[i].text}</div>`;
  }
  // Lägg in denna HTML direkt på sidan
  document.getElementById('listDiv').innerHTML = html;
  // Nu kan man nå varje div via index och där lägga in två eventhanterare
  // en för toggle och en för delete (jag utgick från att direkt onclick är
  // "förbjudet" även för denna uppgift, så jag gjorde två loopar istället)
  for(let i=0; i<list.length; i++) {
    document.getElementById('art'+i).addEventListener("click", function () {
      // Toggla överstruken text / normal text
      list[i].crossedOver = !list[i].crossedOver;
      viewArticleList();
      clearAndFocus();
    });
    document.getElementById('del'+i).addEventListener("click", function () {
      // Tag bort artikeln
      list.splice(i,1);
      viewArticleList();
      clearAndFocus();
    });
  }
}

function clearAndFocus() {
  // Rensa textboxen och sätt fokus där
  let textBox = document.getElementById('inputText');
  textBox.value = '';
  textBox.focus();
}

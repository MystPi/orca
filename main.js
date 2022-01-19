const file = document.getElementById('file');

const editor = CodeMirror(document.getElementById('area'), {
  value: `do(
  define(factorial, n,
    if(<=(n, 1),
      1,
      *(n, -(n, 1))
    )
  ),
  print(factorial(4)) # 24
)`,
  mode:  'orca',
  lineNumbers: true,
  matchBrackets: true,
  autoCloseBrackets: {
    pairs: '()""',
    explode: '()""'
  },
  extraKeys: {
    Tab: function(cm) {
      if (cm.somethingSelected()) {
        cm.indentSelection('add');
      } else {
        cm.replaceSelection(cm.getOption('indentWithTabs')? '\t':
          Array(cm.getOption('indentUnit') + 1).join(' '), 'end', '+input');
      }
    },
    'Shift-Tab': (cm) => cm.indentSelection('subtract'),
    'Ctrl-S': (cm) => save()
  }
});


function save() {
  const fileName = prompt('Enter a filename');
  if (fileName) {
    download(fileName + '.orca', editor.getValue());
  }
}


function download(filename, text) {
  const element = document.createElement('a');
  element.setAttribute(
    'href',
    'data:text/plain;charset=utf-8,' + encodeURIComponent(text)
  );
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}


file.addEventListener('change', (e) => {
  const fileToLoad = file.files[0];
  const fileReader = new FileReader();
  
  fileReader.onload = function(fileLoadedEvent) {
    const textFromFileLoaded = fileLoadedEvent.target.result;
    editor.setValue(textFromFileLoaded);
  };

  fileReader.readAsText(fileToLoad, "UTF-8");
});
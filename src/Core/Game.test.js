import "babel-polyfill";

test('true equals true', () => {
    console.log('doc is:',document)
    expect({}).toBe(document);
});







test('test events with dom', (done) => {
    console.log('doc is:',document)
    function onSkierDirectionChanged(e) {
        let data = {...e.detail}
        expect(data.direction).toBe(1);
        done();
      }

      let event = document.createEvent("CustomEvent");
      let element = document;
      document.addEventListener('skierDirectionChanged',onSkierDirectionChanged);
      event.initCustomEvent("skierDirectionChanged",true, true, {direction:1});
      element.dispatchEvent(event);
      //fetchData(callback);
    });
# cycle-react-etch-sketch

An Etch-a-Sketch made with Cycle.js using a React view.

Even though this uses FlowType, you might find that some things just don't type check or don't work very well. Well... I guess you could always use Elm or Typescript.

Maybe unsurprisingly, you'll see the React driver is a little... ugly. It constructs a Subject when the module is loaded, and then exports a method that can be used to send events to it. I don't know of any ways to get all the events from React in the end of the pipeline, so I side load it like just about anything else has to do (unless you use context, which is basically still sideloading but with a billion things you have to set up manually). Well, doesn't really matter I guess. Still fits my Cycle data model by providing this Subject as an Observable of events (you could even call `asObserver` on it if you wanted to make sure it didn't mess with you later). Not that important though.

You'll also notice that the board gets pretty laggy when you have hundreds of points. Either there's a serious bug with how I'm shallow checking my props, or it's just the fact of having hundreds of svg elements to render. Either way, my stack traces are pretty full of React doing stuff. Not that this is too important though - I don't really expect 60 fps when writing hundreds of svg rectangles to the browser anyway.

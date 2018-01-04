import { Hello } from "./components/Hello";

let loader: HTMLElement = document.getElementById('container-loader') as HTMLElement;
let parent = loader.parentNode;
parent && parent.removeChild(loader);

ReactDOM.render(
    <Hello />,
    document.getElementById('app')
);

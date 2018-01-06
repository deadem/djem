import { Login } from "./components/Login";

let loader: HTMLElement = document.getElementById('container-loader') as HTMLElement;
let parent = loader.parentNode;
parent && parent.removeChild(loader);

ReactDOM.render(
    <Login />,
    document.getElementById('app')
);

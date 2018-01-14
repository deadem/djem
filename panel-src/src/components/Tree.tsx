import { Proxy, Http } from '../store/Proxy';

class Tree extends React.Component {
  load(proxy: Http) {
    console.log('load');
    proxy.post('tree', {});
  }

  render() {
    return (
      <div className='Tree'>tree</div>
    );
  }
};

export default Proxy(Tree);

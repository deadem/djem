import { Proxy, Http } from '../store/Proxy';
import { connect } from 'react-redux';
import { State } from '../store';

class Tree extends React.Component {
  props: {
    tree: any;
  }

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

export default connect((state: State) => ({ tree: state.tree }), () => ({}))(Proxy(Tree));

import React from 'react';
import { Layout } from 'antd'
import { connect } from 'react-redux';

const { Content } = Layout;

const ItemPage = () => {
  return (
    <Content >
      Item Page
    </Content>
  );
}
 
const mapStateToProps = state = ({

}) 
export default connect(mapStateToProps, {})(ItemPage);
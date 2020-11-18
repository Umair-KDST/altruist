import React, { Component } from "react";
import { Route, Switch, Link } from "react-router-dom";
import { Layout, Row, Col, Card, Tooltip, Comment, Avatar, Button } from "antd";


const NotFound = () => {
    return (<React.Fragment>

        <h1 style={{ marginTop: '20%', marginLeft: '10%', fontSize: "10rem" }} >404 Page Not Found</h1>

        <Row>
            <Col span={24} style={{ display: "flex", justifyContent: "center" }}>
                <Link to="/">
                    <Button type="primary" shape="round" size='large'>
                        Return to home page
        </Button>
                </Link>
            </Col>
        </Row>


    </React.Fragment>);
}

export default NotFound;
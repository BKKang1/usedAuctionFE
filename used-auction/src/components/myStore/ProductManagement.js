import axios from "axios";
import { API } from "../../config";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space, Typography, Button, List, Layout, Menu } from "antd";
import React, { location, useState, useEffect,useRef } from "react";
import { BrowserRouter, Link, Route, Routes, NavLink, useNavigate,} from "react-router-dom";
import MyStore from "./MyStore";
// import SockJS from "sockjs-client";
// const Stomp = require('stompjs');
axios.defaults.withCredentials = true;

const basicStyle = {
    backgroundColor: "white",
};

const listBoxStyle = {
    marginTop: "2%",
    backgroundColor: "white",
    //marginLeft: "20%",
    //marginRight: "20%",
    //borderTop: "2px solid",
};
  
const titleStyle = {
    fontSize: "25px",
      ontWeight: "500",
};
  
const descriptionStyle = {
    fontSize: "20px",
    fontWeight: "500",
};
  
const buttonStyle = {
    display: "flex",
    marginTop: "5%",
};
  
const imgStyle = {
    width: "200px",
    height: "220px",
};

const menuStyle = {
    color: "black",
    marginTop: "2%",
    marginLeft: "2%",
    fontSize: "18px",
};

const listSpanStyle = {
    display: "flex",
};

const items1 = [
    {
      key: "0",
      label: "전체",
    },
    {
      key: "1",
      label: "경매중",
    },
    {
      key: "2",
      label: "낙찰성공",
    },
    {
      key: "3",
      label: "낙찰실패",
    },
    {
      key: "4",
      label: "거래성공",
    },
    {
      key: "5",
      label: "거래실패",
    },
];

const items2 = [
    {
      key: "0",
      label: "전체",
    },
    {
      key: "1",
      label: "거래성공",
    },
    {
      key: "2",
      label: "거래실패",
    },
];

const items3 = [
    {
      key: "0",
      label: "전체",
    },

    {
      key: "1",
      label: "거래성공",
    },
    {
      key: "2",
      label: "거래실패",
    },
];

const items4 = [
    {
      key: "0",
      label: "전체",
    },

    {
      key: "1",
      label: "입찰",
    },
    {
      key: "2",
      label: "낙찰",
    },
];

const ProductManagement = (props) => {
    const [data, setData] = useState();
    const [categoryName, setCategoryName] = useState("전체");
    const [selectedKeys, setSelectedKeys] = useState(0);
    const [items,setItems] = useState(items1);
    const [prevProps,setPrevProps] = useState(0);
    const [pageNum, setPageNum] = useState(0);
    const [totalItemNum, setTotalItemNum] = useState(0);
    const [pageSize, setPageSize] = useState(5);

    useEffect(() => {
        console.log(props.props);
        if(props.props != prevProps){
            setCategoryName(prev => "전체");
            setPrevProps(props.props);
            setSelectedKeys(0);
        }


        // const message = {
        //     "test" : "이런거 할거면 미리 말해주지 밥먹고 올걸 ㅠㅠ",
        // };

        // let stomp_client;
        // let socket = new SockJS('https://' + "usedauction.shop" + '/chat/ws');
        // stomp_client = Stomp.over(socket);
        // stomp_client.connect({},function(){
        //     console.log('Going to subscribe ... ');
        //     stomp_client.subscribe('/sub/test', function(frame){
        //         console.log('Subscribe: Incoming message: ' + frame.body);
        //         if (frame.body) {
        //           let message = JSON.parse(frame.body);
        //           console.log('New message arrived: ' + frame.body);
        //         }
        //       }, {});
        //     stomp_client.send('/pub/hello', {}, JSON.stringify(message));
        // });

        if(props.props == 1){
            setItems(prev => items1);

            if(categoryName=="전체"){
                axios
                .get(API.PRODUCTMANAGMENT + `?page=${pageNum}&size=${pageSize}`)
                .then((response) => {
                    console.log(response.data);
                    setData(response.data.content);
                    setTotalItemNum(response.data.totalElements);
                })
                .catch((error) => {
                    console.log(error);
                });
            }
            else if(categoryName=="경매중"){
                axios
                .get(API.PRODUCTMANAGMENT + `?page=${pageNum}&size=${pageSize}&status=bid`)
                .then((response) => {
                    console.log(response.data);
                    setData(response.data.content);
                    setTotalItemNum(response.data.totalElements);
                })
                .catch((error) => {
                    console.log(error);
                });
            }
            else if(categoryName=="낙찰성공"){
                axios
                .get(API.PRODUCTMANAGMENT + `?page=${pageNum}&size=${pageSize}&status=success-bid`)
                .then((response) => {
                    console.log(response.data);
                    setData(response.data.content);
                    setTotalItemNum(response.data.totalElements);
                })
                .catch((error) => {
                    console.log(error);
                });
            }
            else if(categoryName=="낙찰실패"){
                axios
                .get(API.PRODUCTMANAGMENT + `?page=${pageNum}&size=${pageSize}&status=fail-bid`)
                .then((response) => {
                    console.log(response.data);
                    setData(response.data.content);
                    setTotalItemNum(response.data.totalElements);
                })
                .catch((error) => {
                    console.log(error);
                });
            }
            else if(categoryName=="거래성공"){
                axios
                .get(API.PRODUCTMANAGMENT + `?page=${pageNum}&size=${pageSize}&status=transaction-ok`)
                .then((response) => {
                    console.log(response.data);
                    setData(response.data.content);
                    setTotalItemNum(response.data.totalElements);
                })
                .catch((error) => {
                    console.log(error);
                });
            }
            else if(categoryName=="거래실패"){
                axios
                .get(API.PRODUCTMANAGMENT + `?page=${pageNum}&size=${pageSize}&status=transaction-fail`)
                .then((response) => {
                    console.log(response.data);
                    setData(response.data.content);
                    setTotalItemNum(response.data.totalElements);
                })
                .catch((error) => {
                    console.log(error);
                });
            }
        }
        else if(props.props == 2){
            setItems(prev => items2);

            if(categoryName=="전체"){
                axios
                .get(API.SALEHISTORY + `?page=${pageNum}&size=${pageSize}`)
                .then((response) => {
                    console.log(response.data);
                    setData(response.data.content);
                    setTotalItemNum(response.data.totalElements);
                })
                .catch((error) => {
                    console.log(error);
                });
            }
            else if(categoryName=="거래성공"){
                axios
                .get(API.SALEHISTORY + `?page=${pageNum}&size=${pageSize}&status=transaction-ok`)
                .then((response) => {
                    console.log(response.data);
                    setData(response.data.content);
                    setTotalItemNum(response.data.totalElements);
                })
                .catch((error) => {
                    console.log(error);
                });
            }
            else if(categoryName=="거래실패"){
                axios
                .get(API.SALEHISTORY + `?page=${pageNum}&size=${pageSize}&status=transaction-fail`)
                .then((response) => {
                    console.log(response.data);
                    setData(response.data.content);
                    setTotalItemNum(response.data.totalElements);
                })
                .catch((error) => {
                    console.log(error);
                });
            }
        }
        else if(props.props == 3){
            setItems(prev => items3);

            if(categoryName=="전체"){
                axios
                .get(API.BUYHISTORY + `?page=${pageNum}&size=${pageSize}`)
                .then((response) => {
                    console.log(response.data);
                    setData(response.data.content);
                    setTotalItemNum(response.data.totalElements);
                })
                .catch((error) => {
                    console.log(error);
                });
            }
            else if(categoryName=="거래성공"){
                axios
                .get(API.BUYHISTORY + `?page=${pageNum}&size=${pageSize}&status=transaction-ok`)
                .then((response) => {
                    console.log(response.data);
                    setData(response.data.content);
                    setTotalItemNum(response.data.totalElements);
                })
                .catch((error) => {
                    console.log(error);
                });
            }
            else if(categoryName=="거래실패"){
                axios
                .get(API.BUYHISTORY + `?page=${pageNum}&size=${pageSize}&status=transaction-fail`)
                .then((response) => {
                    console.log(response.data);
                    setData(response.data.content);
                    setTotalItemNum(response.data.totalElements);
                })
                .catch((error) => {
                    console.log(error);
                });
            }
        }
        else if(props.props == 4){
            setItems(prev => items4);

            if(categoryName=="전체"){
                axios
                .get(API.AUCTIONHISTORY + `?page=${pageNum}&size=${pageSize}`)
                .then((response) => {
                    console.log(response.data);
                    setData(response.data.content);
                    setTotalItemNum(response.data.totalElements);
                })
                .catch((error) => {
                    console.log(error);
                });
            }
            else if(categoryName=="입찰"){
                axios
                .get(API.AUCTIONHISTORY + `?page=${pageNum}&size=${pageSize}&status=bid `)
                .then((response) => {
                    console.log(response.data);
                    setData(response.data.content);
                    setTotalItemNum(response.data.totalElements);
                })
                .catch((error) => {
                    console.log(error);
                });
            }
            else if(categoryName=="낙찰"){
                axios
                .get(API.AUCTIONHISTORY + `?page=${pageNum}&size=${pageSize}&status=successful-bid`)
                .then((response) => {
                    console.log(response.data);
                    setData(response.data.content);
                    setTotalItemNum(response.data.totalElements);
                })
                .catch((error) => {
                    console.log(error);
                });
            }
        }
    }, [props.props, pageNum, categoryName]);

    const onClick = (key) =>{
        console.log("clicked",key);
        setCategoryName(prev => items[key.key].label);
        setSelectedKeys(key.key);
        setPageNum(0);

    };

    return (
        <div style= {basicStyle}>
            <Dropdown
                menu={{
                    items,
                    selectable: true,
                    defaultSelectedKeys: ["0"],
                    selectedKeys: [`${selectedKeys}`],
                    //onSelect,
                    onClick,
                }}
                >
                <Typography.Link>
                    <Space style={menuStyle}>
                    {categoryName}
                    <DownOutlined />
                    </Space>
                </Typography.Link>
            </Dropdown>
            <div className="list-box" style={listBoxStyle}>
                <List
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                        onChange: (page) => {
                            setPageNum(page-1);
                        },
                        align: "center",
                        current: pageNum+1,
                        total: totalItemNum,
                        pageSize:pageSize,
                    }}
                    dataSource={data}
                    renderItem={(item) => {
                        return (
                            <List.Item
                                key={item.productId}
                                extra={
                                    <img
                                        width={272}
                                        alt="logo"
                                        src={item.sigImgSrc}
                                        style={imgStyle}
                                    />
                                }
                            >
                            <List.Item.Meta
                                title={<NavLink to={`../shop-list/shop-detail/${item.productId}`} style = {titleStyle}>{item.productName}</NavLink>}
                                description={<span style = {descriptionStyle}>{item.nowPrice}</span>}
                            />
                            <span style = {listSpanStyle}>{item.status}</span>
                            <span style = {listSpanStyle}>상품등록일 : {item.createdDate}</span>
                            <span style = {listSpanStyle}>경매종료일 : {item.auctionEndDate}</span>
                            {/* <Button className="button1" type="button" style = {buttonStyle}>
                                삭제
                            </Button> */}
                            </List.Item>
                        )
                    }}
                />
            </div>
        </div>
    );
  };
  export default ProductManagement;
  
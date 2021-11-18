import { Menu, Pagination, Row, Table, Tag,Tooltip } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import EllipsisDropdown from "components/shared-components/EllipsisDropdown";
import React, { useState } from "react";
import utils from "utils";
import Moment from "react-moment";
import { toUpper } from "lodash";

import PropTypes from "prop-types";

import { connect } from "react-redux";
import {
  deleteTodo,
  setCurrent,
} from "../../redux/action/todoAction";
import { useHistory } from "react-router-dom";

const getStatusTagColor = (status) => {
  if (status === "Todo") {
    return "red";
  }
  if (status === "Research") {
    return "cyan";
  }
  if (status === "Inprogress") {
    return "green";
  } 
  if (status === "Review") {
    return "blue";
  } 
   else {
    return "gold";
  }
};

const getInnerCircleValue = (status) => {
  if (status) {
    return "Yes";
  } else {
    return "No";
  }
};

const InfluenceList = (props) => {
  const {
    todosList,
    deleteTodo,
    setCurrent,
    data,
    page,
    total,
    loading,
    onChangePage,
  } = props;
  let history = useHistory();

  const tableDropdownMenu = (row) => {
    const onDelete = () => {
      deleteTodo(row.projectId);
      console.log(`deleted row ${row.projectId}`);
    };
    const onEdit = () => {
      setCurrent(row);
      history.push(`/app/todo/list/edit/${row.projectId}`);
    };
    return (
      <Menu>
        {/* <Menu.Item key=''>
          <EyeOutlined />
          <span>View</span>
        </Menu.Item> */}
        <Menu.Item key="1" onClick={onEdit}>
          <EditOutlined />
          <span>Edit</span>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="2" onClick={onDelete}>
          <DeleteOutlined />
          <span>Delete</span>
        </Menu.Item>
      </Menu>
    );
  };

  const columns = [
    {
      title: "",
      dataIndex: "image",
      render: (_, record, i) => {
        return i <= i++ ? (
          <Avatar size="default" className={`ml-1 ant-avatar-cyan`}>
            <span className="font-weight-semibold font-size-sm">
              {utils.getNameInitial(record?.title)}
            </span>
          </Avatar>
        ) : null;
      },
    },


    {
      key: "ProjectName",
      title: "Project Name",
      dataIndex: "pname",
      render: (_, record) => {
        return <p className="mb-0">{record.title && record.title}</p>;
      },
    },
    {
      key: "status",
      title: "Status",
      dataIndex: "status",
      render: (_, record) => (
            <Tag color={getStatusTagColor(record.status && record.status)}>
              {record.status}
            </Tag>
          ),
    },
    {
      key: "name",
      title: "Assignee Name",
      dataIndex: "name",
      render: (_, record) => <p className="mb-0">{record?.owner}</p>,
    },


    {
      key: "description",
      title: "Description",
      dataIndex: "des",
      render: (_, record) => {
        return (
        <Tooltip placement="bottom" title={record.description}>
          <p className="mb-0">{record.description && record.description}</p>
          </Tooltip>);
      },
    },
 
    {
      key: "created_at",
      title: "Created Date",
      dataIndex: "created_at",
      render: (_, record) => (
        <p className="mb-0">
          <span>
            <Moment format="YYYY/MM/DD">
              {record.startDate && record.startDate}
            </Moment>
          </span>
        </p>
      ),
    },
    {
      key: "endDate",
      title: "End Date",
      dataIndex: "endDate",
      render: (_, record) => (
        <p className="mb-0">
          <span>
            <Moment format="YYYY/MM/DD">
              {record.endDate && record.endDate}
            </Moment>
          </span>
        </p>
      ),
    },
    {
      title: "",
      dataIndex: "",
      render: (_, todosList) => (
        <div className="text-right">
          <EllipsisDropdown
            menu={tableDropdownMenu(todosList && todosList)}
          />
        </div>
      ),
    },
  ];
  console.log(data.data,"data list")
  return (
    <>
      <Table
        columns={columns}
        dataSource={data.data}
        loading={loading}
        pagination={false}
      />
      <Row justify="end" className="mt-2">
        <Pagination
          defaultCurrent={page}
          current={page}
          total={total}
          onChange={onChangePage}
        />
      </Row>
    </>
  );
};

InfluenceList.prototype = {
  data: PropTypes.object.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  setCurrent: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.todo,
});

export default connect(mapStateToProps, {
  deleteTodo,
  setCurrent,
})(InfluenceList);

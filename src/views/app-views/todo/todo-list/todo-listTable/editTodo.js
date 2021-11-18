import React, { Fragment, useEffect } from 'react';
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Select,
  Switch,
  PageHeader,
  DatePicker
} from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import TextArea from 'antd/lib/input/TextArea';
import moment from "moment";
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import BgImg from '../../../../../assets/images/addcustomerbg.png';

import { updateTodo } from '../../redux/action/todoAction';




const EditTodo = (props) => {
  const {
    current,
    updateTodo,
    loading,
   
   
  } = props;
  console.log(current,"current");

  let history = useHistory();
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      owner: current.owner,
      title : current.title,
      status: current.status,
      description:current.description,
      startDate:moment(current.startDate),
      endDate: moment(current.endDate),
    });
  }, [form, current]);

  const onSubmit = (e) => {
    e.preventDefault();
    form.validateFields().then((values) => {
      const {
        owner,
        title,
        status,
        description,
        startDate,
        endDate,
      } = values;
      const updateTodoNewData = {
        projectId: current.projectId,
        owner: owner,
        title : title,
        status: status,
        description:description,
        startDate: startDate,
        endDate: endDate,
      };
      console.log(updateTodoNewData,"update data");
      updateTodo(updateTodoNewData);
      history.push('/app/todo/list');
    });
  };
  const onCancle = (e) => {
    e.preventDefault();
    history.goBack();
  };
  return (
    <Fragment>
      <PageHeader title='Edit Todo' display />
      <div className='container'>
        <Card bordered={false} style={{ width: '100%' }}>
        <Row justify="center" align="middle">
            <Col xs={24} sm={24} md={24} lg={14}>
              {/* Form */}
              <Form form={form} labelCol={{ lg: 6, md: 6 }}>
                <Form.Item label="Project Name" name="title"   required={true}>
                  <Input />
                </Form.Item>
                <Form.Item label="Assignee Name" name="owner"   required={true}>
                  <Input />
                </Form.Item>

                <Form.Item label="Status" name="status"   required={true}>
                <Select placeholder="-Select Status-" value>
                    <Select.Option value="Todo">To-Do</Select.Option>
                    <Select.Option value="Research">Research</Select.Option>
                    <Select.Option value="Inprogress">Inprogress</Select.Option>
                    <Select.Option value="Review">Review</Select.Option>
                    <Select.Option value="completed">Completed</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item>
                  <Row gutter={16}>
                    <Col xs={24} md={24} lg={12}>
                      <Form.Item label="Start Date" name="startDate"  labelCol={{ lg: 12, md: 6 }}   required={true}>
                        <DatePicker
                          // defaultValue={moment("2022-01-01", "YYYY-MM-DD")}
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={12}>
                      <Form.Item label="End Date" name="endDate" labelCol={{ lg: 12, md: 6 }}   required={true}>
                        <DatePicker
                          // defaultValue={moment("2022-01-01", "YYYY-MM-DD")}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Form.Item>

                <Form.Item
                  label="Description"
                  name="description"
                  required={true}
                
                >
                  <TextArea />
                </Form.Item>
                <Form.Item>
                  <Row gutter={16} justify="end">
                    <Col>
                      <Button htmlType="button" onClick={onCancle}>
                        Cancel
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        type="primary"
                        htmlType="submit"
                        onClick={onSubmit}
                      >
                        Add
                      </Button>
                    </Col>
                  </Row>
                </Form.Item>
              </Form>
            </Col>

            <Col
              className='bgImgOfForm'
              md={12}
              lg={10}
              style={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <img src={BgImg} alt='bgimg' width='300' className='img' />
            </Col>
          </Row>
        </Card>
      </div>
    </Fragment>
  );
};

EditTodo.prototype = {
  current: PropTypes.object.isRequired,
  updateTodo: PropTypes.func.isRequired,
  loading: PropTypes.object.isRequired,
  // todoTypeData: PropTypes.object.isRequired,
  // todoTypeLoading: PropTypes.object.isRequired,

};
const mapStateToProps = (state) => ({
  current: state.todo.current,
  loading: state.todo.loading,
  // todoTypeData: state.todoType,
  // todoTypeLoading: state.todoType.todoTypeLoading,
});
export default connect(mapStateToProps, {
  updateTodo,

})(EditTodo);

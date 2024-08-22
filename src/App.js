import React, { useState } from 'react';
import './App.css';
import { Button, Drawer, TextField, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function App() {
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [formData, setFormData] = useState({
    departmentId: '',
    departmentName: '',
    parentBranch: '',
    parentOrg: '',
    status: '',
    action: ''
  });
  const [submittedData, setSubmittedData] = useState([]);

  const handleClickOpen = (data = null) => {
    if (data) {
      setEditMode(true);
      setCurrentId(data.departmentId);
      setFormData(data);
    } else {
      setEditMode(false);
      setFormData({
        departmentId: '',
        departmentName: '',
        parentBranch: '',
        parentOrg: '',
        status: '',
        action: ''
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    if (editMode) {
      setSubmittedData(submittedData.map(data =>
        data.departmentId === currentId ? formData : data
      ));
    } else {
      setSubmittedData([...submittedData, formData]);
    }
    handleClose();
  };

  const handleDelete = (id) => {
    setSubmittedData(submittedData.filter(data => data.departmentId !== id));
  };

  return (
    <div className="container">
      <Button variant="contained" color="primary" onClick={() => handleClickOpen()}>
        + Add Branch
      </Button>
      <Drawer
        anchor="right"
        open={open}
        onClose={handleClose}
        PaperProps={{ className: 'drawerPaper' }}
      >
        <div className="drawerHeader">
          <Typography variant="h6">{editMode ? 'Edit Form' : 'Add Form'}</Typography>
          <IconButton edge="end" color="inherit" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </div>
        <div className="drawerContent">
          <TextField
            autoFocus
            margin="dense"
            name="departmentId"
            label="Department ID"
            type="text"
            fullWidth
            variant="standard"
            className="textField"
            value={formData.departmentId}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="departmentName"
            label="Department Name"
            type="text"
            fullWidth
            variant="standard"
            className="textField"
            value={formData.departmentName}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="parentBranch"
            label="Parent Branch"
            type="text"
            fullWidth
            variant="standard"
            className="textField"
            value={formData.parentBranch}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="parentOrg"
            label="Parent Org"
            type="text"
            fullWidth
            variant="standard"
            className="textField"
            value={formData.parentOrg}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="status"
            label="Status"
            type="text"
            fullWidth
            variant="standard"
            className="textField"
            value={formData.status}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="action"
            label="Action"
            type="text"
            fullWidth
            variant="standard"
            className="textField"
            value={formData.action}
            onChange={handleInputChange}
          />
          <Button onClick={handleSave} variant="contained" color="primary">
            {editMode ? 'Update' : 'Save'}
          </Button>
        </div>
      </Drawer>
      {submittedData.length > 0 && (
        <div className="submittedData">
          <Typography className="typographyTitle" variant="h6">Submitted Information:</Typography>
          <table className="dataTable">
            <thead>
              <tr>
                <th>Department ID</th>
                <th>Department Name</th>
                <th>Parent Branch</th>
                <th>Parent Org</th>
                <th>Status</th>
                <th>Action</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {submittedData.map((data) => (
                <tr key={data.departmentId}>
                  <td>{data.departmentId}</td>
                  <td>{data.departmentName}</td>
                  <td>{data.parentBranch}</td>
                  <td>{data.parentOrg}</td>
                  <td>{data.status}</td>
                  <td>{data.action}</td>
                  <td>
                    <Button onClick={() => handleClickOpen(data)}>Edit</Button>
                    <Button onClick={() => handleDelete(data.departmentId)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;
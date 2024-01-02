import { useState } from "react";
import axios from "axios";
import {
  Container,
  Button,
  Modal,
  Typography,
  Box,
  Grid,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  TableCell,
  TableHead,
  TextField,
} from "@mui/material";

const Profile = () => {
  const [openModal, setOpenModal] = useState(false);
  const [newAsset, setNewAsset] = useState("");
  const [newAssetValue, setNewAssetValue] = useState("");
  const [editAsset, setEditAsset] = useState(null);
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const handleOpenCreateModal = () => {
    setCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setCreateModalOpen(false);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevents the default form submission behavior

    const formData = new FormData(event.target);
    const assetName = formData.get("name");
    const assetValue = formData.get("value");
    const userId = "f5cd1b04-9365-4273-a2ce-5a1bce64b989"; // Replace with your actual user ID

    const assetData = {
      name: assetName,
      assetvalue: assetValue,
      userId: userId,
    };

    axios
      .post(
        "http://192.168.22.131:3003/api/v1/administration/addAsset",
        assetData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log("Asset added successfully:", response.data);
        handleCloseCreateModal(); // Close the modal after successful asset addition
      })
      .catch((error) => {
        console.error("Error adding asset:", error.message);
        // Handle errors here
      });
    handleCloseCreateModal();
  };

  const userData = {
    name: "John Doe",
    dob: "January 1, 1990",
    image: "https://via.placeholder.com/150",
  };

  const handleEdit = (asset) => {
    setEditAsset(asset); // Set the asset being edited
    setNewAsset(asset.name); // Autofill the name field in the edit modal
    setNewAssetValue(asset.value); // Autofill the value field in the edit modal
    setOpenModal(true); // Open the modal for editing
  };

  const assets = [
    { id: "1", name: "Asset 1", value: "$1000" },
    { id: "2", name: "Asset 2", value: "$2500" },
    // Add more assets as needed
  ];
  return (
    <>
      <Container
        maxWidth="sm"
        sx={{
          textAlign: "center",
          position: "absolute",
          top: "50px",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#316FF6",
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          <Typography variant="h4" gutterBottom>
            User Profile
          </Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={8}>
              <Typography variant="body1" textAlign={"center"} gutterBottom>
                Name: {userData.name}
              </Typography>
              <Typography variant="body1" textAlign={"center"} gutterBottom>
                Date of Birth: {userData.dob}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Box
                sx={{
                  backgroundColor: "#ccc",
                  height: "100px",
                  borderRadius: "50%",
                }}
              >
                <img src={userData.image} />
                Image Box
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Box
        sx={{
          textAlign: "center",
          position: "absolute",
          right: "10%",
          top: "250px",
        }}
      >
        <Button variant="contained" onClick={handleOpenCreateModal}>
          Add Asset
        </Button>
      </Box>
      <Box
        sx={{
          textAlign: "center",
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          width: "80%",
        }}
      >
        {assets.length > 0 && (
          <>
            <Typography variant="h5" gutterBottom>
              Assets
            </Typography>
            <TableContainer>
              <Table>
                <TableHead sx={{ backgroundColor: "gray" }}>
                  <TableRow>
                    <TableCell>
                      {" "}
                      <Typography
                        variant="h6"
                        textAlign={"center"}
                        gutterBottom
                      >
                        AssetName
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {" "}
                      <Typography
                        variant="h6"
                        textAlign={"center"}
                        gutterBottom
                      >
                        Value
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {" "}
                      <Typography
                        variant="h6"
                        textAlign={"center"}
                        gutterBottom
                      >
                        Update
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {assets.map((asset, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        {" "}
                        <Typography
                          variant="h6"
                          textAlign={"center"}
                          gutterBottom
                        >
                          {" "}
                          {asset.name}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {" "}
                        <Typography
                          variant="h6"
                          textAlign={"center"}
                          gutterBottom
                        >
                          {asset.value}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Button onClick={() => handleEdit(asset)}>Edit</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}

        <Modal
          open={createModalOpen}
          onClose={handleCloseCreateModal}
          aria-labelledby="create-modal-title"
          aria-describedby="create-modal-description"
        >
          <div className="form">
            <Box
              component={"form"}
              onSubmit={handleSubmit}
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                bgcolor: "white",
                border: "2px solid ",
                p: 4,
              }}
            >
              <h3 style={{ textAlign: "center" }}>Create Asset</h3>
              <div>
                <TextField
                  required
                  name="name"
                  id="filled-required"
                  label="Asset Name"
                  variant="filled"
                  onChange={(e) => setNewAsset(e.target.value)}
                />
              </div>
              <div>
                <TextField
                  required
                  name="value"
                  id="filled-required"
                  label="Asset Value"
                  type="text"
                  variant="filled"
                  onChange={(e) => setNewAssetValue(e.target.value)}
                />
              </div>

              <div className="form-btn">
                <Button type="submit" variant="outlined">
                  Submit
                </Button>
              </div>
            </Box>
          </div>
        </Modal>
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <div className="form">
            <Box
              component={"form"}
              onSubmit={handleSubmit}
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                bgcolor: "white",
                border: "2px solid ",
                p: 4,
              }}
            >
              <h3 style={{ textAlign: "center" }}>Create Asset</h3>
              <div>
                <TextField
                  required
                  name="name"
                  id="filled-required"
                  label="Asset Name"
                  variant="filled"
                  value={editAsset ? editAsset.name : ""}
                />
              </div>
              <div>
                <TextField
                  required
                  name="value"
                  id="filled-required"
                  label="Asset Value"
                  type="text"
                  variant="filled"
                  value={editAsset ? editAsset.value : ""}
                />
              </div>

              <div className="form-btn">
                <Button type="submit" variant="outlined">
                  Submit
                </Button>
              </div>
            </Box>
          </div>
        </Modal>
      </Box>
    </>
  );
};

export default Profile;

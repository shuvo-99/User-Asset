import { useEffect, useState } from "react";
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
  const [userData, setUserData] = useState("");
  const [assetsData, setAssetsData] = useState([]);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [trigger, setTrigger] = useState(false);
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleOpenCreateModal = () => {
    setCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setCreateModalOpen(false);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleDelete = (asset) => {
    // You can perform the deletion action using the assetId parameter
    const assetId = asset.id;
    console.log(assetId);
    axios
      .get(
        `http://192.168.22.131:3003/api/v1/administration/deleteAsset/${assetId}`
      )
      .then((response) => {
        console.log("Asset deleted successfully:", response.data);
        // After deletion, you might want to update the assets list by fetching it again
        const userId = "f5cd1b04-9365-4273-a2ce-5a1bce64b989"; // Replace with the actual user ID
        axios
          .get(
            `http://192.168.22.131:3003/api/v1/administration/getAssetListByUser/${userId}`
          )
          .then((res) => {
            const assetDataFromAPI = res.data._value; // Retrieve asset data from API response
            setAssetsData(assetDataFromAPI); // Set asset data in state after deletion
            console.log("Asset Data after deletion:", assetDataFromAPI); // Log the asset data
          })
          .catch((error) => {
            console.error("Error fetching asset data:", error.message);
            // Handle errors here
          });
      })
      .catch((error) => {
        console.error("Error deleting asset:", error.message);
        // Handle errors here
      });
  };

  const fetchAssetsFromapi = () => {
    const userId = "f5cd1b04-9365-4273-a2ce-5a1bce64b989"; // Replace with the actual user ID
    axios
      .get(
        `http://192.168.22.131:3003/api/v1/administration/getAssetListByUser/${userId}`
      )
      .then((res) => {
        const assetDataFromAPI = res.data._value; // Retrieve asset data from API response
        setAssetsData(assetDataFromAPI); // Set asset data in state
        // console.log("Asset Data:", assetDataFromAPI); // Log the asset data
      })
      .catch((error) => {
        console.error("Error fetching asset data:", error.message);
        // Handle errors here
      });
  };

  const handleEditSubmit = (event, asset) => {
    event.preventDefault(); // Prevents the default form submission behavior

    const formData = new FormData(event.target);
    const assetName = formData.get("name");
    const assetValue = formData.get("value");
    const userId = "f5cd1b04-9365-4273-a2ce-5a1bce64b989";
    const assetId = asset.id; // Replace with your actual user ID

    console.log(assetId);
    const assetData = {
      name: assetName,
      assetvalue: assetValue,
      userId: userId,
    };

    axios
      .post(
        `http://192.168.22.131:3003/api/v1/administration/addAsset/${assetId}`, // Use the correct endpoint for updating an asset
        assetData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log("Asset updated successfully:", response.data);
        fetchAssetsFromapi(); // Call the function to fetch assets after updating
        handleCloseModal(); // Close the modal after successful asset update
      })
      .catch((error) => {
        console.error("Error updating asset:", error.message);
        // Handle errors here
      });
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
        // Update assetsData state after successful addition
        setAssetsData((prevAssets) => [...prevAssets, response.data]);
        handleCloseCreateModal(); // Close the modal after successful asset addition
      })
      .catch((error) => {
        console.error("Error adding asset:", error.message);
        // Handle errors here
      });

    // const userId = "f5cd1b04-9365-4273-a2ce-5a1bce64b989"; // Replace with the actual user ID
    axios
      .get(
        `http://192.168.22.131:3003/api/v1/administration/getAssetListByUser/${userId}`
      )
      .then((res) => {
        const assetDataFromAPI = res.data._value; // Retrieve asset data from API response
        setAssetsData(assetDataFromAPI); // Set asset data in state
        // console.log("Asset Data:", assetDataFromAPI); // Log the asset data
      })
      .catch((error) => {
        console.error("Error fetching asset data:", error.message);
        // Handle errors here
      });
    setTrigger(!trigger);
    handleCloseCreateModal();
  };

  useEffect(() => {
    const userId = "f5cd1b04-9365-4273-a2ce-5a1bce64b989"; // Replace with the actual user ID
    axios
      .get(
        `http://192.168.22.131:3003/api/v1/administration/getUserProfile/${userId}`
      )
      .then((res) => {
        const userDataFromAPI = res.data._value; // Retrieve user data from API response
        setUserData(userDataFromAPI); // Set user data in state
        // console.log("User Data:", userDataFromAPI); // Log the first name
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error.message);
        // Handle errors here
      });
  }, []); // Empty dependency array ensures it runs once after the first render
  useEffect(() => {
    fetchAssetsFromapi();
  }, [trigger]);

  //   console.log("first");
  useEffect(() => {
    // const userId = "f5cd1b04-9365-4273-a2ce-5a1bce64b989"; // Replace with the actual user ID
    axios
      .get(`http://192.168.22.131:3003/api/v1/administration/getUserList`)
      .then((res) => {
        // console.log(res);
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error.message);
        // Handle errors here
      });
  }, []);

  const handleEdit = (asset) => {
    setEditAsset(asset); // Set the asset being edited
    setNewAsset(asset.name); // Autofill the name field in the edit modal
    setNewAssetValue(asset.value); // Autofill the value field in the edit modal
    setOpenModal(true); // Open the modal for editing
  };

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
                Name: {userData.firstName} {userData.lastName}
              </Typography>
              <Typography variant="body1" textAlign={"center"} gutterBottom>
                Date of Birth: {userData.dateOfBirth}
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
                <img src={userData.profileImage} />
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
        {assetsData.length > 0 && (
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
                    <TableCell>
                      {" "}
                      <Typography
                        variant="h6"
                        textAlign={"center"}
                        gutterBottom
                      >
                        Delete
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {assetsData.map((asset, index) => (
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
                          {asset.assetvalue}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Button onClick={() => handleEdit(asset)}>Edit</Button>
                      </TableCell>
                      <TableCell>
                        <Button onClick={() => handleDelete(asset)}>
                          Delete
                        </Button>
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
              onSubmit={handleEditSubmit}
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
              <h3 style={{ textAlign: "center" }}>Edit Asset</h3>
              <div>
                <TextField
                  required
                  name="name"
                  id="filled-required"
                  label="Asset Name"
                  variant="filled"
                  type="text"
                  value={editAsset ? editAsset.name : ""}
                  onChange={(e) =>
                    setEditAsset((prevAsset) => ({
                      ...prevAsset,
                      name: e.target.value,
                    }))
                  }
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
                  value={editAsset ? editAsset.assetvalue : ""}
                  onChange={(e) =>
                    setEditAsset((prevAsset) => ({
                      ...prevAsset,
                      assetvalue: e.target.value,
                    }))
                  }
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

import { useState } from "react";
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
} from "@mui/material";

const Profile = () => {
  const [openModal, setOpenModal] = useState(false);
  const [newAsset, setNewAsset] = useState("");
  const [newAssetValue, setNewAssetValue] = useState("");
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const userData = {
    name: "John Doe",
    dob: "January 1, 1990",
    image: "https://via.placeholder.com/150",
  };
  const handleAddAsset = () => {
    console.log("New Asset:", newAsset, "Value:", newAssetValue);

    setNewAsset("");
    setNewAssetValue("");
    setOpenModal(false);
  };

  const assets = [
    { name: "Asset 1", value: "$1000" },
    { name: "Asset 2", value: "$2500" },
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
        <Button variant="contained" onClick={handleOpenModal}>
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
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "white",
              border: "2px solid #000",
              p: 4,
            }}
          >
            <Typography variant="h6" id="modal-title" gutterBottom>
              Modal Title
            </Typography>
            <Typography variant="body1" id="modal-description">
              This is a modal dialog. You can put your content here.
            </Typography>
            <Button
              variant="contained"
              onClick={handleCloseModal}
              sx={{ marginTop: "20px" }}
            >
              Close Modal
            </Button>
          </Box>
        </Modal>
      </Box>
    </>
  );
};

export default Profile;

import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { fetchDataFromApi } from "../../utils/api";
import { useState } from "react";
import { useEffect } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);
export default function Order({ id }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchDataFromApi(`/single/orders/${id}`)
      .then((res) => {
        setProduct(res);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  return (
    <div>
      <Button
        onClick={handleOpen}
        style={{ color: "white", backgroundColor: "green" }}
      >
        View
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography variant="h5" component="div">
                Order Details
              </Typography>
              <Typography
                sx={{ fontSize: 16 }}
                color="text.secondary"
                gutterBottom
              >
                DeliveryStatus: {product.delivery_status}
              </Typography>

              <Typography variant="h5" component="div">
                Product Details
              </Typography>

              <Typography variant="h6" component="div">
                Total Price: ${(product.total / 100).toLocaleString()}
              </Typography>

              <Typography
                sx={{ fontSize: 16, paddingLeft: 2 }}
                color="text.secondary"
                gutterBottom
              >
                <p>{product.shipping?.name}</p>
                <p>{product.shipping?.address.city}</p>
                <p>{product.shipping?.email}</p>
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Modal>
    </div>
  );
}

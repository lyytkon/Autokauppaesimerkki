import { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  TextField,
} from "@mui/material";

type CarForm = {
  brand: string;
  model: string;
  color: string;
  fuel: string;
  year: number | "";
  price: number | "";
};

const API = "https://car-rest-service-carshop.2.rahtiapp.fi";

export default function AddCar({ onAdded }: { onAdded?: () => void }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<CarForm>({
    brand: "",
    model: "",
    color: "",
    fuel: "",
    year: "",
    price: "",
  });
  const [saving, setSaving] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    if (!saving) setOpen(false);
  };

  const handleChange =
    (field: keyof CarForm) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (field === "year" || field === "price") {
        setForm((f) => ({ ...f, [field]: value === "" ? "" : Number(value) }));
      } else {
        setForm((f) => ({ ...f, [field]: value }));
      }
    };

  const handleSave = async () => {
    if (
      !form.brand ||
      !form.model ||
      !form.color ||
      !form.fuel ||
      form.year === "" ||
      form.price === ""
    ) {
      alert("Täytä kaikki kentät.");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch(`${API}/cars`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        // Huom: API odottaa kenttää "year" (ei "modelYear")
        body: JSON.stringify({
          brand: form.brand,
          model: form.model,
          color: form.color,
          fuel: form.fuel,
          year: form.year,
          price: form.price,
        }),
      });
      if (!res.ok) throw new Error(`Error adding car: ${res.status} ${res.statusText}`);

      // Tyhjennä ja sulje
      setForm({ brand: "", model: "", color: "", fuel: "", year: "", price: "" });
      setOpen(false);
      onAdded?.();
    } catch (e) {
      console.error(e);
      alert("Lisäys epäonnistui.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box sx={{ mb: 1 }}>
      <Button variant="outlined" onClick={handleOpen}>
        Add car
      </Button>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>New Car</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Brand"
              value={form.brand}
              onChange={handleChange("brand")}
              autoFocus
            />
            <TextField
              label="Model"
              value={form.model}
              onChange={handleChange("model")}
            />
            <TextField
              label="Color"
              value={form.color}
              onChange={handleChange("color")}
            />
            <TextField
              label="Fuel"
              value={form.fuel}
              onChange={handleChange("fuel")}
            />
            <TextField
              label="Year"
              type="number"
              value={form.year}
              onChange={handleChange("year")}
              inputProps={{ min: 1900 }}
            />
            <TextField
              label="Price"
              type="number"
              value={form.price}
              onChange={handleChange("price")}
              inputProps={{ min: 0, step: 1 }}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={saving}>
            CANCEL
          </Button>
          <Button onClick={handleSave} disabled={saving}>
            SAVE
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
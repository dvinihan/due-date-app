import {
  Box,
  Button,
  Container,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import Link from "next/link";
import { useState } from "react";

export const NavDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Box sx={{ position: "absolute" }}>
      <Button onClick={handleOpen} variant="contained">
        Menu
      </Button>
      <Drawer open={isOpen} onClose={handleClose}>
        <List>
          <ListItem>
            <Link href="/" onClick={handleClose}>
              <ListItemText primary="Calendar" />
            </Link>
          </ListItem>
          <ListItem>
            <Link href="/newGuess" onClick={handleClose}>
              <ListItemText primary="New Guess" />
            </Link>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
};

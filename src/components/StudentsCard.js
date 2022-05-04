import React, { Fragment } from "react";
import {
  Button,
  Card,
  CardContent,
  CardActions,
  Avatar,
  Grid,
  Chip,
  Typography,
  styled,
  Paper,
  Divider,
} from "@mui/material";
import { Link } from "react-router-dom";

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default function StudentsCard({ student, index }) {
  return (
    <Fragment>
      <Grid mb={8} item xs={12} sm={12} md={4} lg={4} key={student.id}>
        <Card
          sx={{
            overflow: "visible",
            border: "5px solid #1976D2",
            height: "350px",
          }}
        >
          <CardContent>
            <Avatar
              sx={{
                border: "5px solid #1976D2",
                height: "150px",
                width: "150px",
                margin: "-100px auto 0 auto",
              }}
              src={student.imgLink}
            />
            <Typography gutterBottom variant="h5" align="center">
              {student.name}
            </Typography>
            <Divider
              sx={{
                mb: 2,
                "&::before, &::after": {
                  borderColor: "primary.main",
                },
              }}
            >
              <Chip label="Interests" color="primary" />
            </Divider>
            <Paper
              elevation={2}
              sx={{
                display: "flex",
                flexWrap: "wrap",
                listStyle: "none",
                pt: 1.5,
                pb: 1.5,
                m: 0,
                border: "2px solid #1976D2",
              }}
              component="ul"
            >
              {student.interests?.map((student, index) => (
                <Grid item key={index}>
                  <ListItem key={student}>
                    <Chip
                      variant="outlined"
                      color="info"
                      size="small"
                      label={student}
                    />
                  </ListItem>
                </Grid>
              ))}
            </Paper>
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              component={Link}
              to={`/${student.level.toLowerCase()}s/${index}`}
            >
              View Profile
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Fragment>
  );
}

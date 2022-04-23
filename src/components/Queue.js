import React from "react";
import PropTypes from "prop-types";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionActions from "@mui/material/AccordionActions";
import Card from "@mui/material/Card";
import Modal from "@mui/material/Modal";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LinkIcon from "@mui/icons-material/Link";
import PersonIcon from "@mui/icons-material/Person";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import StarIcon from "@mui/icons-material/Star";
import EngineeringIcon from "@mui/icons-material/Engineering";
import SettingsIcon from "@mui/icons-material/Settings";
import InfoIcon from "@mui/icons-material/Info";
import { styled } from "@mui/material/styles";
import { Button, Chip, Grid, Avatar, Paper, Box } from "@mui/material";

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

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

export default function Queue({
  csiEmail,
  portfolio,
  expanded,
  handleExpand,
  id,
  name,
  level,
  bio,
  emplid,
  imgLink,
  skills,
  projects,
  interests,
  linkedin,
  github,
  onApprove,
  onDecline,
}) {
  const [open, setOpen] = React.useState(false);
  const handlePromptOpen = () => setOpen(true);
  const handlePromptClose = () => setOpen(false);
  return (
    <Accordion
      expanded={expanded === `panel${id}`}
      onChange={handleExpand(`panel${id}`)}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`panel${id}bh-content`}
        id={`panel${id}bh-header`}
      >
        <Typography sx={{ width: "33%", flexShrink: 0 }}>{name}</Typography>
        <Typography sx={{ color: "text.secondary" }}>
          {emplid} &bull; {level}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container sx={{ mb: 2 }}>
          <Grid item xs={3} sm={2} md={1}>
            <Chip
              icon={<TagFacesIcon />}
              label="Image"
              color="primary"
              sx={{ mr: 2 }}
            />
          </Grid>
          <Grid item xs={9} sm={10} md={11}>
            <Avatar sx={{ width: 200, height: 200 }} src={imgLink} />
          </Grid>
        </Grid>
        <Grid container sx={{ mb: 2 }}>
          <Grid item xs={3} sm={2} md={1}>
            <Chip
              icon={<LinkIcon />}
              label="Links"
              color="info"
              sx={{ mr: 2 }}
            />
          </Grid>
          <Grid item xs={9} sm={10} md={11}>
            <Paper
              elevation={0}
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                flexWrap: "wrap",
                listStyle: "none",
                p: 0.5,
                m: 0,
              }}
              component="ul"
            >
              <ListItem>
                <Chip
                  rel="noopener noreferrer"
                  target="_blank"
                  href={linkedin}
                  component="a"
                  clickable
                  icon={<LinkedInIcon />}
                  label="LinkedIn"
                  disabled={!linkedin}
                />
              </ListItem>
              <ListItem>
                <Chip
                  rel="noopener noreferrer"
                  target="_blank"
                  href={github}
                  component="a"
                  clickable
                  icon={<GitHubIcon />}
                  label="GitHub"
                  disabled={!github}
                />
              </ListItem>
              <ListItem>
                <Chip
                  rel="noopener noreferrer"
                  target="_blank"
                  href={portfolio}
                  component="a"
                  clickable
                  icon={<PersonIcon />}
                  label="Portfolio"
                  disabled={!portfolio}
                />
              </ListItem>
            </Paper>
          </Grid>
        </Grid>
        <Grid container sx={{ mb: 2 }}>
          <Grid item xs={3} sm={2} md={1}>
            <Chip
              icon={<AlternateEmailIcon />}
              label="Email"
              color="success"
              sx={{ mr: 2 }}
            />
          </Grid>
          <Grid item xs={9} sm={10} md={11}>
            <Typography>{csiEmail}</Typography>
          </Grid>
        </Grid>
        <Grid container sx={{ mb: 2 }}>
          <Grid item xs={3} sm={2} md={1}>
            <Chip
              icon={<InfoIcon />}
              label="Bio"
              color="success"
              sx={{ mr: 2 }}
            />
          </Grid>
          <Grid item xs={9} sm={10} md={11}>
            <Typography>{bio}</Typography>
          </Grid>
        </Grid>
        <Grid container sx={{ mb: 2 }}>
          <Grid item xs={3} sm={2} md={1}>
            <Chip
              icon={<EngineeringIcon />}
              label="Projects"
              color="warning"
              sx={{ mr: 2 }}
            />
          </Grid>
          <Grid item xs={9} sm={10} md={11}>
            <Grid container spacing={2}>
              {projects?.map((project, index) => (
                <Grid key={index} item xs={12} sm={12} md={3} lg={3}>
                  <Card>
                    <CardContent>
                      <Typography sx={{ fontSize: 18 }} gutterBottom>
                        {project.name}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        disabled={!project.projectLink}
                        rel="noopener noreferrer"
                        target="_blank"
                        component="a"
                        href={project.projectLink}
                        size="small"
                      >
                        GitHub Link
                      </Button>
                      <Button
                        rel="noopener noreferrer"
                        target="_blank"
                        component="a"
                        href={project.deployedLink}
                        disabled={project.isDeployed ? false : true}
                        size="small"
                      >
                        Deployed Link
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
        <Grid container sx={{ mb: 2 }}>
          <Grid item xs={3} sm={2} md={1}>
            <Chip
              icon={<SettingsIcon />}
              label="Skills"
              color="error"
              sx={{ mr: 2 }}
            />
          </Grid>
          <Grid item xs={9} sm={10} md={11}>
            <Paper
              elevation={0}
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                flexWrap: "wrap",
                listStyle: "none",
                p: 0.5,
                m: 0,
              }}
              component="ul"
            >
              {skills?.map((skill, index) => (
                <ListItem key={index}>
                  <Chip label={skill} />
                </ListItem>
              ))}
            </Paper>
          </Grid>
        </Grid>
        <Grid container sx={{ mb: 2 }}>
          <Grid item xs={3} sm={2} md={1}>
            <Chip
              icon={<StarIcon />}
              label="Interests"
              color="error"
              sx={{ mr: 2 }}
            />
          </Grid>
          <Grid item xs={9} sm={10} md={11}>
            <Paper
              elevation={0}
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                flexWrap: "wrap",
                listStyle: "none",
                p: 0.5,
                m: 0,
              }}
              component="ul"
            >
              {interests?.map((interest, index) => (
                <ListItem key={index}>
                  <Chip label={interest} />
                </ListItem>
              ))}
            </Paper>
          </Grid>
        </Grid>
      </AccordionDetails>
      <AccordionActions>
        <Button
          onClick={() => onApprove(id)}
          variant="contained"
          color="success"
        >
          Approve
        </Button>
        <Button
          sx={{ ml: 1 }}
          component="a"
          target="_blank"
          href={`mailto:${csiEmail}`}
          variant="contained"
          color="primary"
        >
          Feedback
        </Button>
        <Button onClick={handlePromptOpen} variant="outlined" color="error">
          Decline
        </Button>
        <Modal
          keepMounted
          open={open}
          onClose={handlePromptClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Are you sure you want to decline this student?
            </Typography>
            <Button
              onClick={() => onDecline(id)}
              varaint="contained"
              color="error"
            >
              Yes
            </Button>
            <Button
              onClick={handlePromptClose}
              varaint="contained"
              color="success"
            >
              No
            </Button>
          </Box>
        </Modal>
      </AccordionActions>
    </Accordion>
  );
}

Queue.propTypes = {
  onDecline: PropTypes.func.isRequired,
  onApprove: PropTypes.func.isRequired,
  csiEmail: PropTypes.string.isRequired,
  portfolio: PropTypes.string,
  linkedin: PropTypes.string.isRequired,
  github: PropTypes.string.isRequired,
  expanded: PropTypes.string.isRequired,
  handleExpand: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  level: PropTypes.string.isRequired,
  bio: PropTypes.string.isRequired,
  emplid: PropTypes.string.isRequired,
  imgLink: PropTypes.string.isRequired,
  skills: PropTypes.array.isRequired,
  projects: PropTypes.array.isRequired,
  interests: PropTypes.array.isRequired,
};

import React from "react";
import { LinkContainer } from "react-router-bootstrap";
// import { Card, Col, Row } from "react-bootstrap";
import { Card, CardActionArea, CardActions, CardContent, IconButton, makeStyles, Typography } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    display: "flex",
    border: "5px solid orange",
    "&:hover": {
      color: "unset",
      textDecoration: "none",
      marginTop: "0",
      marginBottom: "10px"
    }
  },
  title: {
    // fontSize: 48,
    fontWeight: "bold"
  },
  pos: {
    marginBottom: 12
  },
  cardActions: {
    width: "100%"
  },
  cardActionsContent: {
    float: "right"
  }
});

function LandingPageCard(props) {
  const classes = useStyles();
  const { url, recipe, onCardSelect } = props;
  return (
    <Card component={RouterLink} to={`${url}/${recipe.id}`} className={classes.root} variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h2" className={classes.title} color="textSecondary" gutterBottom>
          {recipe.name}
        </Typography>
      </CardContent>
      <span className={classes.cardActions}>
      <CardActions className={classes.cardActionsContent}>
        <IconButton aria-label="delete recipe">
          <DeleteIcon onClick={(e) => e.preventDefault()} />
        </IconButton>
      </CardActions>
        </span>
    </Card>
  );
  // return (
  //   <Card className="recipe-card">
  //     <LinkContainer to={`${url}/${recipe.id}`}>
  //       <button className="recipe-card-button">
  //         <Row>
  //           <Col>
  //             <Row>
  //               <Col className="recipe-card-checkbox-col">
  //                 <input
  //                   className="recipe-card-checkbox"
  //                   type="checkbox"
  //                   onClick={(e) => onCardSelect(e, recipe.id)}
  //                 />
  //               </Col>
  //             </Row>
  //             <Row>
  //               <Col>
  //                 <Card.Body className="recipe-card-body">
  //                   <Card.Title className="recipe-card-title">
  //                     {recipe.name}
  //                   </Card.Title>
  //                 </Card.Body>
  //               </Col>
  //             </Row>
  //           </Col>
  //         </Row>
  //       </button>
  //     </LinkContainer>
  //   </Card>
  // );
}

export default LandingPageCard;

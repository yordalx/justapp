import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

export default function SearchBar() {
  const [foodRecipes, setFoodRecipes] = useState([]);
  const [searchRecipe, setSearchRecipe] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const APP_KEY = "d0fb33a78bd1267b2d901f91e71a10a2";
  const APP_ID = "d523b2c4";

  useEffect(() => {
    const getRecipesFunction = async () => {
      const response = await fetch(
        `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_KEY}`
      );
      const data = await response.json();
      setFoodRecipes(data.hits);
    };

    getRecipesFunction();
  }, [searchQuery]);

  const updateSearchFunction = (e) => {
    setSearchRecipe(e.target.value);
  };

  const getSearchFunction = (e) => {
    e.preventDefault();
    if (searchRecipe.trim()) {
      setSearchQuery(searchRecipe);
      setSearchRecipe("");
    }
  };

  return (
    <Container>
      <Box
        component="form"
        onSubmit={getSearchFunction}
        sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}
      >
        <TextField
          label="Search Recipe"
          variant="outlined"
          value={searchRecipe}
          onChange={updateSearchFunction}
          sx={{ marginRight: 2 }}
        />
        <Button type="submit" variant="contained" color="primary">
          Search
        </Button>
      </Box>

      <Box
        sx={{
          marginTop: 4,
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          justifyContent: "center",
        }}
      >
        {foodRecipes.length > 0 ? (
          foodRecipes.map((recipe, index) => (
            <Card key={index} sx={{ maxWidth: 345 }}>
              <CardMedia
                sx={{ height: 140 }}
                image={recipe.recipe.image}
                title={recipe.recipe.label}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {recipe.recipe.label}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {recipe.recipe.source}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" href={recipe.recipe.url} target="_blank">
                  Learn More
                </Button>
              </CardActions>
            </Card>
          ))
        ) : (
          <Typography variant="h6" component="div">
            No recipes found. Please try a different search query.
          </Typography>
        )}
      </Box>
    </Container>
  );
}

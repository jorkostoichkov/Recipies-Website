$(function() {
  const recipes = [
    {
      title: "Такос",
      calories: 350,
      type: "main",
      description: "Традиционно мексиканско ястие",
      image:
        "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Zm9vZCUyMHRhY29zfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
    },
    {
      title: "Фрнески тост с боровинки",
      calories: 450,
      type: "breakfast",
      description: "Традиционна френска закуска",
      image:
        "https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8YnJlYWtmYXN0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
    },
    {
      title: "Здравословна закуска",
      calories: 250,
      type: "breakfast",
      description: "Здравословна закуска с плодове и ядки",
      image:
        "https://images.unsplash.com/photo-1542691457-cbe4df041eb2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8YnJlYWtmYXN0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
    },
    {
      title: "Пица",
      calories: 260,
      type: "main",
      description: "Традиционно италианско ястие",
      image:
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      title: "Сандвич",
      calories: 320,
      type: "breakfast",
      description: "Неустоим тост с авокадо и яйца",
      image:
        "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=653&q=80"
    },
    {
      title: "Паста",
      calories: 130,
      type: "main",
      description: "Прясна паста по домашна рецепта",
      image:
        "https://images.unsplash.com/photo-1560788784-66eda82b5eb7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
    },
    {
      title: "Тирамису",
      calories: 150,
      type: "dessert",
      description: "Традиционен италиански десерт",
      image:
        "https://images.unsplash.com/photo-1542326213507-6d479d02d80b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fHRpcmFtaXN1fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
    },
    {
      title: "Шоколадов кекс",
      calories: 400,
      type: "dessert",
      description: "Вкусен шоколадов кекс",
      image:
        "https://images.unsplash.com/photo-1541783245831-57d6fb0926d3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8Y2hvY29sYXRlJTIwY2FrZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
    },
    {
      title: "Торта",
      calories: 450,
      type: "dessert",
      description: "Домашно приготвена торта",
      image:
        "https://images.unsplash.com/photo-1551879400-111a9087cd86?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjIxMTIzfQ&auto=format&fit=crop&w=500&q=60"
    }
  ];

  // render cards from array
  const $recipesList = $('#recipes-list');
  const $recipeTemplate = $('#recipe-template');
  function renderRecipes(recipesArray = []) {
    $recipesList.html('');

    recipesArray.forEach(recipe => {
      const templateClone = $recipeTemplate.clone();
      templateClone.attr('id', '');
      templateClone.removeClass('d-none');
      templateClone.find('.card-title').text(recipe.title);
      templateClone.find('.card-description').text(recipe.description);
      templateClone.find('.card-calories').text(recipe.calories + ' kcal');
      templateClone.find('.card-img').attr('src', recipe.image);

      $recipesList.append(templateClone);
    });
  }
  renderRecipes(recipes);

  // add recipe form and hide modal
  const $addModal = $('#addModal');
  const $addForm = $('#add-recipe-form');
  $addForm.submit(function (event) {
    event.preventDefault();
    const newRecipeTitle = $addForm.find('input[name=title]').val();
    const newRecipeImage = $addForm.find('input[name=image]').val();
    const newRecipeCalories = $addForm.find('input[name=calories]').val();
    const newRecipeType = $addForm.find('select[name=type]').val();
    const newRecipeDescription = $addForm.find('textarea[name=description]').val();

    const newRecipe = {
      title: newRecipeTitle,
      image: newRecipeImage,
      calories: parseInt(newRecipeCalories),
      type: newRecipeType,
      description: newRecipeDescription
    };

    recipes.unshift(newRecipe);
    renderRecipes(recipes);

    $addForm[0].reset();
    $addModal.modal('hide');
  });

  // filter by type
  const $recipeTypeSelect = $('#food-type');
  $recipeTypeSelect.change(function () {
    const type = $recipeTypeSelect.val();
    if (type) {
      const filteredRecipes = recipes.filter(r => r.type === type);
      renderRecipes(filteredRecipes);
    } else {
      renderRecipes(recipes);
    }
  });

  // calories range
  const $sliderRange = $( "#slider-range" );
  const $amount = $('#amount');
  const maxCalories = 450;
  $sliderRange.slider({
    range: true,
    min: 0,
    max: maxCalories,
    values: [0, maxCalories],
    slide: function (event, ui) {
      $amount.text(ui.values[0] + " - " + ui.values[1]);
    },
    change: function (event, ui) {
      // const min = ui.values[0];
      // const max = ui.values[1];
      const [min, max] = ui.values;
      const filteredRecipes = recipes.filter(r => r.calories >= min && r.calories <= max);
      renderRecipes(filteredRecipes);
    }
  });
  $amount.text($sliderRange.slider( "values", 0 ) + " - " + $sliderRange.slider( "values", 1 ) );
  
  // happy coding

});

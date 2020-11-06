function EnableOrDisable(commentText) {
  // Reference the Button
  var btnComment = document.getElementById("btnComment");

  // Verify the textField value.
  if (commentText.value.trim() !== "") {
    // Enable the textField when textField has value.
    btnComment.disabled = false;
  } else {
    // Disabled the textField when textField has empty.
    btnComment.disabled = true;
  }
}

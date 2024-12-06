"use client";

import { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

type Answer = {
  id: number;
  content: string;
};

type Question = {
  id: number;
  content: string;
  answers: Answer[];
};

const QuestionsPage = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [editingAnswerId, setEditingAnswerId] = useState<number | null>(null); // Track answer being edited
  const [editingQuestionId, setEditingQuestionId] = useState<number | null>(
    null
  ); // Track question being edited
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false); // State to control the modal visibility
  const [answerToDelete, setAnswerToDelete] = useState<{
    questionId: number;
    answerId: number;
  } | null>(null); // Track which answer is selected for deletion
  const [questionToDelete, setQuestionToDelete] = useState<number | null>(null); // Track which question is selected for deletion

  // Adicionar uma nova pergunta
  const handleAddQuestion = () => {
    if (newQuestion.trim()) {
      setQuestions((prev) => [
        { id: prev.length + 1, content: newQuestion, answers: [] },
        ...prev, // Adiciona a nova pergunta no início
      ]);
      setNewQuestion("");
    }
  };

  // Adicionar uma resposta à pergunta
  const handleAddAnswer = (questionId: number) => {
    const answerContent = answers[questionId];
    if (answerContent && answerContent.trim()) {
      setQuestions((prevQuestions) =>
        prevQuestions.map((question) =>
          question.id === questionId
            ? {
                ...question,
                answers: [
                  ...question.answers,
                  {
                    id: question.answers.length + 1,
                    content: answerContent,
                  },
                ],
              }
            : question
        )
      );
      setAnswers((prevAnswers) => ({ ...prevAnswers, [questionId]: "" })); // Limpar resposta após adicionar
    }
  };

  // Função para editar uma resposta
  const handleEditAnswer = (questionId: number, answerId: number) => {
    const answer = questions
      .find((q) => q.id === questionId)
      ?.answers.find((a) => a.id === answerId);

    if (answer) {
      setAnswers((prevAnswers) => ({
        ...prevAnswers,
        [questionId]: answer.content, // Carregar a resposta no campo de edição
      }));
      setEditingAnswerId(answerId); // Marcar como resposta em edição
    }
  };

  // Função para confirmar a edição de uma resposta
  const handleConfirmEditAnswer = (questionId: number) => {
    const updatedAnswerContent = answers[questionId];
    if (updatedAnswerContent && updatedAnswerContent.trim()) {
      setQuestions((prevQuestions) =>
        prevQuestions.map((question) =>
          question.id === questionId
            ? {
                ...question,
                answers: question.answers.map((answer) =>
                  answer.id === editingAnswerId
                    ? { ...answer, content: updatedAnswerContent } // Atualizar a resposta
                    : answer
                ),
              }
            : question
        )
      );
      setAnswers((prevAnswers) => ({ ...prevAnswers, [questionId]: " " }));
      setEditingAnswerId(null); // Limpar estado de edição
    }
  };

  // Função para editar a pergunta
  const handleEditQuestion = (questionId: number) => {
    const question = questions.find((q) => q.id === questionId);
    if (question) {
      setNewQuestion(question.content); // Carregar o conteúdo da pergunta no campo de edição
      setEditingQuestionId(questionId); // Marcar como pergunta em edição
    }
  };

  // Função para confirmar a edição de uma pergunta
  const handleConfirmEditQuestion = () => {
    if (newQuestion.trim() && editingQuestionId !== null) {
      setQuestions((prevQuestions) =>
        prevQuestions.map((question) =>
          question.id === editingQuestionId
            ? { ...question, content: newQuestion } // Atualizar a pergunta
            : question
        )
      );
      setNewQuestion(""); // Limpar campo de edição
      setEditingQuestionId(null); // Limpar estado de edição
    }
  };

  // Apagar uma resposta
  const handleDeleteAnswer = () => {
    if (answerToDelete) {
      setQuestions((prevQuestions) =>
        prevQuestions.map((question) =>
          question.id === answerToDelete.questionId
            ? {
                ...question,
                answers: question.answers.filter(
                  (answer) => answer.id !== answerToDelete.answerId
                ), // Remover a resposta
              }
            : question
        )
      );
      setAnswerToDelete(null); // Limpar estado após exclusão
      setOpenDeleteDialog(false); // Fechar modal
    }
  };

  // Apagar uma pergunta
  const handleDeleteQuestion = () => {
    if (questionToDelete !== null) {
      setQuestions(
        (prevQuestions) =>
          prevQuestions.filter((question) => question.id !== questionToDelete) // Remover a pergunta e suas respostas
      );
      setQuestionToDelete(null); // Limpar estado após exclusão
      setOpenDeleteDialog(false); // Fechar modal
    }
  };

  // Cancelar a exclusão e fechar o modal
  const handleCancelDelete = () => {
    setAnswerToDelete(null); // Limpar estado
    setQuestionToDelete(null); // Limpar estado
    setOpenDeleteDialog(false); // Fechar modal
  };

  // Atualizar a resposta de uma pergunta específica
  const handleAnswerChange = (questionId: number, value: string) => {
    setAnswers((prevAnswers) => ({ ...prevAnswers, [questionId]: value }));
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        bgcolor: "#121212",
        color: "#ffffff",
        minHeight: "100vh",
        padding: 4,
      }}
    >
      <Typography variant="h4" align="center" sx={{ mb: 4 }}>
        Perguntas
      </Typography>

      {/* Adicionar nova pergunta */}
      <TextField
        label="Faça uma pergunta"
        variant="outlined"
        fullWidth
        value={newQuestion}
        onChange={(e) => setNewQuestion(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleAddQuestion();
          }
        }}
        sx={{
          input: { color: "#ffffff" }, // Garantir que o texto digitado seja branco
          ".MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#ffffff", // Cor da borda
            },
            "&:hover fieldset": {
              borderColor: "#ff6f00", // Cor da borda ao passar o mouse
            },
            "&.Mui-focused fieldset": {
              borderColor: "#ff6f00", // Cor da borda quando em foco
            },
          },
          style: { color: "#ffffff" },
          mb: 2,
        }}
      />

      {/* Renderizar perguntas */}
      <List>
        {questions.map((question) => (
          <ListItem
            key={question.id}
            sx={{
              borderBottom: "1px solid #ffffff",
              flexDirection: "column",
              alignItems: "flex-start",
              mb: 3,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              {/* Pergunta */}
              {editingQuestionId === question.id ? (
                <TextField
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  fullWidth
                  autoFocus
                  variant="outlined"
                  sx={{
                    input: { color: "#ffffff" },
                    ".MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#ffffff",
                      },
                    },
                    mb: 1,
                  }}
                />
              ) : (
                <ListItemText
                  primary={question.content}
                  sx={{ color: "#ffffff", mb: 1 }}
                />
              )}

              {/* Botões Editar e Excluir */}
              <Box sx={{ display: "flex", gap: 1 }}>
                {editingQuestionId === question.id ? (
                  <Button
                    variant="contained"
                    onClick={handleConfirmEditQuestion}
                    sx={{ backgroundColor: "#ff6f00" }}
                  >
                    Confirmar
                  </Button>
                ) : (
                  <IconButton onClick={() => handleEditQuestion(question.id)}>
                    <EditIcon sx={{ color: "#ff6f00" }} />
                  </IconButton>
                )}
                <IconButton
                  onClick={() => {
                    setQuestionToDelete(question.id);
                    setOpenDeleteDialog(true);
                  }}
                >
                  <DeleteIcon sx={{ color: "#ff6f00" }} />
                </IconButton>
              </Box>
            </Box>
            {/* Respostas */}
            {question.answers.map((answer) => (
              <Box
                key={answer.id}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                {editingAnswerId === answer.id ? (
                  <TextField
                    value={answers[question.id] || ""}
                    onChange={(e) =>
                      handleAnswerChange(question.id, e.target.value)
                    }
                    fullWidth
                    autoFocus
                    variant="outlined"
                    sx={{
                      input: { color: "#ffffff" },
                      ".MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "#ffffff",
                        },
                      },
                      mb: 1,
                    }}
                  />
                ) : (
                  <Typography sx={{ color: "#ffffff" }}>
                    {answer.content}
                  </Typography>
                )}

                {/* Botões Editar e Excluir Resposta */}
                <Box sx={{ display: "flex", gap: 1 }}>
                  {editingAnswerId === answer.id ? (
                    <Button
                      variant="contained"
                      onClick={() => handleConfirmEditAnswer(question.id)}
                      sx={{ backgroundColor: "#ff6f00" }}
                    >
                      Confirmar
                    </Button>
                  ) : (
                    <IconButton
                      onClick={() => handleEditAnswer(question.id, answer.id)}
                    >
                      <EditIcon sx={{ color: "#ff6f00" }} />
                    </IconButton>
                  )}
                  <IconButton
                    onClick={() => {
                      setAnswerToDelete({
                        questionId: question.id,
                        answerId: answer.id,
                      });
                      setOpenDeleteDialog(true);
                    }}
                  >
                    <DeleteIcon sx={{ color: "#ff6f00" }} />
                  </IconButton>
                </Box>
              </Box>
            ))}
            {/* Adicionar Resposta */}
            <TextField
              label="Adicionar Resposta"
              variant="outlined"
              fullWidth
              value={answers[question.id] || ""}
              onChange={(e) => handleAnswerChange(question.id, e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddAnswer(question.id);
                }
              }}
              sx={{
                input: { color: "#ffffff" },
                ".MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#ffffff",
                  },
                  "&:hover fieldset": {
                    borderColor: "#ff6f00", // Cor da borda ao passar o mouse
                  },
                },
                style: { color: "#ffffff" },
                mb: 2,
              }}
            />
          </ListItem>
        ))}
      </List>

      {/* Modal de Confirmação para Apagar */}
      <Dialog
        open={openDeleteDialog}
        onClose={handleCancelDelete}
        sx={{ color: "#121212" }}
      >
        <DialogTitle sx={{ color: "#ff6f00" }}>Confirmar Exclusão</DialogTitle>
        <DialogContent sx={{ color: "#121212" }}>
          Você tem certeza que deseja apagar?{" "}
          {answerToDelete ? "Esta resposta" : "Esta pergunta e suas respostas"}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            Não
          </Button>
          <Button
            onClick={answerToDelete ? handleDeleteAnswer : handleDeleteQuestion}
            color="error"
          >
            Sim
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default QuestionsPage;

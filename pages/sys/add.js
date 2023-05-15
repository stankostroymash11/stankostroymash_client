import { useState, useRef, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import TextEditor from "@/components/TextEditor";
import SelectCategoryWidget from "@/components/Widgets/SelectCategoryWidget";
import SelectSubCategoryWidget from "@/components/Widgets/SelectSubCategoryWidget";
import axios from "axios";
import { useRouter } from "next/router";
import { getCookie } from "@/utils/cookies";

const maxLengthShortText = 300;
const maxLengthText = 2000;

export default function Add() {
  const [state, setState] = useState({});
  const [shortText, setShortText] = useState("");
  const [text, setText] = useState("");
  const [stateShortText, setStateShortText] = useState(true);
  const [stateText, setStateText] = useState(true);
  const [category, setCategory] = useState();
  const [subCategory, setSubCategory] = useState();
  const [pathImage, setPathImage] = useState([]);
  const [photoPrimary, setPhotoPrimary] = useState("");
  const router = useRouter();

  const PhotosRef = useRef();

  const deleteImage = async (prop) => {
    const config = {
      headers: {
        auth: getCookie("token"),
      },
    };

    try {
      axios
        .post(
          `${process.env.NEXT_PUBLIC_API_HOST}api/delete_image`,
          {
            image: prop,
          },
          config
        )
        .then(() => (PhotosRef.current.value = null))
        .then(() =>
          setPathImage((pathImage) => pathImage.filter((item) => item !== prop))
        )
        .then(
          () => (photoPrimary) => prop === photoPrimary && setPhotoPrimary("")
        );
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeFile = async (event) => {
    try {
      await Array.from(event.target.files).map((item) => {
        const file = new FormData();
        file.append("image", item);
        fetch(`${process.env.NEXT_PUBLIC_API_HOST}upload`, {
          method: "POST",
          headers: {
            auth: getCookie("token"),
          },
          body: file,
        })
          .then((response) => response.json())
          .then((json) => setPathImage((pathImage) => [...pathImage, json.url]))
          .then((data) => (PhotosRef.current.value = null));
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!getCookie("token")) {
      router.push("/");
    }
  }, []);

  useEffect(() => {
    if (category && category.title === "Запчасти") {
      setSubCategory();
    }
  }, [category]);

  const onSave = () => {
    const config = {
      headers: {
        auth: getCookie("token"),
      },
    };
    if (category.title !== "Запчасти") {
      try {
        axios
          .post(
            `${process.env.NEXT_PUBLIC_API_HOST}api/add_item`,
            {
              state,
              shortText,
              text,
              category,
              subCategory,
              pathImage,
              photoPrimary,
            },
            config
          )
          .then((data) => {
            router.push(data.data.path);
          });
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        axios
          .post(
            `${process.env.NEXT_PUBLIC_API_HOST}api/add_item_duplicates`,
            {
              state,
              shortText,
              text,
              category,
              subCategory,
              pathImage,
              photoPrimary,
            },
            config
          )
          .then((data) => {
            router.push(data.data.path);
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div
      style={{
        width: "100%",
        overflowY: "auto",
        boxSizing: "border-box",
        padding: "15px",
      }}
    >
      <Typography
        variant="h6"
        component="div"
        sx={{
          flexGrow: 1,
          textAlign: "center",
          paddingTop: "15px",
          paddingBottom: "15px",
        }}
      >
        Добавить оборудование
      </Typography>
      <div style={{ padding: "15px 0px" }}>
        <TextField
          required={true}
          label="Название"
          variant="outlined"
          size="small"
          fullWidth={true}
          value={state.title ?? ""}
          onChange={(e) => {
            setState((state) => {
              return { ...state, title: e.target.value };
            });
          }}
        />
      </div>
      <TextEditor
        text={shortText}
        setText={setShortText}
        maxLength={maxLengthShortText}
        placeholder="Кратное описание"
        setStateText={setStateShortText}
      />
      <TextEditor
        text={text}
        setText={setText}
        maxLength={maxLengthText}
        placeholder="Описание"
        setStateText={setStateText}
      />
      <div style={{ padding: "15px 0px" }}>
        <TextField
          label="Цена"
          variant="outlined"
          size="small"
          fullWidth={true}
          value={state.price ?? ""}
          onChange={(e) => {
            setState((state) => {
              return { ...state, price: e.target.value };
            });
          }}
        />
      </div>
      <div style={{ display: "flex", width: "100%" }}>
        <div style={{ width: "50%", boxSizing: "border-box", padding: "15px" }}>
          {<SelectCategoryWidget setCategory={setCategory} />}
        </div>
        <div style={{ width: "50%", boxSizing: "border-box", padding: "15px" }}>
          <SelectSubCategoryWidget
            getSub={setSubCategory}
            category={category}
            disabled={Boolean(!category || category.title === "Запчасти")}
          />
        </div>
      </div>
      <div>
        <Button
          variant="contained"
          onClick={() => PhotosRef.current.click()}
          startIcon={<PhotoCamera />}
        >
          Добавить фото
        </Button>
        <input
          hidden={true}
          ref={PhotosRef}
          type="file"
          multiple={true}
          accept=".png, .jpg, .jpeg"
          name="files[]"
          onChange={handleChangeFile}
        />
      </div>
      <div>{pathImage.length ? `Фото: ${pathImage.length}` : ""}</div>
      <div
        style={{
          display: "flex",
          gap: "15px",
          width: "100%",
          boxSizing: "border-box",
          padding: "15px",
          flexWrap: "wrap",
        }}
      >
        {pathImage.length > 0 &&
          pathImage.map((item) => {
            let str = item.substring(1);
            return (
              <div key={item}>
                <img
                  src={`${process.env.NEXT_PUBLIC_API_HOST}${str}`}
                  style={{ width: "300px", height: "auto", display: "block" }}
                />
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Button color="warning" onClick={() => deleteImage(item)}>
                    Удалить
                  </Button>
                  <Button
                    color="primary"
                    disabled={Boolean(str === photoPrimary)}
                    onClick={() => setPhotoPrimary(str)}
                  >
                    Сделать главной
                  </Button>
                </div>
              </div>
            );
          })}
      </div>
      <Button
        fullWidth={true}
        disabled={
          category?.title !== "Запчасти"
            ? !Boolean(
                state &&
                  text &&
                  category &&
                  subCategory &&
                  pathImage &&
                  photoPrimary &&
                  stateShortText &&
                  stateText
              )
            : !Boolean(
                state &&
                  text &&
                  category &&
                  pathImage &&
                  photoPrimary &&
                  stateShortText &&
                  stateText
              )
        }
        variant="contained"
        color={"primary"}
        style={{ marginTop: "15px" }}
        onClick={() => onSave()}
      >
        Сохранить
      </Button>
    </div>
  );
}

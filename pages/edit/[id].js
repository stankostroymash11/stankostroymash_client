import TextField from "@mui/material/TextField";
import { useState, useRef, useEffect } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import TextEditor from "@/components/TextEditor";
import axios from "axios";
import { useRouter } from "next/router";
import { getCookie } from "@/utils/cookies";
import CategoryWidget from "@/components/Widgets/CategoryWidget";
import SubCategoryWidget from "@/components/Widgets/SubCategoryWidget";
import { endpoint } from "@/endpoint";

const maxLengthShortText = 300;
const maxLengthText = 2000;

export default function EditId({ props }) {
  const [state, setState] = useState({
    title: props.data.title,
    price: props.data.price,
  });
  const [shortText, setShortText] = useState(props.data.shortDescription);
  const [text, setText] = useState(props.data.description);
  const [stateShortText, setStateShortText] = useState(true);
  const [stateText, setStateText] = useState(true);
  const [category, setCategory] = useState();
  const [subCategory, setSubCategory] = useState();
  const [pathImage, setPathImage] = useState(props.data.photos);
  const [photoPrimary, setPhotoPrimary] = useState(props.data.photoPrimary);
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
          `${endpoint.url}api/delete_image`,
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
        fetch(`${endpoint.url}upload`, {
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
    try {
      axios
        .post(
          `${endpoint.url}api/edit_item`,
          {
            id: props.data._id,
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
        Редактировать оборудование
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
          label={`Цена ${props.data.price}`}
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
          <CategoryWidget
            category={props.data.categoryEn}
            setCategory={setCategory}
          />
        </div>
        <div style={{ width: "50%", boxSizing: "border-box", padding: "15px" }}>
          <SubCategoryWidget
            getSub={setSubCategory}
            category={category}
            defaultSubCategory={props.data.subCategoryEn}
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
          pathImage.map((item, index) => {
            let str = item.substring(1);
            return (
              <div key={item}>
                <img
                  src={`${endpoint.url}${str}`}
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
EditId.getInitialProps = async (ctx) => {
  let data = {};

  const res = await fetch(
    `${endpoint.url}api/getItem/${ctx.query.id}`
  );
  data = await res.json().then((res) => res);

  if (!data) {
    const res = await fetch(
      `${endpoint.url}api/getItemDuplicates/${ctx.query.id}`
    );
    data = await res.json().then((res) => res);
  }

  return {
    props: { data },
  };
};

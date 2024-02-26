import React from "react";
import { connect } from "react-redux";
import { Memo } from "./features/memo/memo.type";
import { OptionType } from "./features/option/option.type";
import { addMemo } from "./features/memo/memoSlice";
import { setColor, setSticker, setAlign } from "./features/option/optionSlice";
import { OPTION_ALIGNS, OPTION_COLORS, OPTION_STICKERS } from "./constants";
import "./styles/main.scss";
import { RadioGroup } from "./components/RadioGroup";
import { AppUIState } from "./types/AppUIState";
import { ScreenSticker } from "./types/ScreenSticker";

class App extends React.Component<any, AppUIState> {
  stickerRef: React.RefObject<HTMLDivElement>;

  constructor(props: any) {
    super(props);
    // state
    this.state = {
      content: "",
      author: "",
      toast: null,
      stickers: [],
    };
    // sticker buttons ref
    this.stickerRef = React.createRef();
  }

  // change event handlers
  onContentChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState((state) => ({ ...state, content: e.target.value }));
  };
  onAuthorChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState((state) => ({ ...state, author: e.target.value }));
  };

  // option click event handlers
  onColorClicked = (idx: number) => {
    this.props.setColor(idx);
    console.log(this.props);
  };

  // close toast event handler
  onCloseToastClicked = () => {
    this.setState((state) => ({ ...state, toast: null }));
  };

  // save memo event handler
  onSaveClicked = () => {
    const { content, author } = this.state;
    // validation
    if (!content || !author) {
      const message = "enter both content and author";
      this.setState((state) => ({ ...state, toast: message }));
      setTimeout(this.onCloseToastClicked, 2000);
      return;
    }
    const memo: Memo = {
      content: this.state.content,
      author: this.state.author,
      color: OPTION_COLORS[this.props.color],
    };
    this.props.addMemo(memo);
    localStorage.setItem("memo", JSON.stringify(this.props.memo));
    this.setState((_) => ({ author: "", content: "" }));
  };

  // put sticker event handler
  onPutSticker = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const rect = this.stickerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const { top, left, right, bottom } = rect;
    const { clientX, clientY } = e;
    // if sticker select button clicked
    if (
      clientX > left &&
      clientX < right &&
      clientY < bottom &&
      clientY > top
    ) {
      return;
    }
    // render sticker on screen
    const selected: number | null = this.props.sticker;
    if (selected && OPTION_STICKERS[selected]) {
      const newSticker: ScreenSticker = {
        clientX,
        clientY,
        content: OPTION_STICKERS[selected],
      };
      this.setState((state) => ({
        ...state,
        stickers: [...this.state.stickers, newSticker],
      }));
    }
  };

  render() {
    return (
      <>
        <main className="column wrap" onClick={this.onPutSticker}>
          <section className="row form">
            <div className="row">
              <label htmlFor="input-content">내용</label>
              <input
                type="text"
                id="input-content"
                name="input-content"
                value={this.state.content}
                onChange={this.onContentChanged}
              />
            </div>
            <div className="row">
              <label htmlFor="input-author">작성자</label>
              <input
                type="text"
                id="input-author"
                name="input-author"
                value={this.state.author}
                onChange={this.onAuthorChanged}
              />
            </div>
            <RadioGroup
              type="color"
              options={OPTION_COLORS}
              selectedIdx={this.props.color}
              onClick={this.props.setColor}
            />
            <button id="button-submit" onClick={this.onSaveClicked}>
              작성하기
            </button>
          </section>
          <div ref={this.stickerRef}>
            <RadioGroup
              options={OPTION_STICKERS}
              selectedIdx={this.props.sticker}
              onClick={this.props.setSticker}
            />
          </div>
          <RadioGroup
            options={OPTION_ALIGNS}
            selectedIdx={this.props.align}
            onClick={this.props.setAlign}
          />
          <section className={`grid option-${this.props.align}`}>
            {(this.props.memo as Memo[]).map(
              ({ content, author, color }, idx) => (
                <div>
                  <div key={idx} className={`column memo-card color-${color}`}>
                    <div className="memo-content">{content}</div>
                    <div className="memo-author">{author}</div>
                  </div>
                </div>
              )
            )}
          </section>
        </main>
        {
          // render screen stickers
          this.state.stickers.map(({ clientX, clientY, content }, idx) => (
            <div
              key={idx}
              className="sticker"
              style={{ top: clientY, left: clientX }}
            >
              {content}
            </div>
          ))
        }
        {
          // render toast message box
          this.state.toast ? (
            <aside className="toast">
              <button
                className="toast-close"
                onClick={this.onCloseToastClicked}
              >
                x
              </button>
              <div className="toast-body">{this.state.toast}</div>
            </aside>
          ) : (
            <></>
          )
        }
      </>
    );
  }
}

// map props with redux state
const mapStateToProps = (state: { option: OptionType; memo: Memo[] }) => {
  const { color, align, sticker } = state.option;
  return {
    color,
    align,
    sticker,
    memo: state.memo,
  };
};
const mapActionToProps = {
  setColor,
  setAlign,
  setSticker,
  addMemo,
};

export default connect(mapStateToProps, mapActionToProps)(App);

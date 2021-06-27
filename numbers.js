/****************************************************************
要求仕様
https://developer.mozilla.org/ja/docs/Learn/JavaScript/First_steps/A_first_splash
　数字を予想する単純なゲームを作って欲しい。
　ランダムな 1 から 100 の数字を決めて、プレイヤーに 10 回以内に当ててもらうゲームだ。
　プレイヤーには予想する都度、正解か間違いかを表示する。
　もしプレイヤーが間違っていれば、プレイヤーが予想した数字に応じて、
　大きすぎるか小さすぎるかを表示する。
　また、プレイヤーの前回の予想がどうだったかも表示する。
　ゲームはプレイヤーの予想が正しかった場合、もしくは回数の上限に達した場合に終了する。
　ゲームが終了したら、プレイヤーはもう一度プレイ開始できるようにする。
****************************************************************/
// 実装
(
    function(){
        'use strict';

        // htmlのエレメント取得
        const NumberInput = document.getElementById('NumberInput');
        const JudgeButton = document.getElementById('JudgeButton');
        const ResultText = document.getElementById('ResultText');
        const HistoryText = document.getElementById('HistoryText');
        const Restart = document.getElementById('Restart');

        var RandomNumber; // 選択した乱数値
        var TryCount; // 試行回数
        var TryEnd; // 試行完了フラグ

        // エレメントと変数の初期化
        init();

        JudgeButton.onclick = JudegButtonOnClick;
        NumberInput.onkeypress = NumberInputOnKeyPress;

        // 判定関数
        function JudegButtonOnClick(){
            if( !TryEnd ){
                let value = Number(NumberInput.value);

                // 判定処理
                if( !Number.isNaN(value)){
                    // 範囲外か判定
                    if( value < 1 || value > 100){
                        ResultText.value = "数字が範囲外です"
                    }else{
                        if( value < RandomNumber ){
                            ResultText.value = "入力された数値より大きいです";
                            HistoryText.value += " " + String(value);
                            TryCount += 1;
                        }else if( value > RandomNumber){
                            ResultText.value = "入力された数値より小さいです";
                            HistoryText.value += " " + String(value);
                            TryCount += 1;
                        }else{
                            ResultText.value = "正解です";
                            HistoryText.value += " " + String(value);
                            TryEnd = true;
                        }

                        // ゲームオーバー判定
                        if( TryCount == 10 && TryEnd == false){
                            ResultText.value = "ゲームオーバー（正解は："+String(RandomNumber)+")";
                            TryEnd = true;
                        }
                    }
                }else{
                    ResultText.value = "数値を入力してください"
                }    
            }
            NumberInput.value = "";
        }

        // エンターキーが入力された場合も判定を実行する
        function NumberInputOnKeyPress(e){
            if( e.key == "Enter"){
                JudegButtonOnClick();
            }
        }

        // 再スタートボタンの処理
        Restart.onclick = function(){
            init();
        }

        // 変数初期化
        function init(){
            RandomNumber = GenerateRundomNum(1,100);
            TryCount = 0;
            TryEnd = false;
            
            NumberInput.value = "";
            ResultText.value = "";
            HistoryText.value = "";
        }

        // 乱数生成関数
        function GenerateRundomNum(min,max){
            return Math.floor( Math.random() * (max + 1 - min) ) + min;
        }
    }
)();
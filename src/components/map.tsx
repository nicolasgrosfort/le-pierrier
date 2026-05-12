"use client";

import { getSocket } from "@/lib/socket";
import {
  _holdType,
  _isId,
  _mode,
  _panzoomRef,
  _problem,
  _wallRef,
} from "@/lib/store";
import panzoom from "@panzoom/panzoom";
import clsx from "clsx";
import { useAtom } from "jotai";
import { useEffect, useLayoutEffect } from "react";

export const Map = () => {
  const [problem, setProblem] = useAtom(_problem);

  const [isId] = useAtom(_isId);
  const [hold] = useAtom(_holdType);
  const [mode] = useAtom(_mode);

  const [wallRef] = useAtom(_wallRef);
  const [panzoomRef] = useAtom(_panzoomRef);

  useLayoutEffect(() => {
    if (!wallRef.current) return;

    wallRef.current
      .querySelectorAll<SVGElement>("[data-name]")
      .forEach((el) => {
        el.classList.remove("start", "hold", "foot");
      });

    if (!problem) return;

    Object.entries(problem.holds).forEach(([holdId, type]) => {
      wallRef.current
        ?.querySelectorAll<SVGElement>(`[data-name='${holdId}']`)
        .forEach((el) => el.classList.add(type));
    });
  }, [problem, wallRef]);

  useEffect(() => {
    if (!wallRef.current) return;

    panzoomRef.current = panzoom(wallRef.current, {
      maxZoom: 10,
      minZoom: 0.5,
      bounds: true,
      boundsPadding: 0.1,
      zoomDoubleClickSpeed: 1,
      pinchAndPan: true,
      pinchSpeed: 1,
      smoothScroll: true,
    });

    return () => {
      panzoomRef.current?.destroy();
      panzoomRef.current = null;
    };
  }, [panzoomRef, wallRef]);

  const handleOnClick = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    if (!problem || mode !== "handle") return;

    const target = e.target as SVGElement;
    const targetId = target.dataset.name;

    if (!targetId) return;

    const holds = { ...problem?.holds };

    if (holds[targetId] === hold) {
      delete holds[targetId];
    } else {
      holds[targetId] = hold;
    }

    const nextProblem = {
      ...problem,
      holds,
    };

    setProblem(nextProblem);
    const socket = getSocket();
    socket.emit("problem", nextProblem);
  };

  return (
    <div className="h-full w-full relative overflow-visible!">
      <svg
        ref={wallRef}
        width={1500}
        height={960}
        viewBox="0 0 1500 960"
        className="touch-none absolute inset-0 w-full h-full object-contain"
        style={{ objectFit: "contain", objectPosition: "center" }}
        onClick={handleOnClick}
      >
        <g id="map" className="map">
          <g id="wall">
            <path
              d="M852 924.65L864.469 481M852 924.65L864.48 480.44L1453.5 924.65L852 924.65Z"
              stroke="#151515"
              fill="#f5f5f5"
              strokeWidth="1"
              strokeMiterlimit="10"
              strokeLinejoin="round"
            />
            <path
              d="M939 307L931.5 325L864.469 481M939 307L1453.5 630.55V924.65L864.48 480.44L939 307Z"
              stroke="#151515"
              fill="#f5f5f5"
              strokeWidth="1"
              strokeMiterlimit="10"
              strokeLinejoin="round"
            />
            <path
              d="M939 307L871.6 227.25L864.469 481L931.5 325L939 307ZM939 307L864.48 480.44"
              stroke="#151515"
              fill="#f5f5f5"
              strokeWidth="1"
              strokeMiterlimit="10"
              strokeLinejoin="round"
            />
            <path
              d="M852 924.65H213.4L167.65 897.4L121.9 870.15L104.4 863.65L113.7 10.3501L129.5 5.75H736.2L871.6 227.25L864.469 481L852 924.65ZM852 924.65L864.48 480.44"
              stroke="#151515"
              fill="#f5f5f5"
              strokeWidth="1"
              strokeMiterlimit="10"
              strokeLinejoin="round"
            />
            <path
              d="M113.5 10L56 536.69L80.5 825.7L104.2 863.3L113.5 10Z"
              stroke="#151515"
              fill="#f5f5f5"
              strokeWidth="1"
              strokeMiterlimit="10"
              strokeLinejoin="round"
            />
          </g>
          <g id="grips" className="grips">
            <g id="29">
              <path
                fill="#BFB6BB"
                stroke="#151515"
                strokeWidth="1"
                d="M123 823.5 110.5 757 302 880l-179-56.5Z"
                data-name="29"
              />
            </g>
            <g id="314">
              <path
                d="M485.5 873.5L485 784L555 834.5L485.5 873.5Z"
                fill="#BFB6BB"
                stroke="#151515"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                data-name="314"
              />
              <path
                d="M526.5 914.5L555 834.5L485.5 873.5L526.5 914.5Z"
                fill="#BFB6BB"
                stroke="#151515"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                data-name="314"
              />
              <path
                d="M485 784L415 837L485.5 873.5L485 784Z"
                fill="#BFB6BB"
                stroke="#151515"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                data-name="314"
              />
            </g>
            <g id="320">
              <path
                fill="#BFB6BB"
                stroke="#151515"
                strokeLinecap="round"
                strokeWidth="1"
                d="M732.209 6H708v18.51h24.209V6Z"
                data-name="320"
              />
            </g>
            <g id="327">
              <path
                fill="#BFB6BB"
                stroke="#151515"
                strokeLinecap="round"
                strokeWidth="1"
                d="M668.209 6H644v18.51h24.209V6Z"
                data-name="327"
              />
            </g>
            <g id="321">
              <path
                fill="#BFB6BB"
                stroke="#151515"
                strokeLinecap="round"
                strokeWidth="1"
                d="M546.209 6H522v18.51h24.209V6Z"
                data-name="321"
              />
            </g>
            <g id="323">
              <path
                fill="#BFB6BB"
                stroke="#151515"
                strokeLinecap="round"
                strokeWidth="1"
                d="M167.209 6H143v18.51h24.209V6Z"
                data-name="323"
              />
            </g>
            <g id="322">
              <path
                fill="#BFB6BB"
                stroke="#151515"
                strokeLinecap="round"
                strokeWidth="1"
                d="M302.209 6H278v18.51h24.209V6Z"
                data-name="322"
              />
            </g>
            <g id="326">
              <path
                fill="#BFB6BB"
                stroke="#151515"
                strokeLinecap="round"
                strokeWidth="1"
                d="M423.209 6H399v18.51h24.209V6Z"
                data-name="326"
              />
            </g>
            <g id="193">
              <path
                d="M761.5 798L804 826.5L765.5 857L761.5 798Z"
                fill="#BFB6BB"
                stroke="#151515"
                strokeWidth="1"
                strokeLinejoin="round"
                data-name="193"
              />
              <path
                d="M716 834L761.5 798L765.5 857L716 834Z"
                fill="#BFB6BB"
                stroke="#151515"
                strokeWidth="1"
                strokeLinejoin="round"
                data-name="193"
              />
              <path
                d="M731 882.5L716 834L765.5 857L731 882.5Z"
                fill="#BFB6BB"
                stroke="#151515"
                strokeWidth="1"
                strokeLinejoin="round"
                data-name="193"
              />
              <path
                d="M761.5 798L765.5 857"
                stroke="#151515"
                strokeWidth="1"
                strokeLinejoin="round"
                data-name="193"
              />
            </g>
          </g>
          <g id="holds" className="holds">
            <path
              id="343"
              data-name="343"
              d="M630.055 760.622C629.319 754.995 636.186 749.837 639.711 747.962C643.849 747.024 642.01 747.399 645.688 747.024C650.286 746.555 654.425 753.119 653.965 758.746C653.505 764.373 641.09 770 639.711 770C638.331 770 630.974 767.655 630.055 760.622Z"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
            />
            <path
              id="342"
              data-name="342"
              d="M769.395 288.892C762.595 285.692 767.561 277.892 770.895 274.392C776.395 269.392 787.895 272.392 787.895 281.892C787.895 291.392 777.895 292.892 769.395 288.892Z"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
            />
            <path
              id="341"
              data-name="341"
              d="M789.243 437.024C786.043 433.024 789.743 431.524 792.243 430.024C795.743 427.524 801.743 427.524 806.243 429.024C810.743 430.524 806.243 437.024 803.243 440.024C800.243 443.024 793.243 442.024 789.243 437.024Z"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
            />
            <path
              id="340"
              data-name="340"
              d="M737.913 490.5C736.938 487.846 741.214 482.809 743.474 480.623C748.82 476.926 754.665 481.707 757.5 483.5C760.662 485.5 767.031 497.58 767.657 500.514C768.283 503.448 762.956 512.083 761 512.5C759.044 512.917 751.637 509.538 751.5 506.5C751.363 503.462 746.472 497.508 743.474 496.5C740.5 495.5 739.132 493.819 737.913 490.5Z"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
            />
            <path
              id="339"
              data-name="339"
              d="M725.45 515.06C724.962 510.218 733.906 501.878 738.5 498C745.5 496 747.986 507.501 747.922 508.499C747.857 509.497 743.671 512.232 741.08 513.567C738.488 514.903 733.03 521.066 732 521.5C730.97 521.934 726.06 521.112 725.45 515.06Z"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
            />
            <path
              id="338"
              data-name="338"
              d="M667 446.5C660.232 439.938 666.579 435.041 671.5 433.5C674.144 432.472 680.316 435.944 683.905 437.079C687.493 438.214 692.773 436.118 694.142 435.823C695.511 435.527 703.17 433.394 706.869 441.671C710.567 449.947 697.031 456.175 691 457C684.969 457.826 675.459 454.703 667 446.5Z"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
            />
            <path
              id="337"
              data-name="337"
              d="M265 225.394C265 221.394 271.333 213.06 274.5 209.394C278.5 207.394 283 207.394 288 210.394C291.773 212.658 292.833 219.394 292.5 224.394C289.833 229.227 283.2 239.094 278 239.894C271.5 240.894 265 230.394 265 225.394Z"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
            />
            <path
              id="336"
              data-name="336"
              d="M206.4 285.494C206.763 280.054 220.397 269.756 227.168 265.288L236.003 278.727C233.36 282.038 227.031 289.881 222.862 294.765C217.651 300.87 205.946 292.294 206.4 285.494Z"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
            />
            <path
              id="335"
              data-name="335"
              d="M136.257 490.938C136.257 490.938 136.629 483.381 141.487 481.47C155.686 477.271 161.417 479.804 166.733 483.373C172.049 486.943 167.816 496.328 163 498.738C158.184 501.147 145.271 502.728 140.205 502.148C136.152 501.684 135.884 494.482 136.257 490.938Z"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
            />
            <path
              id="334"
              data-name="334"
              d="M254.525 584.525C254.925 581.325 264.025 577.192 268.525 575.525C277.025 573.025 279.525 580.025 282.025 584.525C284.025 588.125 281.192 591.692 279.525 593.025C276.525 595.358 269.825 600.125 267.025 600.525C263.525 601.025 260.025 600.525 256.525 597.525C253.025 594.525 254.025 588.525 254.525 584.525Z"
              fill="#A26769"
              stroke="black"
              strokeWidth="1"
            />
            <path
              id="333"
              data-name="333"
              d="M121 681L130 649L174 661L164 693.5L121 681Z"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
            />
            <path
              id="305"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M492.5 270c-.8-2-.333-10.5 0-14.5.243-3.5.876-5.157 4-7.5 4-3 5.5-2 9-2 4.5 0 7 2.5 8.5 3.5s2.5 9.5 2 15-3 11.5-5 12-9.5.5-12 0-5.5-4-6.5-6.5Z"
              data-name="305"
            />
            <path
              id="46"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M263.5 501.5c-.5 4.167-1.8 13.5-3 17.5-1.5 5-4.5 8-3.5 10.5s16 14 19.5 15.5 15 2.5 20-5.5 3-15.5 1.5-20.5-12-21.5-16-22-15.5-3.5-18.5 4.5Z"
              data-name="46"
            />
            <path
              id="129"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M627 597c-2.5 3.167-6 10.3 0 13.5 7.5 4 18.5 2 18.5-1.5s1-12-7.5-13.5-9 0-11 1.5Z"
              data-name="129"
            />
            <path
              id="176"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M610 450.5c-2.5 1.667-7.6 5.7-8 8.5-.5 3.5 18.5 26 21 26s6.5-4.5 7.5-5.5 3.5-.5 4-3-21-27-24.5-26Z"
              data-name="176"
            />
            <path
              id="181"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M595.5 426.5c-2.5.667-7.4 3.4-7 9 .5 7 7.5 11.5 9 11.5s16 1.5 22.5-2.5 9-10.5 7-14.5-26.5-6-31.5-3.5Z"
              data-name="181"
            />
            <path
              id="210"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M476 365c-.167 4.833 1.6 14.9 10 16.5 10.5 2 7.5-17.5 3-20.5s-12.5-2-13 4Z"
              data-name="210"
            />
            <path
              id="298"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M494.5 361.5c-4 4-4.1 19 3.5 25 9.5 7.5 18 9 23 5.5s11-14.5 7-18.5c-2.388-2.388-12.436-10.016-21-13-5.782-2.015-10.888-.612-12.5 1Z"
              data-name="298"
            />
            <path
              id="209"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M445.211 372.514c-4.333 2.5-10.7 9-1.5 15 11.5 7.5 25 4 29-3s6-20-4.5-19.5-19.699 5-23 7.5Z"
              data-name="209"
            />
            <path
              id="208"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M439 396c2.167-1.5 8.1-4.4 14.5-4 8 .5 16.5.5 17.5 8s-1 11.5-4.5 12-20.5 6.5-25 1-7.556-14.5-2.5-17Z"
              data-name="208"
            />
            <path
              id="95"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M415 393c1 4.833 3.7 14.9 6.5 16.5 3.5 2 9.5.5 11.5 0s9.5-15 5.5-16.5-20.5-6.5-23.5 0Z"
              data-name="95"
            />
            <path
              id="207"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M416 348.5c-3.167 2.333-9.7 9.4-10.5 19-1 12 3 20 9 21s18.5 2.5 23.5-4 5-22 2.5-29-16-15-24.5-7Z"
              data-name="207"
            />
            <path
              id="300"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M448.5 343c-4.667 1.333-12.6 6.1-7 14.5 7 10.5 27 8 30.5 8s14.5-9 12.5-16-25-13-36-6.5Z"
              data-name="300"
            />
            <path
              id="180"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M577 437c-4 5.5-11.9 17.9-11.5 23.5.5 7 12 11.5 16 12s16 1 19-5.5-6.5-22.5-7.5-23.5-10-12-16-6.5Z"
              data-name="180"
            />
            <path
              id="177"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M545 454c2.667-3 8.6-9.1 11-9.5 3-.5 10.5 5.5 10.5 7.5s-3.5 10-8.5 12.5-10 3-12 .5-4.798-7-1-11Z"
              data-name="177"
            />
            <path
              id="100"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M518.5 458.5c1.833-2.167 6-6.5 8-6.5 2.5 0 13.5 6.5 15 8s8 6 6 13.5-5 12-10 12-22.5-22-19-27Z"
              data-name="100"
            />
            <path
              id="178"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M531.5 429.5c-2.833 5.167-8 16.3-6 19.5 2.5 4 12 7 14.5 7s9.5-6.5 10-10.5 3.5-13.5-2-17-13-4-16.5 1Z"
              data-name="178"
            />
            <path
              id="179"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M555.5 425c-1.833 2.333-4.4 8.2 0 13 5.5 6 8 9 18.5 1s11-14.5 10-16.5-3.5-5-12.5-3.5-13 2-16 6Z"
              data-name="179"
            />
            <path
              id="292"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M609 407c-2.167 1.667-5.3 6.6-.5 13 6 8 17 8 23.5 7.5s13-3 13-9.5-10-13.5-19.5-14-13 .5-16.5 3Z"
              data-name="292"
            />
            <path
              id="294"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M585.5 376.5c-2.5 11.167-7.5 34.3-7.5 37.5 0 4 8 7.5 12 8.5s13.5.5 14.5 0 11.5-39.5 11-42.5-6.5-5.5-10.5-5.5-16.5-4.5-19.5 2Z"
              data-name="294"
            />
            <path
              id="295"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M560.5 372c-1 1.833-3.5 5.7-5.5 6.5-2.5 1-10.5 11-10.5 16.5s10.5 22 14 23 11 1.5 18-9.5 2.5-29 1-31.5-12-10-17-5Z"
              data-name="295"
            />
            <path
              id="296"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M516.5 397.5C517 400 526 424 528 426s5.5 2 7.5 2c2.5 0 15.5-5.5 16-7.5s-9.5-31-11.5-32-24 6.5-23.5 9Z"
              data-name="296"
            />
            <path
              id="99"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M506.5 419c-5.333 10.333-16 32.1-16 36.5 0 5.5 14 9.5 17 10.5s15.5-5 18-14.5 8-23 4-27-18.5-9.5-23-5.5Z"
              data-name="99"
            />
            <path
              id="212"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M498.5 393.5c-3.667.333-10.1 3-6.5 11 4.5 10 6 14 8.5 15s14.5-2.5 16-5.5-4.5-20.5-8.5-22.5-5.5 1.5-9.5 2Z"
              data-name="212"
            />
            <path
              id="213"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M474.5 404c-4.333 6.833-13 21.3-13 24.5 0 4 11.5 17.5 18 18.5s13.5-2.5 17-8 2.5-21 1.5-25.5-15.5-18.5-23.5-9.5Z"
              data-name="213"
            />
            <path
              id="211"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M475 382.5c-4 1.667-10.6 6.7-5 13.5 7 8.5 18 5.5 20 4.5s6.5-19-15-18Z"
              data-name="211"
            />
            <path
              id="130"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M646 608.5c-2.5 1.667-7.6 5.9-8 9.5-.5 4.5-2 9 3 10.5s7.5 1.5 9 1 5.5-6 5.5-9-1.5-14.5-9.5-12Z"
              data-name="130"
            />
            <path
              id="134"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M672.5 582.5c-1.833 3.167-4.2 10.5 1 14.5 6.5 5 14 5.5 15.5 0s-6-22.5-16.5-14.5Z"
              data-name="134"
            />
            <path
              id="250"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M564.5 221c-2-4.8 2.167-8.667 4.5-10 3.5-4 12-3.5 16.5 1.5s-3 13-7 13.5-11.5 1-14-5Z"
              data-name="250"
            />
            <path
              id="133"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M666.5 609.5c-1.5 3-3.5 7.6-3.5 10 0 3 2.5 11 10.5 11s15-12 15-17 .5-6.5-1.5-9c-.887-1.109-2.149-2.521-4-3.5-1.483-.785-3.422-1.254-5.272-1.348a10.26 10.26 0 0 0-3.228.348c-5.5 1.5-6.5 6.5-8 9.5Z"
              data-name="133"
            />
            <path
              id="125"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M589.5 589.5c-1 5.167-2.4 16.6 0 21 3 5.5 21 11 27.5 8.5s7.5-24.5 7-28-8-14-18-11.5-15 3.5-16.5 10Z"
              data-name="125"
            />
            <path
              id="123"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M568 569.5c-2.167 1.833-5.9 7.4-3.5 15 3 9.5 9.5 12 15 11s17-16 21.5-19 15-5.5 16-16.5-4-17-8-17-14-3-23 8-15.905 16-18 18.5Z"
              data-name="123"
            />
            <path
              id="73"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M296.5 475c-6.5 5-14.3 7.6-9.5 24 6 20.5 19 30 22 31s22-2.5 31-22-23.5-35.5-24.5-35.5-12.5-2.5-19 2.5Z"
              data-name="73"
            />
            <path
              id="81"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M335.5 456c-5.5 4.5-10.9 15.5-4.5 27.5 8 15 27 2.5 29.5-5s0-19.5-3-22-16.5-5-22-.5Z"
              data-name="81"
            />
            <path
              id="82"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M341 416c-1.5 5-4.9 15.5-6.5 17.5-2 2.5-4 2-4 4s2 4.5 2 6.5-.5 8 1 8.5 12 3.5 19-3 11-15 10.5-23-16.5-17-22-10.5Z"
              data-name="82"
            />
            <path
              id="89"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M355.5 346c-4 3.333-12.1 10.9-12.5 14.5-.5 4.5-8.5 13-8.5 15s-1.5 8.5 4 14 9.5 11.5 18.5 9 24.5-21 29-23 23.5-9 23.5-18.5 2.5-19-8-27-25-3-27.5-1.5-13.5 14.5-18.5 17.5Z"
              data-name="89"
            />
            <path
              id="88"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M356.5 403.5c1-1.5 5.8-6.9 9-6.5 4 .5 10.5 6.5 7.5 14.5s-4 10-8.5 9-10-5-9.5-10 .5-5.5 1.5-7Z"
              data-name="88"
            />
            <path
              id="87"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M376 416.5c3.5 0 9.9 4 11.5 8 2 5 1 7.5-2 8.5s-14 2.5-15.5-1.5-4.5-6.5-2.5-10.5 5-4.5 8.5-4.5Z"
              data-name="87"
            />
            <path
              id="93"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M420.5 409.5s-31-1-32.5.5-1.6 30.6 0 31c2 .5 31.5 1 33.5.5s1-31.5-1-32Z"
              data-name="93"
            />
            <path
              id="94"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M398 374c-10.333 4.833-31 14.9-31 16.5 0 2 10 22.5 11.5 22.5s30-15 32-17-10-22-12.5-22Z"
              data-name="94"
            />
            <path
              id="96"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M437 413.5c1.5-.5 8.5 1.6 8.5 2 0 .5 21.5 22.5 21.5 23.5s-1 9-2 10-10 8.5-12 9-7 .5-8 0-24.5-26.5-24.5-27.5 3-6 3.5-6.5 11.5-10 13-10.5Z"
              data-name="96"
            />
            <path
              id="169"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M529 495c-1.333 2-3.8 7-3 11 1 5 16 11 16.5 11s11.5-.5 11-7.5-12-14.5-13-15-8.5-4-11.5.5Z"
              data-name="169"
            />
            <path
              id="98"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M487.5 466.5c-2.5 1-11.5 4.6-11.5 17 0 15.5-5 26 11.5 31.5s23 1.5 26.5-.5 16.5-20.5 16.5-29.5-10-15.5-14.5-17c-3.6-1.2-16.5-6-21-5.5s-5 3-7.5 4Z"
              data-name="98"
            />
            <path
              id="328"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M591.5 526.5c-1 3-2.2 9.6 1 12 4 3 9.5 4 12.5 3s6.5-11.5 2.5-14.5-6.5-8.5-10.5-5.5-5.069 3.5-5.5 5Z"
              data-name="328"
            />
            <path
              id="124"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M570 535.5c-1.5 3.333-3.9 11.1-1.5 15.5 3 5.5 8.5 5.5 13.5 3.5s9.5-15 8.5-19-4.5-7-7.5-7-10.763-.5-13 7Z"
              data-name="124"
            />
            <path
              id="131"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M625 540c-5 8-9.8 13.3-3 20.5 8.5 9 23-2 27-4.5s15.5-18.5 6.5-24-25.5 0-30.5 8Z"
              data-name="131"
            />
            <path
              id="106"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M412 723c-2 2.833-4.8 10.2 0 17 6 8.5 25 5 29 3.5s8-17 8.5-23.5 5.5-15-1.5-15-30 7.5-36 18Z"
              data-name="106"
            />
            <path
              id="119"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M541 585c2.833 8.167 9.2 24.5 12 24.5 3.5 0 13-4.5 13-8.5s-2-21.5-6.5-23-17.5 1-18.5 7Z"
              data-name="119"
            />
            <path
              id="118"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M529.5 572c-4.5 3.5-2.9 13.9-4.5 15.5-2 2-7.5 4.5-7.5 8.5s8 11 13.5 11 10-5 10-8 .5-11.5-.5-12.5-4-5.5-4-8-2.5-10-7-6.5Z"
              data-name="118"
            />
            <path
              id="122"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M547 559.5c-2.5 3-7.1 7.9-1.5 11.5 7 4.5 12 7.5 14.5 7s13-12.5 13-15.5-9-15-11.5-15-12 9-14.5 12Z"
              data-name="122"
            />
            <path
              id="166"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M526.5 554.5c-2.333 2.5-5.8 8.4-1 12 6 4.5 17.5 1 19.5-2.5s2.5-10.5-4-12-11.5-1-14.5 2.5Z"
              data-name="166"
            />
            <path
              id="117"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M502.5 561c-1.667 7-4.5 21.7-2.5 24.5 2.5 3.5 11 9 18 7s8.5-19.5 8.5-23-6-18.5-12-18-9.5 2.5-12 9.5Z"
              data-name="117"
            />
            <path
              id="114"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M461.5 576c-4 13.5 2.8 28.5 6 32.5 4 5 17 5.5 22.5-7s3.5-15 4-16.5 6.5-7 5.5-12.5-5-10-12-9.5-22-.5-26 13Z"
              data-name="114"
            />
            <path
              id="157"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M405.5 586c4.167-1.5 13.1-3.8 15.5-1 3 3.5 4.5 9.5 2 12s-4.5 5-10.5 4.5-11.5-5-11-8 .835-6.5 4-7.5Z"
              data-name="157"
            />
            <path
              id="329"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M428.5 570.5c-2.333 2.5-6.6 9.2-5 16 2 8.5 8 27 12 28.5s15-7 18.5-12 9-15 6-22.5-15.5-17-18.5-17-10.454 3.5-13 7Z"
              data-name="329"
            />
            <path
              id="160"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M415 558c1.833-2.333 6.4-7.1 10-7.5 4.5-.5 12.5 2 12.5 5.5s.5 10.5-6.5 11.5-12.5 1.5-14.5-.5-2.5-6.5-1.5-9Z"
              data-name="160"
            />
            <path
              id="173"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M585 494.5c-3.333 4-9.3 14-6.5 22 3.5 10 11 10 14.5 8.5s8.5-10 7-16.5-9.5-22-15-14Z"
              data-name="173"
            />
            <path
              id="175"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M588.5 474c-1.333 6-3 18.4 1 20 5 2 18.5 2.5 21 2s5-19 3-21-22-4.5-25-1Z"
              data-name="175"
            />
            <path
              id="174"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M547.5 478.5c-3.5 4-6.4 11.3-2 16.5 5.5 6.5 14 10.5 19 10.5s24-13 24-16.5-3-13.5-11.5-16.5-15-5.5-21.5-1-4.5 3-8 7Z"
              data-name="174"
            />
            <path
              id="170"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M553.5 511.5c-2 3.167-5 10.9-1 16.5 5 7 15.5 6 19 4s7.5-10.5 7-14-5-11-9.5-11.5-13.5.672-15.5 5Z"
              data-name="170"
            />
            <path
              id="165"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M516 539.5c-1.333 1.833-4 6-4 8 0 2.5 9 8 10.5 8s8-4.5 8-7-.5-5-1-5.5-10.5-6-13.5-3.5Z"
              data-name="165"
            />
            <path
              id="167"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M527.454 526.566c-2.954 5.934-1.1 15 4.5 19 7 5 18 5.5 21 5s6-9.5 5-14-9.5-13-12.5-13.5-15.046-2.435-18 3.5Z"
              data-name="167"
            />
            <path
              id="168"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M515.5 514.5c-2.833 2-7 7.2-1 12 7.5 6 18-2 18-5.5s2-11.5-3.5-11.5-10.5 2.5-13.5 5Z"
              data-name="168"
            />
            <path
              id="164"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M476.5 535c-1.667 4.833-4 15.9 0 21.5 5 7 12 7 14.5 6s5.5-8 9-8.5 9-.5 10-3.5 5-7.5 3.5-13-8.5-16.5-15-17.5-18 3.5-22 15Z"
              data-name="164"
            />
            <path
              id="162"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M427.5 525.5c-1.667 4.333-3.1 15.2 4.5 24 9.5 11 20 20.5 24 22s16-4 18-7.5 2.5-8 0-13-19.5-22.5-23-26.5-17.5-9-23.5 1Z"
              data-name="162"
            />
            <path
              id="159"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M389 537.5c-3 4.333-7.9 14.7-3.5 21.5 5.5 8.5 20.5 4 23.5 3s17-14 17-21.5-9.5-17-15.5-16-16 3.5-21.5 13Z"
              data-name="159"
            />
            <path
              id="78"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M340.429 503.634c-1.833 1.833-4.4 6.6 0 11 5.5 5.5 14.5 8 16.5 8s16 4.5 18 4.5 10.5-.5 11-5.5-9-17-19-18.5-21-6.5-26.5.5Z"
              data-name="78"
            />
            <path
              id="79"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M357 485c-2.167 1.667-6.4 5.8-6 9 .5 4 6 6.5 11 6.5s11.5-4 11.5-8S372 477 357 485Z"
              data-name="79"
            />
            <path
              id="83"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M410.5 506.5c-4.5 2-6.5 8.5-.5 14.5 7.5 7.5 15.5 4 15.5 2.5s5.5-14.5-4-16.5-6.5-2.5-11-.5Z"
              data-name="83"
            />
            <path
              id="85"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M439.5 500.5c3 .5 9 2.3 9 5.5 0 4-3 12-8 12.5s-13.5-1.5-13.5-5 1-15.5 12.5-13Z"
              data-name="85"
            />
            <path
              id="163"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M452 509c6-.5 19.6-.7 26 2.5 8 4 10.5 5 9 9s-10 14-17 13.5-23.5-12-23.5-16 1.5-8.774 5.5-9Z"
              data-name="163"
            />
            <path
              id="80"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M379.5 487.5c-2.333 2.167-6.9 7.4-6.5 11 .5 4.5 9.5 15.5 14.5 18.5s11 3.5 15 .5 8-18 8-20.5-6-8.5-13-9.5-14-3-18 0Z"
              data-name="80"
            />
            <path
              id="172"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M619.5 485c-5.5 3.5-6.2 10.6-9 13-3.5 3-11.5 12-9.5 18.5s12.5 18.5 21.5 19 13.5-6 14.5-11 5-19.5 6-21.5-3-8.5-6-11-12-10.5-17.5-7Z"
              data-name="172"
            />
            <path
              id="48"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M282 425.5c-8.167 3.5-22.9 14.8-16.5 32 8 21.5 39 13.5 41.5 13.5s26.5-4.5 26-21-9.5-23.5-14.5-24.5-31-3.043-36.5 0Z"
              data-name="48"
            />
            <path
              id="310"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M377.5 262.5c-3.167 9.167-9.5 27.9-9.5 29.5 0 2 2.5 4 4 5s15 6 17.5 6.5 6 0 8-2 10.5-28 10.5-28.5 1.5-6-2.5-7.5-20-6.5-22.5-7-4.639 1.5-5.5 4Z"
              data-name="310"
            />
            <path
              id="222"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M564.5 708c-3.167 1.833-8.1 6.9-2.5 12.5 7 7 18-1 20-4s.5-18-17.5-8.5Z"
              data-name="222"
            />
            <path
              id="132"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M641 576c-2.167.667-5.5 4.5-1.5 14.5 5 12.5 10.5 20 13.5 21s9-1 11.5-1.5 7.5-11.5 6-16.5-12-13.5-15-15.5-11.5-4-14.5-2Z"
              data-name="132"
            />
            <path
              id="128"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M617.5 565.5c-2.5 2-6 3.2-6 8 0 6 1 12 6 12s15.5 1.5 18-2.5 3-11.5 0-14.5-15.5-5-18-3Z"
              data-name="128"
            />
            <path
              id="221"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M605 660c-5.5 4-5.6 14.4-8 18-3 4.5-11 6.5-9.5 17.5s16.5 15.5 19 15.5 28-13.5 29-21.5-2-24-9.5-25.5-15.5-8-21-4Z"
              data-name="221"
            />
            <path
              id="111"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M521 661c-3.5 4-10.5 13.9-10.5 21.5 0 9.5-.5 15 7.5 16s19 5.5 30-2 14-16 13.5-20.5-7-16.5-18.5-18.5-15.5-1.5-22 3.5Z"
              data-name="111"
            />
            <path
              id="146"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M697.5 492.5c-4.333 3.833-11.5 13.2-5.5 20 7.5 8.5 28 4 32-1.5s6.5-18 1-19.5-21.766-6.085-27.5 1Z"
              data-name="146"
            />
            <path
              id="145"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M691.5 524.5c-3 6-9 18.3-9 19.5 0 1.5 5.5 3 13 2.5s19.5-8 21-13.5 3-17-3.5-17-18 .5-21.5 8.5Z"
              data-name="145"
            />
            <path
              id="183"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M644.5 481.5c-2 2.5-3.8 13.7-1 20.5 3.5 8.5 10 33.5 17 36s11 6.5 17 6 12.5-20 12.5-26.5-1-27.5-10.5-34-16-12.5-25.5-8-7.5 3.5-9.5 6Z"
              data-name="183"
            />
            <path
              id="182"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M644 424.5c-5 2.5-21 14.1-21 22.5 0 10.5 11 28 11.5 28.5s9.5 7.5 18.5-2 13-9.5 14-10 4.5-5 0-11.5-18-30-23-27.5Z"
              data-name="182"
            />
            <path
              id="135"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M657.5 547c-4.5 4-11.3 9-8.5 17 3.5 10 9 18.5 22 16s17-17 17-23.5-4-14-10.5-13.5-15.5 0-20 4Z"
              data-name="135"
            />
            <path
              id="21"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M183.5 489c-3.333 1.333-9.4 5.5-7 11.5 3 7.5 14.5 6 18.5 3s8.5-6.5 5.5-10.5-12.5-8-17-4Z"
              data-name="21"
            />
            <path
              id="35"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M250 441.5c-11.5.5-36.6 3.9-45 13.5-10.5 12-17.5 17-16 24.5s22.5 18.5 32 18.5 30-8 34.5-18.5 17.5-38-5.5-38Z"
              data-name="35"
            />
            <path
              id="42"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M274 472.5c-8.333 1.833-24.6 7.6-23 16 2 10.5 8 9.5 13 9.5s18-7.5 21.5-11 3-18-11.5-14.5Z"
              data-name="42"
            />
            <path
              id="39"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M229.5 501c-2.333 3.333-6 11.6-2 18 5 8 19.5 8.5 23.5 8.5s8-4 7.5-8.5 1-10 1-13.5S251 488 244 491s-11.465 3.5-14.5 10Z"
              data-name="39"
            />
            <path
              id="34"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M206.5 496c-5.333 2.167-15.9 8.2-15.5 15 .5 8.5 8 15 14.5 15s17.5-9.5 18-15-6.223-21.5-17-15Z"
              data-name="34"
            />
            <path
              id="31"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M194.5 527.5c-3.667 3.5-10.5 11.6-8.5 16 2.5 5.5 9.5 9.5 14 7s7.5-11 5.5-17-8-8.5-11-6Z"
              data-name="31"
            />
            <path
              id="33"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M218 521.5c-4.167 2.667-11.9 9.8-9.5 17 3 9 16 8 18.5 7s10-11.5 6.5-17-13-8.835-15.5-7Z"
              data-name="33"
            />
            <path
              id="32"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M213 551.5c-2.5 4.167-5.2 12.5 4 12.5 11.5 0 19-2.5 19-5.5s1.5-11.5-4.5-12.5-17.034 2.5-18.5 5.5Z"
              data-name="32"
            />
            <path
              id="45"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M247.5 537c-5.5 4.667-15.2 16.5-10 26.5 6.5 12.5 14 14 23 12.5s14-16 16-23-9.5-29.5-29-16Z"
              data-name="45"
            />
            <path
              id="71"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M288.5 546.5c-5 1.5-16.1 11-12.5 21 4.5 12.5 9.5 17.5 21.5 16.5s23-19.5 24.5-23 2.5-7.5-4-11.5-13-8.5-18.5-7-6 2.5-11 4Z"
              data-name="71"
            />
            <path
              id="74"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M329.5 545.5c-2.833 2.667-7.9 9.3-5.5 14.5 3 6.5 6.5 6.5 9.5 6s8.5-7.5 8.5-10.5-3.5-20-12.5-10Z"
              data-name="74"
            />
            <path
              id="72"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M304 529.5c-1.833.333-5 2.1-3 6.5 2.5 5.5 15.5 13.5 20 13.5s11.5-7.5 9-12-19.5-12.5-26-8Z"
              data-name="72"
            />
            <path
              id="102"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M376.5 619.5c.167 4.5 1.5 14.2 5.5 17 5 3.5 20.5 1 24-2.5s7-16 4.5-20.5-5.5-8-8.5-9-6.5 1-10 4-6.5 2-9.5 3-6.227 5-6 8Z"
              data-name="102"
            />
            <path
              id="158"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M401.5 578.5c-1.2-3.6 4.5-11.833 7.5-15.5 4-4 9.5 2 12.5 6s0 13.5-3 14.5-15.5-.5-17-5Z"
              data-name="158"
            />
            <path
              id="75"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M333 517.5c-3.833 3.167-10.9 10.5-8.5 14.5 3 5 11.5 5.5 16 3.5s7-9.5 7-12.5-8.5-10-14.5-5.5Z"
              data-name="75"
            />
            <path
              id="77"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M369 556c-6.667 1.833-21 3.8-25-3-5-8.5 0-22 3.5-24.5s12-4 20-1.5 10.5 1 13.5 3 5 7 1.5 11-9 14.5-13.5 15Z"
              data-name="77"
            />
            <path
              id="76"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M346 565c-2 2.5-7.1 6.4-5.5 12 2 7 11.5 11.5 16.5 10.5s13-14 14-16.5-3.5-14-11.5-13-11.5 4.5-13.5 7Z"
              data-name="76"
            />
            <path
              id="155"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M343 593c-4.5 7-6.6 12.3 1 19.5 9.5 9 24 9 27 8s12.5-10 8-17.5-12.5-12.5-17.5-14-14-3-18.5 4Z"
              data-name="155"
            />
            <path
              id="156"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M374.5 571c-3.5 2.5-10.8 6.6-10 11 1 5.5 16 21.5 19 23.5s4.5 4 7.5 3 11.5-14 11.5-19-1-15-4.5-17.5-12.5-7.5-16.5-5.5-3.5 2-7 4.5Z"
              data-name="156"
            />
            <path
              id="204"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M322 333c-4.833 2.667-13.9 10.3-11.5 19.5 3 11.5 15 19.5 19 20.5s12.5-3 10-16.5S330 329 322 333Z"
              data-name="204"
            />
            <path
              id="50"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M285 359c-5.833 6.5-15 21.4-5 29 12.5 9.5 28 1 32-9.5S299 341 285 359Z"
              data-name="50"
            />
            <path
              id="40"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M263 345c-5.667 1.5-17 5.9-17 11.5 0 7 7 20 10 23.5s15 9.5 18.5 6-.5-15.5-1-19.5-.5-14.5-2-16.5-3-7.5-8.5-5Z"
              data-name="40"
            />
            <path
              id="37"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M217.5 362c-2.333 1.833-7.3 7.3-8.5 14.5-1.5 9-4 19.5-3.5 21.5s6.5 4 11 5 7.5 2.5 12 1.5 16.5-13 20-21.5 0-17-8-21.5-17-4.5-23 .5Z"
              data-name="37"
            />
            <path
              id="43"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M252.5 382.5c8.5 0 18.3 9.5 21.5 17.5 4 10 13 19.5 6.5 24.5s-19 4-25.5 0-18.5-22-16.5-28 5.5-14 14-14Z"
              data-name="43"
            />
            <path
              id="49"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M291 403.5c3.667-2.667 12.8-7 20-3 9 5 13.5 8 13.5 9.5s-6.5 2-7 3.5-.5 7-3 9-21.5 4-24.5 2-13.5-12.5 1-21Z"
              data-name="49"
            />
            <path
              id="201"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M315.5 380c-4.333 2.667-12.3 9.5-9.5 15.5 3.5 7.5 17 9 21 8.5s11.5-9.5 9.5-16-15-11-21-8Z"
              data-name="201"
            />
            <path
              id="202"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M339 397.5c3-.333 9.5-.4 11.5 2 2.5 3 4.5 7 0 10.5s-7.5 6-11.5 5.5-11.5-4.5-10.5-9.5 7-8.332 10.5-8.5Z"
              data-name="202"
            />
            <path
              id="203"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M320 415c-1.167 2.833-2.6 8.9 1 10.5 4.5 2 12.5 2 14 1s2.5-8.5-1.5-10.5-10.5-4.5-13.5-1Z"
              data-name="203"
            />
            <path
              id="36"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M204.5 422.5c-2.667 6.167-7.3 19.3-4.5 22.5 3.5 4 41-1.5 43-5 .781-1.367 3.24-4.869 5.113-9.076 2.087-8.622 1.124-12.843-4.113-19.424-9.889-12.428-25-10-29-5s-8.519 11-10.5 16Z"
              data-name="36"
            />
            <path
              id="107"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M470.5 696.5c-2.333 5.167-7 17.5-7 25.5 0 10 5.5 22 9.5 23.5s16.5 4.5 23-5 10-34 7-41-17.5-24.5-32.5-3Z"
              data-name="107"
            />
            <path
              id="105"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M448 685c-2.167 2.167-5.5 7.7-1.5 12.5 5 6 14.5-.5 18-5s2.5-21-16.5-7.5Z"
              data-name="105"
            />
            <path
              id="104"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M420 675.5c-4 4-4.8 8 0 12 6 5 17.5 1 20.5-2.5 1.368-1.596 1.453-9.079-3-11.5-5.311-2.888-13.5-2-17.5 2Z"
              data-name="104"
            />
            <path
              id="103"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M433 616c-4.5.833-14.9 4.6-20.5 13-7 10.5 3 18 7 20s16.5 2.5 20-7.5 1.5-29-6.5-25.5Z"
              data-name="103"
            />
            <path
              id="113"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M455 607c-4.167 2.667-11.6 9.8-8 17 4.5 9 13 2.5 15.5 0s6.5-21.5-7.5-17Z"
              data-name="113"
            />
            <path
              id="112"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M470 616c-2 3.333-6.5 10.2-8.5 11-2.5 1-4 7.5-2.5 12.5s28 27.5 38 27 22.5-16 20.5-24-31-28-33-28.5-10-3-14.5 2Z"
              data-name="112"
            />
            <path
              id="38"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M244.5 283.5c-3 3-28.9 29.5-28.5 33.5.5 5 22.5 22.5 25.5 22.5S271 312 271 305s-23.5-24.5-26.5-21.5Z"
              data-name="38"
            />
            <path
              id="51"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M273.5 304.5c12 3.167 35 9.5 37.5 13.5s13 17 2.5 27.5-23 10.5-26 10S257 332 256 329s11-22 17.5-24.5Z"
              data-name="51"
            />
            <path
              id="120"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M551.5 623c-2.667.833-7.3 3.9-4.5 9.5 3.5 7 9.5 7 14.5 6.5s8.5-7 6.5-11.5-12-7-16.5-4.5Z"
              data-name="120"
            />
            <path
              id="116"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M537.5 618c-5 6.167-15 19.1-15 21.5 0 3 3.5 8 8.5 7s16.5-19 16.5-21-6-10-10-7.5Z"
              data-name="116"
            />
            <path
              id="115"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M499.506 589.236c-2.5 3-14.1 19.5-14.5 21.5-.5 2.5 30.5 28 33.5 29s20.5-21 20-24-36.5-29.5-39-26.5Z"
              data-name="115"
            />
            <path
              id="121"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M572.5 598c-3 1.5-14 9.6-10 20 5 13 19 11 20.5 7s9.5-17.5 2-23.5-9.5-5-12.5-3.5Z"
              data-name="121"
            />
            <path
              id="126"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M600.5 618.5c-3.833-2.5-12.1-5.8-14.5 1-3 8.5 4 15.5 8 15.5s21-5.5 6.5-16.5Z"
              data-name="126"
            />
            <path
              id="127"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M619 619.5c-15 1.5-19.9 11.3-11.5 20.5 10.5 11.5 29.5 9.5 32.5 3.5s2.712-11.688-1.5-17c-3.512-4.43-12.679-7.682-19.5-7Z"
              data-name="127"
            />
            <path
              id="206"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M410 273c-4.5 5.167-13.1 18.6-11.5 31 2 15.5 3.5 28 7.5 33s13 9.5 18 9.5 11 0 14-4.5 2.5-9.5 0-16.5-8-41-7-47-4-10-7-10-10-.903-14 4.5Z"
              data-name="206"
            />
            <path
              id="231"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M404.5 259c0-8 4.167-17.5 7-22.5 3.5-4.5 5.5-4 10.5-5.5s10.5 1.5 14.5 9-.836 19.504-2.5 22c-3 4.5-13.5 7.5-21.5 8s-8-3.351-8-11Z"
              data-name="231"
            />
            <path
              id="147"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M715 475c1.333-2.833 4.4-8.9 6-10.5 2-2 11.5-8 14.5-8s12 2 10 9-5 18.5-11.5 22.5-13 2.5-16 .5-5.249-9-3-13.5Z"
              data-name="147"
            />
            <path
              id="149"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M669.5 463c-1 2.5-3 8-3 10 0 2.5 8 9.5 11 9.5s8-7.5 9-9.5 3.5-5 3.5-7.5-.5-5.5-2-6-2.5 1.5-4 1.5-2.5-1-4-2-9.7-.4-10.5 4Z"
              data-name="149"
            />
            <path
              id="289"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M681 418.5c-2.667 2.667-6.7 9.1-1.5 13.5 6.5 5.5 17.5-1 19-3s3-12.5-6-12.5-9 0-11.5 2Z"
              data-name="289"
            />
            <path
              id="188"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M659 751.5c-1.667 1.333-4 5.1 0 9.5 5 5.5 14 2.5 16.5 0s4-6 4-10.5S671 743 667 745s-6.409 4.5-8 6.5Z"
              data-name="188"
            />
            <path
              id="187"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M631 735.5c.667-2.167 2.9-6.5 6.5-6.5 4.5 0 16.5-1 15 5.5S650 744 645 744s-19 .5-14-8.5Z"
              data-name="187"
            />
            <path
              id="194"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M609 761.5c-2.5 5-2 6.8 0 10 2.5 4 14 2 16.5-2.5s3-11.5-1.5-12.5-12.5 0-15 5Z"
              data-name="194"
            />
            <path
              id="186"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M655.5 698.5c-3.333 2.5-9.1 9.1-5.5 15.5 4.5 8 13.5 11 18 7.5s11-12 9-16.5-12.5-15.5-21.5-6.5Z"
              data-name="186"
            />
            <path
              id="139"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M675 672c-2.667 2.333-8.5 6-8 14.5s8 25.5 19.5 26.5 23-9 25.5-10.5 14.5-11.5 8-22.5-24.5-22.5-45-8Z"
              data-name="139"
            />
            <path
              id="288"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M687.5 396.5c-3.167 1.333-9.4 4.9-9 8.5.5 4.5 3.5 8.5 9.5 10s11.5 2.5 13.5 6 5.5 3 8 .5 2.5-17-2-20-13.5-8-20-5Z"
              data-name="288"
            />
            <path
              id="291"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M644 408c2-3 5-6.2 9-7 5-1 10-4.5 15.5-2s10 9 10.5 12 .5 16.5-5 18-12 6-17 3-10-9-11-12-4-9-2-12Z"
              data-name="291"
            />
            <path
              id="233"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M465 336.5c3-5 4.3-22.4-6.5-28-13.5-7-19-5.5-21 1s3 23.5 9 27 15.5 5 18.5 0Z"
              data-name="233"
            />
            <path
              id="150"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M714 413.5c6.333-3.5 21.3-7.5 30.5 4.5 11.5 15 18 17.5 14.5 26.5s-14 8-18.5 7.5-21.5-4.5-26-13-7-22-.5-25.5Z"
              data-name="150"
            />
            <path
              id="184"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M737.5 722c-2.5 3.333-5.9 10.7.5 13.5 8 3.5 17-5 17-9s-.5-8.5-6.5-8.5-9.5 2.5-11 4Z"
              data-name="184"
            />
            <path
              id="138"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M735.5 664c-1.667 2-4.3 6.9-1.5 10.5 3.5 4.5 11 5.5 16-.5s5-13 0-14-12 .5-14.5 4Z"
              data-name="138"
            />
            <path
              id="137"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M709 647c-3.667 3.5-9.3 12.3-2.5 19.5 8.5 9 18.5 7 23.5 1.5s3.5-21-3-23-13.5-2.5-18 2Z"
              data-name="137"
            />
            <path
              id="136"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M697 604c-2 4.333-4.5 15.3 1.5 24.5 7.5 11.5 12 17 30.5 13s26-11 26-17.5-4.5-28.5-8-30.5-7.5-6.5-25 0-21 4.5-25 10.5Z"
              data-name="136"
            />
            <path
              id="270"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M710 361.5c-3 1.667-7.8 7.1-3 15.5 6 10.5 13 13.5 21 12.5s20-11 20-17 1-10-3.5-13.5-14-9.5-23-3-10.5 4.845-11.5 5.5Z"
              data-name="270"
            />
            <path
              id="272"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M688.5 383c0-1.5 10-8.2 12-9 2.5-1 11 11 11 13.5s-12 9.5-13.5 9.5-9.5-12.5-9.5-14Z"
              data-name="272"
            />
            <path
              id="287"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M712.5 389.5c4-.667 12.4-.6 14 5 2 7 2.5 11-.5 12.5s-7 3-9.5.5-8-7-7.5-11.5 1.5-6.27 3.5-6.5Z"
              data-name="287"
            />
            <path
              id="290"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M663 374c-2 4-5.3 13.1-2.5 17.5 3.5 5.5 17.5 14 21.5 7s8.5-20.5 3-23.5-17-8.5-22-1Z"
              data-name="290"
            />

            <path
              id="293"
              data-name="293"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M660.5 382c1.5-5 1-12 0-15s-9.5-4-20-6c-8.4-1.6-18.833 8.333-23 13.5-4 3.5-3 11-3 14.5s9.5 10.5 16 15.5 10 2 18-3.5c7.938-5.458 10.461-13.869 11.965-18.884m.035-.116-.035.116m.035-.116-.035.116"
            />

            <path
              id="286"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M731.5 393.5c2.167-3.667 7.9-11 13.5-11 7 0 16 3.5 14.5 9.5s-5.5 16.5-9 18-11 4-15 1-8-13-4-17.5Z"
              data-name="286"
            />
            <path
              id="234"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M472.5 289.5c-3.333.167-10 2.9-10 12.5 0 12 1.5 13.5 5 16s14 2 18 0 13.5-10 10-16.5-14.5-14.5-23-12Z"
              data-name="234"
            />
            <path
              id="297"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M520 348c1.5-4 3-12.9 11-10.5 10 3 27.5 10.5 29 20.5s-4 17.5-5.5 18.5-10.5 9.5-17 6.5-10-7-10-11-4.5-9-6-12.5-3-7.5-1.5-11.5Z"
              data-name="297"
            />
            <path
              id="66"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M197.5 724c.167-3.333 2.1-9.6 8.5-8 8 2 14.5 4 14 12.5s-6.5 8.5-9 8.5-15-3.5-13.5-13Z"
              data-name="66"
            />
            <path
              id="65"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M254.5 751c-1.333.5-3.9 2.4-3.5 6 .5 4.5 5 7.5 9 7.5s12.5-4.5 12.5-7.5-2-7-6.5-7.5-9-.472-11.5 1.5Z"
              data-name="65"
            />
            <path
              id="236"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M469.5 221c-6.5-1.5-16.5 1.5-21.5 2.5-2.734.547-4.845 4.395-6.174 8a35.084 35.084 0 0 0-1.326 4.5c-1.326 4.5-4.5 11-1.5 19s8.877 7 13 7c6 0 29.266-7.106 34-9 5-2 7-7.959 7-11 0-4-5-12-7-14s-10-5.5-16.5-7Z"
              data-name="236"
            />
            <path
              id="311"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M574.5 276.5c0 1.5 1.3 5.1 6.5 7.5 6.5 3 12 2 13 0s4.5-8 1-12-9.5-6.5-14.5-5-6 6.5-6 9.5Z"
              data-name="311"
            />
            <path
              id="235"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M467.5 271c.667-3.667 3-11.4 7-13 5-2 13-2 16 6.5s7 16 5.5 22-6 6.5-10.5 3.5-14.5-10.5-16-12.5-2-3.5-2-6.5Z"
              data-name="235"
            />
            <path
              id="232"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M442 267.5c-3.5 3.5-10.4 12.2-10 19 .5 8.5 5 12.5 8 14s15.5 6 26-7.5-4-26-6.5-27.5-11.5-5-17.5 2Z"
              data-name="232"
            />
            <path
              id="271"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M669 351c.5-1.5 8.4-15.7 18-12.5 12 4 19 4.5 20 11.5s-1 13-1.5 15-4.5 12.5-16.5 10-20.5-10-21-16 .5-6.5 1-8Z"
              data-name="271"
            />
            <path
              id="273"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M653 349c-2.167 2-6.1 7-4.5 11 2 5 11.5 7 15.5 1.5s6-11.5 1-14.5-9.5 0-12 2Z"
              data-name="273"
            />
            <path
              id="281"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M551 338.5c-.833 1.667-1.6 5.9 2 9.5 4.5 4.5 10.5 5.5 14.5 4s6.5-13.5.5-16-14-3.5-17 2.5Z"
              data-name="281"
            />
            <path
              id="278"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M577 340c-2 2.5-9.7 12.5-.5 22.5 11.5 12.5 29 13.5 35.5 12s20-13.5 20.5-16.5-2.5-13.5-17-17.5-18.5-12-27-8.5-9.5 5.5-11.5 8Z"
              data-name="278"
            />
            <path
              id="279"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M596.5 276c-1.5-5-1-6 3-8 5-2.5 12-2.5 13.5.5s11 14.5 11.5 19.5 0 9-2 10.5-5.5 5-10 1.5-14.5-19-16-24Z"
              data-name="279"
            />
            <path
              id="276"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M627.5 281c.667-2.833 3.6-8.4 10-8 8 .5 15.5 7 16.5 12.5s3 16.5 0 22.5-7 8.5-11.5 8-13.5-6-15-10-2.229-20.5 0-25Z"
              data-name="276"
            />
            <path
              id="275"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M659 299.5c3-.5 9.5-.9 13.5 3.5 5 5.5 8 7.5 6.5 10.5s-4 6-12.5 3.5-11.5-7-11.5-10.5 1-6.5 4-7Z"
              data-name="275"
            />
            <path
              id="274"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M654 328c2-4.5 5.9-13.536 13.5-11.5 9.5 2.545 20.193 4.362 18.5 10.681-1.693 6.319-4 12.819-12.5 15.319s-14 4-18 .5-3.5-10.5-1.5-15Z"
              data-name="274"
            />
            <path
              id="277"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M618.5 312.5c-2.667 2-7.1 8.3-3.5 17.5 4.5 11.5 5.5 15 11 17s15.5 0 18.5-3.5 11.5-9.5 7-18-13.5-11.5-18.5-14-9-3-14.5 1Z"
              data-name="277"
            />
            <path
              id="280"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M583 292.5c-2.333 2.667-6.3 9.3-3.5 14.5 3.5 6.5 15.5 15.5 21 16.5s14-3 14.5-7.5 1-15-5-21-12.5-9-15-9-9.5 1.5-12 6.5Z"
              data-name="280"
            />
            <path
              id="285"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M548 274.5c-2 2.5-4.2 8.3 1 17.5 6.5 11.5 7 15 14 15s16.5-8 18.5-12 3-9-1-12-19.5-9-24.5-10.5c-5.29-1.587-6-.5-8 2Z"
              data-name="285"
            />
            <path
              id="283"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M578 308.5c7.5 7 8.5 8 7.5 13s-6 10.5-8 11.5-13 3.5-17.5-3.5-3.5-14-1.5-16.5 12-11.5 19.5-4.5Z"
              data-name="283"
            />
            <path
              id="313"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M613.5 249.5c-5.2 2.4-4.833 8.333-4 11 1.5 5.5 7.5 13.5 17.5 15s19.5-7.5 21-9 4-8 1-15.5-15-6-18-6-11 1.5-17.5 4.5Z"
              data-name="313"
            />
            <path
              id="90"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M375 310.5c1.333-2.167 5.2-6.5 10-6.5 6 0 11 .5 12.5 3.5s2.5 8-1.5 10.5-6.5 6-11 4-12.5-7.5-10-11.5Z"
              data-name="90"
            />
            <path
              id="205"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M333 297.5c-1.333.167-4.1 1.6-4.5 6-.5 5.5-1.5 22.5-1 26s6.5 9 9.5 10 14 4.5 18 2.5 11.5-18 11.5-22 1-18.5-7-20.5-23.5-3.868-26.5-2Z"
              data-name="205"
            />
            <path
              id="52"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M295.5 277c3-2 13-6.4 21 0 10 8 16 12.5 13 22s-7 14-10 15.5-12 3.5-18.5-1-20-13.5-15-23 6.5-11.5 9.5-13.5Z"
              data-name="52"
            />
            <path
              id="257"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M609 181.5c0-3.6 3-5.833 4.5-6.5 3.096-2.5 6.851-.737 8.5.5 2 1.5 6 7.5 6 9.5s.5 9.5-3.5 10.5-8.5-1-11-2.5-4.5-7-4.5-11.5Z"
              data-name="257"
            />
            <path
              id="53"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M241 254c2-3.5 8.9-12.7 18.5-11.5 12 1.5 20 .5 23.5 2.5s6.5 7.5 8 12.5 2.5 4.5 2.5 11-7 14-9 17-15.5 9.5-28.5 3c-18.254-9.127-18-17-18-21.5s1-9.5 3-13Z"
              data-name="53"
            />
            <path
              id="249"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M557 186.5c-2.8-2.4-7.833-.333-10 1-4 2.5-2.5 10-1.5 13 .791 2.372 4 6.5 6.5 8s5 .5 7.5 0 4.5-3.5 5-8-4-11-7.5-14Z"
              data-name="249"
            />
            <path
              id="54"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M308.5 244.5c-10.4 1.6-12 6-13.5 9s-2.5 7-1.5 11 8.5 8.5 16.5 9 20-5 22.5-7 6-7.5 4.5-19-9.5-8.5-11-8-4.5 3-17.5 5Z"
              data-name="54"
            />
            <path
              id="304"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M484.937 204.947c-.4.8-8.5 8.666-12.5 12.5-3.628 3.5 16.5 8.5 18 7.5s7.5-6.5 8.5-10.5-2.5-8-5-9.5-8.5-1-9 0Z"
              data-name="304"
            />
            <path
              id="61"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M349.5 199c-9.2 0-17.167 11.5-20 17.5-5.5 13.5 0 17.5 5 22 4.846 4.361 42 19 47.5 19s7 1 15.5-6.5 13.5-14.5 11.5-22c-1.6-6-17.667-15.5-25.5-19.5-7.5-3.5-24.8-10.5-34-10.5Z"
              data-name="61"
            />
            <path
              id="246"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M558.5 223c-7.2-2-19.333 5.5-24.5 9.5-4 2.82-6.5 7.5-8 11.5s-.5 9 1 14 19.5 11.5 22.5 13 15.5 3.5 20 2.5 17-13 18-20.5-5.5-14.5-7.5-18-12.5-9.5-21.5-12Z"
              data-name="246"
            />
            <path
              id="312"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M595 252c-4.8 0-7.667 3.667-8.5 5.5-1.5 2.232-1.5 8 2.5 11.5s8.45 2.525 12.5.5c4-2 6.448-9.139 5-13-1.5-4-5.5-4.5-11.5-4.5Z"
              data-name="312"
            />
            <path
              id="324"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M584 223.5c1.6-6.4 7.667-9.667 10.5-10.5 2.167-.833 7.3-2.5 10.5-2.5 4 0 10.5 2.5 14.5 5.5s4.5 13.5 4 20.5-12.5 16.5-22.5 16-14-7.5-16-10-3-11-1-19Z"
              data-name="324"
            />
            <path
              id="302"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M400.5 214c-5.2-1.2-7.167-6.5-7.5-9 0-6 4.5-8.5 8.5-10.5s8 .5 12.5 3 2.5 10 .5 13-7.5 5-14 3.5Z"
              data-name="302"
            />
            <path
              id="303"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M414.5 211.5c0-6.4 6.667-8.333 10-8.5 4 0 10 1 15.5 4s4.5 6.5 4.5 15.5-8.5 9-13 9-13.5-6-15.5-9-1.5-3-1.5-11Z"
              data-name="303"
            />
            <path
              id="260"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M647 227.5c-5.2-.8-11.879 3.638-13 7-1 3 .5 4 2 7s13.5 8.5 15.5 8.5 6 1 10-2.5-.5-11-1.5-13-6.5-6-13-7Z"
              data-name="260"
            />
            <path
              id="308"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M495.5 230c-2.4-6 2.667-11.5 5.5-13.5 2-1.705 6.5-3.5 11-3.5s7 0 14.5 3.5S531 231 531 233s-2 9.5-8.5 14.5-13-1-17-2-7-8-10-15.5Z"
              data-name="308"
            />
            <path
              id="258"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M618.5 215c-3.2-6.4-2-11.333-1-13 .862-2.5 3.5-4.5 7-7s8.5 1.5 9.5 2.5 6 5.5 8 7 6.5 5 8.5 8.5-.5 10.5-4.5 13.5-13.5 2.5-16.5 2-7-5.5-11-13.5Z"
              data-name="258"
            />
            <path
              id="299"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M502.5 306c-2.4 2-15 23.167-21 33.5-2.63 4.5 4.5 12 9 16.5s10 3.5 14 2 32.5-33 35.5-42-13-16-17-19-17.5 6.5-20.5 9Z"
              data-name="299"
            />
            <path
              id="259"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M637.5 160c-3.2 0-11 7-14.5 10.5-2.075 2 .5 6 3.5 10.5s9.231 8.551 13.5 9.5c4.5 1 12.5-5.5 13.5-10.5s-2.5-8.5-6-14.5-6-5.5-10-5.5Z"
              data-name="259"
            />
            <path
              id="307"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M516.5 287.5c-1.2-4-4.102-13.34-.5-19 3.5-5.5 9-5 14.5-4.5 4.482.408 10 3.5 13.5 6s-.5 16.5-1 18.5-11.5 10.5-14.5 10.5-10.5-6.5-12-11.5Z"
              data-name="307"
            />
            <path
              id="255"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M582 172.5c-10.8-3.2-18.167 6.333-20.5 11.5-2.724 4.5 3.5 13.5 5 14.5s12.5 8 18.5 10.5 18.5 1.5 21 .5 5-4 6.5-5.5 1.5-6 0-9.5-5-9-7-11-10-7-23.5-11Z"
              data-name="255"
            />
            <path
              id="238"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M429 189c-2-4 .833-10 2.5-12.5 12-13.5 19 2.5 18.5 5.5-.443 2.656-5.5 10-9 12s-9.5 0-12-5Z"
              data-name="238"
            />
            <path
              id="245"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M528.5 216c-2.4-6 2.333-11.167 5-13 6.5-4.5 14.59 1.605 17.5 5 3 3.5 3.5 9.5 3 12.5s-10 5.5-14.5 5.5-8-2.5-11-10Z"
              data-name="245"
            />
            <path
              id="248"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M543.5 152.5c-3.6-.4-9.167 2.833-11.5 4.5-2 1.5-3 4-4 6-1.414 2.828-5 15.5 7.5 20.5s19.5 2 22.5 1.5 9.5-9 10-15-4-11.5-8-16-12-1-16.5-1.5Z"
              data-name="248"
            />
            <path
              id="247"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M523 117c-7.2.4-9.6 7.5-11 11-2 5 .5 16.5 1 17s4 9 15 9.5 13-3 18.5-6 4-13 4-14-.5-6 .5-6.5.5-4 0-5.5-4-3-4.5-3-4-1-5.5-1.5-9-1.5-18-1Z"
              data-name="247"
            />
            <path
              id="57"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M325.5 115.5c-6.8.8-15.5 12-19 17.5-1.909 3-5.1 8.4-3.5 20 2 14.5 13 17 17 18s12.5 2 25-4 14-20 14.5-25.5-8.5-16-13-20.5-12.5-6.5-21-5.5Z"
              data-name="57"
            />
            <path
              id="60"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M390 150c-7.2.4-16.667 12.167-20.5 18-2 3.5 0 6 0 9s5 15 8.5 17.5 20 1.5 22 1.5 17-.5 25-8.5 4-16.5 3.5-21-4.5-10.5-11.5-15-18-2-27-1.5Z"
              data-name="60"
            />
            <path
              id="55"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M295.5 223c2.4-9.2 11-11.5 15-11.5 16 0 16.5 12.5 16.5 14s-2 15.5-13.5 16.5-21-7.5-18-19Z"
              data-name="55"
            />
            <path
              id="141"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M788.5 588.5c-6-5.2-2.5-13.249-1.5-20 2-13.504 6.562-15.552 15.5-14.5 8.5 1 11 1.5 14.5 14.5s-1.5 20-3.5 23-17.5 3.5-25-3Z"
              data-name="141"
            />
            <path
              id="56"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M303 199c-2.8-4.8-2.714-20-1-22 3-3.5 8.5-6.5 15.5-6s12 6.5 20 13.5 5 17.5 5 19-9 9.5-19.5 9.5-16.5-8-20-14Z"
              data-name="56"
            />
            <path
              id="59"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M373.5 103.5c-3.6-.8-10.167 1-13 2-4 1.183-5 3.5-6 4.5s-2.5 6-2 13 7.5 15 9 16 8.5 7 13.5 9.5 10 3 13.5 2 9-8.5 10.5-14.5-3.5-13-7-20-14-11.5-18.5-12.5Z"
              data-name="59"
            />
            <path
              id="58"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M357.5 167.5c-8-3.6-18 2-20.5 5-1.623 1.947 2 12.5 3.5 15.5s6 7.5 10.5 10 12.5 1 18.5-2.5.5-15.5 0-16.5-2-7-12-11.5Z"
              data-name="58"
            />
            <path
              id="244"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M515 178c-5.2-1.2-10.249 1.208-13 3.5-3 2.5-1.5 3-3.5 9.5s1 10.5 2 15.5 7.5 6 12 6 14-6 22-9.5 12.5-13 11-16-12-3.5-15-4-9-3.5-15.5-5Z"
              data-name="244"
            />
            <path
              id="237"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M470.5 163c9.2-7.6 19.833-4.5 24-2 4 1.745 6.5 8 6 17.5s-8 12.5-23.5 29.5-21 12.5-24.5 12-9.5-6-12-14 8-19 8-20 10.5-13.5 22-23Z"
              data-name="237"
            />
            <path
              id="284"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M551 297.5c-4-6.5-11.278-4-13.5-1.5-4 4.5-1 7.5.5 10.5s5.5 7.5 9 8c2 .286 5.5 2 7.5-4s1.423-4.999-3.5-13Z"
              data-name="284"
            />
            <path
              id="254"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M578 161.5c-3.6-2.8-3.833-7.167-3.5-9 0-2.837 5.5-7.5 11.5-10s17 6.5 27.5 12 2.5 13 2.5 15-4.5 9.5-16 8.5-17.5-13-22-16.5Z"
              data-name="254"
            />
            <path
              id="306"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M498.5 291c-3.6-6.8-1.167-10.167.5-11 1.549-1.5 4-1 9-1s7 8.5 8.5 12-2.5 7.5-5 8.5-8.5 0-13-8.5Z"
              data-name="306"
            />
            <path
              id="301"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M411 117c-2.8-1.6-5.5-.667-6.5 0-.833.5-3.1 2.8-5.5 8-3 6.5 1 16.5 3 18.5s5.5 6 9 6.5 4-1 9.5-2.5 8-6.5 9.5-9.5 2-8.5.5-12-10-3.5-12-3.5-4-3.5-7.5-5.5Z"
              data-name="301"
            />
            <path
              id="242"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M510.5 141.5c-2.8-2-7.833-1.167-10-.5-.5.143-2.5 1-3.5 1.5s-4.5 4-5 6 .5 5.5 1.5 7.5 6 4.5 10 4.5 6.5-2 9.5-5 1-8 1-8.5 0-3-3.5-5.5Z"
              data-name="242"
            />
            <path
              id="241"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M490 111.5c-3 0-10 1-11.5 2.5s-11 24-12.5 28c-1.2 3.2 1.833 7.333 3.5 9 4 1.833 12.7 5.8 15.5 7 2.8 1.2 4.5-.167 5-1l11-23.5c1.167-2.5 3.4-8.5 3-12.5-.4-4-11-9.5-14-9.5Z"
              data-name="241"
            />
            <path
              id="144"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M791 493.5c-11 1.5-19.5 17-17.5 23.5 8 18.5 22 13 26 11 3.162-1.581 12-8.5 13-16s-8.61-20.258-21.5-18.5Z"
              data-name="144"
            />
            <path
              id="26"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M193.5 617.5c-5.6-1.6-10.333 4.667-12 8-2.5 3.783 0 9.5 1.5 11.5s6.5 5.5 14.5-3 3-14.5-4-16.5Z"
              data-name="26"
            />
            <path
              id="239"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M448.5 129.5c-6.8-1.6-12.167.333-14 1.5-5 2.5-5 14.5-5 19.5 0 4.955.982 6.473 6.353 14.772l.147.228c5.5 8.5 14 9 17 9s7 1 13.5-12S463 139 462 137s-5-5.5-13.5-7.5Z"
              data-name="239"
            />
            <path
              id="265"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M724.5 216.5c1.6-7.2 10.667-10 15-10.5 4-.855 7.5 2.5 8 4s5.5 8 9 8 8 7 8.5 13-12.5 14.5-19.5 17-14.163-3.116-15-5c-2-4.5-7-7.5-8.5-13s.5-4.5 2.5-13.5Z"
              data-name="265"
            />
            <path
              id="148"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M768.5 483c-6 3.2-14.833-4-18.5-8-2-6.5-2.5-9-1.5-16s7.664-10.955 15.5-12c7.5-1 12.5 4.5 16.5 9.5s-4.5 22.5-12 26.5Z"
              data-name="148"
            />
            <path
              id="240"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M459 113.5c-3.6 0-7.5 2-9.5 4.5-1.127 1.409-.5 2-.5 6 0 5 4.5 8.5 6 9s12 2.5 15-1.5 1.5-7.5 1-10-7.5-8-12-8Z"
              data-name="240"
            />
            <path
              id="84"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M414 490.5c.8-1.2 8-4.5 11.5-6 2.5-1.101 9 10 10 12.5s-.5 3.5-1.5 4.5-11.5 5.5-12.5 5.5-6-7.5-6.5-9-2-6-1-7.5Z"
              data-name="84"
            />
            <path
              id="252"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M625 124c0-8.4 8.333-9.167 12.5-8.5.833 0 3.3.5 6.5 2.5 4 2.5 6 12.5 6.5 20.5s-13 9-16.5 8-9-12-9-22.5Z"
              data-name="252"
            />
            <path
              id="251"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M583.5 116c1.2-.8 5.167-7.667 7-11 4-5 8-3.5 14-4.5s14 9.5 18 14.5-.5 14.5-4.5 22-14 9.5-19.5 10-15.5-13-18.5-19 2-11 3.5-12Z"
              data-name="251"
            />
            <path
              id="282"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M553 317c-3.2-4-9.5 1-12.5 3.5-2.28 1.9-4.5 5-4.5 9s5.5 7 8 7 9-3 11.5-6S557 322 553 317Z"
              data-name="282"
            />
            <path
              id="256"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M636.5 150.5c.4 2.8-3.833 10.167-6 13.5-2.957 5-9 1.5-11.5 0s-4.5-10.5-5.5-16.5 2.5-5.5 6-8.5 7.5 1.5 9 3.5 7.5 4.5 8 8Z"
              data-name="256"
            />
            <path
              id="261"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M647 160.5c-.8-5.2 0-4 2.5-7.5 5.984-8.378 15-6 18.5-4s6 8.5 6 18.5-8 12.5-11 12.5-15-13-16-19.5Z"
              data-name="261"
            />
            <path
              id="24"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M176 621c-13.206 0-14.75-6-15.5-9-2-8 5.985-21.805 17-18.5 10 3 13.5 14 15 18.5s-10 9-16.5 9Z"
              data-name="24"
            />
            <path
              id="266"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M684 282c-1.2-8.4 4.833-16.167 8-19 2.768-3 4-2.5 14.5-2s11 14 11 21-10 15-17.5 15-14.5-4.5-16-15Z"
              data-name="266"
            />
            <path
              id="262"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M697.5 158.5c-4-10.8-3.356-27.724-2-29 8.5-8 19-1 25.5 2.5 5.319 2.864 9.5 13 10.5 21.5S721 170 715.5 172s-13 0-18-13.5Z"
              data-name="262"
            />
            <path
              id="264"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M674 201.5c0-2 7-7.833 10.5-10.5 3-2.387 20 15.5 20 19s-10 12-12 13-5-2.5-11-8-7.5-11-7.5-13.5Z"
              data-name="264"
            />
            <path
              id="263"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M666 182c-6.8-2.4-14.833 3-18 6-4 4-2 10-2 17s8.5 10.5 13 12.5 7-2.5 7.5-4.5 7-12.5 10-15.5 2-5 2-7.5-4-5-12.5-8Z"
              data-name="263"
            />
            <path
              id="27"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M143.5 695c-9.732 0-18.5 6-18.5 11.5 0 6 14 25.5 20 32.5s12.5 6 19 4c3.853-1.185 15.5-13.5 17-17.5s-.623-8.803-3.5-12c-4.5-5-25.5-18.5-34-18.5Z"
              data-name="27"
            />
            <path
              id="253"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M670 109.5c-2.5.5-4.5 4-6.5 5.5-.989.742-9.165 1.665-12.5 5-4 4-2.5 8.5 0 13.5 1.628 3.256 18.543 20.471 24.5 16.5 4.5-3 8.5-21.5 8-31.5s-11.049-9.49-13.5-9Z"
              data-name="253"
            />
            <path
              id="140"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M750.5 650c-1.6-12.4 15.871-26.175 21.5-25.5 12.5 1.5 62 44 68 50 3.482 3.482 5.5 24 0 28.5s-28.5-11.5-40.5-17-47-20.5-49-36Z"
              data-name="140"
            />
            <path
              id="268"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M747 325c-4.4-2.4-7.5-10.333-8.5-14 0-5.5 4.5-8 8.5-11.5s11-6 20.5-6 17.5 13 22 19 6.5 18.5 6 23.5c-.398 3.98-9 12-12.5 12.5s-7.5-2.5-9-5-21.5-15.5-27-18.5Z"
              data-name="268"
            />
            <path
              id="22"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M135.5 512.5c-12 6-9.333 19.833-6.5 26 1.565 4.5 10 12 20 12.5s18.5-4.5 32.5-12.5 10-17 8-25-15.5-10.5-21-11-18 2.5-33 10Z"
              data-name="22"
            />
            <path
              id="12"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M237.297 199.564c-2.4-12.8 10.333-15 17-14.5 4.5 1 6.5 1.5 11 7.5s-1.5 14-6 17.5-19 5.5-22-10.5Z"
              data-name="12"
            />
            <path
              id="9"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M198.224 180.226c1.6-15.6 27-21.5 33.5-20 10 3.5 12.5 12 8.5 26s-27 16-29.5 16-14.5-2.5-12.5-22Z"
              data-name="9"
            />
            <path
              id="25"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M123 638.5c-8.4-4.8-6.72-17.67-4.5-21 1-1.5 4-4.5 14-6 14.399-2.16 38.5 10.5 44 16s-1 19-10.5 22.5-32.5-5.5-43-11.5Z"
              data-name="25"
            />
            <path
              id="20"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M158 477c-8.4-4.4-27-26-23.5-29.5 18.791-18.792 29.5-14.5 33-12.5 3.039 1.737 12 22.5 15.5 26s3.5 14 0 17-14.5 4.5-25-1Z"
              data-name="20"
            />
            <path
              id="23"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M118.5 586c-.4-14.8 15.833-24.167 24-27 20.5-1.5 28.5 17 29 27s-17 16-20.5 17-32 1.5-32.5-17Z"
              data-name="23"
            />
            <path
              id="19"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M169 435c1.2 8.4 23.067 13 25 11 14.5-15-10-35-20.5-32-6.25 1.786-6 10.5-4.5 21Z"
              data-name="19"
            />
            <path
              id="10"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M285.477 161.03c-1.819 21.822-18.5 25.333-25.5 24.5-13.5-3.5-21-6-18.5-32s46-16.5 44 7.5Z"
              data-name="10"
            />
            <path
              id="269"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M824 388c-1.6-4.8-8-7.667-11-8.5-6 0-8 3.5-10 5.5s-5.5 13-2 15c2.8 1.6 5 12.5 7.5 17 1.389 2.5 6.2 1.9 7 1.5 1-.5 6.5-3.5 8.5-3.5s3 1.5 11-3.5-.5-14-1.5-16-7.5-1.5-9.5-7.5Z"
              data-name="269"
            />
            <path
              id="17"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M115.189 394.177c-1.6-8.8 7.334-15 12-17 5.5-2 2-1 11.5-3s16 13.5 17 16.5.5 7-7.5 14-22.5 5-25 4.5-6-4-8-15Z"
              data-name="17"
            />
            <path
              id="185"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M800.5 739c-1.5.5-3.957 2.415-4.5 3.5-1 2-1.5 7-2 10.5s2 5 3 5.5 8 2.5 13 2 5.5-5 7-10c1.2-4-1.5-7.667-3-9-1.5-1-1.5-.5-3.5-1-2.612-.653-8.577-1.974-10-1.5Z"
              data-name="185"
            />
            <path
              id="18"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M157.364 391.5c-.5 7-4 10.5-6 14-3.119 4 14.5 9.5 26.5 8.5 11.632-.969 15.5-13 14.5-23.5s-19-12.5-24.5-12.5-9.894 5.022-10.5 13.5Z"
              data-name="18"
            />
            <path
              id="267"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M789.5 262.5c-4.8-12.4 3-19.5 7.5-21.5 13-8 22.604 9.006 27 15 5.5 7.5 12.5 23.5 12 32.5s-11.5 9-17.5 9-23-19.5-29-35Z"
              data-name="267"
            />
            <path
              id="223"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M547.878 766.5c-6.8-8.8 0-16.5 4.5-16.5 18.5 0 15.5 11 14.5 15s-10.5 12.5-19 1.5Z"
              data-name="223"
            />
            <path
              id="5"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M557.5 32c-8 0-13 7.667-14.5 11.5-1.218 2.5 0 9 9.5 15s19 4 24 0 .5-16 0-20.5-9-6-19-6Z"
              data-name="5"
            />
            <path
              id="4"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M518.5 57.5c-4-.8-7.333 3-8.5 5-1 1.43 0 4.5 1 8s10.5 5 13.5 5 8-3 8.5-9.5-9.5-7.5-14.5-8.5Z"
              data-name="4"
            />
            <path
              id="190"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M746 790.5c-.8-7.2 5-10.667 8-11.5 5-1 7 4.5 7 11s-7 11-8.5 11-5.5-1.5-6.5-10.5Z"
              data-name="190"
            />
            <path
              id="195"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M638 804c-1.5-3.5 1.133-6.133 4-9 2.5-2.5 4.56-4.625 13-3.5 7.5 1 4 12.5-1 17s-13.201 2.032-16-4.5Z"
              data-name="195"
            />
            <path
              id="63"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M263.574 824c-1.6-4.4.5-8 2-9.5s1.999-2.5 7-2.5c5.024 0 7.499 1.5 11 3.5 3.16 1.806 3.5 8.5 1.5 12.5-1.6 3.2-7.334 3.667-10 3.5-3.167-.667-9.9-3.1-11.5-7.5Z"
              data-name="63"
            />
            <path
              id="189"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M711.087 785.179c-4.4-5.2-.833-10.5 1.5-12.5 3-2.5 6-2.5 12.5 2s2 11 0 13.5-8.5 3.5-14-3Z"
              data-name="189"
            />
            <path
              id="30"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M207 781.5c-1.6 0-5.5 2-7.5 4-2.186 2.186-2.406 4.514-3 6-1 2.5-3 6 4.5 11s11-3 12.5-5c1.082-1.442 4-7 3.5-11s-8-5-10-5Z"
              data-name="30"
            />
            <path
              id="197"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M646.068 843.632c-.8-5.2 5.667-9.167 9-10.5 3-1.518 4.5-1.501 7.5 0 2.683 1.341 3 6 2 10.5s-9.5 7.5-12.5 7.5-5-1-6-7.5Z"
              data-name="197"
            />
            <path
              id="196"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M684.5 827c-1 1-2.5 3.667-3.5 5-1.5 3.5 3.5 8 6 9.5s6 1.5 10-2.5 2-10.5 1-12c-.877-1.316-6.238-3.762-7.5-2.5-1.5 1.5-5.209 1.709-6 2.5Z"
              data-name="196"
            />
            <path
              id="217"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M567 825.5c-2.8-4.4 1.5-8.5 4-10 1.684-1.227 4.5-1 7.5-1s9 5.5 9.5 9-3 7.5-8.5 9.5-9-2-12.5-7.5Z"
              data-name="217"
            />
            <path
              id="108"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M459.319 788.864c-5.6-1.6-4.974-7.531-2.5-10.5 2.5-3.001 2.638-1.916 7.5-4 3.5-1.501 9.5 2 12.5 4s1 7.5-2 10.5-8.5 2-15.5 0Z"
              data-name="108"
            />
            <path
              id="109"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M481.259 762.019c-6-.4-8.5 5.5-9 8.5-1.716 4.5 5.5 7.5 10 9.5s10-2 12.5-8.5-6-9-13.5-9.5Z"
              data-name="109"
            />
            <path
              id="110"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M494.5 785c-5.2-5.2.5-13.167 4-16.5 5.5-4 7-2.5 13-3.5s8 8.5 8.5 15.5-7.5 10.5-12.5 11.5-6.5-.5-13-7Z"
              data-name="110"
            />
            <path
              id="226"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M398.073 799.12c-8 1.6-8.666 12-8 17 0 6.274 8.5 11 17 14s12.5-1 15.5-4.5c2.183-2.547 4-9.5 3.5-14.5s-7.113-10.484-10.5-11.5c-5-1.5-7.5-2.5-17.5-.5Z"
              data-name="226"
            />
            <path
              id="198"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M597.563 849.968c-2.8-3.2-1.225-5.867 0-7.5 1.5-2 1.5-2 5.5-4 4.123-2.062 6-1.5 9.5-1 2.97.424 4.5 3 5 8s-5 8-9 9-7.5-.5-11-4.5Z"
              data-name="198"
            />
            <path
              id="200"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M594.463 869c-3.2 0-7.334 3.667-9 5.5-1.5 2.5 1 3.5 2.5 4.5s6.5 2 8.5 1.5 6-3.5 6.5-7-4.5-4.5-8.5-4.5Z"
              data-name="200"
            />
            <path
              id="199"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M625.691 874.89c-4-4.4-3-9.125-.5-11 2-1.5 6.6-4.3 11-5.5 5.5-1.5 9 1.5 12.5 6s-1 9.5-5 13-13 3-18-2.5Z"
              data-name="199"
            />
            <path
              id="216"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M698.016 886.97c-6.753-.468-10.158-8.673-11.016-12.717 0-2.485 1.558-3.417 5.866-5.263 4.435-1.9 12.59-.585 15.451 0 2.245.459 4.435 3.07 5.58 6.724 1.144 3.655-7.44 11.841-15.881 11.256Z"
              data-name="216"
            />
            <path
              id="191"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M820 849c-.8-5.2 3.5-6.953 6.5-8 3-1.047 6.5-1 9 0 2.321.929 4.5 5.5 4.5 9s-7 7.5-10 8-9-2.5-10-9Z"
              data-name="191"
            />
            <path
              id="331"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M922.343 667.343c-1.375-9.635 1.718-14.338 3.436-15.485 3.437-2.867 5.155 1.721 6.874 9.75 1.718 8.029-3.437 16.631-4.583 17.205-1.145.573-4.009.573-5.727-11.47Z"
              data-name="331"
            />
            <path
              id="332"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M946.5 689.5c-1.375-9.635 2.841-15.71 6-16.5 4-1 4.782 1.971 6.5 10s-4.784 16.239-5.93 16.813c-1.145.573-4.852 1.731-6.57-10.313Z"
              data-name="332"
            />
            <path
              id="330"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M986.067 520.968c-1.002 3.902-4.176 5.342-5.637 5.574-1.917.697-8.143.697-10.022-.697-1.879-1.393-2.124-4.29.792-7.92 3.116-3.877 6.417-3.925 11.735-3.925 5.188 0 4.385 2.09 3.132 6.968Z"
              data-name="330"
            />
            <path
              id="214"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M742.957 863.724c-1.878-.357-2.46-6.934-1.503-7.843 1.128-1.069 1.428-.998 4.133-2.139 3.381-1.426 5.635-.713 9.017 1.426 3.078 1.947.375 6.06-1.503 7.486-1.879 1.426-7.338 1.602-10.144 1.07Z"
              data-name="214"
            />
            <path
              id="215"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M731.448 871.897c-1.379-.773-1.666-6.212-.671-6.711 1.171-.586 1.889-1.384 4.317-1.624 3.036-.3 4.613 1.351 6.695 3.969 1.896 2.384-1.326 5.057-3.182 5.743-1.856.685-5.099-.221-7.159-1.377Z"
              data-name="215"
            />
            <path
              id="62"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M213.733 843.696c-3.97-4.316 0-8.542.902-9.441.776-.773 2.881-1.798 3.343-1.97 2.071-.774 3.158 0 7.67 2.697 4.511 2.697 1.619 6.915-1.088 10.512-2.706 3.596-5.865 3.596-10.827-1.798Z"
              data-name="62"
            />
            <path
              id="192"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M776.071 835.531c-2.8-2-2.166-5.833-1.5-7.5.424-1.5 1-3.5 3.5-6.5s6.5-2.5 10-2.5 4.5 5 5.5 8-3.5 8-6.5 10.5-7.5.5-11-2Z"
              data-name="192"
            />
            <path
              id="28"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M123 808.5c-.4-5.6 3-7.5 5-9 3.5-2.5 6.5-1 11.5.5 4.813 1.444 5 7.5 3 16s-10.5 5-13.5 4.5-5.5-5-6-12Z"
              data-name="28"
            />
            <path
              id="229"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M334 825.5c1.2 0 10.167-3.667 14.5-5.5 3 0 2.5 3.5 4.5 6.5.877 1.316 9 7.5 12 9s3 7.5 2.5 11-6.5 3.5-8.5 4.5-15 9.5-23.5 12-18-1.5-20-9 4-16.5 5.5-22 11.5-6.5 13-6.5Z"
              data-name="229"
            />
            <path
              id="224"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M526.149 862.437c.757-4.917 7.564-8.667 10.874-9.927 2.836-1.31 5.2 0 6.618 2.836 1.418 2.836-1.719 7.939-3.309 9.927-1.891 2.363-7.564 4.727-9.455 4.727s-5.673-1.418-4.728-7.563Z"
              data-name="224"
            />
            <path
              id="225"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M514.019 881.023c4.8-1.2 4.5-6.5 4.5-9 0-1.019 0-1.999-2.5-5-1.154-1.384-6-1.5-11.5.5s-5 7-5.5 12.5 9 2.5 15 1Z"
              data-name="225"
            />
            <path
              id="230"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M304 876c0-6.4 8-10 12-11 4.131-1.5 7 0 11.5 2.5 3.734 2.075 8 6 3.5 17s-16.5 7.5-21 7.5-6-8-6-16Z"
              data-name="230"
            />
            <path
              id="315"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M874 370.5c-1.2-8.4 1.083-11.681 3-12 3-.5 3.5 4.91 3.5 10.5 0 6-.5 10.5-3 11.5-1.914.766-2 .5-3.5-10Z"
              data-name="315"
            />
            <path
              id="318"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M876 422c.448-4.478-2-10.5-1-12.5s2-4 4-4 1.5 15 2.5 17-1.5 9-4.5 10.5-1.5-6-1-11Z"
              data-name="318"
            />
            <path
              id="316"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M874.292 334.682c-2.4-11.2-1.487-19.277 3-20.5 5.5-1.5 3.5 6.5 5 16 1.2 7.6 0 18.5-3.5 18.5-2.5 0-2.1-2.8-4.5-14Z"
              data-name="316"
            />
            <path
              id="319"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M632.5 6H592l1.5 40.5H635L632.5 6Z"
              data-name="319"
            />
            <path
              id="2"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M336 47.5 335 6h49l2 42.5-50-1Z"
              data-name="2"
            />
            <path
              id="1"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M242 21.5c-9.6-1.2-15.333 11.167-17 17.5-1.754 5 3.5 15.5 5.5 17.5s11.5 3 16.5 3 4 3 16.5 9 14.5-5.5 18.5-9-2-13-5-21.5-23-15-35-16.5Z"
              data-name="1"
            />
            <path
              id="8"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M228.5 96c0-7.2-1-13.5 6-17.5 10.5-3 28 1.5 34 6 5.727 4.295 7 23.5 8 31s-8.5 21.5-19 22-20-14.5-24-18-5-14.5-5-23.5Z"
              data-name="8"
            />
            <path
              id="7"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M120 118c-1.2-6.4 4.833-14 8-17 5-2 6.219-3.977 16.5-2 13 2.5 16.5 7.5 19.5 12 1.776 2.664 3 15.5-5 23.5-7.984 7.984-16.466 4.514-27.434.027l-.066-.027c-11-4.5-10-8.5-11.5-16.5Z"
              data-name="7"
            />
            <path
              id="317"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M874.5 294.5c-1.213-7.275.5-12.333 3-14 3-2 3 9 3 11.5 0 4-1 12.5-3 12.5s-1.5-1-3-10Z"
              data-name="317"
            />
            <path
              id="228"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M370 878.5c2.4-4.4 6-5.833 7.5-6 6-1.5 11 0 13.5 8 2 6.4-3.5 7.333-6.5 7-5.833-1.167-16.9-4.6-14.5-9Z"
              data-name="228"
            />
            <path
              id="3"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M438.5 22.5c-12.4 2.4-13.5 13-12.5 18 2 6.5 11.154 8.507 17.5 10 8.5 2 13 5.9 19 8.9 4.472 2.237 7 1.6 15 0 4.44-.887 13-12.9 12.5-20.9-.5-8-7.964-11.465-11.5-15-4.5-4.5-24.5-4-40-1Z"
              data-name="3"
            />
            <path
              id="227"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M406 863.5c-.4-4.4 9.833-12.833 15-16.5 6.928-5.5 30 23.5 31 26.5s-6 11.5-13 14c-7.187 2.567-7.5 2.5-11 0-5.474-3.91-21.5-18.5-22-24Z"
              data-name="227"
            />
            <path
              id="92"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M405 457c.4-.8 14.5-13.333 21.5-19.5 1.5 0 28.5 28 28 29.5s-19.5 19.5-22 20-28-29-27.5-30Z"
              data-name="92"
            />
            <path
              id="91"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M445.5 503c-.4 0-7.5-7.667-11-11.5-.915-1-.5-4 0-5s22.5-21 24-21 3.5-.5 4.5 0 12.5 11.5 12.5 12.5-.5 9.5-1 10-16.5 15-18.5 15h-10.5Z"
              data-name="91"
            />
            <path
              id="219"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M466.5 849.5c-.4-8 6.5-9.667 10-9.5 5.5 0 6.5 7.5 6 11s-5 14-10.5 12.5-5-4-5.5-14Z"
              data-name="219"
            />
            <path
              id="97"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M466 460.5c-.5 1-.792 1.23-1.5 3-1 2.5.5 3.5 3.5 7s6.5 5.5 8.5 5.5 4.5-2 5.5-5.5-1-7-1.5-9.5 0-2 .5-8-6.5-7-9-7-5.5 4.5-5.5 7 .171 6.158-.5 7.5Z"
              data-name="97"
            />
            <path
              id="218"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M506.638 827.654c-6-4.8-3-13-2-14.5 2.774-4.16 4-4.5 6.5-5 4.651-.931 6.5 2.5 9.5 6.5s0 10.5-3 14-3.5 5-11-1Z"
              data-name="218"
            />
            <path
              id="6"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M653 55.5c-5.2-4.8-5.5-12-3.5-18.5.462-1.5 2-4.2 8-7 7.5-3.5 14.5 0 22.5 2s16 14 16 23.5-11 12-19 12-17.5-6-24-12Z"
              data-name="6"
            />
            <path
              id="16"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M121 337c-4.4 1.2-5.5 5.5-5.5 7.5-.605 3 8 23.5 9 25.5s2.5 5.5 15.5 3 12.988-16.566 12-22c-1-5.5-7.605-10.859-11-13.5-4.5-3.5-14.5-2-20-.5Z"
              data-name="16"
            />
            <path
              id="13"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M138.408 212.932c-13.6-5.2-20.5 12.5-22.244 24.823-1.087 7.677 3.5 22 6 33s20 19 27.5 19.5 18.212-4.627 15.5-32.5c-2.756-28.323-9.756-38.323-26.756-44.823Z"
              data-name="13"
            />
            <path
              id="14"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M163 236.531c0-11.6 9.667-13.834 14.5-13.5 5-.334 15.4 2.1 17 14.5 2 15.5-12.5 15-14 15.5s-17.5-2-17.5-16.5Z"
              data-name="14"
            />
            <path
              id="15"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M195.5 231.5c1.6-6 24.667-10.5 36-12 7.5-.5 13.5 17 11.5 26.5s-27.5 11.5-35.5 10.5-14-17.5-12-25Z"
              data-name="15"
            />
            <path
              id="64"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M277.5 751c-4.5 3.667-12.4 13.8-8 25 5.5 14 13.5 24 25 23.5s26.5-11.5 26.5-18 0-26.5-5.5-32-24-12.5-38 1.5Z"
              data-name="64"
            />
            <path
              id="151"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M333 739.5c-2.833 3.833-8.4 12.7-8 17.5.5 6 1.5 11 8 13.5s17.5 3.5 20-3 7-14.5 2-20.5-15.5-15-22-7.5Z"
              data-name="151"
            />
            <path
              id="220"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M385 770c-2 2-5.1 8.8 2.5 12 9.5 4 16.5-.5 18-2.5s3.5-15-8-14S387 768 385 770Z"
              data-name="220"
            />
            <path
              id="68"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M280 720.5c1.5-2.833 5.7-8.6 10.5-9 6-.5 14 .5 14 6s-5.5 12.5-11 13-17-4-13.5-10Z"
              data-name="68"
            />
            <path
              id="67"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M233.5 706.5c5.667-5.333 15.5-15 22.5-16s14 6 16.5 9 7 10 3.5 16-17 20-24 20-19-5-20-11.5-3.5-12.998 1.5-17.5Z"
              data-name="67"
            />
            <path
              id="69"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M243.5 672.5c3.833-1.167 12.2-2.6 15 1 3.5 4.5 6 10.5 3 14s-7 5-13 1.5-9-7-9-10.5 1.5-5.365 4-6Z"
              data-name="69"
            />
            <path
              id="70"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M216.5 635.5c2.667-1.667 9-4.9 13-4.5 5 .5 16 10.5 18 15.5s10.5 19.5-3 26-22-2-25-7.5-15-23.5-3-29.5Z"
              data-name="70"
            />
            <path
              id="152"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M277 621c-4.333 2.333-12.9 8.6-12.5 15 .5 8 11 16 19.5 15.5s15.5-14 15.5-19S291 619 277 621Z"
              data-name="152"
            />
            <path
              id="153"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M280.5 603c-5 6-5.9 9-1.5 13 5.5 5 19 11.5 26.5 9s10-6 10-12-30-16-35-10Z"
              data-name="153"
            />
            <path
              id="154"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M300 628c5.833-4.667 20.4-13.8 32-13 14.5 1 25.5 1 24 7s-19.5 37-33.5 37.5-18.5-10.5-20.5-15-4-12-2-16.5Z"
              data-name="154"
            />
            <path
              id="142"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M722 574c0 5 1.9 15.1 9.5 15.5 9.5.5 18-8 16.5-13s-3.5-14-12-13-14.42 6-14 10.5Z"
              data-name="142"
            />
            <path
              id="101"
              fill="#A26769"
              stroke="#151515"
              strokeWidth="1"
              d="M325.5 671.5c0-4.5 16-33 25.5-36.5s30-6.5 36.5 7 4.5 43.5-1.5 51.5-19 17.5-28.5 15.5-16-5-18.5-13-5.5-9.5-9.5-14.5-4-5.5-4-10Z"
              data-name="101"
            />
            <path
              id="243"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M522.5 160.5c-2.8-2.8-9.833-1.167-13 0-7 1.514-5 9-4.5 12s7.5 5.5 13 5.5 8.5-5 9-8.5-1-5.5-4.5-9Z"
              data-name="243"
            />
            <path
              id="143"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M746.5 513c-5.167 2.833-16.1 11-18.5 21-3 12.5-3.5 10.5-2.5 17s2.5 14 13 11.5 26-19.5 27.5-21.5 3.5-11.5-1.5-19-11-13-18-9Z"
              data-name="143"
            />
            <path
              id="41"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M269.279 433.521c.5 7-8.5 8.5-10 8.5-12.665.452-14.849-3.142-9.668-15.812 1.281-1.894 3.699-2.301 5.168-2.188 2.5-.292 14 2.5 14.5 9.5Z"
              data-name="41"
            />
            <path
              id="309"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M344.5 250.5c-5 3.5-10.9 13-10.5 23 .5 12.5.5 17 7.5 20.5s18 7 23.5 1 7.5-17.5 7.5-23.5S366 254 363 253s-13.5-6-18.5-2.5Z"
              data-name="309"
            />
            <path
              id="86"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="M416 471c6 5.2 4.5 12.5 3 15.5-14 7.5-31-6.5-33.5-7.5s-23-16.5-24.5-19-5-10-2-18.5 14.5-7 20.5-7 12 8 13.5 11 15.5 19 23 25.5Z"
              data-name="86"
            />
            <path
              id="11"
              fill="#EFD6D2"
              stroke="#151515"
              strokeWidth="1"
              d="m291.06 159.457-.06.043c-3.751 2.679-6.5 9.5-6.5 12s3.5 7.5 7 8 5.5 0 11.5-4.5 4.5-8.5 4.5-11.5-6.5-5.5-9.5-6.5c-2.386-.796-3.487-.009-6.94 2.457Z"
              data-name="11"
            />
          </g>
          <g id="ids" fill="#000" className={clsx(isId ? "block" : "hidden")}>
            <path
              id="333_2"
              d="M138.58 670.102H139.418C139.668 670.102 139.887 670.068 140.074 670.002C140.262 669.932 140.416 669.834 140.537 669.709C140.65 669.6 140.736 669.465 140.795 669.305C140.857 669.141 140.889 668.965 140.889 668.777C140.889 668.574 140.859 668.393 140.801 668.232C140.746 668.072 140.664 667.936 140.555 667.822C140.445 667.717 140.307 667.635 140.139 667.576C139.975 667.518 139.785 667.488 139.57 667.488C139.379 667.488 139.201 667.518 139.037 667.576C138.877 667.631 138.738 667.711 138.621 667.816C138.5 667.922 138.404 668.049 138.334 668.197C138.268 668.346 138.234 668.512 138.234 668.695H136.834C136.834 668.355 136.902 668.043 137.039 667.758C137.176 667.473 137.365 667.225 137.607 667.014C137.85 666.807 138.135 666.645 138.463 666.527C138.795 666.41 139.158 666.352 139.553 666.352C139.955 666.352 140.324 666.404 140.66 666.51C141 666.611 141.289 666.764 141.527 666.967C141.77 667.174 141.957 667.428 142.09 667.729C142.223 668.029 142.289 668.379 142.289 668.777C142.289 668.953 142.262 669.129 142.207 669.305C142.156 669.48 142.078 669.65 141.973 669.814C141.867 669.975 141.734 670.125 141.574 670.266C141.414 670.406 141.227 670.525 141.012 670.623C141.266 670.709 141.48 670.822 141.656 670.963C141.836 671.1 141.982 671.254 142.096 671.426C142.209 671.602 142.291 671.791 142.342 671.994C142.393 672.193 142.418 672.4 142.418 672.615C142.418 673.014 142.344 673.369 142.195 673.682C142.051 673.99 141.852 674.25 141.598 674.461C141.34 674.676 141.035 674.84 140.684 674.953C140.336 675.062 139.959 675.117 139.553 675.117C139.186 675.117 138.832 675.066 138.492 674.965C138.152 674.863 137.854 674.711 137.596 674.508C137.338 674.305 137.131 674.055 136.975 673.758C136.822 673.457 136.746 673.107 136.746 672.709H138.146C138.146 672.896 138.18 673.07 138.246 673.23C138.316 673.387 138.416 673.52 138.545 673.629C138.67 673.742 138.818 673.83 138.99 673.893C139.166 673.955 139.359 673.986 139.57 673.986C139.797 673.986 140 673.957 140.18 673.898C140.363 673.836 140.518 673.744 140.643 673.623C140.764 673.51 140.855 673.369 140.918 673.201C140.984 673.029 141.018 672.834 141.018 672.615C141.018 672.369 140.98 672.158 140.906 671.982C140.832 671.807 140.725 671.66 140.584 671.543C140.443 671.43 140.273 671.346 140.074 671.291C139.879 671.232 139.66 671.203 139.418 671.203H138.58V670.102ZM145.787 670.102H146.625C146.875 670.102 147.094 670.068 147.281 670.002C147.469 669.932 147.623 669.834 147.744 669.709C147.857 669.6 147.943 669.465 148.002 669.305C148.064 669.141 148.096 668.965 148.096 668.777C148.096 668.574 148.066 668.393 148.008 668.232C147.953 668.072 147.871 667.936 147.762 667.822C147.652 667.717 147.514 667.635 147.346 667.576C147.182 667.518 146.992 667.488 146.777 667.488C146.586 667.488 146.408 667.518 146.244 667.576C146.084 667.631 145.945 667.711 145.828 667.816C145.707 667.922 145.611 668.049 145.541 668.197C145.475 668.346 145.441 668.512 145.441 668.695H144.041C144.041 668.355 144.109 668.043 144.246 667.758C144.383 667.473 144.572 667.225 144.814 667.014C145.057 666.807 145.342 666.645 145.67 666.527C146.002 666.41 146.365 666.352 146.76 666.352C147.162 666.352 147.531 666.404 147.867 666.51C148.207 666.611 148.496 666.764 148.734 666.967C148.977 667.174 149.164 667.428 149.297 667.729C149.43 668.029 149.496 668.379 149.496 668.777C149.496 668.953 149.469 669.129 149.414 669.305C149.363 669.48 149.285 669.65 149.18 669.814C149.074 669.975 148.941 670.125 148.781 670.266C148.621 670.406 148.434 670.525 148.219 670.623C148.473 670.709 148.688 670.822 148.863 670.963C149.043 671.1 149.189 671.254 149.303 671.426C149.416 671.602 149.498 671.791 149.549 671.994C149.6 672.193 149.625 672.4 149.625 672.615C149.625 673.014 149.551 673.369 149.402 673.682C149.258 673.99 149.059 674.25 148.805 674.461C148.547 674.676 148.242 674.84 147.891 674.953C147.543 675.062 147.166 675.117 146.76 675.117C146.393 675.117 146.039 675.066 145.699 674.965C145.359 674.863 145.061 674.711 144.803 674.508C144.545 674.305 144.338 674.055 144.182 673.758C144.029 673.457 143.953 673.107 143.953 672.709H145.354C145.354 672.896 145.387 673.07 145.453 673.23C145.523 673.387 145.623 673.52 145.752 673.629C145.877 673.742 146.025 673.83 146.197 673.893C146.373 673.955 146.566 673.986 146.777 673.986C147.004 673.986 147.207 673.957 147.387 673.898C147.57 673.836 147.725 673.744 147.85 673.623C147.971 673.51 148.062 673.369 148.125 673.201C148.191 673.029 148.225 672.834 148.225 672.615C148.225 672.369 148.188 672.158 148.113 671.982C148.039 671.807 147.932 671.66 147.791 671.543C147.65 671.43 147.48 671.346 147.281 671.291C147.086 671.232 146.867 671.203 146.625 671.203H145.787V670.102ZM152.994 670.102H153.832C154.082 670.102 154.301 670.068 154.488 670.002C154.676 669.932 154.83 669.834 154.951 669.709C155.064 669.6 155.15 669.465 155.209 669.305C155.271 669.141 155.303 668.965 155.303 668.777C155.303 668.574 155.273 668.393 155.215 668.232C155.16 668.072 155.078 667.936 154.969 667.822C154.859 667.717 154.721 667.635 154.553 667.576C154.389 667.518 154.199 667.488 153.984 667.488C153.793 667.488 153.615 667.518 153.451 667.576C153.291 667.631 153.152 667.711 153.035 667.816C152.914 667.922 152.818 668.049 152.748 668.197C152.682 668.346 152.648 668.512 152.648 668.695H151.248C151.248 668.355 151.316 668.043 151.453 667.758C151.59 667.473 151.779 667.225 152.021 667.014C152.264 666.807 152.549 666.645 152.877 666.527C153.209 666.41 153.572 666.352 153.967 666.352C154.369 666.352 154.738 666.404 155.074 666.51C155.414 666.611 155.703 666.764 155.941 666.967C156.184 667.174 156.371 667.428 156.504 667.729C156.637 668.029 156.703 668.379 156.703 668.777C156.703 668.953 156.676 669.129 156.621 669.305C156.57 669.48 156.492 669.65 156.387 669.814C156.281 669.975 156.148 670.125 155.988 670.266C155.828 670.406 155.641 670.525 155.426 670.623C155.68 670.709 155.895 670.822 156.07 670.963C156.25 671.1 156.396 671.254 156.51 671.426C156.623 671.602 156.705 671.791 156.756 671.994C156.807 672.193 156.832 672.4 156.832 672.615C156.832 673.014 156.758 673.369 156.609 673.682C156.465 673.99 156.266 674.25 156.012 674.461C155.754 674.676 155.449 674.84 155.098 674.953C154.75 675.062 154.373 675.117 153.967 675.117C153.6 675.117 153.246 675.066 152.906 674.965C152.566 674.863 152.268 674.711 152.01 674.508C151.752 674.305 151.545 674.055 151.389 673.758C151.236 673.457 151.16 673.107 151.16 672.709H152.561C152.561 672.896 152.594 673.07 152.66 673.23C152.73 673.387 152.83 673.52 152.959 673.629C153.084 673.742 153.232 673.83 153.404 673.893C153.58 673.955 153.773 673.986 153.984 673.986C154.211 673.986 154.414 673.957 154.594 673.898C154.777 673.836 154.932 673.744 155.057 673.623C155.178 673.51 155.27 673.369 155.332 673.201C155.398 673.029 155.432 672.834 155.432 672.615C155.432 672.369 155.395 672.158 155.32 671.982C155.246 671.807 155.139 671.66 154.998 671.543C154.857 671.43 154.688 671.346 154.488 671.291C154.293 671.232 154.074 671.203 153.832 671.203H152.994V670.102Z"
              fill="#151515"
            />

            <path
              id="334_2"
              d="M259.58 587.102H260.418C260.668 587.102 260.887 587.068 261.074 587.002C261.262 586.932 261.416 586.834 261.537 586.709C261.65 586.6 261.736 586.465 261.795 586.305C261.857 586.141 261.889 585.965 261.889 585.777C261.889 585.574 261.859 585.393 261.801 585.232C261.746 585.072 261.664 584.936 261.555 584.822C261.445 584.717 261.307 584.635 261.139 584.576C260.975 584.518 260.785 584.488 260.57 584.488C260.379 584.488 260.201 584.518 260.037 584.576C259.877 584.631 259.738 584.711 259.621 584.816C259.5 584.922 259.404 585.049 259.334 585.197C259.268 585.346 259.234 585.512 259.234 585.695H257.834C257.834 585.355 257.902 585.043 258.039 584.758C258.176 584.473 258.365 584.225 258.607 584.014C258.85 583.807 259.135 583.645 259.463 583.527C259.795 583.41 260.158 583.352 260.553 583.352C260.955 583.352 261.324 583.404 261.66 583.51C262 583.611 262.289 583.764 262.527 583.967C262.77 584.174 262.957 584.428 263.09 584.729C263.223 585.029 263.289 585.379 263.289 585.777C263.289 585.953 263.262 586.129 263.207 586.305C263.156 586.48 263.078 586.65 262.973 586.814C262.867 586.975 262.734 587.125 262.574 587.266C262.414 587.406 262.227 587.525 262.012 587.623C262.266 587.709 262.48 587.822 262.656 587.963C262.836 588.1 262.982 588.254 263.096 588.426C263.209 588.602 263.291 588.791 263.342 588.994C263.393 589.193 263.418 589.4 263.418 589.615C263.418 590.014 263.344 590.369 263.195 590.682C263.051 590.99 262.852 591.25 262.598 591.461C262.34 591.676 262.035 591.84 261.684 591.953C261.336 592.062 260.959 592.117 260.553 592.117C260.186 592.117 259.832 592.066 259.492 591.965C259.152 591.863 258.854 591.711 258.596 591.508C258.338 591.305 258.131 591.055 257.975 590.758C257.822 590.457 257.746 590.107 257.746 589.709H259.146C259.146 589.896 259.18 590.07 259.246 590.23C259.316 590.387 259.416 590.52 259.545 590.629C259.67 590.742 259.818 590.83 259.99 590.893C260.166 590.955 260.359 590.986 260.57 590.986C260.797 590.986 261 590.957 261.18 590.898C261.363 590.836 261.518 590.744 261.643 590.623C261.764 590.51 261.855 590.369 261.918 590.201C261.984 590.029 262.018 589.834 262.018 589.615C262.018 589.369 261.98 589.158 261.906 588.982C261.832 588.807 261.725 588.66 261.584 588.543C261.443 588.43 261.273 588.346 261.074 588.291C260.879 588.232 260.66 588.203 260.418 588.203H259.58V587.102ZM266.787 587.102H267.625C267.875 587.102 268.094 587.068 268.281 587.002C268.469 586.932 268.623 586.834 268.744 586.709C268.857 586.6 268.943 586.465 269.002 586.305C269.064 586.141 269.096 585.965 269.096 585.777C269.096 585.574 269.066 585.393 269.008 585.232C268.953 585.072 268.871 584.936 268.762 584.822C268.652 584.717 268.514 584.635 268.346 584.576C268.182 584.518 267.992 584.488 267.777 584.488C267.586 584.488 267.408 584.518 267.244 584.576C267.084 584.631 266.945 584.711 266.828 584.816C266.707 584.922 266.611 585.049 266.541 585.197C266.475 585.346 266.441 585.512 266.441 585.695H265.041C265.041 585.355 265.109 585.043 265.246 584.758C265.383 584.473 265.572 584.225 265.814 584.014C266.057 583.807 266.342 583.645 266.67 583.527C267.002 583.41 267.365 583.352 267.76 583.352C268.162 583.352 268.531 583.404 268.867 583.51C269.207 583.611 269.496 583.764 269.734 583.967C269.977 584.174 270.164 584.428 270.297 584.729C270.43 585.029 270.496 585.379 270.496 585.777C270.496 585.953 270.469 586.129 270.414 586.305C270.363 586.48 270.285 586.65 270.18 586.814C270.074 586.975 269.941 587.125 269.781 587.266C269.621 587.406 269.434 587.525 269.219 587.623C269.473 587.709 269.688 587.822 269.863 587.963C270.043 588.1 270.189 588.254 270.303 588.426C270.416 588.602 270.498 588.791 270.549 588.994C270.6 589.193 270.625 589.4 270.625 589.615C270.625 590.014 270.551 590.369 270.402 590.682C270.258 590.99 270.059 591.25 269.805 591.461C269.547 591.676 269.242 591.84 268.891 591.953C268.543 592.062 268.166 592.117 267.76 592.117C267.393 592.117 267.039 592.066 266.699 591.965C266.359 591.863 266.061 591.711 265.803 591.508C265.545 591.305 265.338 591.055 265.182 590.758C265.029 590.457 264.953 590.107 264.953 589.709H266.354C266.354 589.896 266.387 590.07 266.453 590.23C266.523 590.387 266.623 590.52 266.752 590.629C266.877 590.742 267.025 590.83 267.197 590.893C267.373 590.955 267.566 590.986 267.777 590.986C268.004 590.986 268.207 590.957 268.387 590.898C268.57 590.836 268.725 590.744 268.85 590.623C268.971 590.51 269.062 590.369 269.125 590.201C269.191 590.029 269.225 589.834 269.225 589.615C269.225 589.369 269.188 589.158 269.113 588.982C269.039 588.807 268.932 588.66 268.791 588.543C268.65 588.43 268.48 588.346 268.281 588.291C268.086 588.232 267.867 588.203 267.625 588.203H266.787V587.102ZM277.117 588.959H278.189V590.096H277.117V592H275.717V590.096H272.025L271.99 589.234L275.676 583.469H277.117V588.959ZM273.42 588.959H275.717V585.344L275.553 585.648L273.42 588.959Z"
              fill="#151515"
            />

            <path
              id="335_2"
              d="M143.58 490.102H144.418C144.668 490.102 144.887 490.068 145.074 490.002C145.262 489.932 145.416 489.834 145.537 489.709C145.65 489.6 145.736 489.465 145.795 489.305C145.857 489.141 145.889 488.965 145.889 488.777C145.889 488.574 145.859 488.393 145.801 488.232C145.746 488.072 145.664 487.936 145.555 487.822C145.445 487.717 145.307 487.635 145.139 487.576C144.975 487.518 144.785 487.488 144.57 487.488C144.379 487.488 144.201 487.518 144.037 487.576C143.877 487.631 143.738 487.711 143.621 487.816C143.5 487.922 143.404 488.049 143.334 488.197C143.268 488.346 143.234 488.512 143.234 488.695H141.834C141.834 488.355 141.902 488.043 142.039 487.758C142.176 487.473 142.365 487.225 142.607 487.014C142.85 486.807 143.135 486.645 143.463 486.527C143.795 486.41 144.158 486.352 144.553 486.352C144.955 486.352 145.324 486.404 145.66 486.51C146 486.611 146.289 486.764 146.527 486.967C146.77 487.174 146.957 487.428 147.09 487.729C147.223 488.029 147.289 488.379 147.289 488.777C147.289 488.953 147.262 489.129 147.207 489.305C147.156 489.48 147.078 489.65 146.973 489.814C146.867 489.975 146.734 490.125 146.574 490.266C146.414 490.406 146.227 490.525 146.012 490.623C146.266 490.709 146.48 490.822 146.656 490.963C146.836 491.1 146.982 491.254 147.096 491.426C147.209 491.602 147.291 491.791 147.342 491.994C147.393 492.193 147.418 492.4 147.418 492.615C147.418 493.014 147.344 493.369 147.195 493.682C147.051 493.99 146.852 494.25 146.598 494.461C146.34 494.676 146.035 494.84 145.684 494.953C145.336 495.062 144.959 495.117 144.553 495.117C144.186 495.117 143.832 495.066 143.492 494.965C143.152 494.863 142.854 494.711 142.596 494.508C142.338 494.305 142.131 494.055 141.975 493.758C141.822 493.457 141.746 493.107 141.746 492.709H143.146C143.146 492.896 143.18 493.07 143.246 493.23C143.316 493.387 143.416 493.52 143.545 493.629C143.67 493.742 143.818 493.83 143.99 493.893C144.166 493.955 144.359 493.986 144.57 493.986C144.797 493.986 145 493.957 145.18 493.898C145.363 493.836 145.518 493.744 145.643 493.623C145.764 493.51 145.855 493.369 145.918 493.201C145.984 493.029 146.018 492.834 146.018 492.615C146.018 492.369 145.98 492.158 145.906 491.982C145.832 491.807 145.725 491.66 145.584 491.543C145.443 491.43 145.273 491.346 145.074 491.291C144.879 491.232 144.66 491.203 144.418 491.203H143.58V490.102ZM150.787 490.102H151.625C151.875 490.102 152.094 490.068 152.281 490.002C152.469 489.932 152.623 489.834 152.744 489.709C152.857 489.6 152.943 489.465 153.002 489.305C153.064 489.141 153.096 488.965 153.096 488.777C153.096 488.574 153.066 488.393 153.008 488.232C152.953 488.072 152.871 487.936 152.762 487.822C152.652 487.717 152.514 487.635 152.346 487.576C152.182 487.518 151.992 487.488 151.777 487.488C151.586 487.488 151.408 487.518 151.244 487.576C151.084 487.631 150.945 487.711 150.828 487.816C150.707 487.922 150.611 488.049 150.541 488.197C150.475 488.346 150.441 488.512 150.441 488.695H149.041C149.041 488.355 149.109 488.043 149.246 487.758C149.383 487.473 149.572 487.225 149.814 487.014C150.057 486.807 150.342 486.645 150.67 486.527C151.002 486.41 151.365 486.352 151.76 486.352C152.162 486.352 152.531 486.404 152.867 486.51C153.207 486.611 153.496 486.764 153.734 486.967C153.977 487.174 154.164 487.428 154.297 487.729C154.43 488.029 154.496 488.379 154.496 488.777C154.496 488.953 154.469 489.129 154.414 489.305C154.363 489.48 154.285 489.65 154.18 489.814C154.074 489.975 153.941 490.125 153.781 490.266C153.621 490.406 153.434 490.525 153.219 490.623C153.473 490.709 153.688 490.822 153.863 490.963C154.043 491.1 154.189 491.254 154.303 491.426C154.416 491.602 154.498 491.791 154.549 491.994C154.6 492.193 154.625 492.4 154.625 492.615C154.625 493.014 154.551 493.369 154.402 493.682C154.258 493.99 154.059 494.25 153.805 494.461C153.547 494.676 153.242 494.84 152.891 494.953C152.543 495.062 152.166 495.117 151.76 495.117C151.393 495.117 151.039 495.066 150.699 494.965C150.359 494.863 150.061 494.711 149.803 494.508C149.545 494.305 149.338 494.055 149.182 493.758C149.029 493.457 148.953 493.107 148.953 492.709H150.354C150.354 492.896 150.387 493.07 150.453 493.23C150.523 493.387 150.623 493.52 150.752 493.629C150.877 493.742 151.025 493.83 151.197 493.893C151.373 493.955 151.566 493.986 151.777 493.986C152.004 493.986 152.207 493.957 152.387 493.898C152.57 493.836 152.725 493.744 152.85 493.623C152.971 493.51 153.062 493.369 153.125 493.201C153.191 493.029 153.225 492.834 153.225 492.615C153.225 492.369 153.188 492.158 153.113 491.982C153.039 491.807 152.932 491.66 152.791 491.543C152.65 491.43 152.48 491.346 152.281 491.291C152.086 491.232 151.867 491.203 151.625 491.203H150.787V490.102ZM156.723 490.77L157.18 486.469H161.768V487.711H158.346L158.123 489.756C158.264 489.674 158.447 489.596 158.674 489.521C158.904 489.447 159.168 489.41 159.465 489.41C159.867 489.41 160.227 489.477 160.543 489.609C160.863 489.742 161.135 489.932 161.357 490.178C161.576 490.428 161.744 490.73 161.861 491.086C161.979 491.438 162.037 491.834 162.037 492.275C162.037 492.666 161.98 493.035 161.867 493.383C161.758 493.727 161.588 494.027 161.357 494.285C161.131 494.543 160.844 494.746 160.496 494.895C160.148 495.043 159.738 495.117 159.266 495.117C158.906 495.117 158.562 495.066 158.234 494.965C157.906 494.859 157.615 494.703 157.361 494.496C157.107 494.293 156.898 494.041 156.734 493.74C156.574 493.436 156.482 493.086 156.459 492.691H157.824C157.875 493.109 158.027 493.43 158.281 493.652C158.539 493.875 158.867 493.986 159.266 493.986C159.5 493.986 159.703 493.943 159.875 493.857C160.047 493.771 160.191 493.65 160.309 493.494C160.418 493.342 160.5 493.158 160.555 492.943C160.609 492.725 160.637 492.488 160.637 492.234C160.637 491.988 160.604 491.764 160.537 491.561C160.475 491.354 160.379 491.174 160.25 491.021C160.121 490.869 159.961 490.752 159.77 490.67C159.578 490.584 159.355 490.541 159.102 490.541C158.934 490.541 158.787 490.555 158.662 490.582C158.541 490.609 158.434 490.645 158.34 490.688C158.242 490.734 158.152 490.789 158.07 490.852C157.992 490.91 157.916 490.975 157.842 491.045L156.723 490.77Z"
              fill="#151515"
            />

            <path
              id="336_2"
              d="M211.58 281.102H212.418C212.668 281.102 212.887 281.068 213.074 281.002C213.262 280.932 213.416 280.834 213.537 280.709C213.65 280.6 213.736 280.465 213.795 280.305C213.857 280.141 213.889 279.965 213.889 279.777C213.889 279.574 213.859 279.393 213.801 279.232C213.746 279.072 213.664 278.936 213.555 278.822C213.445 278.717 213.307 278.635 213.139 278.576C212.975 278.518 212.785 278.488 212.57 278.488C212.379 278.488 212.201 278.518 212.037 278.576C211.877 278.631 211.738 278.711 211.621 278.816C211.5 278.922 211.404 279.049 211.334 279.197C211.268 279.346 211.234 279.512 211.234 279.695H209.834C209.834 279.355 209.902 279.043 210.039 278.758C210.176 278.473 210.365 278.225 210.607 278.014C210.85 277.807 211.135 277.645 211.463 277.527C211.795 277.41 212.158 277.352 212.553 277.352C212.955 277.352 213.324 277.404 213.66 277.51C214 277.611 214.289 277.764 214.527 277.967C214.77 278.174 214.957 278.428 215.09 278.729C215.223 279.029 215.289 279.379 215.289 279.777C215.289 279.953 215.262 280.129 215.207 280.305C215.156 280.48 215.078 280.65 214.973 280.814C214.867 280.975 214.734 281.125 214.574 281.266C214.414 281.406 214.227 281.525 214.012 281.623C214.266 281.709 214.48 281.822 214.656 281.963C214.836 282.1 214.982 282.254 215.096 282.426C215.209 282.602 215.291 282.791 215.342 282.994C215.393 283.193 215.418 283.4 215.418 283.615C215.418 284.014 215.344 284.369 215.195 284.682C215.051 284.99 214.852 285.25 214.598 285.461C214.34 285.676 214.035 285.84 213.684 285.953C213.336 286.062 212.959 286.117 212.553 286.117C212.186 286.117 211.832 286.066 211.492 285.965C211.152 285.863 210.854 285.711 210.596 285.508C210.338 285.305 210.131 285.055 209.975 284.758C209.822 284.457 209.746 284.107 209.746 283.709H211.146C211.146 283.896 211.18 284.07 211.246 284.23C211.316 284.387 211.416 284.52 211.545 284.629C211.67 284.742 211.818 284.83 211.99 284.893C212.166 284.955 212.359 284.986 212.57 284.986C212.797 284.986 213 284.957 213.18 284.898C213.363 284.836 213.518 284.744 213.643 284.623C213.764 284.51 213.855 284.369 213.918 284.201C213.984 284.029 214.018 283.834 214.018 283.615C214.018 283.369 213.98 283.158 213.906 282.982C213.832 282.807 213.725 282.66 213.584 282.543C213.443 282.43 213.273 282.346 213.074 282.291C212.879 282.232 212.66 282.203 212.418 282.203H211.58V281.102ZM218.787 281.102H219.625C219.875 281.102 220.094 281.068 220.281 281.002C220.469 280.932 220.623 280.834 220.744 280.709C220.857 280.6 220.943 280.465 221.002 280.305C221.064 280.141 221.096 279.965 221.096 279.777C221.096 279.574 221.066 279.393 221.008 279.232C220.953 279.072 220.871 278.936 220.762 278.822C220.652 278.717 220.514 278.635 220.346 278.576C220.182 278.518 219.992 278.488 219.777 278.488C219.586 278.488 219.408 278.518 219.244 278.576C219.084 278.631 218.945 278.711 218.828 278.816C218.707 278.922 218.611 279.049 218.541 279.197C218.475 279.346 218.441 279.512 218.441 279.695H217.041C217.041 279.355 217.109 279.043 217.246 278.758C217.383 278.473 217.572 278.225 217.814 278.014C218.057 277.807 218.342 277.645 218.67 277.527C219.002 277.41 219.365 277.352 219.76 277.352C220.162 277.352 220.531 277.404 220.867 277.51C221.207 277.611 221.496 277.764 221.734 277.967C221.977 278.174 222.164 278.428 222.297 278.729C222.43 279.029 222.496 279.379 222.496 279.777C222.496 279.953 222.469 280.129 222.414 280.305C222.363 280.48 222.285 280.65 222.18 280.814C222.074 280.975 221.941 281.125 221.781 281.266C221.621 281.406 221.434 281.525 221.219 281.623C221.473 281.709 221.688 281.822 221.863 281.963C222.043 282.1 222.189 282.254 222.303 282.426C222.416 282.602 222.498 282.791 222.549 282.994C222.6 283.193 222.625 283.4 222.625 283.615C222.625 284.014 222.551 284.369 222.402 284.682C222.258 284.99 222.059 285.25 221.805 285.461C221.547 285.676 221.242 285.84 220.891 285.953C220.543 286.062 220.166 286.117 219.76 286.117C219.393 286.117 219.039 286.066 218.699 285.965C218.359 285.863 218.061 285.711 217.803 285.508C217.545 285.305 217.338 285.055 217.182 284.758C217.029 284.457 216.953 284.107 216.953 283.709H218.354C218.354 283.896 218.387 284.07 218.453 284.23C218.523 284.387 218.623 284.52 218.752 284.629C218.877 284.742 219.025 284.83 219.197 284.893C219.373 284.955 219.566 284.986 219.777 284.986C220.004 284.986 220.207 284.957 220.387 284.898C220.57 284.836 220.725 284.744 220.85 284.623C220.971 284.51 221.062 284.369 221.125 284.201C221.191 284.029 221.225 283.834 221.225 283.615C221.225 283.369 221.188 283.158 221.113 282.982C221.039 282.807 220.932 282.66 220.791 282.543C220.65 282.43 220.48 282.346 220.281 282.291C220.086 282.232 219.867 282.203 219.625 282.203H218.787V281.102ZM228.695 277.428V278.617H228.602C228.137 278.617 227.732 278.682 227.389 278.811C227.049 278.936 226.762 279.111 226.527 279.338C226.289 279.564 226.104 279.836 225.971 280.152C225.842 280.469 225.762 280.809 225.73 281.172C225.824 281.066 225.934 280.965 226.059 280.867C226.184 280.766 226.322 280.676 226.475 280.598C226.619 280.523 226.779 280.465 226.955 280.422C227.131 280.375 227.316 280.352 227.512 280.352C227.926 280.352 228.285 280.43 228.59 280.586C228.898 280.742 229.152 280.953 229.352 281.219C229.555 281.484 229.703 281.789 229.797 282.133C229.895 282.477 229.943 282.834 229.943 283.205C229.943 283.611 229.881 283.992 229.756 284.348C229.635 284.699 229.457 285.006 229.223 285.268C228.984 285.533 228.693 285.742 228.35 285.895C228.01 286.043 227.621 286.117 227.184 286.117C226.734 286.117 226.334 286.031 225.982 285.859C225.631 285.688 225.334 285.455 225.092 285.162C224.834 284.857 224.639 284.5 224.506 284.09C224.373 283.676 224.307 283.24 224.307 282.783V282.203C224.307 281.516 224.395 280.861 224.57 280.24C224.75 279.615 225.047 279.078 225.461 278.629C225.812 278.242 226.246 277.945 226.762 277.738C227.277 277.531 227.867 277.428 228.531 277.428H228.695ZM227.166 281.488C226.998 281.488 226.838 281.514 226.686 281.564C226.533 281.615 226.393 281.686 226.264 281.775C226.146 281.865 226.041 281.969 225.947 282.086C225.854 282.203 225.775 282.334 225.713 282.479V282.912C225.713 283.252 225.75 283.551 225.824 283.809C225.902 284.066 226.008 284.281 226.141 284.453C226.273 284.625 226.428 284.756 226.604 284.846C226.779 284.936 226.967 284.98 227.166 284.98C227.385 284.98 227.58 284.938 227.752 284.852C227.924 284.762 228.07 284.641 228.191 284.488C228.312 284.332 228.404 284.148 228.467 283.938C228.529 283.723 228.561 283.49 228.561 283.24C228.561 283.002 228.529 282.777 228.467 282.566C228.408 282.352 228.32 282.164 228.203 282.004C228.086 281.844 227.939 281.719 227.764 281.629C227.592 281.535 227.393 281.488 227.166 281.488Z"
              fill="#151515"
            />

            <path
              id="337_2"
              d="M270.58 223.102H271.418C271.668 223.102 271.887 223.068 272.074 223.002C272.262 222.932 272.416 222.834 272.537 222.709C272.65 222.6 272.736 222.465 272.795 222.305C272.857 222.141 272.889 221.965 272.889 221.777C272.889 221.574 272.859 221.393 272.801 221.232C272.746 221.072 272.664 220.936 272.555 220.822C272.445 220.717 272.307 220.635 272.139 220.576C271.975 220.518 271.785 220.488 271.57 220.488C271.379 220.488 271.201 220.518 271.037 220.576C270.877 220.631 270.738 220.711 270.621 220.816C270.5 220.922 270.404 221.049 270.334 221.197C270.268 221.346 270.234 221.512 270.234 221.695H268.834C268.834 221.355 268.902 221.043 269.039 220.758C269.176 220.473 269.365 220.225 269.607 220.014C269.85 219.807 270.135 219.645 270.463 219.527C270.795 219.41 271.158 219.352 271.553 219.352C271.955 219.352 272.324 219.404 272.66 219.51C273 219.611 273.289 219.764 273.527 219.967C273.77 220.174 273.957 220.428 274.09 220.729C274.223 221.029 274.289 221.379 274.289 221.777C274.289 221.953 274.262 222.129 274.207 222.305C274.156 222.48 274.078 222.65 273.973 222.814C273.867 222.975 273.734 223.125 273.574 223.266C273.414 223.406 273.227 223.525 273.012 223.623C273.266 223.709 273.48 223.822 273.656 223.963C273.836 224.1 273.982 224.254 274.096 224.426C274.209 224.602 274.291 224.791 274.342 224.994C274.393 225.193 274.418 225.4 274.418 225.615C274.418 226.014 274.344 226.369 274.195 226.682C274.051 226.99 273.852 227.25 273.598 227.461C273.34 227.676 273.035 227.84 272.684 227.953C272.336 228.062 271.959 228.117 271.553 228.117C271.186 228.117 270.832 228.066 270.492 227.965C270.152 227.863 269.854 227.711 269.596 227.508C269.338 227.305 269.131 227.055 268.975 226.758C268.822 226.457 268.746 226.107 268.746 225.709H270.146C270.146 225.896 270.18 226.07 270.246 226.23C270.316 226.387 270.416 226.52 270.545 226.629C270.67 226.742 270.818 226.83 270.99 226.893C271.166 226.955 271.359 226.986 271.57 226.986C271.797 226.986 272 226.957 272.18 226.898C272.363 226.836 272.518 226.744 272.643 226.623C272.764 226.51 272.855 226.369 272.918 226.201C272.984 226.029 273.018 225.834 273.018 225.615C273.018 225.369 272.98 225.158 272.906 224.982C272.832 224.807 272.725 224.66 272.584 224.543C272.443 224.43 272.273 224.346 272.074 224.291C271.879 224.232 271.66 224.203 271.418 224.203H270.58V223.102ZM277.787 223.102H278.625C278.875 223.102 279.094 223.068 279.281 223.002C279.469 222.932 279.623 222.834 279.744 222.709C279.857 222.6 279.943 222.465 280.002 222.305C280.064 222.141 280.096 221.965 280.096 221.777C280.096 221.574 280.066 221.393 280.008 221.232C279.953 221.072 279.871 220.936 279.762 220.822C279.652 220.717 279.514 220.635 279.346 220.576C279.182 220.518 278.992 220.488 278.777 220.488C278.586 220.488 278.408 220.518 278.244 220.576C278.084 220.631 277.945 220.711 277.828 220.816C277.707 220.922 277.611 221.049 277.541 221.197C277.475 221.346 277.441 221.512 277.441 221.695H276.041C276.041 221.355 276.109 221.043 276.246 220.758C276.383 220.473 276.572 220.225 276.814 220.014C277.057 219.807 277.342 219.645 277.67 219.527C278.002 219.41 278.365 219.352 278.76 219.352C279.162 219.352 279.531 219.404 279.867 219.51C280.207 219.611 280.496 219.764 280.734 219.967C280.977 220.174 281.164 220.428 281.297 220.729C281.43 221.029 281.496 221.379 281.496 221.777C281.496 221.953 281.469 222.129 281.414 222.305C281.363 222.48 281.285 222.65 281.18 222.814C281.074 222.975 280.941 223.125 280.781 223.266C280.621 223.406 280.434 223.525 280.219 223.623C280.473 223.709 280.688 223.822 280.863 223.963C281.043 224.1 281.189 224.254 281.303 224.426C281.416 224.602 281.498 224.791 281.549 224.994C281.6 225.193 281.625 225.4 281.625 225.615C281.625 226.014 281.551 226.369 281.402 226.682C281.258 226.99 281.059 227.25 280.805 227.461C280.547 227.676 280.242 227.84 279.891 227.953C279.543 228.062 279.166 228.117 278.76 228.117C278.393 228.117 278.039 228.066 277.699 227.965C277.359 227.863 277.061 227.711 276.803 227.508C276.545 227.305 276.338 227.055 276.182 226.758C276.029 226.457 275.953 226.107 275.953 225.709H277.354C277.354 225.896 277.387 226.07 277.453 226.23C277.523 226.387 277.623 226.52 277.752 226.629C277.877 226.742 278.025 226.83 278.197 226.893C278.373 226.955 278.566 226.986 278.777 226.986C279.004 226.986 279.207 226.957 279.387 226.898C279.57 226.836 279.725 226.744 279.85 226.623C279.971 226.51 280.062 226.369 280.125 226.201C280.191 226.029 280.225 225.834 280.225 225.615C280.225 225.369 280.188 225.158 280.113 224.982C280.039 224.807 279.932 224.66 279.791 224.543C279.65 224.43 279.48 224.346 279.281 224.291C279.086 224.232 278.867 224.203 278.625 224.203H277.787V223.102ZM289.014 220.254L285.604 228H284.127L287.537 220.641H283.113V219.469H289.014V220.254Z"
              fill="#151515"
            />

            <path
              id="338_2"
              d="M678.58 445.102H679.418C679.668 445.102 679.887 445.068 680.074 445.002C680.262 444.932 680.416 444.834 680.537 444.709C680.65 444.6 680.736 444.465 680.795 444.305C680.857 444.141 680.889 443.965 680.889 443.777C680.889 443.574 680.859 443.393 680.801 443.232C680.746 443.072 680.664 442.936 680.555 442.822C680.445 442.717 680.307 442.635 680.139 442.576C679.975 442.518 679.785 442.488 679.57 442.488C679.379 442.488 679.201 442.518 679.037 442.576C678.877 442.631 678.738 442.711 678.621 442.816C678.5 442.922 678.404 443.049 678.334 443.197C678.268 443.346 678.234 443.512 678.234 443.695H676.834C676.834 443.355 676.902 443.043 677.039 442.758C677.176 442.473 677.365 442.225 677.607 442.014C677.85 441.807 678.135 441.645 678.463 441.527C678.795 441.41 679.158 441.352 679.553 441.352C679.955 441.352 680.324 441.404 680.66 441.51C681 441.611 681.289 441.764 681.527 441.967C681.77 442.174 681.957 442.428 682.09 442.729C682.223 443.029 682.289 443.379 682.289 443.777C682.289 443.953 682.262 444.129 682.207 444.305C682.156 444.48 682.078 444.65 681.973 444.814C681.867 444.975 681.734 445.125 681.574 445.266C681.414 445.406 681.227 445.525 681.012 445.623C681.266 445.709 681.48 445.822 681.656 445.963C681.836 446.1 681.982 446.254 682.096 446.426C682.209 446.602 682.291 446.791 682.342 446.994C682.393 447.193 682.418 447.4 682.418 447.615C682.418 448.014 682.344 448.369 682.195 448.682C682.051 448.99 681.852 449.25 681.598 449.461C681.34 449.676 681.035 449.84 680.684 449.953C680.336 450.062 679.959 450.117 679.553 450.117C679.186 450.117 678.832 450.066 678.492 449.965C678.152 449.863 677.854 449.711 677.596 449.508C677.338 449.305 677.131 449.055 676.975 448.758C676.822 448.457 676.746 448.107 676.746 447.709H678.146C678.146 447.896 678.18 448.07 678.246 448.23C678.316 448.387 678.416 448.52 678.545 448.629C678.67 448.742 678.818 448.83 678.99 448.893C679.166 448.955 679.359 448.986 679.57 448.986C679.797 448.986 680 448.957 680.18 448.898C680.363 448.836 680.518 448.744 680.643 448.623C680.764 448.51 680.855 448.369 680.918 448.201C680.984 448.029 681.018 447.834 681.018 447.615C681.018 447.369 680.98 447.158 680.906 446.982C680.832 446.807 680.725 446.66 680.584 446.543C680.443 446.43 680.273 446.346 680.074 446.291C679.879 446.232 679.66 446.203 679.418 446.203H678.58V445.102ZM685.787 445.102H686.625C686.875 445.102 687.094 445.068 687.281 445.002C687.469 444.932 687.623 444.834 687.744 444.709C687.857 444.6 687.943 444.465 688.002 444.305C688.064 444.141 688.096 443.965 688.096 443.777C688.096 443.574 688.066 443.393 688.008 443.232C687.953 443.072 687.871 442.936 687.762 442.822C687.652 442.717 687.514 442.635 687.346 442.576C687.182 442.518 686.992 442.488 686.777 442.488C686.586 442.488 686.408 442.518 686.244 442.576C686.084 442.631 685.945 442.711 685.828 442.816C685.707 442.922 685.611 443.049 685.541 443.197C685.475 443.346 685.441 443.512 685.441 443.695H684.041C684.041 443.355 684.109 443.043 684.246 442.758C684.383 442.473 684.572 442.225 684.814 442.014C685.057 441.807 685.342 441.645 685.67 441.527C686.002 441.41 686.365 441.352 686.76 441.352C687.162 441.352 687.531 441.404 687.867 441.51C688.207 441.611 688.496 441.764 688.734 441.967C688.977 442.174 689.164 442.428 689.297 442.729C689.43 443.029 689.496 443.379 689.496 443.777C689.496 443.953 689.469 444.129 689.414 444.305C689.363 444.48 689.285 444.65 689.18 444.814C689.074 444.975 688.941 445.125 688.781 445.266C688.621 445.406 688.434 445.525 688.219 445.623C688.473 445.709 688.688 445.822 688.863 445.963C689.043 446.1 689.189 446.254 689.303 446.426C689.416 446.602 689.498 446.791 689.549 446.994C689.6 447.193 689.625 447.4 689.625 447.615C689.625 448.014 689.551 448.369 689.402 448.682C689.258 448.99 689.059 449.25 688.805 449.461C688.547 449.676 688.242 449.84 687.891 449.953C687.543 450.062 687.166 450.117 686.76 450.117C686.393 450.117 686.039 450.066 685.699 449.965C685.359 449.863 685.061 449.711 684.803 449.508C684.545 449.305 684.338 449.055 684.182 448.758C684.029 448.457 683.953 448.107 683.953 447.709H685.354C685.354 447.896 685.387 448.07 685.453 448.23C685.523 448.387 685.623 448.52 685.752 448.629C685.877 448.742 686.025 448.83 686.197 448.893C686.373 448.955 686.566 448.986 686.777 448.986C687.004 448.986 687.207 448.957 687.387 448.898C687.57 448.836 687.725 448.744 687.85 448.623C687.971 448.51 688.062 448.369 688.125 448.201C688.191 448.029 688.225 447.834 688.225 447.615C688.225 447.369 688.188 447.158 688.113 446.982C688.039 446.807 687.932 446.66 687.791 446.543C687.65 446.43 687.48 446.346 687.281 446.291C687.086 446.232 686.867 446.203 686.625 446.203H685.787V445.102ZM696.82 443.719C696.82 443.977 696.777 444.217 696.691 444.439C696.609 444.662 696.492 444.861 696.34 445.037C696.246 445.15 696.139 445.256 696.018 445.354C695.896 445.451 695.762 445.537 695.613 445.611C695.789 445.693 695.951 445.789 696.1 445.898C696.252 446.004 696.385 446.127 696.498 446.268C696.658 446.455 696.783 446.668 696.873 446.906C696.963 447.145 697.008 447.402 697.008 447.68C697.008 448.074 696.936 448.424 696.791 448.729C696.646 449.033 696.449 449.287 696.199 449.49C695.945 449.697 695.648 449.854 695.309 449.959C694.973 450.064 694.609 450.117 694.219 450.117C693.82 450.117 693.449 450.064 693.105 449.959C692.766 449.854 692.471 449.697 692.221 449.49C691.967 449.287 691.768 449.035 691.623 448.734C691.482 448.43 691.412 448.078 691.412 447.68C691.412 447.445 691.443 447.223 691.506 447.012C691.572 446.801 691.666 446.605 691.787 446.426C691.908 446.254 692.053 446.1 692.221 445.963C692.393 445.822 692.584 445.703 692.795 445.605C692.615 445.516 692.451 445.406 692.303 445.277C692.158 445.148 692.035 445.006 691.934 444.85C691.828 444.689 691.746 444.514 691.688 444.322C691.629 444.131 691.6 443.93 691.6 443.719C691.6 443.34 691.664 443.004 691.793 442.711C691.926 442.418 692.107 442.17 692.338 441.967C692.564 441.764 692.836 441.611 693.152 441.51C693.473 441.404 693.822 441.352 694.201 441.352C694.576 441.352 694.922 441.404 695.238 441.51C695.559 441.611 695.838 441.764 696.076 441.967C696.307 442.166 696.488 442.414 696.621 442.711C696.754 443.004 696.82 443.34 696.82 443.719ZM695.607 447.604C695.607 447.393 695.572 447.201 695.502 447.029C695.436 446.854 695.342 446.701 695.221 446.572C695.096 446.451 694.947 446.357 694.775 446.291C694.604 446.225 694.414 446.191 694.207 446.191C693.992 446.191 693.799 446.225 693.627 446.291C693.459 446.357 693.314 446.451 693.193 446.572C693.072 446.701 692.979 446.854 692.912 447.029C692.85 447.201 692.818 447.395 692.818 447.609C692.818 447.828 692.852 448.025 692.918 448.201C692.984 448.373 693.08 448.518 693.205 448.635C693.326 448.748 693.471 448.836 693.639 448.898C693.811 448.957 694.004 448.986 694.219 448.986C694.422 448.986 694.607 448.955 694.775 448.893C694.947 448.83 695.096 448.74 695.221 448.623C695.338 448.502 695.432 448.357 695.502 448.189C695.572 448.018 695.607 447.822 695.607 447.604ZM695.426 443.771C695.426 443.58 695.395 443.406 695.332 443.25C695.273 443.094 695.191 442.957 695.086 442.84C694.977 442.73 694.848 442.645 694.699 442.582C694.551 442.52 694.383 442.488 694.195 442.488C694.012 442.488 693.846 442.52 693.697 442.582C693.553 442.641 693.428 442.725 693.322 442.834C693.221 442.943 693.143 443.078 693.088 443.238C693.033 443.398 693.006 443.576 693.006 443.771C693.006 443.963 693.033 444.139 693.088 444.299C693.143 444.455 693.225 444.588 693.334 444.697C693.439 444.811 693.566 444.898 693.715 444.961C693.863 445.023 694.029 445.055 694.213 445.055C694.396 445.055 694.562 445.023 694.711 444.961C694.859 444.898 694.986 444.811 695.092 444.697C695.197 444.588 695.279 444.455 695.338 444.299C695.396 444.139 695.426 443.963 695.426 443.771Z"
              fill="#151515"
            />

            <path
              id="339_2"
              d="M729.58 508.102H730.418C730.668 508.102 730.887 508.068 731.074 508.002C731.262 507.932 731.416 507.834 731.537 507.709C731.65 507.6 731.736 507.465 731.795 507.305C731.857 507.141 731.889 506.965 731.889 506.777C731.889 506.574 731.859 506.393 731.801 506.232C731.746 506.072 731.664 505.936 731.555 505.822C731.445 505.717 731.307 505.635 731.139 505.576C730.975 505.518 730.785 505.488 730.57 505.488C730.379 505.488 730.201 505.518 730.037 505.576C729.877 505.631 729.738 505.711 729.621 505.816C729.5 505.922 729.404 506.049 729.334 506.197C729.268 506.346 729.234 506.512 729.234 506.695H727.834C727.834 506.355 727.902 506.043 728.039 505.758C728.176 505.473 728.365 505.225 728.607 505.014C728.85 504.807 729.135 504.645 729.463 504.527C729.795 504.41 730.158 504.352 730.553 504.352C730.955 504.352 731.324 504.404 731.66 504.51C732 504.611 732.289 504.764 732.527 504.967C732.77 505.174 732.957 505.428 733.09 505.729C733.223 506.029 733.289 506.379 733.289 506.777C733.289 506.953 733.262 507.129 733.207 507.305C733.156 507.48 733.078 507.65 732.973 507.814C732.867 507.975 732.734 508.125 732.574 508.266C732.414 508.406 732.227 508.525 732.012 508.623C732.266 508.709 732.48 508.822 732.656 508.963C732.836 509.1 732.982 509.254 733.096 509.426C733.209 509.602 733.291 509.791 733.342 509.994C733.393 510.193 733.418 510.4 733.418 510.615C733.418 511.014 733.344 511.369 733.195 511.682C733.051 511.99 732.852 512.25 732.598 512.461C732.34 512.676 732.035 512.84 731.684 512.953C731.336 513.062 730.959 513.117 730.553 513.117C730.186 513.117 729.832 513.066 729.492 512.965C729.152 512.863 728.854 512.711 728.596 512.508C728.338 512.305 728.131 512.055 727.975 511.758C727.822 511.457 727.746 511.107 727.746 510.709H729.146C729.146 510.896 729.18 511.07 729.246 511.23C729.316 511.387 729.416 511.52 729.545 511.629C729.67 511.742 729.818 511.83 729.99 511.893C730.166 511.955 730.359 511.986 730.57 511.986C730.797 511.986 731 511.957 731.18 511.898C731.363 511.836 731.518 511.744 731.643 511.623C731.764 511.51 731.855 511.369 731.918 511.201C731.984 511.029 732.018 510.834 732.018 510.615C732.018 510.369 731.98 510.158 731.906 509.982C731.832 509.807 731.725 509.66 731.584 509.543C731.443 509.43 731.273 509.346 731.074 509.291C730.879 509.232 730.66 509.203 730.418 509.203H729.58V508.102ZM736.787 508.102H737.625C737.875 508.102 738.094 508.068 738.281 508.002C738.469 507.932 738.623 507.834 738.744 507.709C738.857 507.6 738.943 507.465 739.002 507.305C739.064 507.141 739.096 506.965 739.096 506.777C739.096 506.574 739.066 506.393 739.008 506.232C738.953 506.072 738.871 505.936 738.762 505.822C738.652 505.717 738.514 505.635 738.346 505.576C738.182 505.518 737.992 505.488 737.777 505.488C737.586 505.488 737.408 505.518 737.244 505.576C737.084 505.631 736.945 505.711 736.828 505.816C736.707 505.922 736.611 506.049 736.541 506.197C736.475 506.346 736.441 506.512 736.441 506.695H735.041C735.041 506.355 735.109 506.043 735.246 505.758C735.383 505.473 735.572 505.225 735.814 505.014C736.057 504.807 736.342 504.645 736.67 504.527C737.002 504.41 737.365 504.352 737.76 504.352C738.162 504.352 738.531 504.404 738.867 504.51C739.207 504.611 739.496 504.764 739.734 504.967C739.977 505.174 740.164 505.428 740.297 505.729C740.43 506.029 740.496 506.379 740.496 506.777C740.496 506.953 740.469 507.129 740.414 507.305C740.363 507.48 740.285 507.65 740.18 507.814C740.074 507.975 739.941 508.125 739.781 508.266C739.621 508.406 739.434 508.525 739.219 508.623C739.473 508.709 739.688 508.822 739.863 508.963C740.043 509.1 740.189 509.254 740.303 509.426C740.416 509.602 740.498 509.791 740.549 509.994C740.6 510.193 740.625 510.4 740.625 510.615C740.625 511.014 740.551 511.369 740.402 511.682C740.258 511.99 740.059 512.25 739.805 512.461C739.547 512.676 739.242 512.84 738.891 512.953C738.543 513.062 738.166 513.117 737.76 513.117C737.393 513.117 737.039 513.066 736.699 512.965C736.359 512.863 736.061 512.711 735.803 512.508C735.545 512.305 735.338 512.055 735.182 511.758C735.029 511.457 734.953 511.107 734.953 510.709H736.354C736.354 510.896 736.387 511.07 736.453 511.23C736.523 511.387 736.623 511.52 736.752 511.629C736.877 511.742 737.025 511.83 737.197 511.893C737.373 511.955 737.566 511.986 737.777 511.986C738.004 511.986 738.207 511.957 738.387 511.898C738.57 511.836 738.725 511.744 738.85 511.623C738.971 511.51 739.062 511.369 739.125 511.201C739.191 511.029 739.225 510.834 739.225 510.615C739.225 510.369 739.188 510.158 739.113 509.982C739.039 509.807 738.932 509.66 738.791 509.543C738.65 509.43 738.48 509.346 738.281 509.291C738.086 509.232 737.867 509.203 737.625 509.203H736.787V508.102ZM743.648 511.846C744.133 511.846 744.545 511.791 744.885 511.682C745.225 511.572 745.504 511.416 745.723 511.213C745.957 510.99 746.129 510.736 746.238 510.451C746.348 510.162 746.418 509.852 746.449 509.52V509.49C746.363 509.588 746.264 509.68 746.15 509.766C746.041 509.848 745.92 509.92 745.787 509.982C745.646 510.049 745.49 510.102 745.318 510.141C745.15 510.18 744.965 510.199 744.762 510.199C744.348 510.199 743.986 510.121 743.678 509.965C743.373 509.809 743.119 509.6 742.916 509.338C742.709 509.072 742.555 508.768 742.453 508.424C742.352 508.08 742.301 507.719 742.301 507.34C742.301 506.93 742.361 506.545 742.482 506.186C742.607 505.822 742.787 505.504 743.021 505.23C743.256 504.961 743.543 504.748 743.883 504.592C744.227 504.432 744.617 504.352 745.055 504.352C745.496 504.352 745.887 504.436 746.227 504.604C746.57 504.771 746.861 505 747.1 505.289C747.35 505.602 747.539 505.98 747.668 506.426C747.797 506.867 747.861 507.332 747.861 507.82V508.312C747.861 508.984 747.783 509.625 747.627 510.234C747.471 510.844 747.195 511.377 746.801 511.834C746.48 512.209 746.059 512.504 745.535 512.719C745.016 512.934 744.389 513.041 743.654 513.041H743.537V511.846H743.648ZM745.061 509.092C745.225 509.092 745.379 509.066 745.523 509.016C745.672 508.965 745.807 508.893 745.928 508.799C746.049 508.709 746.154 508.604 746.244 508.482C746.338 508.357 746.414 508.223 746.473 508.078V507.592C746.473 507.252 746.434 506.951 746.355 506.689C746.281 506.428 746.182 506.209 746.057 506.033C745.928 505.857 745.777 505.725 745.605 505.635C745.434 505.541 745.25 505.494 745.055 505.494C744.836 505.494 744.641 505.543 744.469 505.641C744.301 505.734 744.16 505.863 744.047 506.027C743.93 506.191 743.84 506.385 743.777 506.607C743.719 506.826 743.689 507.057 743.689 507.299C743.689 507.533 743.717 507.758 743.771 507.973C743.826 508.188 743.912 508.379 744.029 508.547C744.143 508.711 744.283 508.844 744.451 508.945C744.623 509.043 744.826 509.092 745.061 509.092Z"
              fill="#151515"
            />

            <path
              id="340_2"
              d="M744.58 492.102H745.418C745.668 492.102 745.887 492.068 746.074 492.002C746.262 491.932 746.416 491.834 746.537 491.709C746.65 491.6 746.736 491.465 746.795 491.305C746.857 491.141 746.889 490.965 746.889 490.777C746.889 490.574 746.859 490.393 746.801 490.232C746.746 490.072 746.664 489.936 746.555 489.822C746.445 489.717 746.307 489.635 746.139 489.576C745.975 489.518 745.785 489.488 745.57 489.488C745.379 489.488 745.201 489.518 745.037 489.576C744.877 489.631 744.738 489.711 744.621 489.816C744.5 489.922 744.404 490.049 744.334 490.197C744.268 490.346 744.234 490.512 744.234 490.695H742.834C742.834 490.355 742.902 490.043 743.039 489.758C743.176 489.473 743.365 489.225 743.607 489.014C743.85 488.807 744.135 488.645 744.463 488.527C744.795 488.41 745.158 488.352 745.553 488.352C745.955 488.352 746.324 488.404 746.66 488.51C747 488.611 747.289 488.764 747.527 488.967C747.77 489.174 747.957 489.428 748.09 489.729C748.223 490.029 748.289 490.379 748.289 490.777C748.289 490.953 748.262 491.129 748.207 491.305C748.156 491.48 748.078 491.65 747.973 491.814C747.867 491.975 747.734 492.125 747.574 492.266C747.414 492.406 747.227 492.525 747.012 492.623C747.266 492.709 747.48 492.822 747.656 492.963C747.836 493.1 747.982 493.254 748.096 493.426C748.209 493.602 748.291 493.791 748.342 493.994C748.393 494.193 748.418 494.4 748.418 494.615C748.418 495.014 748.344 495.369 748.195 495.682C748.051 495.99 747.852 496.25 747.598 496.461C747.34 496.676 747.035 496.84 746.684 496.953C746.336 497.062 745.959 497.117 745.553 497.117C745.186 497.117 744.832 497.066 744.492 496.965C744.152 496.863 743.854 496.711 743.596 496.508C743.338 496.305 743.131 496.055 742.975 495.758C742.822 495.457 742.746 495.107 742.746 494.709H744.146C744.146 494.896 744.18 495.07 744.246 495.23C744.316 495.387 744.416 495.52 744.545 495.629C744.67 495.742 744.818 495.83 744.99 495.893C745.166 495.955 745.359 495.986 745.57 495.986C745.797 495.986 746 495.957 746.18 495.898C746.363 495.836 746.518 495.744 746.643 495.623C746.764 495.51 746.855 495.369 746.918 495.201C746.984 495.029 747.018 494.834 747.018 494.615C747.018 494.369 746.98 494.158 746.906 493.982C746.832 493.807 746.725 493.66 746.584 493.543C746.443 493.43 746.273 493.346 746.074 493.291C745.879 493.232 745.66 493.203 745.418 493.203H744.58V492.102ZM754.91 493.959H755.982V495.096H754.91V497H753.51V495.096H749.818L749.783 494.234L753.469 488.469H754.91V493.959ZM751.213 493.959H753.51V490.344L753.346 490.648L751.213 493.959ZM762.984 493.748C762.984 494.295 762.92 494.779 762.791 495.201C762.666 495.619 762.484 495.969 762.246 496.25C762.012 496.539 761.723 496.758 761.379 496.906C761.039 497.051 760.652 497.123 760.219 497.123C759.789 497.123 759.402 497.051 759.059 496.906C758.715 496.758 758.424 496.539 758.186 496.25C757.943 495.969 757.758 495.619 757.629 495.201C757.504 494.779 757.441 494.295 757.441 493.748V491.727C757.441 491.18 757.504 490.697 757.629 490.279C757.758 489.857 757.941 489.502 758.18 489.213C758.418 488.928 758.707 488.713 759.047 488.568C759.391 488.42 759.777 488.346 760.207 488.346C760.641 488.346 761.027 488.42 761.367 488.568C761.711 488.713 762.004 488.928 762.246 489.213C762.48 489.502 762.662 489.857 762.791 490.279C762.92 490.697 762.984 491.18 762.984 491.727V493.748ZM758.848 493.25L761.561 491.193C761.545 490.889 761.502 490.625 761.432 490.402C761.365 490.18 761.27 489.998 761.145 489.857C761.035 489.732 760.9 489.639 760.74 489.576C760.584 489.514 760.406 489.482 760.207 489.482C759.992 489.482 759.803 489.52 759.639 489.594C759.475 489.668 759.338 489.777 759.229 489.922C759.1 490.086 759.004 490.299 758.941 490.561C758.879 490.818 758.848 491.123 758.848 491.475V492.623C758.848 492.771 758.848 492.885 758.848 492.963C758.848 493.041 758.848 493.137 758.848 493.25ZM761.572 493.982V492.904C761.572 492.807 761.572 492.705 761.572 492.6C761.572 492.494 761.572 492.385 761.572 492.271L758.859 494.316C758.879 494.586 758.92 494.824 758.982 495.031C759.049 495.238 759.137 495.41 759.246 495.547C759.355 495.695 759.49 495.807 759.65 495.881C759.814 495.955 760.004 495.992 760.219 495.992C760.43 495.992 760.615 495.957 760.775 495.887C760.936 495.812 761.072 495.705 761.186 495.564C761.314 495.4 761.41 495.186 761.473 494.92C761.539 494.654 761.572 494.342 761.572 493.982Z"
              fill="#151515"
            />

            <path
              id="341_2"
              d="M790.58 434.102H791.418C791.668 434.102 791.887 434.068 792.074 434.002C792.262 433.932 792.416 433.834 792.537 433.709C792.65 433.6 792.736 433.465 792.795 433.305C792.857 433.141 792.889 432.965 792.889 432.777C792.889 432.574 792.859 432.393 792.801 432.232C792.746 432.072 792.664 431.936 792.555 431.822C792.445 431.717 792.307 431.635 792.139 431.576C791.975 431.518 791.785 431.488 791.57 431.488C791.379 431.488 791.201 431.518 791.037 431.576C790.877 431.631 790.738 431.711 790.621 431.816C790.5 431.922 790.404 432.049 790.334 432.197C790.268 432.346 790.234 432.512 790.234 432.695H788.834C788.834 432.355 788.902 432.043 789.039 431.758C789.176 431.473 789.365 431.225 789.607 431.014C789.85 430.807 790.135 430.645 790.463 430.527C790.795 430.41 791.158 430.352 791.553 430.352C791.955 430.352 792.324 430.404 792.66 430.51C793 430.611 793.289 430.764 793.527 430.967C793.77 431.174 793.957 431.428 794.09 431.729C794.223 432.029 794.289 432.379 794.289 432.777C794.289 432.953 794.262 433.129 794.207 433.305C794.156 433.48 794.078 433.65 793.973 433.814C793.867 433.975 793.734 434.125 793.574 434.266C793.414 434.406 793.227 434.525 793.012 434.623C793.266 434.709 793.48 434.822 793.656 434.963C793.836 435.1 793.982 435.254 794.096 435.426C794.209 435.602 794.291 435.791 794.342 435.994C794.393 436.193 794.418 436.4 794.418 436.615C794.418 437.014 794.344 437.369 794.195 437.682C794.051 437.99 793.852 438.25 793.598 438.461C793.34 438.676 793.035 438.84 792.684 438.953C792.336 439.062 791.959 439.117 791.553 439.117C791.186 439.117 790.832 439.066 790.492 438.965C790.152 438.863 789.854 438.711 789.596 438.508C789.338 438.305 789.131 438.055 788.975 437.758C788.822 437.457 788.746 437.107 788.746 436.709H790.146C790.146 436.896 790.18 437.07 790.246 437.23C790.316 437.387 790.416 437.52 790.545 437.629C790.67 437.742 790.818 437.83 790.99 437.893C791.166 437.955 791.359 437.986 791.57 437.986C791.797 437.986 792 437.957 792.18 437.898C792.363 437.836 792.518 437.744 792.643 437.623C792.764 437.51 792.855 437.369 792.918 437.201C792.984 437.029 793.018 436.834 793.018 436.615C793.018 436.369 792.98 436.158 792.906 435.982C792.832 435.807 792.725 435.66 792.584 435.543C792.443 435.43 792.273 435.346 792.074 435.291C791.879 435.232 791.66 435.203 791.418 435.203H790.58V434.102ZM800.91 435.959H801.982V437.096H800.91V439H799.51V437.096H795.818L795.783 436.234L799.469 430.469H800.91V435.959ZM797.213 435.959H799.51V432.344L799.346 432.648L797.213 435.959ZM807.303 439H805.891V432.203L803.705 433.006V431.77L807.215 430.469H807.303V439Z"
              fill="#151515"
            />

            <path
              id="343_2"
              d="M633.58 757.102H634.418C634.668 757.102 634.887 757.068 635.074 757.002C635.262 756.932 635.416 756.834 635.537 756.709C635.65 756.6 635.736 756.465 635.795 756.305C635.857 756.141 635.889 755.965 635.889 755.777C635.889 755.574 635.859 755.393 635.801 755.232C635.746 755.072 635.664 754.936 635.555 754.822C635.445 754.717 635.307 754.635 635.139 754.576C634.975 754.518 634.785 754.488 634.57 754.488C634.379 754.488 634.201 754.518 634.037 754.576C633.877 754.631 633.738 754.711 633.621 754.816C633.5 754.922 633.404 755.049 633.334 755.197C633.268 755.346 633.234 755.512 633.234 755.695H631.834C631.834 755.355 631.902 755.043 632.039 754.758C632.176 754.473 632.365 754.225 632.607 754.014C632.85 753.807 633.135 753.645 633.463 753.527C633.795 753.41 634.158 753.352 634.553 753.352C634.955 753.352 635.324 753.404 635.66 753.51C636 753.611 636.289 753.764 636.527 753.967C636.77 754.174 636.957 754.428 637.09 754.729C637.223 755.029 637.289 755.379 637.289 755.777C637.289 755.953 637.262 756.129 637.207 756.305C637.156 756.48 637.078 756.65 636.973 756.814C636.867 756.975 636.734 757.125 636.574 757.266C636.414 757.406 636.227 757.525 636.012 757.623C636.266 757.709 636.48 757.822 636.656 757.963C636.836 758.1 636.982 758.254 637.096 758.426C637.209 758.602 637.291 758.791 637.342 758.994C637.393 759.193 637.418 759.4 637.418 759.615C637.418 760.014 637.344 760.369 637.195 760.682C637.051 760.99 636.852 761.25 636.598 761.461C636.34 761.676 636.035 761.84 635.684 761.953C635.336 762.062 634.959 762.117 634.553 762.117C634.186 762.117 633.832 762.066 633.492 761.965C633.152 761.863 632.854 761.711 632.596 761.508C632.338 761.305 632.131 761.055 631.975 760.758C631.822 760.457 631.746 760.107 631.746 759.709H633.146C633.146 759.896 633.18 760.07 633.246 760.23C633.316 760.387 633.416 760.52 633.545 760.629C633.67 760.742 633.818 760.83 633.99 760.893C634.166 760.955 634.359 760.986 634.57 760.986C634.797 760.986 635 760.957 635.18 760.898C635.363 760.836 635.518 760.744 635.643 760.623C635.764 760.51 635.855 760.369 635.918 760.201C635.984 760.029 636.018 759.834 636.018 759.615C636.018 759.369 635.98 759.158 635.906 758.982C635.832 758.807 635.725 758.66 635.584 758.543C635.443 758.43 635.273 758.346 635.074 758.291C634.879 758.232 634.66 758.203 634.418 758.203H633.58V757.102ZM643.91 758.959H644.982V760.096H643.91V762H642.51V760.096H638.818L638.783 759.234L642.469 753.469H643.91V758.959ZM640.213 758.959H642.51V755.344L642.346 755.648L640.213 758.959ZM647.994 757.102H648.832C649.082 757.102 649.301 757.068 649.488 757.002C649.676 756.932 649.83 756.834 649.951 756.709C650.064 756.6 650.15 756.465 650.209 756.305C650.271 756.141 650.303 755.965 650.303 755.777C650.303 755.574 650.273 755.393 650.215 755.232C650.16 755.072 650.078 754.936 649.969 754.822C649.859 754.717 649.721 754.635 649.553 754.576C649.389 754.518 649.199 754.488 648.984 754.488C648.793 754.488 648.615 754.518 648.451 754.576C648.291 754.631 648.152 754.711 648.035 754.816C647.914 754.922 647.818 755.049 647.748 755.197C647.682 755.346 647.648 755.512 647.648 755.695H646.248C646.248 755.355 646.316 755.043 646.453 754.758C646.59 754.473 646.779 754.225 647.021 754.014C647.264 753.807 647.549 753.645 647.877 753.527C648.209 753.41 648.572 753.352 648.967 753.352C649.369 753.352 649.738 753.404 650.074 753.51C650.414 753.611 650.703 753.764 650.941 753.967C651.184 754.174 651.371 754.428 651.504 754.729C651.637 755.029 651.703 755.379 651.703 755.777C651.703 755.953 651.676 756.129 651.621 756.305C651.57 756.48 651.492 756.65 651.387 756.814C651.281 756.975 651.148 757.125 650.988 757.266C650.828 757.406 650.641 757.525 650.426 757.623C650.68 757.709 650.895 757.822 651.07 757.963C651.25 758.1 651.396 758.254 651.51 758.426C651.623 758.602 651.705 758.791 651.756 758.994C651.807 759.193 651.832 759.4 651.832 759.615C651.832 760.014 651.758 760.369 651.609 760.682C651.465 760.99 651.266 761.25 651.012 761.461C650.754 761.676 650.449 761.84 650.098 761.953C649.75 762.062 649.373 762.117 648.967 762.117C648.6 762.117 648.246 762.066 647.906 761.965C647.566 761.863 647.268 761.711 647.01 761.508C646.752 761.305 646.545 761.055 646.389 760.758C646.236 760.457 646.16 760.107 646.16 759.709H647.561C647.561 759.896 647.594 760.07 647.66 760.23C647.73 760.387 647.83 760.52 647.959 760.629C648.084 760.742 648.232 760.83 648.404 760.893C648.58 760.955 648.773 760.986 648.984 760.986C649.211 760.986 649.414 760.957 649.594 760.898C649.777 760.836 649.932 760.744 650.057 760.623C650.178 760.51 650.27 760.369 650.332 760.201C650.398 760.029 650.432 759.834 650.432 759.615C650.432 759.369 650.395 759.158 650.32 758.982C650.246 758.807 650.139 758.66 649.998 758.543C649.857 758.43 649.688 758.346 649.488 758.291C649.293 758.232 649.074 758.203 648.832 758.203H647.994V757.102Z"
              fill="#151515"
            />

            <path
              id="342_2"
              d="M768.58 281.102H769.418C769.668 281.102 769.887 281.068 770.074 281.002C770.262 280.932 770.416 280.834 770.537 280.709C770.65 280.6 770.736 280.465 770.795 280.305C770.857 280.141 770.889 279.965 770.889 279.777C770.889 279.574 770.859 279.393 770.801 279.232C770.746 279.072 770.664 278.936 770.555 278.822C770.445 278.717 770.307 278.635 770.139 278.576C769.975 278.518 769.785 278.488 769.57 278.488C769.379 278.488 769.201 278.518 769.037 278.576C768.877 278.631 768.738 278.711 768.621 278.816C768.5 278.922 768.404 279.049 768.334 279.197C768.268 279.346 768.234 279.512 768.234 279.695H766.834C766.834 279.355 766.902 279.043 767.039 278.758C767.176 278.473 767.365 278.225 767.607 278.014C767.85 277.807 768.135 277.645 768.463 277.527C768.795 277.41 769.158 277.352 769.553 277.352C769.955 277.352 770.324 277.404 770.66 277.51C771 277.611 771.289 277.764 771.527 277.967C771.77 278.174 771.957 278.428 772.09 278.729C772.223 279.029 772.289 279.379 772.289 279.777C772.289 279.953 772.262 280.129 772.207 280.305C772.156 280.48 772.078 280.65 771.973 280.814C771.867 280.975 771.734 281.125 771.574 281.266C771.414 281.406 771.227 281.525 771.012 281.623C771.266 281.709 771.48 281.822 771.656 281.963C771.836 282.1 771.982 282.254 772.096 282.426C772.209 282.602 772.291 282.791 772.342 282.994C772.393 283.193 772.418 283.4 772.418 283.615C772.418 284.014 772.344 284.369 772.195 284.682C772.051 284.99 771.852 285.25 771.598 285.461C771.34 285.676 771.035 285.84 770.684 285.953C770.336 286.062 769.959 286.117 769.553 286.117C769.186 286.117 768.832 286.066 768.492 285.965C768.152 285.863 767.854 285.711 767.596 285.508C767.338 285.305 767.131 285.055 766.975 284.758C766.822 284.457 766.746 284.107 766.746 283.709H768.146C768.146 283.896 768.18 284.07 768.246 284.23C768.316 284.387 768.416 284.52 768.545 284.629C768.67 284.742 768.818 284.83 768.99 284.893C769.166 284.955 769.359 284.986 769.57 284.986C769.797 284.986 770 284.957 770.18 284.898C770.363 284.836 770.518 284.744 770.643 284.623C770.764 284.51 770.855 284.369 770.918 284.201C770.984 284.029 771.018 283.834 771.018 283.615C771.018 283.369 770.98 283.158 770.906 282.982C770.832 282.807 770.725 282.66 770.584 282.543C770.443 282.43 770.273 282.346 770.074 282.291C769.879 282.232 769.66 282.203 769.418 282.203H768.58V281.102ZM778.91 282.959H779.982V284.096H778.91V286H777.51V284.096H773.818L773.783 283.234L777.469 277.469H778.91V282.959ZM775.213 282.959H777.51V279.344L777.346 279.648L775.213 282.959ZM786.943 286H781.219V285.027L783.996 282.004C784.227 281.75 784.42 281.523 784.576 281.324C784.732 281.121 784.859 280.936 784.957 280.768C785.051 280.6 785.117 280.443 785.156 280.299C785.199 280.15 785.221 280.002 785.221 279.854C785.221 279.654 785.191 279.473 785.133 279.309C785.074 279.145 784.988 279.004 784.875 278.887C784.762 278.77 784.625 278.678 784.465 278.611C784.309 278.545 784.133 278.512 783.938 278.512C783.688 278.512 783.471 278.547 783.287 278.617C783.104 278.688 782.951 278.787 782.83 278.916C782.705 279.053 782.611 279.219 782.549 279.414C782.486 279.605 782.455 279.824 782.455 280.07H781.049C781.049 279.699 781.117 279.35 781.254 279.021C781.391 278.689 781.586 278.4 781.84 278.154C782.09 277.908 782.395 277.713 782.754 277.568C783.117 277.424 783.521 277.352 783.967 277.352C784.385 277.352 784.758 277.412 785.086 277.533C785.418 277.654 785.697 277.822 785.924 278.037C786.146 278.252 786.316 278.51 786.434 278.811C786.551 279.107 786.609 279.436 786.609 279.795C786.609 280.064 786.564 280.326 786.475 280.58C786.389 280.83 786.27 281.078 786.117 281.324C785.961 281.57 785.775 281.818 785.561 282.068C785.35 282.318 785.119 282.576 784.869 282.842L782.971 284.869H786.943V286Z"
              fill="#151515"
            />

            <path
              d="M146.58 17.102h.838c.25 0 .469-.034.656-.1a1.23 1.23 0 0 0 .463-.293 1.07 1.07 0 0 0 .258-.404 1.48 1.48 0 0 0 .094-.528c0-.203-.03-.384-.088-.545a1.095 1.095 0 0 0-.246-.41 1.125 1.125 0 0 0-.416-.246 1.69 1.69 0 0 0-.569-.088c-.191 0-.369.03-.533.088a1.186 1.186 0 0 0-.703.621c-.066.149-.1.315-.1.498h-1.4c0-.34.068-.652.205-.937a2.3 2.3 0 0 1 .568-.744 2.71 2.71 0 0 1 .856-.487 3.255 3.255 0 0 1 1.09-.175c.402 0 .771.052 1.107.158.34.101.629.254.867.457.243.207.43.46.563.761.133.301.199.65.199 1.05 0 .175-.027.35-.082.527a1.953 1.953 0 0 1-.234.51 2.274 2.274 0 0 1-.961.808c.254.086.468.2.644.34.18.137.326.29.44.463a1.9 1.9 0 0 1 .246.568c.051.2.076.406.076.621 0 .399-.074.754-.223 1.067a2.217 2.217 0 0 1-.597.779 2.713 2.713 0 0 1-.914.492c-.348.11-.725.164-1.131.164-.367 0-.721-.05-1.061-.152a2.662 2.662 0 0 1-.896-.457 2.31 2.31 0 0 1-.621-.75 2.283 2.283 0 0 1-.229-1.049h1.4c0 .188.034.361.1.521.07.157.17.29.299.399.125.113.273.201.445.264.176.062.369.093.58.093.227 0 .43-.029.61-.088.183-.062.338-.154.463-.275a1.09 1.09 0 0 0 .275-.422c.066-.172.1-.367.1-.586 0-.246-.038-.457-.112-.633a1.132 1.132 0 0 0-.322-.439 1.392 1.392 0 0 0-.51-.252 2.278 2.278 0 0 0-.656-.088h-.838v-1.101ZM157.736 22h-5.724v-.973l2.777-3.023c.231-.254.424-.48.58-.68a5.4 5.4 0 0 0 .381-.556c.094-.168.16-.325.199-.47a1.626 1.626 0 0 0-.023-.99 1.169 1.169 0 0 0-.258-.421 1.202 1.202 0 0 0-.41-.276 1.336 1.336 0 0 0-.528-.1c-.25 0-.466.036-.65.106s-.336.17-.457.299a1.318 1.318 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.37.068-.72.205-1.049.137-.332.332-.62.586-.867.25-.246.555-.441.914-.586a3.25 3.25 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.29.838.504.222.215.392.473.51.773.117.297.175.625.175.985 0 .27-.045.531-.134.785-.086.25-.206.498-.358.744a6.52 6.52 0 0 1-.556.744c-.211.25-.442.508-.692.774l-1.898 2.027h3.972V22Zm3.258-4.898h.838c.25 0 .469-.034.656-.1a1.23 1.23 0 0 0 .463-.293 1.07 1.07 0 0 0 .258-.404 1.48 1.48 0 0 0 .094-.528c0-.203-.03-.384-.088-.545a1.095 1.095 0 0 0-.246-.41 1.125 1.125 0 0 0-.416-.246 1.69 1.69 0 0 0-.569-.088c-.191 0-.369.03-.533.088a1.186 1.186 0 0 0-.703.621c-.066.149-.1.315-.1.498h-1.4c0-.34.068-.652.205-.937a2.3 2.3 0 0 1 .568-.744 2.71 2.71 0 0 1 .856-.487 3.255 3.255 0 0 1 1.09-.175c.402 0 .771.052 1.107.158.34.101.629.254.867.457.243.207.43.46.563.761.133.301.199.65.199 1.05 0 .175-.027.35-.082.527a1.953 1.953 0 0 1-.234.51 2.274 2.274 0 0 1-.961.808c.254.086.469.2.644.34.18.137.326.29.44.463a1.9 1.9 0 0 1 .246.568c.051.2.076.406.076.621 0 .399-.074.754-.223 1.067a2.217 2.217 0 0 1-.597.779 2.713 2.713 0 0 1-.914.492c-.348.11-.725.164-1.131.164-.367 0-.721-.05-1.061-.152a2.662 2.662 0 0 1-.896-.457 2.31 2.31 0 0 1-.621-.75 2.283 2.283 0 0 1-.229-1.049h1.401c0 .188.033.361.099.521.07.157.17.29.299.399.125.113.273.201.445.264.176.062.369.093.58.093.227 0 .43-.029.61-.088.183-.062.338-.154.463-.275a1.08 1.08 0 0 0 .275-.422c.066-.172.1-.367.1-.586a1.61 1.61 0 0 0-.112-.633 1.132 1.132 0 0 0-.322-.439 1.384 1.384 0 0 0-.51-.252 2.278 2.278 0 0 0-.656-.088h-.838v-1.101Z"
              className="323"
            />
            <path
              d="M256.096 49h-1.412v-6.797l-2.186.803V41.77l3.51-1.301h.088V49Z"
              className="1"
            />
            <path
              d="M143.807 115.254 140.396 123h-1.476l3.41-7.359h-4.424v-1.172h5.901v.785Z"
              className="7"
            />
            <path
              d="M254.613 101.719c0 .258-.043.498-.129.72a1.92 1.92 0 0 1-.351.598 2.302 2.302 0 0 1-.322.317 2.269 2.269 0 0 1-.405.257c.176.082.338.178.487.287.152.106.285.229.398.37a2.134 2.134 0 0 1 .51 1.412c0 .394-.072.744-.217 1.049a2.165 2.165 0 0 1-.592.761 2.621 2.621 0 0 1-.89.469 3.64 3.64 0 0 1-1.09.158c-.399 0-.77-.053-1.114-.158a2.556 2.556 0 0 1-.884-.469 2.144 2.144 0 0 1-.598-.756 2.482 2.482 0 0 1-.211-1.054c0-.235.031-.457.094-.668.066-.211.16-.407.281-.586.121-.172.266-.326.434-.463a2.68 2.68 0 0 1 .574-.358 2.293 2.293 0 0 1-.492-.328 2.093 2.093 0 0 1-.616-.955 2.064 2.064 0 0 1-.087-.603c0-.379.064-.715.193-1.008.133-.293.314-.541.545-.744.226-.203.498-.356.814-.457a3.34 3.34 0 0 1 1.049-.158c.375 0 .721.052 1.037.158.321.101.6.254.838.457.231.199.412.447.545.744.133.293.199.629.199 1.008Zm-1.213 3.885c0-.211-.035-.403-.105-.575a1.365 1.365 0 0 0-.281-.457 1.307 1.307 0 0 0-.446-.281 1.572 1.572 0 0 0-.568-.1c-.215 0-.408.034-.58.1-.168.066-.313.16-.434.281a1.365 1.365 0 0 0-.281.457 1.704 1.704 0 0 0-.094.58c0 .219.034.416.1.592.066.172.162.317.287.434.121.113.266.201.434.263.172.059.365.088.58.088.203 0 .388-.031.556-.093.172-.063.321-.153.446-.27.117-.121.211-.266.281-.434.07-.171.105-.367.105-.585Zm-.181-3.833a1.38 1.38 0 0 0-.094-.521 1.291 1.291 0 0 0-.246-.41 1.188 1.188 0 0 0-.387-.258 1.294 1.294 0 0 0-.504-.094c-.183 0-.349.032-.498.094a1.097 1.097 0 0 0-.375.252 1.123 1.123 0 0 0-.234.404c-.055.16-.082.338-.082.533 0 .192.027.368.082.528.055.156.137.289.246.398.105.114.232.201.381.264.148.062.314.094.498.094.183 0 .349-.032.498-.094a1.154 1.154 0 0 0 .627-.662 1.54 1.54 0 0 0 .088-.528Z"
              className="8"
            />
            <path
              d="M218.441 184.846c.485 0 .897-.055 1.237-.164.34-.11.619-.266.838-.469.234-.223.406-.477.515-.762.11-.289.18-.599.211-.931v-.03a1.989 1.989 0 0 1-.662.492c-.141.067-.297.12-.469.159a2.46 2.46 0 0 1-.556.058c-.414 0-.776-.078-1.084-.234a2.24 2.24 0 0 1-.762-.627 2.738 2.738 0 0 1-.463-.914 3.827 3.827 0 0 1-.152-1.084c0-.41.06-.795.181-1.154a2.91 2.91 0 0 1 .539-.956 2.53 2.53 0 0 1 .862-.638c.344-.16.734-.24 1.172-.24.441 0 .832.084 1.172.252.343.167.634.396.873.685.25.313.439.691.568 1.137.129.441.193.906.193 1.394v.492a7.72 7.72 0 0 1-.234 1.922 3.89 3.89 0 0 1-.826 1.6c-.321.375-.742.67-1.266.885-.519.215-1.146.322-1.881.322h-.117v-1.195h.111Zm1.413-2.754a1.4 1.4 0 0 0 .867-.293c.121-.09.226-.195.316-.317a1.79 1.79 0 0 0 .229-.404v-.486c0-.34-.039-.641-.118-.903a2.13 2.13 0 0 0-.298-.656 1.317 1.317 0 0 0-.452-.398 1.126 1.126 0 0 0-.55-.141c-.219 0-.414.049-.586.147a1.235 1.235 0 0 0-.422.386 1.87 1.87 0 0 0-.27.58 2.759 2.759 0 0 0-.006 1.366c.055.215.141.406.258.574.114.164.254.297.422.398.172.098.375.147.61.147Z"
              className="9"
            />
            <path
              d="M260.992 167h-1.412v-6.797l-2.185.803v-1.236l3.509-1.301h.088V167Zm8.889-3.252c0 .547-.065 1.031-.193 1.453a2.89 2.89 0 0 1-.545 1.049 2.248 2.248 0 0 1-.868.656 2.926 2.926 0 0 1-1.16.217c-.429 0-.816-.072-1.16-.217a2.286 2.286 0 0 1-.873-.656 2.892 2.892 0 0 1-.557-1.049 5.123 5.123 0 0 1-.187-1.453v-2.021c0-.547.062-1.03.187-1.448.129-.422.313-.777.551-1.066.238-.285.528-.5.867-.645a2.91 2.91 0 0 1 1.161-.222c.433 0 .82.074 1.16.222.343.145.636.36.879.645.234.289.416.644.545 1.066.128.418.193.901.193 1.448v2.021Zm-4.137-.498 2.713-2.057a3.226 3.226 0 0 0-.129-.791 1.419 1.419 0 0 0-.287-.545 1.024 1.024 0 0 0-.404-.281 1.439 1.439 0 0 0-.533-.094c-.215 0-.405.038-.569.112a1.04 1.04 0 0 0-.41.328 1.627 1.627 0 0 0-.287.639 3.881 3.881 0 0 0-.094.914v1.775Zm2.725.732v-1.711l-2.713 2.045c.019.27.06.508.123.715.066.207.154.379.264.516.109.148.244.26.404.334.164.074.353.111.568.111.211 0 .397-.035.557-.105.16-.075.297-.182.41-.323.129-.164.225-.378.287-.644.067-.266.1-.578.1-.938Z"
              className="10"
            />
            <path
              d="M292.992 172h-1.412v-6.797l-2.185.803v-1.236l3.509-1.301h.088V172Zm7.207 0h-1.412v-6.797l-2.185.803v-1.236l3.509-1.301h.088V172Z"
              className="11"
            />
            <path
              d="m324.412 143.77.457-4.301h4.588v1.242h-3.422l-.223 2.045c.141-.082.325-.16.551-.235.231-.074.494-.111.791-.111.403 0 .762.067 1.078.199.321.133.592.323.815.569.219.25.387.552.504.908.117.352.176.748.176 1.189 0 .391-.057.76-.17 1.108-.11.344-.28.644-.51.902a2.373 2.373 0 0 1-.861.61c-.348.148-.758.222-1.231.222-.359 0-.703-.051-1.031-.152a2.663 2.663 0 0 1-.873-.469 2.463 2.463 0 0 1-.627-.756 2.561 2.561 0 0 1-.276-1.049h1.366c.05.418.203.739.457.961.258.223.586.334.984.334.234 0 .438-.043.609-.129.172-.086.317-.207.434-.363a1.63 1.63 0 0 0 .246-.551c.055-.218.082-.455.082-.709 0-.246-.033-.47-.099-.673a1.508 1.508 0 0 0-.288-.54 1.275 1.275 0 0 0-.48-.351 1.615 1.615 0 0 0-.668-.129c-.168 0-.314.014-.439.041a1.61 1.61 0 0 0-.323.106 1.486 1.486 0 0 0-.269.164 2.545 2.545 0 0 0-.229.193l-1.119-.275Zm12.498-3.516L333.5 148h-1.477l3.411-7.359h-4.424v-1.172h5.9v.785Z"
              className="57"
            />
            <path
              d="m370.412 124.77.457-4.301h4.588v1.242h-3.422l-.223 2.045c.141-.082.325-.16.551-.235.231-.074.494-.111.791-.111.403 0 .762.067 1.078.199.321.133.592.323.815.569.219.25.387.552.504.908.117.352.176.748.176 1.189 0 .391-.057.76-.17 1.108-.11.344-.28.644-.51.902a2.373 2.373 0 0 1-.861.61c-.348.148-.758.222-1.231.222-.359 0-.703-.051-1.031-.152a2.663 2.663 0 0 1-.873-.469 2.463 2.463 0 0 1-.627-.756 2.561 2.561 0 0 1-.276-1.049h1.366c.05.418.203.739.457.961.258.223.586.334.984.334.234 0 .438-.043.609-.129.172-.086.317-.207.434-.363a1.63 1.63 0 0 0 .246-.551c.055-.218.082-.455.082-.709 0-.246-.033-.47-.099-.673a1.508 1.508 0 0 0-.288-.54 1.275 1.275 0 0 0-.48-.351 1.615 1.615 0 0 0-.668-.129c-.168 0-.314.014-.439.041a1.61 1.61 0 0 0-.323.106 1.486 1.486 0 0 0-.269.164 2.545 2.545 0 0 0-.229.193l-1.119-.275Zm8.133 3.076c.484 0 .896-.055 1.236-.164.34-.11.619-.266.838-.469.235-.223.406-.477.516-.762.109-.289.179-.599.211-.931v-.03a2.038 2.038 0 0 1-.662.492c-.141.067-.297.12-.469.159a2.468 2.468 0 0 1-.557.058c-.414 0-.775-.078-1.084-.234a2.26 2.26 0 0 1-.762-.627 2.717 2.717 0 0 1-.462-.914 3.792 3.792 0 0 1-.153-1.084c0-.41.061-.795.182-1.154a2.91 2.91 0 0 1 .539-.956c.234-.269.521-.482.861-.638.344-.16.735-.24 1.172-.24.442 0 .832.084 1.172.252.344.167.635.396.873.685.25.313.44.691.568 1.137.129.441.194.906.194 1.394v.492c0 .672-.078 1.313-.235 1.922a3.877 3.877 0 0 1-.826 1.6c-.32.375-.742.67-1.265.885-.52.215-1.147.322-1.881.322h-.117v-1.195h.111Zm1.412-2.754a1.41 1.41 0 0 0 .867-.293c.121-.09.227-.195.317-.317.093-.125.17-.259.228-.404v-.486c0-.34-.039-.641-.117-.903a2.13 2.13 0 0 0-.299-.656 1.314 1.314 0 0 0-.451-.398 1.132 1.132 0 0 0-.551-.141c-.219 0-.414.049-.586.147a1.244 1.244 0 0 0-.422.386 1.846 1.846 0 0 0-.269.58c-.059.219-.088.45-.088.692 0 .234.027.459.082.674.055.215.141.406.258.574.113.164.254.297.422.398.172.098.375.147.609.147Z"
              className="59"
            />
            <path
              d="M406.58 133.102h.838c.25 0 .469-.034.656-.1a1.23 1.23 0 0 0 .463-.293c.113-.109.199-.244.258-.404.062-.164.094-.34.094-.528 0-.203-.03-.384-.088-.545a1.102 1.102 0 0 0-.246-.41 1.138 1.138 0 0 0-.416-.246 1.704 1.704 0 0 0-.569-.088c-.191 0-.369.03-.533.088a1.198 1.198 0 0 0-.703.621c-.066.149-.1.315-.1.498h-1.4c0-.34.068-.652.205-.937a2.3 2.3 0 0 1 .568-.744c.243-.207.528-.369.856-.487a3.258 3.258 0 0 1 1.09-.175c.402 0 .771.052 1.107.158.34.101.629.254.867.457a2.1 2.1 0 0 1 .563.762c.133.3.199.65.199 1.048 0 .176-.027.352-.082.528a1.96 1.96 0 0 1-.234.509 2.264 2.264 0 0 1-.961.809c.254.086.468.199.644.34.18.137.326.291.44.463.113.176.195.365.246.568.051.199.076.406.076.621 0 .399-.074.754-.223 1.067a2.222 2.222 0 0 1-.597.779 2.706 2.706 0 0 1-.914.492 3.766 3.766 0 0 1-1.131.164c-.367 0-.721-.051-1.061-.152a2.673 2.673 0 0 1-.896-.457 2.308 2.308 0 0 1-.621-.75 2.286 2.286 0 0 1-.229-1.049h1.4c0 .187.034.361.1.521.07.157.17.29.299.399.125.113.273.201.445.264.176.062.369.093.58.093.227 0 .43-.029.61-.088.183-.062.338-.154.463-.275a1.09 1.09 0 0 0 .275-.422c.066-.172.1-.367.1-.586 0-.246-.038-.457-.112-.633a1.135 1.135 0 0 0-.322-.439 1.401 1.401 0 0 0-.51-.252 2.264 2.264 0 0 0-.656-.088h-.838v-1.101Zm11.197 1.646c0 .547-.064 1.031-.193 1.453a2.875 2.875 0 0 1-.545 1.049 2.237 2.237 0 0 1-.867.656c-.34.145-.727.217-1.16.217-.43 0-.817-.072-1.16-.217a2.286 2.286 0 0 1-.873-.656 2.877 2.877 0 0 1-.557-1.049 5.121 5.121 0 0 1-.188-1.453v-2.021c0-.547.063-1.03.188-1.448.129-.422.312-.777.551-1.066.238-.285.527-.5.867-.645.344-.148.73-.222 1.16-.222.434 0 .82.074 1.16.222.344.145.637.36.879.645.234.289.416.644.545 1.066.129.418.193.901.193 1.448v2.021Zm-4.136-.498 2.713-2.057a3.226 3.226 0 0 0-.129-.791 1.447 1.447 0 0 0-.287-.545 1.034 1.034 0 0 0-.405-.281 1.435 1.435 0 0 0-.533-.094c-.215 0-.404.038-.568.112a1.05 1.05 0 0 0-.411.328 1.656 1.656 0 0 0-.287.639 3.94 3.94 0 0 0-.093.914v1.775Zm2.724.732v-1.711l-2.713 2.045c.02.27.061.508.123.715.067.207.155.379.264.516.109.148.244.26.404.334.164.074.354.111.569.111.211 0 .396-.035.556-.105a1.14 1.14 0 0 0 .411-.323c.128-.164.224-.378.287-.644.066-.266.099-.578.099-.938Zm6.938 3.018h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V138Z"
              className="301"
            />
            <path
              d="M444.529 155h-5.724v-.973l2.777-3.023c.23-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.554-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.424 6.424 0 0 1-.557.744c-.21.25-.441.508-.691.774l-1.898 2.027h3.972V155Zm3.258-4.898h.838c.25 0 .469-.034.656-.1a1.23 1.23 0 0 0 .463-.293c.113-.109.199-.244.258-.404.062-.164.094-.34.094-.528 0-.203-.03-.384-.088-.545a1.102 1.102 0 0 0-.246-.41 1.138 1.138 0 0 0-.416-.246 1.704 1.704 0 0 0-.569-.088c-.191 0-.369.03-.533.088a1.198 1.198 0 0 0-.703.621c-.066.149-.1.315-.1.498h-1.4c0-.34.068-.652.205-.937a2.3 2.3 0 0 1 .568-.744c.243-.207.528-.369.856-.487a3.258 3.258 0 0 1 1.09-.175c.402 0 .771.052 1.107.158.34.101.629.254.867.457a2.1 2.1 0 0 1 .563.762c.133.3.199.65.199 1.048 0 .176-.027.352-.082.528a1.96 1.96 0 0 1-.234.509 2.264 2.264 0 0 1-.961.809c.254.086.469.199.644.34.18.137.326.291.44.463.113.176.195.365.246.568.051.199.076.406.076.621 0 .399-.074.754-.223 1.067a2.222 2.222 0 0 1-.597.779 2.706 2.706 0 0 1-.914.492 3.766 3.766 0 0 1-1.131.164c-.367 0-.721-.051-1.061-.152a2.673 2.673 0 0 1-.896-.457 2.308 2.308 0 0 1-.621-.75 2.286 2.286 0 0 1-.229-1.049h1.401c0 .187.033.361.099.521.07.157.17.29.299.399.125.113.273.201.445.264.176.062.369.093.58.093.227 0 .43-.029.61-.088.183-.062.338-.154.463-.275a1.09 1.09 0 0 0 .275-.422c.066-.172.1-.367.1-.586a1.61 1.61 0 0 0-.112-.633 1.135 1.135 0 0 0-.322-.439 1.401 1.401 0 0 0-.51-.252 2.264 2.264 0 0 0-.656-.088h-.838v-1.101Zm6.861 3.744c.485 0 .897-.055 1.237-.164.34-.11.619-.266.838-.469.234-.223.406-.477.515-.762.11-.289.18-.599.211-.931v-.03a1.989 1.989 0 0 1-.662.492c-.141.067-.297.12-.469.159a2.46 2.46 0 0 1-.556.058c-.414 0-.776-.078-1.084-.234a2.24 2.24 0 0 1-.762-.627 2.738 2.738 0 0 1-.463-.914 3.827 3.827 0 0 1-.152-1.084c0-.41.06-.795.181-1.154a2.91 2.91 0 0 1 .539-.956 2.53 2.53 0 0 1 .862-.638c.344-.16.734-.24 1.172-.24.441 0 .832.084 1.172.252.343.167.634.396.873.685.25.313.439.691.568 1.137.129.441.193.906.193 1.394v.492a7.72 7.72 0 0 1-.234 1.922 3.89 3.89 0 0 1-.826 1.6c-.321.375-.742.67-1.266.885-.519.215-1.146.322-1.881.322h-.117v-1.195h.111Zm1.413-2.754a1.4 1.4 0 0 0 .867-.293c.121-.09.226-.195.316-.317a1.79 1.79 0 0 0 .229-.404v-.486c0-.34-.039-.641-.118-.903a2.13 2.13 0 0 0-.298-.656 1.317 1.317 0 0 0-.452-.398 1.126 1.126 0 0 0-.55-.141c-.219 0-.414.049-.586.147a1.235 1.235 0 0 0-.422.386 1.87 1.87 0 0 0-.27.58 2.759 2.759 0 0 0-.006 1.366c.055.215.141.406.258.574.114.164.254.297.422.398.172.098.375.147.61.147Z"
              className="239"
            />
            <path
              d="M455.529 128h-5.724v-.973l2.777-3.023c.23-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.554-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.424 6.424 0 0 1-.557.744c-.21.25-.441.508-.691.774l-1.898 2.027h3.972V128Zm6.381-3.041h1.072v1.137h-1.072V128h-1.4v-1.904h-3.692l-.035-.862 3.686-5.765h1.441v5.49Zm-3.697 0h2.297v-3.615l-.164.304-2.133 3.311Zm11.771-.211c0 .547-.064 1.031-.193 1.453a2.875 2.875 0 0 1-.545 1.049 2.237 2.237 0 0 1-.867.656c-.34.145-.727.217-1.16.217-.43 0-.817-.072-1.16-.217a2.286 2.286 0 0 1-.873-.656 2.877 2.877 0 0 1-.557-1.049 5.121 5.121 0 0 1-.188-1.453v-2.021c0-.547.063-1.03.188-1.448.129-.422.312-.777.551-1.066.238-.285.527-.5.867-.645.344-.148.73-.222 1.16-.222.434 0 .82.074 1.16.222.344.145.637.36.879.645.234.289.416.644.545 1.066.129.418.193.901.193 1.448v2.021Zm-4.136-.498 2.713-2.057a3.226 3.226 0 0 0-.129-.791 1.433 1.433 0 0 0-.287-.545 1.034 1.034 0 0 0-.405-.281 1.435 1.435 0 0 0-.533-.094c-.215 0-.404.038-.568.112a1.04 1.04 0 0 0-.41.328 1.642 1.642 0 0 0-.288.639 3.94 3.94 0 0 0-.093.914v1.775Zm2.724.732v-1.711l-2.713 2.045c.02.27.061.508.123.715.067.207.155.379.264.516.109.148.244.26.404.334.164.074.354.111.569.111.211 0 .396-.035.556-.105a1.14 1.14 0 0 0 .411-.323c.128-.164.224-.378.287-.644.066-.266.099-.578.099-.938Z"
              className="240"
            />
            <path
              d="M481.529 137h-5.724v-.973l2.777-3.023c.23-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.554-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.424 6.424 0 0 1-.557.744c-.21.25-.441.508-.691.774l-1.898 2.027h3.972V137Zm6.381-3.041h1.072v1.137h-1.072V137h-1.4v-1.904h-3.692l-.035-.862 3.686-5.765h1.441v5.49Zm-3.697 0h2.297v-3.615l-.164.304-2.133 3.311Zm10.09 3.041h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V137Z"
              className="241"
            />
            <path
              d="M467.529 193h-5.724v-.973l2.777-3.023c.23-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.554-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.424 6.424 0 0 1-.557.744c-.21.25-.441.508-.691.774l-1.898 2.027h3.972V193Zm3.258-4.898h.838c.25 0 .469-.034.656-.1a1.23 1.23 0 0 0 .463-.293c.113-.109.199-.244.258-.404.062-.164.094-.34.094-.528 0-.203-.03-.384-.088-.545a1.102 1.102 0 0 0-.246-.41 1.138 1.138 0 0 0-.416-.246 1.704 1.704 0 0 0-.569-.088c-.191 0-.369.03-.533.088a1.198 1.198 0 0 0-.703.621c-.066.149-.1.315-.1.498h-1.4c0-.34.068-.652.205-.937a2.3 2.3 0 0 1 .568-.744c.243-.207.528-.369.856-.487a3.258 3.258 0 0 1 1.09-.175c.402 0 .771.052 1.107.158.34.101.629.254.867.457a2.1 2.1 0 0 1 .563.762c.133.3.199.65.199 1.048 0 .176-.027.352-.082.528a1.96 1.96 0 0 1-.234.509 2.264 2.264 0 0 1-.961.809c.254.086.469.199.644.34.18.137.326.291.44.463.113.176.195.365.246.568.051.199.076.406.076.621 0 .399-.074.754-.223 1.067a2.222 2.222 0 0 1-.597.779 2.706 2.706 0 0 1-.914.492 3.766 3.766 0 0 1-1.131.164c-.367 0-.721-.051-1.061-.152a2.673 2.673 0 0 1-.896-.457 2.308 2.308 0 0 1-.621-.75 2.286 2.286 0 0 1-.229-1.049h1.401c0 .187.033.361.099.521.07.157.17.29.299.399.125.113.273.201.445.264.176.062.369.093.58.093.227 0 .43-.029.61-.088.183-.062.338-.154.463-.275a1.09 1.09 0 0 0 .275-.422c.066-.172.1-.367.1-.586a1.61 1.61 0 0 0-.112-.633 1.135 1.135 0 0 0-.322-.439 1.401 1.401 0 0 0-.51-.252 2.264 2.264 0 0 0-.656-.088h-.838v-1.101Zm11.227-2.848-3.41 7.746h-1.477l3.41-7.359h-4.424v-1.172h5.901v.785Z"
              className="237"
            />
            <path
              d="M434.529 187h-5.724v-.973l2.777-3.023c.23-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.554-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.424 6.424 0 0 1-.557.744c-.21.25-.441.508-.691.774l-1.898 2.027h3.972V187Zm3.258-4.898h.838c.25 0 .469-.034.656-.1a1.23 1.23 0 0 0 .463-.293c.113-.109.199-.244.258-.404.062-.164.094-.34.094-.528 0-.203-.03-.384-.088-.545a1.102 1.102 0 0 0-.246-.41 1.138 1.138 0 0 0-.416-.246 1.704 1.704 0 0 0-.569-.088c-.191 0-.369.03-.533.088a1.198 1.198 0 0 0-.703.621c-.066.149-.1.315-.1.498h-1.4c0-.34.068-.652.205-.937a2.3 2.3 0 0 1 .568-.744c.243-.207.528-.369.856-.487a3.258 3.258 0 0 1 1.09-.175c.402 0 .771.052 1.107.158.34.101.629.254.867.457a2.1 2.1 0 0 1 .563.762c.133.3.199.65.199 1.048 0 .176-.027.352-.082.528a1.96 1.96 0 0 1-.234.509 2.264 2.264 0 0 1-.961.809c.254.086.469.199.644.34.18.137.326.291.44.463.113.176.195.365.246.568.051.199.076.406.076.621 0 .399-.074.754-.223 1.067a2.222 2.222 0 0 1-.597.779 2.706 2.706 0 0 1-.914.492 3.766 3.766 0 0 1-1.131.164c-.367 0-.721-.051-1.061-.152a2.673 2.673 0 0 1-.896-.457 2.308 2.308 0 0 1-.621-.75 2.286 2.286 0 0 1-.229-1.049h1.401c0 .187.033.361.099.521.07.157.17.29.299.399.125.113.273.201.445.264.176.062.369.093.58.093.227 0 .43-.029.61-.088.183-.062.338-.154.463-.275a1.09 1.09 0 0 0 .275-.422c.066-.172.1-.367.1-.586a1.61 1.61 0 0 0-.112-.633 1.135 1.135 0 0 0-.322-.439 1.401 1.401 0 0 0-.51-.252 2.264 2.264 0 0 0-.656-.088h-.838v-1.101Zm11.033-1.383c0 .258-.043.498-.129.72a1.92 1.92 0 0 1-.351.598 2.302 2.302 0 0 1-.322.317 2.269 2.269 0 0 1-.405.257c.176.082.338.178.487.287.152.106.285.229.398.37a2.134 2.134 0 0 1 .51 1.412c0 .394-.072.744-.217 1.049a2.165 2.165 0 0 1-.592.761 2.621 2.621 0 0 1-.89.469 3.64 3.64 0 0 1-1.09.158c-.399 0-.77-.053-1.114-.158a2.556 2.556 0 0 1-.884-.469 2.144 2.144 0 0 1-.598-.756 2.482 2.482 0 0 1-.211-1.054c0-.235.031-.457.094-.668.066-.211.16-.407.281-.586.121-.172.266-.326.434-.463a2.68 2.68 0 0 1 .574-.358 2.293 2.293 0 0 1-.492-.328 2.093 2.093 0 0 1-.615-.955 2.031 2.031 0 0 1-.088-.603c0-.379.064-.715.193-1.008.133-.293.314-.541.545-.744.226-.203.498-.356.814-.457.321-.106.67-.158 1.049-.158.375 0 .721.052 1.037.158.321.101.6.254.838.457.231.199.412.447.545.744.133.293.199.629.199 1.008Zm-1.213 3.885c0-.211-.035-.403-.105-.575a1.365 1.365 0 0 0-.281-.457 1.307 1.307 0 0 0-.446-.281 1.568 1.568 0 0 0-.568-.1c-.215 0-.408.034-.58.1-.168.066-.313.16-.434.281a1.382 1.382 0 0 0-.281.457 1.704 1.704 0 0 0-.094.58c0 .219.034.416.1.592.066.172.162.317.287.434.121.113.266.201.434.263.172.059.365.088.58.088.203 0 .388-.031.556-.093.172-.063.321-.153.446-.27.117-.121.211-.266.281-.434.07-.171.105-.367.105-.585Zm-.181-3.833a1.38 1.38 0 0 0-.094-.521 1.291 1.291 0 0 0-.246-.41 1.188 1.188 0 0 0-.387-.258 1.294 1.294 0 0 0-.504-.094c-.183 0-.349.032-.498.094a1.097 1.097 0 0 0-.375.252 1.123 1.123 0 0 0-.234.404c-.055.16-.082.338-.082.533 0 .192.027.368.082.528.055.156.137.289.246.398.105.114.232.201.381.264.148.062.314.094.498.094.183 0 .349-.032.498-.094a1.154 1.154 0 0 0 .627-.662 1.54 1.54 0 0 0 .088-.528Z"
              className="238"
            />
            <path
              d="M396.58 203.102h.838c.25 0 .469-.034.656-.1a1.23 1.23 0 0 0 .463-.293c.113-.109.199-.244.258-.404.062-.164.094-.34.094-.528 0-.203-.03-.384-.088-.545a1.102 1.102 0 0 0-.246-.41 1.138 1.138 0 0 0-.416-.246 1.704 1.704 0 0 0-.569-.088c-.191 0-.369.03-.533.088a1.198 1.198 0 0 0-.703.621c-.066.149-.1.315-.1.498h-1.4c0-.34.068-.652.205-.937a2.3 2.3 0 0 1 .568-.744c.243-.207.528-.369.856-.487a3.258 3.258 0 0 1 1.09-.175c.402 0 .771.052 1.107.158.34.101.629.254.867.457a2.1 2.1 0 0 1 .563.762c.133.3.199.65.199 1.048 0 .176-.027.352-.082.528a1.96 1.96 0 0 1-.234.509 2.264 2.264 0 0 1-.961.809c.254.086.468.199.644.34.18.137.326.291.44.463.113.176.195.365.246.568.051.199.076.406.076.621 0 .399-.074.754-.223 1.067a2.222 2.222 0 0 1-.597.779 2.706 2.706 0 0 1-.914.492 3.766 3.766 0 0 1-1.131.164c-.367 0-.721-.051-1.061-.152a2.673 2.673 0 0 1-.896-.457 2.308 2.308 0 0 1-.621-.75 2.286 2.286 0 0 1-.229-1.049h1.4c0 .187.034.361.1.521.07.157.17.29.299.399.125.113.273.201.445.264.176.062.369.093.58.093.227 0 .43-.029.61-.088.183-.062.338-.154.463-.275a1.09 1.09 0 0 0 .275-.422c.066-.172.1-.367.1-.586 0-.246-.038-.457-.112-.633a1.135 1.135 0 0 0-.322-.439 1.401 1.401 0 0 0-.51-.252 2.264 2.264 0 0 0-.656-.088h-.838v-1.101Zm11.197 1.646c0 .547-.064 1.031-.193 1.453a2.875 2.875 0 0 1-.545 1.049 2.237 2.237 0 0 1-.867.656c-.34.145-.727.217-1.16.217-.43 0-.817-.072-1.16-.217a2.286 2.286 0 0 1-.873-.656 2.877 2.877 0 0 1-.557-1.049 5.121 5.121 0 0 1-.188-1.453v-2.021c0-.547.063-1.03.188-1.448.129-.422.312-.777.551-1.066.238-.285.527-.5.867-.645.344-.148.73-.222 1.16-.222.434 0 .82.074 1.16.222.344.145.637.36.879.645.234.289.416.644.545 1.066.129.418.193.901.193 1.448v2.021Zm-4.136-.498 2.713-2.057a3.226 3.226 0 0 0-.129-.791 1.447 1.447 0 0 0-.287-.545 1.034 1.034 0 0 0-.405-.281 1.435 1.435 0 0 0-.533-.094c-.215 0-.404.038-.568.112a1.05 1.05 0 0 0-.411.328 1.656 1.656 0 0 0-.287.639 3.94 3.94 0 0 0-.093.914v1.775Zm2.724.732v-1.711l-2.713 2.045c.02.27.061.508.123.715.067.207.155.379.264.516.109.148.244.26.404.334.164.074.354.111.569.111.211 0 .396-.035.556-.105a1.14 1.14 0 0 0 .411-.323c.128-.164.224-.378.287-.644.066-.266.099-.578.099-.938Zm8.578 3.018h-5.724v-.973l2.777-3.023c.231-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.342 1.342 0 0 0-.527-.099c-.25 0-.467.035-.651.105a1.22 1.22 0 0 0-.457.299 1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.555-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.205.498-.358.744a6.528 6.528 0 0 1-.556.744c-.211.25-.442.508-.692.774l-1.898 2.027h3.972V208Z"
              className="302"
            />
            <path
              d="M420.58 215.102h.838c.25 0 .469-.034.656-.1a1.23 1.23 0 0 0 .463-.293c.113-.109.199-.244.258-.404.062-.164.094-.34.094-.528 0-.203-.03-.384-.088-.545a1.102 1.102 0 0 0-.246-.41 1.138 1.138 0 0 0-.416-.246 1.704 1.704 0 0 0-.569-.088c-.191 0-.369.03-.533.088a1.198 1.198 0 0 0-.703.621c-.066.149-.1.315-.1.498h-1.4c0-.34.068-.652.205-.937a2.3 2.3 0 0 1 .568-.744c.243-.207.528-.369.856-.487a3.258 3.258 0 0 1 1.09-.175c.402 0 .771.052 1.107.158.34.101.629.254.867.457a2.1 2.1 0 0 1 .563.762c.133.3.199.65.199 1.048 0 .176-.027.352-.082.528a1.96 1.96 0 0 1-.234.509 2.264 2.264 0 0 1-.961.809c.254.086.468.199.644.34.18.137.326.291.44.463.113.176.195.365.246.568.051.199.076.406.076.621 0 .399-.074.754-.223 1.067a2.222 2.222 0 0 1-.597.779 2.706 2.706 0 0 1-.914.492 3.766 3.766 0 0 1-1.131.164c-.367 0-.721-.051-1.061-.152a2.673 2.673 0 0 1-.896-.457 2.308 2.308 0 0 1-.621-.75 2.286 2.286 0 0 1-.229-1.049h1.4c0 .187.034.361.1.521.07.157.17.29.299.399.125.113.273.201.445.264.176.062.369.093.58.093.227 0 .43-.029.61-.088.183-.062.338-.154.463-.275a1.09 1.09 0 0 0 .275-.422c.066-.172.1-.367.1-.586 0-.246-.038-.457-.112-.633a1.135 1.135 0 0 0-.322-.439 1.401 1.401 0 0 0-.51-.252 2.264 2.264 0 0 0-.656-.088h-.838v-1.101Zm11.197 1.646c0 .547-.064 1.031-.193 1.453a2.875 2.875 0 0 1-.545 1.049 2.237 2.237 0 0 1-.867.656c-.34.145-.727.217-1.16.217-.43 0-.817-.072-1.16-.217a2.286 2.286 0 0 1-.873-.656 2.877 2.877 0 0 1-.557-1.049 5.121 5.121 0 0 1-.188-1.453v-2.021c0-.547.063-1.03.188-1.448.129-.422.312-.777.551-1.066.238-.285.527-.5.867-.645.344-.148.73-.222 1.16-.222.434 0 .82.074 1.16.222.344.145.637.36.879.645.234.289.416.644.545 1.066.129.418.193.901.193 1.448v2.021Zm-4.136-.498 2.713-2.057a3.226 3.226 0 0 0-.129-.791 1.447 1.447 0 0 0-.287-.545 1.034 1.034 0 0 0-.405-.281 1.435 1.435 0 0 0-.533-.094c-.215 0-.404.038-.568.112a1.05 1.05 0 0 0-.411.328 1.656 1.656 0 0 0-.287.639 3.94 3.94 0 0 0-.093.914v1.775Zm2.724.732v-1.711l-2.713 2.045c.02.27.061.508.123.715.067.207.155.379.264.516.109.148.244.26.404.334.164.074.354.111.569.111.211 0 .396-.035.556-.105a1.14 1.14 0 0 0 .411-.323c.128-.164.224-.378.287-.644.066-.266.099-.578.099-.938Zm4.629-1.88h.838c.25 0 .469-.034.656-.1a1.23 1.23 0 0 0 .463-.293c.113-.109.199-.244.258-.404.062-.164.094-.34.094-.528 0-.203-.03-.384-.088-.545a1.102 1.102 0 0 0-.246-.41 1.138 1.138 0 0 0-.416-.246 1.704 1.704 0 0 0-.569-.088c-.191 0-.369.03-.533.088a1.198 1.198 0 0 0-.703.621c-.066.149-.1.315-.1.498h-1.4c0-.34.068-.652.205-.937a2.3 2.3 0 0 1 .568-.744c.243-.207.528-.369.856-.487a3.258 3.258 0 0 1 1.09-.175c.402 0 .771.052 1.107.158.34.101.629.254.867.457a2.1 2.1 0 0 1 .563.762c.133.3.199.65.199 1.048 0 .176-.027.352-.082.528a1.96 1.96 0 0 1-.234.509 2.264 2.264 0 0 1-.961.809c.254.086.469.199.644.34.18.137.326.291.44.463.113.176.195.365.246.568.051.199.076.406.076.621 0 .399-.074.754-.223 1.067a2.222 2.222 0 0 1-.597.779 2.706 2.706 0 0 1-.914.492 3.766 3.766 0 0 1-1.131.164c-.367 0-.721-.051-1.061-.152a2.673 2.673 0 0 1-.896-.457 2.308 2.308 0 0 1-.621-.75 2.286 2.286 0 0 1-.229-1.049h1.401c0 .187.033.361.099.521.07.157.17.29.299.399.125.113.273.201.445.264.176.062.369.093.58.093.227 0 .43-.029.61-.088.183-.062.338-.154.463-.275.121-.113.213-.254.275-.422.066-.172.1-.367.1-.586a1.61 1.61 0 0 0-.112-.633 1.135 1.135 0 0 0-.322-.439 1.393 1.393 0 0 0-.51-.252 2.264 2.264 0 0 0-.656-.088h-.838v-1.101Z"
              className="303"
            />
            <path
              d="M478.58 214.102h.838c.25 0 .469-.034.656-.1a1.23 1.23 0 0 0 .463-.293c.113-.109.199-.244.258-.404.062-.164.094-.34.094-.528 0-.203-.03-.384-.088-.545a1.102 1.102 0 0 0-.246-.41 1.138 1.138 0 0 0-.416-.246 1.704 1.704 0 0 0-.569-.088c-.191 0-.369.03-.533.088a1.198 1.198 0 0 0-.703.621c-.066.149-.1.315-.1.498h-1.4c0-.34.068-.652.205-.937a2.3 2.3 0 0 1 .568-.744c.243-.207.528-.369.856-.487a3.258 3.258 0 0 1 1.09-.175c.402 0 .771.052 1.107.158.34.101.629.254.867.457a2.1 2.1 0 0 1 .563.762c.133.3.199.65.199 1.048 0 .176-.027.352-.082.528a1.96 1.96 0 0 1-.234.509 2.264 2.264 0 0 1-.961.809c.254.086.468.199.644.34.18.137.326.291.44.463.113.176.195.365.246.568.051.199.076.406.076.621 0 .399-.074.754-.223 1.067a2.222 2.222 0 0 1-.597.779 2.706 2.706 0 0 1-.914.492 3.766 3.766 0 0 1-1.131.164c-.367 0-.721-.051-1.061-.152a2.673 2.673 0 0 1-.896-.457 2.308 2.308 0 0 1-.621-.75 2.286 2.286 0 0 1-.229-1.049h1.4c0 .187.034.361.1.521.07.157.17.29.299.399.125.113.273.201.445.264.176.062.369.093.58.093.227 0 .43-.029.61-.088.183-.062.338-.154.463-.275a1.09 1.09 0 0 0 .275-.422c.066-.172.1-.367.1-.586 0-.246-.038-.457-.112-.633a1.135 1.135 0 0 0-.322-.439 1.401 1.401 0 0 0-.51-.252 2.264 2.264 0 0 0-.656-.088h-.838v-1.101Zm11.197 1.646c0 .547-.064 1.031-.193 1.453a2.875 2.875 0 0 1-.545 1.049 2.237 2.237 0 0 1-.867.656c-.34.145-.727.217-1.16.217-.43 0-.817-.072-1.16-.217a2.286 2.286 0 0 1-.873-.656 2.877 2.877 0 0 1-.557-1.049 5.121 5.121 0 0 1-.188-1.453v-2.021c0-.547.063-1.03.188-1.448.129-.422.312-.777.551-1.066.238-.285.527-.5.867-.645.344-.148.73-.222 1.16-.222.434 0 .82.074 1.16.222.344.145.637.36.879.645.234.289.416.644.545 1.066.129.418.193.901.193 1.448v2.021Zm-4.136-.498 2.713-2.057a3.226 3.226 0 0 0-.129-.791 1.447 1.447 0 0 0-.287-.545 1.034 1.034 0 0 0-.405-.281 1.435 1.435 0 0 0-.533-.094c-.215 0-.404.038-.568.112a1.05 1.05 0 0 0-.411.328 1.656 1.656 0 0 0-.287.639 3.94 3.94 0 0 0-.093.914v1.775Zm2.724.732v-1.711l-2.713 2.045c.02.27.061.508.123.715.067.207.155.379.264.516.109.148.244.26.404.334.164.074.354.111.569.111.211 0 .396-.035.556-.105a1.14 1.14 0 0 0 .411-.323c.128-.164.224-.378.287-.644.066-.266.099-.578.099-.938Zm7.752-.023h1.072v1.137h-1.072V219h-1.4v-1.904h-3.692l-.035-.862 3.686-5.765h1.441v5.49Zm-3.697 0h2.297v-3.615l-.164.304-2.133 3.311Z"
              className="304"
            />
            <path
              d="M498.529 154h-5.724v-.973l2.777-3.023c.23-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.554-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.424 6.424 0 0 1-.557.744c-.21.25-.441.508-.691.774l-1.898 2.027h3.972V154Zm6.381-3.041h1.072v1.137h-1.072V154h-1.4v-1.904h-3.692l-.035-.862 3.686-5.765h1.441v5.49Zm-3.697 0h2.297v-3.615l-.164.304-2.133 3.311Zm11.73 3.041h-5.724v-.973l2.777-3.023c.231-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.342 1.342 0 0 0-.527-.099c-.25 0-.467.035-.651.105a1.22 1.22 0 0 0-.457.299 1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.555-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.205.498-.358.744a6.528 6.528 0 0 1-.556.744c-.211.25-.442.508-.692.774l-1.898 2.027h3.972V154Z"
              className="242"
            />
            <path
              d="M526.529 139h-5.724v-.973l2.777-3.023c.23-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.554-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.424 6.424 0 0 1-.557.744c-.21.25-.441.508-.691.774l-1.898 2.027h3.972V139Zm6.381-3.041h1.072v1.137h-1.072V139h-1.4v-1.904h-3.692l-.035-.862 3.686-5.765h1.441v5.49Zm-3.697 0h2.297v-3.615l-.164.304-2.133 3.311Zm11.801-4.705-3.41 7.746h-1.477l3.41-7.359h-4.424v-1.172h5.901v.785Z"
              className="247"
            />
            <path
              d="M596.529 126h-5.724v-.973l2.777-3.023c.23-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.554-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.424 6.424 0 0 1-.557.744c-.21.25-.441.508-.691.774l-1.898 2.027h3.972V126Zm1.987-4.23.457-4.301h4.588v1.242h-3.422l-.223 2.045c.141-.082.324-.16.551-.235.23-.074.494-.111.791-.111.402 0 .762.067 1.078.199.32.133.592.323.814.569.219.25.387.552.504.908.117.352.176.748.176 1.189 0 .391-.057.76-.17 1.108a2.437 2.437 0 0 1-.51.902 2.356 2.356 0 0 1-.861.61c-.348.148-.758.222-1.23.222-.36 0-.704-.051-1.032-.152a2.663 2.663 0 0 1-.873-.469 2.463 2.463 0 0 1-.627-.756 2.545 2.545 0 0 1-.275-1.049h1.365c.051.418.203.739.457.961.258.223.586.334.985.334.234 0 .437-.043.609-.129.172-.086.316-.207.434-.363a1.63 1.63 0 0 0 .246-.551c.054-.218.082-.455.082-.709 0-.246-.034-.47-.1-.673a1.49 1.49 0 0 0-.287-.54 1.279 1.279 0 0 0-.481-.351 1.613 1.613 0 0 0-.667-.129c-.168 0-.315.014-.44.041a1.46 1.46 0 0 0-.592.27 2.535 2.535 0 0 0-.228.193l-1.119-.275Zm10.787 4.23h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V126Z"
              className="251"
            />
            <path
              d="M592.529 165h-5.724v-.973l2.777-3.023c.23-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.554-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.424 6.424 0 0 1-.557.744c-.21.25-.441.508-.691.774l-1.898 2.027h3.972V165Zm1.987-4.23.457-4.301h4.588v1.242h-3.422l-.223 2.045c.141-.082.324-.16.551-.235.23-.074.494-.111.791-.111.402 0 .762.067 1.078.199.32.133.592.323.814.569.219.25.387.552.504.908.117.352.176.748.176 1.189 0 .391-.057.76-.17 1.108a2.437 2.437 0 0 1-.51.902 2.356 2.356 0 0 1-.861.61c-.348.148-.758.222-1.23.222-.36 0-.704-.051-1.032-.152a2.663 2.663 0 0 1-.873-.469 2.463 2.463 0 0 1-.627-.756 2.545 2.545 0 0 1-.275-1.049h1.365c.051.418.203.739.457.961.258.223.586.334.985.334.234 0 .437-.043.609-.129.172-.086.316-.207.434-.363a1.63 1.63 0 0 0 .246-.551c.054-.218.082-.455.082-.709 0-.246-.034-.47-.1-.673a1.49 1.49 0 0 0-.287-.54 1.279 1.279 0 0 0-.481-.351 1.613 1.613 0 0 0-.667-.129c-.168 0-.315.014-.44.041a1.46 1.46 0 0 0-.592.27 2.535 2.535 0 0 0-.228.193l-1.119-.275Zm11.601 1.189h1.072v1.137h-1.072V165h-1.4v-1.904h-3.692l-.035-.862 3.686-5.765h1.441v5.49Zm-3.697 0h2.297v-3.615l-.164.304-2.133 3.311Z"
              className="254"
            />
            <path
              d="M620.529 156h-5.724v-.973l2.777-3.023c.23-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.554-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.424 6.424 0 0 1-.557.744c-.21.25-.441.508-.691.774l-1.898 2.027h3.972V156Zm1.987-4.23.457-4.301h4.588v1.242h-3.422l-.223 2.045c.141-.082.324-.16.551-.235.23-.074.494-.111.791-.111.402 0 .762.067 1.078.199.32.133.592.323.814.569.219.25.387.552.504.908.117.352.176.748.176 1.189 0 .391-.057.76-.17 1.108a2.437 2.437 0 0 1-.51.902 2.356 2.356 0 0 1-.861.61c-.348.148-.758.222-1.23.222-.36 0-.704-.051-1.032-.152a2.663 2.663 0 0 1-.873-.469 2.463 2.463 0 0 1-.627-.756 2.545 2.545 0 0 1-.275-1.049h1.365c.051.418.203.739.457.961.258.223.586.334.985.334.234 0 .437-.043.609-.129.172-.086.316-.207.434-.363a1.63 1.63 0 0 0 .246-.551c.054-.218.082-.455.082-.709 0-.246-.034-.47-.1-.673a1.49 1.49 0 0 0-.287-.54 1.279 1.279 0 0 0-.481-.351 1.613 1.613 0 0 0-.667-.129c-.168 0-.315.014-.44.041a1.46 1.46 0 0 0-.592.27 2.535 2.535 0 0 0-.228.193l-1.119-.275Zm11.179-4.342v1.189h-.093c-.465 0-.87.065-1.213.194a2.382 2.382 0 0 0-1.418 1.341 3.507 3.507 0 0 0-.241 1.02c.094-.106.204-.207.329-.305.125-.101.263-.191.416-.269.144-.075.304-.133.48-.176.176-.047.361-.07.557-.07.414 0 .773.078 1.078.234.308.156.562.367.762.633.203.265.351.57.445.914.098.344.146.701.146 1.072 0 .406-.062.787-.187 1.143a2.673 2.673 0 0 1-.533.92c-.239.265-.53.474-.873.627-.34.148-.729.222-1.166.222-.45 0-.85-.086-1.202-.258a2.64 2.64 0 0 1-.89-.697 3.137 3.137 0 0 1-.586-1.072 4.248 4.248 0 0 1-.199-1.307v-.58c0-.687.088-1.342.263-1.963a3.95 3.95 0 0 1 .891-1.611 3.473 3.473 0 0 1 1.301-.891c.515-.207 1.105-.31 1.769-.31h.164Zm-1.529 4.06c-.168 0-.328.026-.48.076a1.668 1.668 0 0 0-.422.211c-.118.09-.223.194-.317.311a1.71 1.71 0 0 0-.234.393v.433c0 .34.037.639.111.897.078.257.184.472.317.644.132.172.287.303.463.393.175.09.363.134.562.134.219 0 .414-.042.586-.128.172-.09.318-.211.439-.364.121-.156.213-.34.276-.55.062-.215.094-.448.094-.698 0-.238-.032-.463-.094-.674a1.716 1.716 0 0 0-.264-.562 1.24 1.24 0 0 0-.439-.375 1.226 1.226 0 0 0-.598-.141Z"
              className="256"
            />
            <path
              d="M633.529 134h-5.724v-.973l2.777-3.023c.23-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.554-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.424 6.424 0 0 1-.557.744c-.21.25-.441.508-.691.774l-1.898 2.027h3.972V134Zm1.987-4.23.457-4.301h4.588v1.242h-3.422l-.223 2.045c.141-.082.324-.16.551-.235.23-.074.494-.111.791-.111.402 0 .762.067 1.078.199.32.133.592.323.814.569.219.25.387.552.504.908.117.352.176.748.176 1.189 0 .391-.057.76-.17 1.108a2.437 2.437 0 0 1-.51.902 2.356 2.356 0 0 1-.861.61c-.348.148-.758.222-1.23.222-.36 0-.704-.051-1.032-.152a2.663 2.663 0 0 1-.873-.469 2.463 2.463 0 0 1-.627-.756 2.545 2.545 0 0 1-.275-1.049h1.365c.051.418.203.739.457.961.258.223.586.334.985.334.234 0 .437-.043.609-.129.172-.086.316-.207.434-.363a1.63 1.63 0 0 0 .246-.551c.054-.218.082-.455.082-.709 0-.246-.034-.47-.1-.673a1.49 1.49 0 0 0-.287-.54 1.279 1.279 0 0 0-.481-.351 1.613 1.613 0 0 0-.667-.129c-.168 0-.315.014-.44.041a1.46 1.46 0 0 0-.592.27 2.535 2.535 0 0 0-.228.193l-1.119-.275Zm12.427 4.23h-5.724v-.973l2.777-3.023c.231-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.342 1.342 0 0 0-.527-.099c-.25 0-.467.035-.651.105a1.22 1.22 0 0 0-.457.299 1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.555-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.205.498-.358.744a6.528 6.528 0 0 1-.556.744c-.211.25-.442.508-.692.774l-1.898 2.027h3.972V134Z"
              className="252"
            />
            <path
              d="M662.529 132h-5.724v-.973l2.777-3.023c.23-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.554-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.424 6.424 0 0 1-.557.744c-.21.25-.441.508-.691.774l-1.898 2.027h3.972V132Zm1.987-4.23.457-4.301h4.588v1.242h-3.422l-.223 2.045c.141-.082.324-.16.551-.235.23-.074.494-.111.791-.111.402 0 .762.067 1.078.199.32.133.592.323.814.569.219.25.387.552.504.908.117.352.176.748.176 1.189 0 .391-.057.76-.17 1.108a2.437 2.437 0 0 1-.51.902 2.356 2.356 0 0 1-.861.61c-.348.148-.758.222-1.23.222-.36 0-.704-.051-1.032-.152a2.663 2.663 0 0 1-.873-.469 2.463 2.463 0 0 1-.627-.756 2.545 2.545 0 0 1-.275-1.049h1.365c.051.418.203.739.457.961.258.223.586.334.985.334.234 0 .437-.043.609-.129.172-.086.316-.207.434-.363a1.63 1.63 0 0 0 .246-.551c.054-.218.082-.455.082-.709 0-.246-.034-.47-.1-.673a1.49 1.49 0 0 0-.287-.54 1.279 1.279 0 0 0-.481-.351 1.613 1.613 0 0 0-.667-.129c-.168 0-.315.014-.44.041a1.46 1.46 0 0 0-.592.27 2.535 2.535 0 0 0-.228.193l-1.119-.275Zm8.478-.668h.838c.25 0 .469-.034.656-.1a1.23 1.23 0 0 0 .463-.293c.113-.109.199-.244.258-.404.062-.164.094-.34.094-.528 0-.203-.03-.384-.088-.545a1.102 1.102 0 0 0-.246-.41 1.138 1.138 0 0 0-.416-.246 1.704 1.704 0 0 0-.569-.088c-.191 0-.369.03-.533.088a1.198 1.198 0 0 0-.703.621c-.066.149-.1.315-.1.498h-1.4c0-.34.068-.652.205-.937a2.3 2.3 0 0 1 .568-.744c.243-.207.528-.369.856-.487a3.258 3.258 0 0 1 1.09-.175c.402 0 .771.052 1.107.158.34.101.629.254.867.457a2.1 2.1 0 0 1 .563.762c.133.3.199.65.199 1.048 0 .176-.027.352-.082.528a1.96 1.96 0 0 1-.234.509 2.264 2.264 0 0 1-.961.809c.254.086.469.199.644.34.18.137.326.291.44.463.113.176.195.365.246.568.051.199.076.406.076.621 0 .399-.074.754-.223 1.067a2.222 2.222 0 0 1-.597.779 2.706 2.706 0 0 1-.914.492 3.766 3.766 0 0 1-1.131.164c-.367 0-.721-.051-1.061-.152a2.673 2.673 0 0 1-.896-.457 2.308 2.308 0 0 1-.621-.75 2.286 2.286 0 0 1-.229-1.049h1.401c0 .187.033.361.099.521.07.157.17.29.299.399.125.113.273.201.445.264.176.062.369.093.58.093.227 0 .43-.029.61-.088.183-.062.338-.154.463-.275.121-.113.213-.254.275-.422.066-.172.1-.367.1-.586a1.61 1.61 0 0 0-.112-.633 1.135 1.135 0 0 0-.322-.439 1.393 1.393 0 0 0-.51-.252 2.264 2.264 0 0 0-.656-.088h-.838v-1.101Z"
              className="253"
            />
            <path
              d="M708.529 154h-5.724v-.973l2.777-3.023c.23-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.554-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.424 6.424 0 0 1-.557.744c-.21.25-.441.508-.691.774l-1.898 2.027h3.972V154Zm5.959-8.572v1.189h-.093c-.465 0-.87.065-1.213.194a2.368 2.368 0 0 0-1.418 1.341 3.507 3.507 0 0 0-.241 1.02c.094-.106.204-.207.329-.305.125-.101.263-.191.416-.269.144-.075.304-.133.48-.176.176-.047.361-.07.557-.07.414 0 .773.078 1.078.234.308.156.562.367.762.633.203.265.351.57.445.914.098.344.146.701.146 1.072 0 .406-.062.787-.187 1.143a2.673 2.673 0 0 1-.533.92c-.239.265-.53.474-.873.627-.34.148-.729.222-1.166.222-.45 0-.85-.086-1.202-.258a2.64 2.64 0 0 1-.89-.697 3.137 3.137 0 0 1-.586-1.072 4.248 4.248 0 0 1-.199-1.307v-.58c0-.687.088-1.342.263-1.963a3.95 3.95 0 0 1 .891-1.611 3.473 3.473 0 0 1 1.301-.891c.515-.207 1.105-.31 1.769-.31h.164Zm-1.529 4.06c-.168 0-.328.026-.48.076a1.668 1.668 0 0 0-.422.211c-.118.09-.223.194-.317.311a1.675 1.675 0 0 0-.234.393v.433c0 .34.037.639.111.897.078.257.184.472.317.644.132.172.287.303.462.393.176.09.364.134.563.134.219 0 .414-.042.586-.128.172-.09.318-.211.439-.364.121-.156.213-.34.276-.55.062-.215.094-.448.094-.698 0-.238-.032-.463-.094-.674a1.716 1.716 0 0 0-.264-.562 1.24 1.24 0 0 0-.439-.375 1.226 1.226 0 0 0-.598-.141Zm9.984 4.512h-5.724v-.973l2.777-3.023c.231-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.342 1.342 0 0 0-.527-.099c-.25 0-.467.035-.651.105a1.22 1.22 0 0 0-.457.299 1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.555-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.205.498-.358.744a6.528 6.528 0 0 1-.556.744c-.211.25-.442.508-.692.774l-1.898 2.027h3.972V154Z"
              className="262"
            />
            <path
              d="M656.529 201h-5.724v-.973l2.777-3.023c.23-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.554-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.424 6.424 0 0 1-.557.744c-.21.25-.441.508-.691.774l-1.898 2.027h3.972V201Zm5.959-8.572v1.189h-.093c-.465 0-.87.065-1.213.194a2.368 2.368 0 0 0-1.418 1.341 3.507 3.507 0 0 0-.241 1.02c.094-.106.204-.207.329-.305.125-.101.263-.191.416-.269.144-.075.304-.133.48-.176.176-.047.361-.07.557-.07.414 0 .773.078 1.078.234.308.156.562.367.762.633.203.265.351.57.445.914.098.344.146.701.146 1.072 0 .406-.062.787-.187 1.143a2.673 2.673 0 0 1-.533.92c-.239.265-.53.474-.873.627-.34.148-.729.222-1.166.222-.45 0-.85-.086-1.202-.258a2.64 2.64 0 0 1-.89-.697 3.137 3.137 0 0 1-.586-1.072 4.248 4.248 0 0 1-.199-1.307v-.58c0-.687.088-1.342.263-1.963a3.95 3.95 0 0 1 .891-1.611 3.473 3.473 0 0 1 1.301-.891c.515-.207 1.105-.31 1.769-.31h.164Zm-1.529 4.06c-.168 0-.328.026-.48.076a1.668 1.668 0 0 0-.422.211c-.118.09-.223.194-.317.311a1.675 1.675 0 0 0-.234.393v.433c0 .34.037.639.111.897.078.257.184.472.317.644.132.172.287.303.462.393.176.09.364.134.563.134.219 0 .414-.042.586-.128.172-.09.318-.211.439-.364.121-.156.213-.34.276-.55.062-.215.094-.448.094-.698 0-.238-.032-.463-.094-.674a1.716 1.716 0 0 0-.264-.562 1.24 1.24 0 0 0-.439-.375 1.226 1.226 0 0 0-.598-.141Zm6.035-.386h.838c.25 0 .469-.034.656-.1a1.23 1.23 0 0 0 .463-.293c.113-.109.199-.244.258-.404.062-.164.094-.34.094-.528 0-.203-.03-.384-.088-.545a1.102 1.102 0 0 0-.246-.41 1.138 1.138 0 0 0-.416-.246 1.704 1.704 0 0 0-.569-.088c-.191 0-.369.03-.533.088a1.198 1.198 0 0 0-.703.621c-.066.149-.1.315-.1.498h-1.4c0-.34.068-.652.205-.937a2.3 2.3 0 0 1 .568-.744c.243-.207.528-.369.856-.487a3.258 3.258 0 0 1 1.09-.175c.402 0 .771.052 1.107.158.34.101.629.254.867.457a2.1 2.1 0 0 1 .563.762c.133.3.199.65.199 1.048 0 .176-.027.352-.082.528a1.96 1.96 0 0 1-.234.509 2.264 2.264 0 0 1-.961.809c.254.086.469.199.644.34.18.137.326.291.44.463.113.176.195.365.246.568.051.199.076.406.076.621 0 .399-.074.754-.223 1.067a2.222 2.222 0 0 1-.597.779 2.706 2.706 0 0 1-.914.492 3.766 3.766 0 0 1-1.131.164c-.367 0-.721-.051-1.061-.152a2.673 2.673 0 0 1-.896-.457 2.308 2.308 0 0 1-.621-.75 2.286 2.286 0 0 1-.229-1.049h1.401c0 .187.033.361.099.521.07.157.17.29.299.399.125.113.273.201.445.264.176.062.369.093.58.093.227 0 .43-.029.61-.088.183-.062.338-.154.463-.275.121-.113.213-.254.275-.422.066-.172.1-.367.1-.586a1.61 1.61 0 0 0-.112-.633 1.135 1.135 0 0 0-.322-.439 1.393 1.393 0 0 0-.51-.252 2.264 2.264 0 0 0-.656-.088h-.838v-1.101Z"
              className="263"
            />
            <path
              d="M684.529 210h-5.724v-.973l2.777-3.023c.23-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.554-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.424 6.424 0 0 1-.557.744c-.21.25-.441.508-.691.774l-1.898 2.027h3.972V210Zm5.959-8.572v1.189h-.093c-.465 0-.87.065-1.213.194a2.368 2.368 0 0 0-1.418 1.341 3.507 3.507 0 0 0-.241 1.02c.094-.106.204-.207.329-.305.125-.101.263-.191.416-.269.144-.075.304-.133.48-.176.176-.047.361-.07.557-.07.414 0 .773.078 1.078.234.308.156.562.367.762.633.203.265.351.57.445.914.098.344.146.701.146 1.072 0 .406-.062.787-.187 1.143a2.673 2.673 0 0 1-.533.92c-.239.265-.53.474-.873.627-.34.148-.729.222-1.166.222-.45 0-.85-.086-1.202-.258a2.64 2.64 0 0 1-.89-.697 3.137 3.137 0 0 1-.586-1.072 4.248 4.248 0 0 1-.199-1.307v-.58c0-.687.088-1.342.263-1.963a3.95 3.95 0 0 1 .891-1.611 3.473 3.473 0 0 1 1.301-.891c.515-.207 1.105-.31 1.769-.31h.164Zm-1.529 4.06c-.168 0-.328.026-.48.076a1.668 1.668 0 0 0-.422.211c-.118.09-.223.194-.317.311a1.675 1.675 0 0 0-.234.393v.433c0 .34.037.639.111.897.078.257.184.472.317.644.132.172.287.303.462.393.176.09.364.134.563.134.219 0 .414-.042.586-.128.172-.09.318-.211.439-.364.121-.156.213-.34.276-.55.062-.215.094-.448.094-.698 0-.238-.032-.463-.094-.674a1.716 1.716 0 0 0-.264-.562 1.24 1.24 0 0 0-.439-.375 1.226 1.226 0 0 0-.598-.141Zm9.158 1.471h1.072v1.137h-1.072V210h-1.4v-1.904h-3.692l-.035-.862 3.686-5.765h1.441v5.49Zm-3.697 0h2.297v-3.615l-.164.304-2.133 3.311Z"
              className="264"
            />
            <path
              d="M628.529 217h-5.724v-.973l2.777-3.023c.23-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.554-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.424 6.424 0 0 1-.557.744c-.21.25-.441.508-.691.774l-1.898 2.027h3.972V217Zm1.987-4.23.457-4.301h4.588v1.242h-3.422l-.223 2.045c.141-.082.324-.16.551-.235.23-.074.494-.111.791-.111.402 0 .762.067 1.078.199.32.133.592.323.814.569.219.25.387.552.504.908.117.352.176.748.176 1.189 0 .391-.057.76-.17 1.108a2.437 2.437 0 0 1-.51.902 2.356 2.356 0 0 1-.861.61c-.348.148-.758.222-1.23.222-.36 0-.704-.051-1.032-.152a2.663 2.663 0 0 1-.873-.469 2.463 2.463 0 0 1-.627-.756 2.545 2.545 0 0 1-.275-1.049h1.365c.051.418.203.739.457.961.258.223.586.334.985.334.234 0 .437-.043.609-.129.172-.086.316-.207.434-.363a1.63 1.63 0 0 0 .246-.551c.054-.218.082-.455.082-.709 0-.246-.034-.47-.1-.673a1.49 1.49 0 0 0-.287-.54 1.279 1.279 0 0 0-.481-.351 1.613 1.613 0 0 0-.667-.129c-.168 0-.315.014-.44.041a1.46 1.46 0 0 0-.592.27 2.535 2.535 0 0 0-.228.193l-1.119-.275Zm12.304-2.051c0 .258-.043.498-.129.72a1.92 1.92 0 0 1-.351.598 2.302 2.302 0 0 1-.322.317 2.269 2.269 0 0 1-.405.257c.176.082.338.178.487.287.152.106.285.229.398.37a2.134 2.134 0 0 1 .51 1.412c0 .394-.072.744-.217 1.049a2.165 2.165 0 0 1-.592.761 2.621 2.621 0 0 1-.89.469 3.64 3.64 0 0 1-1.09.158c-.399 0-.77-.053-1.114-.158a2.556 2.556 0 0 1-.884-.469 2.144 2.144 0 0 1-.598-.756 2.482 2.482 0 0 1-.211-1.054c0-.235.031-.457.094-.668.066-.211.16-.407.281-.586.121-.172.266-.326.434-.463a2.68 2.68 0 0 1 .574-.358 2.293 2.293 0 0 1-.492-.328 2.093 2.093 0 0 1-.615-.955 2.031 2.031 0 0 1-.088-.603c0-.379.064-.715.193-1.008.133-.293.314-.541.545-.744.226-.203.498-.356.814-.457.321-.106.67-.158 1.049-.158.375 0 .721.052 1.037.158.321.101.6.254.838.457.231.199.412.447.545.744.133.293.199.629.199 1.008Zm-1.213 3.885c0-.211-.035-.403-.105-.575a1.365 1.365 0 0 0-.281-.457 1.307 1.307 0 0 0-.446-.281 1.568 1.568 0 0 0-.568-.1c-.215 0-.408.034-.58.1-.168.066-.313.16-.434.281a1.382 1.382 0 0 0-.281.457 1.704 1.704 0 0 0-.094.58c0 .219.034.416.1.592.066.172.162.317.287.434.121.113.266.201.434.263.172.059.365.088.58.088.203 0 .388-.031.556-.093.172-.063.321-.153.446-.27.117-.121.211-.266.281-.434.07-.171.105-.367.105-.585Zm-.181-3.833a1.38 1.38 0 0 0-.094-.521 1.291 1.291 0 0 0-.246-.41 1.188 1.188 0 0 0-.387-.258 1.294 1.294 0 0 0-.504-.094c-.183 0-.349.032-.498.094a1.097 1.097 0 0 0-.375.252 1.123 1.123 0 0 0-.234.404c-.055.16-.082.338-.082.533 0 .192.027.368.082.528.055.156.137.289.246.398.105.114.232.201.381.264.148.062.314.094.498.094.183 0 .349-.032.498-.094a1.154 1.154 0 0 0 .627-.662 1.54 1.54 0 0 0 .088-.528Z"
              className="258"
            />
            <path
              d="M738.529 231h-5.724v-.973l2.777-3.023c.23-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.554-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.424 6.424 0 0 1-.557.744c-.21.25-.441.508-.691.774l-1.898 2.027h3.972V231Zm5.959-8.572v1.189h-.093c-.465 0-.87.065-1.213.194a2.368 2.368 0 0 0-1.418 1.341 3.507 3.507 0 0 0-.241 1.02c.094-.106.204-.207.329-.305.125-.101.263-.191.416-.269.144-.075.304-.133.48-.176.176-.047.361-.07.557-.07.414 0 .773.078 1.078.234.308.156.562.367.762.633.203.265.351.57.445.914.098.344.146.701.146 1.072 0 .406-.062.787-.187 1.143a2.673 2.673 0 0 1-.533.92c-.239.265-.53.474-.873.627-.34.148-.729.222-1.166.222-.45 0-.85-.086-1.202-.258a2.64 2.64 0 0 1-.89-.697 3.137 3.137 0 0 1-.586-1.072 4.248 4.248 0 0 1-.199-1.307v-.58c0-.687.088-1.342.263-1.963a3.95 3.95 0 0 1 .891-1.611 3.473 3.473 0 0 1 1.301-.891c.515-.207 1.105-.31 1.769-.31h.164Zm-1.529 4.06c-.168 0-.328.026-.48.076a1.668 1.668 0 0 0-.422.211c-.118.09-.223.194-.317.311a1.675 1.675 0 0 0-.234.393v.433c0 .34.037.639.111.897.078.257.184.472.317.644.132.172.287.303.462.393.176.09.364.134.563.134.219 0 .414-.042.586-.128.172-.09.318-.211.439-.364.121-.156.213-.34.276-.55.062-.215.094-.448.094-.698 0-.238-.032-.463-.094-.674a1.716 1.716 0 0 0-.264-.562 1.24 1.24 0 0 0-.439-.375 1.226 1.226 0 0 0-.598-.141Zm4.764.282.457-4.301h4.588v1.242h-3.422l-.223 2.045c.141-.082.324-.16.551-.235.23-.074.494-.111.791-.111.402 0 .762.067 1.078.199.32.133.592.323.814.569.219.25.387.552.504.908.118.352.176.748.176 1.189 0 .391-.057.76-.17 1.108a2.437 2.437 0 0 1-.51.902 2.356 2.356 0 0 1-.861.61c-.348.148-.758.222-1.23.222-.36 0-.704-.051-1.032-.152a2.663 2.663 0 0 1-.873-.469 2.463 2.463 0 0 1-.627-.756 2.545 2.545 0 0 1-.275-1.049h1.365c.051.418.203.739.457.961.258.223.586.334.985.334.234 0 .437-.043.609-.129.172-.086.316-.207.434-.363a1.63 1.63 0 0 0 .246-.551c.054-.218.082-.455.082-.709 0-.246-.033-.47-.1-.673a1.49 1.49 0 0 0-.287-.54 1.283 1.283 0 0 0-.48-.351 1.621 1.621 0 0 0-.668-.129c-.168 0-.315.014-.44.041a1.46 1.46 0 0 0-.592.27 2.535 2.535 0 0 0-.228.193l-1.119-.275Z"
              className="265"
            />
            <path
              d="M657.529 167h-5.724v-.973l2.777-3.023c.23-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.554-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.424 6.424 0 0 1-.557.744c-.21.25-.441.508-.691.774l-1.898 2.027h3.972V167Zm5.959-8.572v1.189h-.093c-.465 0-.87.065-1.213.194a2.368 2.368 0 0 0-1.418 1.341 3.507 3.507 0 0 0-.241 1.02c.094-.106.204-.207.329-.305.125-.101.263-.191.416-.269.144-.075.304-.133.48-.176.176-.047.361-.07.557-.07.414 0 .773.078 1.078.234.308.156.562.367.762.633.203.265.351.57.445.914.098.344.146.701.146 1.072 0 .406-.062.787-.187 1.143a2.673 2.673 0 0 1-.533.92c-.239.265-.53.474-.873.627-.34.148-.729.222-1.166.222-.45 0-.85-.086-1.202-.258a2.64 2.64 0 0 1-.89-.697 3.137 3.137 0 0 1-.586-1.072 4.248 4.248 0 0 1-.199-1.307v-.58c0-.687.088-1.342.263-1.963a3.95 3.95 0 0 1 .891-1.611 3.473 3.473 0 0 1 1.301-.891c.515-.207 1.105-.31 1.769-.31h.164Zm-1.529 4.06c-.168 0-.328.026-.48.076a1.668 1.668 0 0 0-.422.211c-.118.09-.223.194-.317.311a1.675 1.675 0 0 0-.234.393v.433c0 .34.037.639.111.897.078.257.184.472.317.644.132.172.287.303.462.393.176.09.364.134.563.134.219 0 .414-.042.586-.128.172-.09.318-.211.439-.364.121-.156.213-.34.276-.55.062-.215.094-.448.094-.698 0-.238-.032-.463-.094-.674a1.716 1.716 0 0 0-.264-.562 1.24 1.24 0 0 0-.439-.375 1.226 1.226 0 0 0-.598-.141Zm8.344 4.512h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V167Z"
              className="261"
            />
            <path
              d="M634.529 179h-5.724v-.973l2.777-3.023c.23-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.554-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.424 6.424 0 0 1-.557.744c-.21.25-.441.508-.691.774l-1.898 2.027h3.972V179Zm1.987-4.23.457-4.301h4.588v1.242h-3.422l-.223 2.045c.141-.082.324-.16.551-.235.23-.074.494-.111.791-.111.402 0 .762.067 1.078.199.32.133.592.323.814.569.219.25.387.552.504.908.117.352.176.748.176 1.189 0 .391-.057.76-.17 1.108a2.437 2.437 0 0 1-.51.902 2.356 2.356 0 0 1-.861.61c-.348.148-.758.222-1.23.222-.36 0-.704-.051-1.032-.152a2.663 2.663 0 0 1-.873-.469 2.463 2.463 0 0 1-.627-.756 2.545 2.545 0 0 1-.275-1.049h1.365c.051.418.203.739.457.961.258.223.586.334.985.334.234 0 .437-.043.609-.129.172-.086.316-.207.434-.363a1.63 1.63 0 0 0 .246-.551c.054-.218.082-.455.082-.709 0-.246-.034-.47-.1-.673a1.49 1.49 0 0 0-.287-.54 1.279 1.279 0 0 0-.481-.351 1.613 1.613 0 0 0-.667-.129c-.168 0-.315.014-.44.041a1.46 1.46 0 0 0-.592.27 2.535 2.535 0 0 0-.228.193l-1.119-.275Zm8.132 3.076c.485 0 .897-.055 1.237-.164.34-.11.619-.266.838-.469.234-.223.406-.477.515-.762.11-.289.18-.599.211-.931v-.03a1.989 1.989 0 0 1-.662.492c-.141.067-.297.12-.469.159a2.46 2.46 0 0 1-.556.058c-.414 0-.776-.078-1.084-.234a2.24 2.24 0 0 1-.762-.627 2.738 2.738 0 0 1-.463-.914 3.827 3.827 0 0 1-.152-1.084c0-.41.06-.795.181-1.154a2.91 2.91 0 0 1 .539-.956 2.53 2.53 0 0 1 .862-.638c.344-.16.734-.24 1.172-.24.441 0 .832.084 1.172.252.343.167.634.396.873.685.25.313.439.691.568 1.137.129.441.193.906.193 1.394v.492a7.72 7.72 0 0 1-.234 1.922 3.89 3.89 0 0 1-.826 1.6c-.321.375-.742.67-1.266.885-.519.215-1.146.322-1.881.322h-.117v-1.195h.111Zm1.413-2.754a1.4 1.4 0 0 0 .867-.293c.121-.09.226-.195.316-.317a1.79 1.79 0 0 0 .229-.404v-.486c0-.34-.039-.641-.118-.903a2.13 2.13 0 0 0-.298-.656 1.317 1.317 0 0 0-.452-.398 1.126 1.126 0 0 0-.55-.141c-.219 0-.414.049-.586.147a1.235 1.235 0 0 0-.422.386 1.87 1.87 0 0 0-.27.58 2.759 2.759 0 0 0-.006 1.366c.055.215.141.406.258.574.114.164.254.297.422.398.172.098.375.147.61.147Z"
              className="259"
            />
            <path
              d="M613.529 189h-5.724v-.973l2.777-3.023c.23-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.554-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.424 6.424 0 0 1-.557.744c-.21.25-.441.508-.691.774l-1.898 2.027h3.972V189Zm1.987-4.23.457-4.301h4.588v1.242h-3.422l-.223 2.045c.141-.082.324-.16.551-.235.23-.074.494-.111.791-.111.402 0 .762.067 1.078.199.32.133.592.323.814.569.219.25.387.552.504.908.117.352.176.748.176 1.189 0 .391-.057.76-.17 1.108a2.437 2.437 0 0 1-.51.902 2.356 2.356 0 0 1-.861.61c-.348.148-.758.222-1.23.222-.36 0-.704-.051-1.032-.152a2.663 2.663 0 0 1-.873-.469 2.463 2.463 0 0 1-.627-.756 2.545 2.545 0 0 1-.275-1.049h1.365c.051.418.203.739.457.961.258.223.586.334.985.334.234 0 .437-.043.609-.129.172-.086.316-.207.434-.363a1.63 1.63 0 0 0 .246-.551c.054-.218.082-.455.082-.709 0-.246-.034-.47-.1-.673a1.49 1.49 0 0 0-.287-.54 1.279 1.279 0 0 0-.481-.351 1.613 1.613 0 0 0-.667-.129c-.168 0-.315.014-.44.041a1.46 1.46 0 0 0-.592.27 2.535 2.535 0 0 0-.228.193l-1.119-.275Zm12.498-3.516-3.41 7.746h-1.477l3.41-7.359h-4.424v-1.172h5.901v.785Z"
              className="257"
            />
            <path
              d="M582.529 196h-5.724v-.973l2.777-3.023c.23-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.554-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.424 6.424 0 0 1-.557.744c-.21.25-.441.508-.691.774l-1.898 2.027h3.972V196Zm1.987-4.23.457-4.301h4.588v1.242h-3.422l-.223 2.045c.141-.082.324-.16.551-.235.23-.074.494-.111.791-.111.402 0 .762.067 1.078.199.32.133.592.323.814.569.219.25.387.552.504.908.117.352.176.748.176 1.189 0 .391-.057.76-.17 1.108a2.437 2.437 0 0 1-.51.902 2.356 2.356 0 0 1-.861.61c-.348.148-.758.222-1.23.222-.36 0-.704-.051-1.032-.152a2.663 2.663 0 0 1-.873-.469 2.463 2.463 0 0 1-.627-.756 2.545 2.545 0 0 1-.275-1.049h1.365c.051.418.203.739.457.961.258.223.586.334.985.334.234 0 .437-.043.609-.129.172-.086.316-.207.434-.363a1.63 1.63 0 0 0 .246-.551c.054-.218.082-.455.082-.709 0-.246-.034-.47-.1-.673a1.49 1.49 0 0 0-.287-.54 1.279 1.279 0 0 0-.481-.351 1.613 1.613 0 0 0-.667-.129c-.168 0-.315.014-.44.041a1.46 1.46 0 0 0-.592.27 2.535 2.535 0 0 0-.228.193l-1.119-.275Zm7.207 0 .457-4.301h4.588v1.242h-3.422l-.223 2.045c.141-.082.324-.16.551-.235.23-.074.494-.111.791-.111.402 0 .762.067 1.078.199.32.133.592.323.814.569.219.25.387.552.504.908.118.352.176.748.176 1.189 0 .391-.057.76-.17 1.108a2.437 2.437 0 0 1-.51.902 2.356 2.356 0 0 1-.861.61c-.348.148-.758.222-1.23.222-.36 0-.704-.051-1.032-.152a2.663 2.663 0 0 1-.873-.469 2.463 2.463 0 0 1-.627-.756 2.545 2.545 0 0 1-.275-1.049h1.365c.051.418.203.739.457.961.258.223.586.334.985.334.234 0 .437-.043.609-.129.172-.086.316-.207.434-.363a1.63 1.63 0 0 0 .246-.551c.054-.218.082-.455.082-.709 0-.246-.033-.47-.1-.673a1.49 1.49 0 0 0-.287-.54 1.283 1.283 0 0 0-.48-.351 1.621 1.621 0 0 0-.668-.129c-.168 0-.315.014-.44.041a1.46 1.46 0 0 0-.592.27 2.535 2.535 0 0 0-.228.193l-1.119-.275Z"
              className="255"
            />
            <path
              d="M549.529 201h-5.724v-.973l2.777-3.023c.23-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.554-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.424 6.424 0 0 1-.557.744c-.21.25-.441.508-.691.774l-1.898 2.027h3.972V201Zm6.381-3.041h1.072v1.137h-1.072V201h-1.4v-1.904h-3.692l-.035-.862 3.686-5.765h1.441v5.49Zm-3.697 0h2.297v-3.615l-.164.304-2.133 3.311Zm7.435 1.887c.485 0 .897-.055 1.237-.164.34-.11.619-.266.838-.469.234-.223.406-.477.515-.762.11-.289.18-.599.211-.931v-.03a1.989 1.989 0 0 1-.662.492c-.141.067-.297.12-.469.159a2.46 2.46 0 0 1-.556.058c-.414 0-.776-.078-1.084-.234a2.24 2.24 0 0 1-.762-.627 2.738 2.738 0 0 1-.463-.914 3.827 3.827 0 0 1-.152-1.084c0-.41.06-.795.181-1.154a2.91 2.91 0 0 1 .539-.956 2.53 2.53 0 0 1 .862-.638c.344-.16.734-.24 1.172-.24.441 0 .832.084 1.172.252.343.167.634.396.873.685.25.313.439.691.568 1.137.129.441.193.906.193 1.394v.492a7.72 7.72 0 0 1-.234 1.922 3.89 3.89 0 0 1-.826 1.6c-.321.375-.742.67-1.266.885-.519.215-1.146.322-1.881.322h-.117v-1.195h.111Zm1.413-2.754a1.4 1.4 0 0 0 .867-.293c.121-.09.226-.195.316-.317a1.79 1.79 0 0 0 .229-.404v-.486c0-.34-.039-.641-.118-.903a2.13 2.13 0 0 0-.298-.656 1.317 1.317 0 0 0-.452-.398 1.126 1.126 0 0 0-.55-.141c-.219 0-.414.049-.586.147a1.235 1.235 0 0 0-.422.386 1.87 1.87 0 0 0-.27.58 2.759 2.759 0 0 0-.006 1.366c.055.215.141.406.258.574.114.164.254.297.422.398.172.098.375.147.61.147Z"
              className="249"
            />
            <path
              d="M570.529 221h-5.724v-.973l2.777-3.023c.23-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.554-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.424 6.424 0 0 1-.557.744c-.21.25-.441.508-.691.774l-1.898 2.027h3.972V221Zm1.987-4.23.457-4.301h4.588v1.242h-3.422l-.223 2.045c.141-.082.324-.16.551-.235.23-.074.494-.111.791-.111.402 0 .762.067 1.078.199.32.133.592.323.814.569.219.25.387.552.504.908.117.352.176.748.176 1.189 0 .391-.057.76-.17 1.108a2.437 2.437 0 0 1-.51.902 2.356 2.356 0 0 1-.861.61c-.348.148-.758.222-1.23.222-.36 0-.704-.051-1.032-.152a2.663 2.663 0 0 1-.873-.469 2.463 2.463 0 0 1-.627-.756 2.545 2.545 0 0 1-.275-1.049h1.365c.051.418.203.739.457.961.258.223.586.334.985.334.234 0 .437-.043.609-.129.172-.086.316-.207.434-.363a1.63 1.63 0 0 0 .246-.551c.054-.218.082-.455.082-.709 0-.246-.034-.47-.1-.673a1.49 1.49 0 0 0-.287-.54 1.279 1.279 0 0 0-.481-.351 1.613 1.613 0 0 0-.667-.129c-.168 0-.315.014-.44.041a1.46 1.46 0 0 0-.592.27 2.535 2.535 0 0 0-.228.193l-1.119-.275Zm12.468.978c0 .547-.064 1.031-.193 1.453a2.875 2.875 0 0 1-.545 1.049 2.237 2.237 0 0 1-.867.656c-.34.145-.727.217-1.16.217-.43 0-.817-.072-1.16-.217a2.286 2.286 0 0 1-.873-.656 2.877 2.877 0 0 1-.557-1.049 5.121 5.121 0 0 1-.188-1.453v-2.021c0-.547.063-1.03.188-1.448.129-.422.312-.777.551-1.066.238-.285.527-.5.867-.645.344-.148.73-.222 1.16-.222.434 0 .82.074 1.16.222.344.145.637.36.879.645.234.289.416.644.545 1.066.129.418.193.901.193 1.448v2.021Zm-4.136-.498 2.713-2.057a3.226 3.226 0 0 0-.129-.791 1.433 1.433 0 0 0-.287-.545 1.034 1.034 0 0 0-.405-.281 1.435 1.435 0 0 0-.533-.094c-.215 0-.404.038-.568.112a1.04 1.04 0 0 0-.41.328 1.642 1.642 0 0 0-.288.639 3.94 3.94 0 0 0-.093.914v1.775Zm2.724.732v-1.711l-2.713 2.045c.02.27.061.508.123.715.067.207.155.379.264.516.109.148.244.26.404.334.164.074.354.111.569.111.211 0 .396-.035.556-.105a1.14 1.14 0 0 0 .411-.323c.128-.164.224-.378.287-.644.066-.266.099-.578.099-.938Z"
              className="250"
            />
            <path
              d="M594.58 230.102h.838c.25 0 .469-.034.656-.1a1.23 1.23 0 0 0 .463-.293c.113-.109.199-.244.258-.404.062-.164.094-.34.094-.528 0-.203-.03-.384-.088-.545a1.102 1.102 0 0 0-.246-.41 1.138 1.138 0 0 0-.416-.246 1.704 1.704 0 0 0-.569-.088c-.191 0-.369.03-.533.088a1.198 1.198 0 0 0-.703.621c-.066.149-.1.315-.1.498h-1.4c0-.34.068-.652.205-.937a2.3 2.3 0 0 1 .568-.744c.243-.207.528-.369.856-.487a3.258 3.258 0 0 1 1.09-.175c.402 0 .771.052 1.107.158.34.101.629.254.867.457a2.1 2.1 0 0 1 .563.762c.133.3.199.65.199 1.048 0 .176-.027.352-.082.528a1.96 1.96 0 0 1-.234.509 2.264 2.264 0 0 1-.961.809c.254.086.468.199.644.34.18.137.326.291.44.463.113.176.195.365.246.568.051.199.076.406.076.621 0 .399-.074.754-.223 1.067a2.222 2.222 0 0 1-.597.779 2.706 2.706 0 0 1-.914.492 3.766 3.766 0 0 1-1.131.164c-.367 0-.721-.051-1.061-.152a2.673 2.673 0 0 1-.896-.457 2.308 2.308 0 0 1-.621-.75 2.286 2.286 0 0 1-.229-1.049h1.4c0 .187.034.361.1.521.07.157.17.29.299.399.125.113.273.201.445.264.176.062.369.093.58.093.227 0 .43-.029.61-.088.183-.062.338-.154.463-.275a1.09 1.09 0 0 0 .275-.422c.066-.172.1-.367.1-.586 0-.246-.038-.457-.112-.633a1.135 1.135 0 0 0-.322-.439 1.401 1.401 0 0 0-.51-.252 2.264 2.264 0 0 0-.656-.088h-.838v-1.101ZM605.736 235h-5.724v-.973l2.777-3.023c.231-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.555-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.528 6.528 0 0 1-.556.744c-.211.25-.442.508-.692.774l-1.898 2.027h3.972V235Zm6.381-3.041h1.072v1.137h-1.072V235h-1.4v-1.904h-3.692l-.035-.862 3.686-5.765h1.441v5.49Zm-3.697 0h2.297v-3.615l-.164.304-2.133 3.311Z"
              className="324"
            />
            <path
              d="M644.529 243h-5.724v-.973l2.777-3.023c.23-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.554-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.424 6.424 0 0 1-.557.744c-.21.25-.441.508-.691.774l-1.898 2.027h3.972V243Zm5.959-8.572v1.189h-.093c-.465 0-.87.065-1.213.194a2.368 2.368 0 0 0-1.418 1.341 3.507 3.507 0 0 0-.241 1.02c.094-.106.204-.207.329-.305.125-.101.263-.191.416-.269.144-.075.304-.133.48-.176.176-.047.361-.07.557-.07.414 0 .773.078 1.078.234.308.156.562.367.762.633.203.265.351.57.445.914.098.344.146.701.146 1.072 0 .406-.062.787-.187 1.143a2.673 2.673 0 0 1-.533.92c-.239.265-.53.474-.873.627-.34.148-.729.222-1.166.222-.45 0-.85-.086-1.202-.258a2.64 2.64 0 0 1-.89-.697 3.137 3.137 0 0 1-.586-1.072 4.248 4.248 0 0 1-.199-1.307v-.58c0-.687.088-1.342.263-1.963a3.95 3.95 0 0 1 .891-1.611 3.473 3.473 0 0 1 1.301-.891c.515-.207 1.105-.31 1.769-.31h.164Zm-1.529 4.06c-.168 0-.328.026-.48.076a1.668 1.668 0 0 0-.422.211c-.118.09-.223.194-.317.311a1.675 1.675 0 0 0-.234.393v.433c0 .34.037.639.111.897.078.257.184.472.317.644.132.172.287.303.462.393.176.09.364.134.563.134.219 0 .414-.042.586-.128.172-.09.318-.211.439-.364.121-.156.213-.34.276-.55.062-.215.094-.448.094-.698 0-.238-.032-.463-.094-.674a1.716 1.716 0 0 0-.264-.562 1.24 1.24 0 0 0-.439-.375 1.226 1.226 0 0 0-.598-.141Zm10.025 1.26c0 .547-.064 1.031-.193 1.453a2.875 2.875 0 0 1-.545 1.049 2.237 2.237 0 0 1-.867.656c-.34.145-.727.217-1.16.217-.43 0-.817-.072-1.16-.217a2.286 2.286 0 0 1-.873-.656 2.877 2.877 0 0 1-.557-1.049 5.121 5.121 0 0 1-.188-1.453v-2.021c0-.547.063-1.03.188-1.448.129-.422.312-.777.551-1.066.238-.285.527-.5.867-.645.344-.148.73-.222 1.16-.222.434 0 .82.074 1.16.222.344.145.637.36.879.645.234.289.416.644.545 1.066.129.418.193.901.193 1.448v2.021Zm-4.136-.498 2.713-2.057a3.226 3.226 0 0 0-.129-.791 1.433 1.433 0 0 0-.287-.545 1.034 1.034 0 0 0-.405-.281 1.435 1.435 0 0 0-.533-.094c-.215 0-.404.038-.568.112a1.04 1.04 0 0 0-.41.328 1.642 1.642 0 0 0-.288.639 3.94 3.94 0 0 0-.093.914v1.775Zm2.724.732v-1.711l-2.713 2.045c.02.27.061.508.123.715.067.207.155.379.264.516.109.148.244.26.404.334.164.074.354.111.569.111.211 0 .396-.035.556-.105a1.14 1.14 0 0 0 .411-.323c.128-.164.224-.378.287-.644.066-.266.099-.578.099-.938Z"
              className="260"
            />
            <path
              d="M542.529 173h-5.724v-.973l2.777-3.023c.23-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.554-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.424 6.424 0 0 1-.557.744c-.21.25-.441.508-.691.774l-1.898 2.027h3.972V173Zm6.381-3.041h1.072v1.137h-1.072V173h-1.4v-1.904h-3.692l-.035-.862 3.686-5.765h1.441v5.49Zm-3.697 0h2.297v-3.615l-.164.304-2.133 3.311Zm11.607-3.24c0 .258-.043.498-.129.72a1.92 1.92 0 0 1-.351.598 2.302 2.302 0 0 1-.322.317 2.269 2.269 0 0 1-.405.257c.176.082.338.178.487.287.152.106.285.229.398.37a2.134 2.134 0 0 1 .51 1.412c0 .394-.072.744-.217 1.049a2.165 2.165 0 0 1-.592.761 2.621 2.621 0 0 1-.89.469 3.64 3.64 0 0 1-1.09.158c-.399 0-.77-.053-1.114-.158a2.556 2.556 0 0 1-.884-.469 2.144 2.144 0 0 1-.598-.756 2.482 2.482 0 0 1-.211-1.054c0-.235.031-.457.094-.668.066-.211.16-.407.281-.586.121-.172.266-.326.434-.463a2.68 2.68 0 0 1 .574-.358 2.293 2.293 0 0 1-.492-.328 2.093 2.093 0 0 1-.615-.955 2.031 2.031 0 0 1-.088-.603c0-.379.064-.715.193-1.008.133-.293.314-.541.545-.744.226-.203.498-.356.814-.457.321-.106.67-.158 1.049-.158.375 0 .721.052 1.037.158.321.101.6.254.838.457.231.199.412.447.545.744.133.293.199.629.199 1.008Zm-1.213 3.885c0-.211-.035-.403-.105-.575a1.365 1.365 0 0 0-.281-.457 1.307 1.307 0 0 0-.446-.281 1.568 1.568 0 0 0-.568-.1c-.215 0-.408.034-.58.1-.168.066-.313.16-.434.281a1.382 1.382 0 0 0-.281.457 1.704 1.704 0 0 0-.094.58c0 .219.034.416.1.592.066.172.162.317.287.434.121.113.266.201.434.263.172.059.365.088.58.088.203 0 .388-.031.556-.093.172-.063.321-.153.446-.27.117-.121.211-.266.281-.434.07-.171.105-.367.105-.585Zm-.181-3.833a1.38 1.38 0 0 0-.094-.521 1.291 1.291 0 0 0-.246-.41 1.188 1.188 0 0 0-.387-.258 1.294 1.294 0 0 0-.504-.094c-.183 0-.349.032-.498.094a1.097 1.097 0 0 0-.375.252 1.123 1.123 0 0 0-.234.404c-.055.16-.082.338-.082.533 0 .192.027.368.082.528.055.156.137.289.246.398.105.114.232.201.381.264.148.062.314.094.498.094.183 0 .349-.032.498-.094a1.154 1.154 0 0 0 .627-.662 1.54 1.54 0 0 0 .088-.528Z"
              className="248"
            />
            <path
              d="M510.529 173h-5.724v-.973l2.777-3.023c.23-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.554-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.424 6.424 0 0 1-.557.744c-.21.25-.441.508-.691.774l-1.898 2.027h3.972V173Zm6.381-3.041h1.072v1.137h-1.072V173h-1.4v-1.904h-3.692l-.035-.862 3.686-5.765h1.441v5.49Zm-3.697 0h2.297v-3.615l-.164.304-2.133 3.311Zm7.781-1.857h.838c.25 0 .469-.034.656-.1a1.23 1.23 0 0 0 .463-.293c.113-.109.199-.244.258-.404.062-.164.094-.34.094-.528 0-.203-.03-.384-.088-.545a1.102 1.102 0 0 0-.246-.41 1.138 1.138 0 0 0-.416-.246 1.704 1.704 0 0 0-.569-.088c-.191 0-.369.03-.533.088a1.198 1.198 0 0 0-.703.621c-.066.149-.1.315-.1.498h-1.4c0-.34.068-.652.205-.937a2.3 2.3 0 0 1 .568-.744c.243-.207.528-.369.856-.487a3.258 3.258 0 0 1 1.09-.175c.402 0 .771.052 1.107.158.34.101.629.254.867.457a2.1 2.1 0 0 1 .563.762c.133.3.199.65.199 1.048 0 .176-.027.352-.082.528a1.96 1.96 0 0 1-.234.509 2.264 2.264 0 0 1-.961.809c.254.086.469.199.644.34.18.137.326.291.44.463.113.176.195.365.246.568.051.199.076.406.076.621 0 .399-.074.754-.223 1.067a2.222 2.222 0 0 1-.597.779 2.706 2.706 0 0 1-.914.492 3.766 3.766 0 0 1-1.131.164c-.367 0-.721-.051-1.061-.152a2.673 2.673 0 0 1-.896-.457 2.308 2.308 0 0 1-.621-.75 2.286 2.286 0 0 1-.229-1.049h1.401c0 .187.033.361.099.521.07.157.17.29.299.399.125.113.273.201.445.264.176.062.369.093.58.093.227 0 .43-.029.61-.088.183-.062.338-.154.463-.275.121-.113.213-.254.275-.422.066-.172.1-.367.1-.586a1.61 1.61 0 0 0-.112-.633 1.135 1.135 0 0 0-.322-.439 1.393 1.393 0 0 0-.51-.252 2.264 2.264 0 0 0-.656-.088h-.838v-1.101Z"
              className="243"
            />
            <path
              d="M511.529 198h-5.724v-.973l2.777-3.023c.23-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.554-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.424 6.424 0 0 1-.557.744c-.21.25-.441.508-.691.774l-1.898 2.027h3.972V198Zm6.381-3.041h1.072v1.137h-1.072V198h-1.4v-1.904h-3.692l-.035-.862 3.686-5.765h1.441v5.49Zm-3.697 0h2.297v-3.615l-.164.304-2.133 3.311Zm10.904 0h1.072v1.137h-1.072V198h-1.4v-1.904h-3.692l-.035-.862 3.686-5.765h1.441v5.49Zm-3.697 0h2.297v-3.615l-.164.304-2.133 3.311Z"
              className="244"
            />
            <path
              d="M535.529 217h-5.724v-.973l2.777-3.023c.23-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.554-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.424 6.424 0 0 1-.557.744c-.21.25-.441.508-.691.774l-1.898 2.027h3.972V217Zm6.381-3.041h1.072v1.137h-1.072V217h-1.4v-1.904h-3.692l-.035-.862 3.686-5.765h1.441v5.49Zm-3.697 0h2.297v-3.615l-.164.304-2.133 3.311Zm6.51-1.189.457-4.301h4.588v1.242h-3.422l-.223 2.045c.141-.082.324-.16.551-.235.23-.074.494-.111.791-.111.402 0 .762.067 1.078.199.32.133.592.323.814.569.219.25.387.552.504.908.118.352.176.748.176 1.189 0 .391-.057.76-.17 1.108a2.437 2.437 0 0 1-.51.902 2.356 2.356 0 0 1-.861.61c-.348.148-.758.222-1.23.222-.36 0-.704-.051-1.032-.152a2.663 2.663 0 0 1-.873-.469 2.463 2.463 0 0 1-.627-.756 2.545 2.545 0 0 1-.275-1.049h1.365c.051.418.203.739.457.961.258.223.586.334.985.334.234 0 .437-.043.609-.129.172-.086.316-.207.434-.363a1.63 1.63 0 0 0 .246-.551c.054-.218.082-.455.082-.709 0-.246-.033-.47-.1-.673a1.49 1.49 0 0 0-.287-.54 1.283 1.283 0 0 0-.48-.351 1.621 1.621 0 0 0-.668-.129c-.168 0-.315.014-.44.041a1.46 1.46 0 0 0-.592.27 2.535 2.535 0 0 0-.228.193l-1.119-.275Z"
              className="245"
            />
            <path
              d="M505.58 229.102h.838c.25 0 .469-.034.656-.1a1.23 1.23 0 0 0 .463-.293c.113-.109.199-.244.258-.404.062-.164.094-.34.094-.528 0-.203-.03-.384-.088-.545a1.102 1.102 0 0 0-.246-.41 1.138 1.138 0 0 0-.416-.246 1.704 1.704 0 0 0-.569-.088c-.191 0-.369.03-.533.088a1.198 1.198 0 0 0-.703.621c-.066.149-.1.315-.1.498h-1.4c0-.34.068-.652.205-.937a2.3 2.3 0 0 1 .568-.744c.243-.207.528-.369.856-.487a3.258 3.258 0 0 1 1.09-.175c.402 0 .771.052 1.107.158.34.101.629.254.867.457a2.1 2.1 0 0 1 .563.762c.133.3.199.65.199 1.048 0 .176-.027.352-.082.528a1.96 1.96 0 0 1-.234.509 2.264 2.264 0 0 1-.961.809c.254.086.468.199.644.34.18.137.326.291.44.463.113.176.195.365.246.568.051.199.076.406.076.621 0 .399-.074.754-.223 1.067a2.222 2.222 0 0 1-.597.779 2.706 2.706 0 0 1-.914.492 3.766 3.766 0 0 1-1.131.164c-.367 0-.721-.051-1.061-.152a2.673 2.673 0 0 1-.896-.457 2.308 2.308 0 0 1-.621-.75 2.286 2.286 0 0 1-.229-1.049h1.4c0 .187.034.361.1.521.07.157.17.29.299.399.125.113.273.201.445.264.176.062.369.093.58.093.227 0 .43-.029.61-.088.183-.062.338-.154.463-.275a1.09 1.09 0 0 0 .275-.422c.066-.172.1-.367.1-.586 0-.246-.038-.457-.112-.633a1.135 1.135 0 0 0-.322-.439 1.401 1.401 0 0 0-.51-.252 2.264 2.264 0 0 0-.656-.088h-.838v-1.101Zm11.197 1.646c0 .547-.064 1.031-.193 1.453a2.875 2.875 0 0 1-.545 1.049 2.237 2.237 0 0 1-.867.656c-.34.145-.727.217-1.16.217-.43 0-.817-.072-1.16-.217a2.286 2.286 0 0 1-.873-.656 2.877 2.877 0 0 1-.557-1.049 5.121 5.121 0 0 1-.188-1.453v-2.021c0-.547.063-1.03.188-1.448.129-.422.312-.777.551-1.066.238-.285.527-.5.867-.645.344-.148.73-.222 1.16-.222.434 0 .82.074 1.16.222.344.145.637.36.879.645.234.289.416.644.545 1.066.129.418.193.901.193 1.448v2.021Zm-4.136-.498 2.713-2.057a3.226 3.226 0 0 0-.129-.791 1.447 1.447 0 0 0-.287-.545 1.034 1.034 0 0 0-.405-.281 1.435 1.435 0 0 0-.533-.094c-.215 0-.404.038-.568.112a1.05 1.05 0 0 0-.411.328 1.656 1.656 0 0 0-.287.639 3.94 3.94 0 0 0-.093.914v1.775Zm2.724.732v-1.711l-2.713 2.045c.02.27.061.508.123.715.067.207.155.379.264.516.109.148.244.26.404.334.164.074.354.111.569.111.211 0 .396-.035.556-.105a1.14 1.14 0 0 0 .411-.323c.128-.164.224-.378.287-.644.066-.266.099-.578.099-.938Zm8.455-3.263c0 .258-.043.498-.129.72a1.92 1.92 0 0 1-.351.598 2.302 2.302 0 0 1-.322.317 2.269 2.269 0 0 1-.405.257c.176.082.338.178.487.287.152.106.285.229.398.37a2.134 2.134 0 0 1 .51 1.412c0 .394-.072.744-.217 1.049a2.165 2.165 0 0 1-.592.761 2.621 2.621 0 0 1-.89.469 3.64 3.64 0 0 1-1.09.158c-.399 0-.77-.053-1.114-.158a2.556 2.556 0 0 1-.884-.469 2.144 2.144 0 0 1-.598-.756 2.482 2.482 0 0 1-.211-1.054c0-.235.031-.457.094-.668.066-.211.16-.407.281-.586.121-.172.266-.326.434-.463a2.68 2.68 0 0 1 .574-.358 2.293 2.293 0 0 1-.492-.328 2.093 2.093 0 0 1-.615-.955 2.031 2.031 0 0 1-.088-.603c0-.379.064-.715.193-1.008.133-.293.314-.541.545-.744.226-.203.498-.356.814-.457.321-.106.67-.158 1.049-.158.375 0 .721.052 1.037.158.321.101.6.254.838.457.231.199.412.447.545.744.133.293.199.629.199 1.008Zm-1.213 3.885c0-.211-.035-.403-.105-.575a1.365 1.365 0 0 0-.281-.457 1.307 1.307 0 0 0-.446-.281 1.568 1.568 0 0 0-.568-.1c-.215 0-.408.034-.58.1-.168.066-.313.16-.434.281a1.382 1.382 0 0 0-.281.457 1.704 1.704 0 0 0-.094.58c0 .219.034.416.1.592.066.172.162.317.287.434.121.113.266.201.434.263.172.059.365.088.58.088.203 0 .388-.031.556-.093.172-.063.321-.153.446-.27.117-.121.211-.266.281-.434.07-.171.105-.367.105-.585Zm-.181-3.833a1.38 1.38 0 0 0-.094-.521 1.291 1.291 0 0 0-.246-.41 1.188 1.188 0 0 0-.387-.258 1.294 1.294 0 0 0-.504-.094c-.183 0-.349.032-.498.094a1.097 1.097 0 0 0-.375.252 1.123 1.123 0 0 0-.234.404c-.055.16-.082.338-.082.533 0 .192.027.368.082.528.055.156.137.289.246.398.105.114.232.201.381.264.148.062.314.094.498.094.183 0 .349-.032.498-.094a1.154 1.154 0 0 0 .627-.662 1.54 1.54 0 0 0 .088-.528Z"
              className="308"
            />
            <path
              d="M496.58 261.102h.838c.25 0 .469-.034.656-.1a1.23 1.23 0 0 0 .463-.293c.113-.109.199-.244.258-.404.062-.164.094-.34.094-.528 0-.203-.03-.384-.088-.545a1.102 1.102 0 0 0-.246-.41 1.138 1.138 0 0 0-.416-.246 1.704 1.704 0 0 0-.569-.088c-.191 0-.369.03-.533.088a1.198 1.198 0 0 0-.703.621c-.066.149-.1.315-.1.498h-1.4c0-.34.068-.652.205-.937a2.3 2.3 0 0 1 .568-.744c.243-.207.528-.369.856-.487a3.258 3.258 0 0 1 1.09-.175c.402 0 .771.052 1.107.158.34.101.629.254.867.457a2.1 2.1 0 0 1 .563.762c.133.3.199.65.199 1.048 0 .176-.027.352-.082.528a1.96 1.96 0 0 1-.234.509 2.264 2.264 0 0 1-.961.809c.254.086.468.199.644.34.18.137.326.291.44.463.113.176.195.365.246.568.051.199.076.406.076.621 0 .399-.074.754-.223 1.067a2.222 2.222 0 0 1-.597.779 2.706 2.706 0 0 1-.914.492 3.766 3.766 0 0 1-1.131.164c-.367 0-.721-.051-1.061-.152a2.673 2.673 0 0 1-.896-.457 2.308 2.308 0 0 1-.621-.75 2.286 2.286 0 0 1-.229-1.049h1.4c0 .187.034.361.1.521.07.157.17.29.299.399.125.113.273.201.445.264.176.062.369.093.58.093.227 0 .43-.029.61-.088.183-.062.338-.154.463-.275a1.09 1.09 0 0 0 .275-.422c.066-.172.1-.367.1-.586 0-.246-.038-.457-.112-.633a1.135 1.135 0 0 0-.322-.439 1.401 1.401 0 0 0-.51-.252 2.264 2.264 0 0 0-.656-.088h-.838v-1.101Zm11.197 1.646c0 .547-.064 1.031-.193 1.453a2.875 2.875 0 0 1-.545 1.049 2.237 2.237 0 0 1-.867.656c-.34.145-.727.217-1.16.217-.43 0-.817-.072-1.16-.217a2.286 2.286 0 0 1-.873-.656 2.877 2.877 0 0 1-.557-1.049 5.121 5.121 0 0 1-.188-1.453v-2.021c0-.547.063-1.03.188-1.448.129-.422.312-.777.551-1.066.238-.285.527-.5.867-.645.344-.148.73-.222 1.16-.222.434 0 .82.074 1.16.222.344.145.637.36.879.645.234.289.416.644.545 1.066.129.418.193.901.193 1.448v2.021Zm-4.136-.498 2.713-2.057a3.226 3.226 0 0 0-.129-.791 1.447 1.447 0 0 0-.287-.545 1.034 1.034 0 0 0-.405-.281 1.435 1.435 0 0 0-.533-.094c-.215 0-.404.038-.568.112a1.05 1.05 0 0 0-.411.328 1.656 1.656 0 0 0-.287.639 3.94 3.94 0 0 0-.093.914v1.775Zm2.724.732v-1.711l-2.713 2.045c.02.27.061.508.123.715.067.207.155.379.264.516.109.148.244.26.404.334.164.074.354.111.569.111.211 0 .396-.035.556-.105a1.14 1.14 0 0 0 .411-.323c.128-.164.224-.378.287-.644.066-.266.099-.578.099-.938Zm3.358-1.212.457-4.301h4.588v1.242h-3.422l-.223 2.045c.141-.082.324-.16.551-.235.23-.074.494-.111.791-.111.402 0 .762.067 1.078.199.32.133.592.323.814.569.219.25.387.552.504.908.118.352.176.748.176 1.189 0 .391-.057.76-.17 1.108a2.437 2.437 0 0 1-.51.902 2.356 2.356 0 0 1-.861.61c-.348.148-.758.222-1.23.222-.36 0-.704-.051-1.032-.152a2.663 2.663 0 0 1-.873-.469 2.463 2.463 0 0 1-.627-.756 2.545 2.545 0 0 1-.275-1.049h1.365c.051.418.203.739.457.961.258.223.586.334.985.334.234 0 .437-.043.609-.129.172-.086.316-.207.434-.363a1.63 1.63 0 0 0 .246-.551c.054-.218.082-.455.082-.709 0-.246-.033-.47-.1-.673a1.49 1.49 0 0 0-.287-.54 1.283 1.283 0 0 0-.48-.351 1.621 1.621 0 0 0-.668-.129c-.168 0-.315.014-.44.041a1.46 1.46 0 0 0-.592.27 2.535 2.535 0 0 0-.228.193l-1.119-.275Z"
              className="305"
            />
            <path
              d="M552.529 253h-5.724v-.973l2.777-3.023c.23-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.554-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.424 6.424 0 0 1-.557.744c-.21.25-.441.508-.691.774l-1.898 2.027h3.972V253Zm6.381-3.041h1.072v1.137h-1.072V253h-1.4v-1.904h-3.692l-.035-.862 3.686-5.765h1.441v5.49Zm-3.697 0h2.297v-3.615l-.164.304-2.133 3.311Zm10.482-5.531v1.189h-.093c-.465 0-.87.065-1.213.194a2.382 2.382 0 0 0-1.418 1.341 3.507 3.507 0 0 0-.241 1.02c.094-.106.204-.207.329-.305.125-.101.263-.191.416-.269.144-.075.304-.133.48-.176.176-.047.361-.07.557-.07.414 0 .773.078 1.078.234.308.156.562.367.762.633.203.265.351.57.445.914.098.344.146.701.146 1.072 0 .406-.062.787-.187 1.143a2.673 2.673 0 0 1-.533.92c-.239.265-.53.474-.873.627-.34.148-.729.222-1.166.222-.45 0-.85-.086-1.202-.258a2.64 2.64 0 0 1-.89-.697 3.137 3.137 0 0 1-.586-1.072 4.248 4.248 0 0 1-.199-1.307v-.58c0-.687.088-1.342.263-1.963a3.95 3.95 0 0 1 .891-1.611 3.473 3.473 0 0 1 1.301-.891c.515-.207 1.105-.31 1.769-.31h.164Zm-1.529 4.06c-.168 0-.328.026-.48.076a1.668 1.668 0 0 0-.422.211c-.118.09-.223.194-.317.311a1.71 1.71 0 0 0-.234.393v.433c0 .34.037.639.111.897.078.257.184.472.317.644.132.172.287.303.463.393.175.09.363.134.562.134.219 0 .414-.042.586-.128.172-.09.318-.211.439-.364.121-.156.213-.34.276-.55.062-.215.094-.448.094-.698 0-.238-.032-.463-.094-.674a1.716 1.716 0 0 0-.264-.562 1.24 1.24 0 0 0-.439-.375 1.226 1.226 0 0 0-.598-.141Z"
              className="246"
            />
            <path
              d="M587.58 260.102h.838c.25 0 .469-.034.656-.1a1.23 1.23 0 0 0 .463-.293c.113-.109.199-.244.258-.404.062-.164.094-.34.094-.528 0-.203-.03-.384-.088-.545a1.102 1.102 0 0 0-.246-.41 1.138 1.138 0 0 0-.416-.246 1.704 1.704 0 0 0-.569-.088c-.191 0-.369.03-.533.088a1.198 1.198 0 0 0-.703.621c-.066.149-.1.315-.1.498h-1.4c0-.34.068-.652.205-.937a2.3 2.3 0 0 1 .568-.744c.243-.207.528-.369.856-.487a3.258 3.258 0 0 1 1.09-.175c.402 0 .771.052 1.107.158.34.101.629.254.867.457a2.1 2.1 0 0 1 .563.762c.133.3.199.65.199 1.048 0 .176-.027.352-.082.528a1.96 1.96 0 0 1-.234.509 2.264 2.264 0 0 1-.961.809c.254.086.468.199.644.34.18.137.326.291.44.463.113.176.195.365.246.568.051.199.076.406.076.621 0 .399-.074.754-.223 1.067a2.222 2.222 0 0 1-.597.779 2.706 2.706 0 0 1-.914.492 3.766 3.766 0 0 1-1.131.164c-.367 0-.721-.051-1.061-.152a2.673 2.673 0 0 1-.896-.457 2.308 2.308 0 0 1-.621-.75 2.286 2.286 0 0 1-.229-1.049h1.4c0 .187.034.361.1.521.07.157.17.29.299.399.125.113.273.201.445.264.176.062.369.093.58.093.227 0 .43-.029.61-.088.183-.062.338-.154.463-.275a1.09 1.09 0 0 0 .275-.422c.066-.172.1-.367.1-.586 0-.246-.038-.457-.112-.633a1.135 1.135 0 0 0-.322-.439 1.401 1.401 0 0 0-.51-.252 2.264 2.264 0 0 0-.656-.088h-.838v-1.101Zm9.516 4.898h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V265Zm8.847 0h-5.724v-.973l2.777-3.023c.231-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.342 1.342 0 0 0-.527-.099c-.25 0-.467.035-.651.105a1.22 1.22 0 0 0-.457.299 1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.555-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.205.498-.358.744a6.528 6.528 0 0 1-.556.744c-.211.25-.442.508-.692.774l-1.898 2.027h3.972V265Z"
              className="312"
            />
            <path
              d="M577.58 275.102h.838c.25 0 .469-.034.656-.1a1.23 1.23 0 0 0 .463-.293c.113-.109.199-.244.258-.404.062-.164.094-.34.094-.528 0-.203-.03-.384-.088-.545a1.102 1.102 0 0 0-.246-.41 1.138 1.138 0 0 0-.416-.246 1.704 1.704 0 0 0-.569-.088c-.191 0-.369.03-.533.088a1.198 1.198 0 0 0-.703.621c-.066.149-.1.315-.1.498h-1.4c0-.34.068-.652.205-.937a2.3 2.3 0 0 1 .568-.744c.243-.207.528-.369.856-.487a3.258 3.258 0 0 1 1.09-.175c.402 0 .771.052 1.107.158.34.101.629.254.867.457a2.1 2.1 0 0 1 .563.762c.133.3.199.65.199 1.048 0 .176-.027.352-.082.528a1.96 1.96 0 0 1-.234.509 2.264 2.264 0 0 1-.961.809c.254.086.468.199.644.34.18.137.326.291.44.463.113.176.195.365.246.568.051.199.076.406.076.621 0 .399-.074.754-.223 1.067a2.222 2.222 0 0 1-.597.779 2.706 2.706 0 0 1-.914.492 3.766 3.766 0 0 1-1.131.164c-.367 0-.721-.051-1.061-.152a2.673 2.673 0 0 1-.896-.457 2.308 2.308 0 0 1-.621-.75 2.286 2.286 0 0 1-.229-1.049h1.4c0 .187.034.361.1.521.07.157.17.29.299.399.125.113.273.201.445.264.176.062.369.093.58.093.227 0 .43-.029.61-.088.183-.062.338-.154.463-.275a1.09 1.09 0 0 0 .275-.422c.066-.172.1-.367.1-.586 0-.246-.038-.457-.112-.633a1.135 1.135 0 0 0-.322-.439 1.401 1.401 0 0 0-.51-.252 2.264 2.264 0 0 0-.656-.088h-.838v-1.101Zm9.516 4.898h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V280Zm7.207 0h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V280Z"
              className="311"
            />
            <path
              d="M560.529 294h-5.724v-.973l2.777-3.023c.23-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.554-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.424 6.424 0 0 1-.557.744c-.21.25-.441.508-.691.774l-1.898 2.027h3.972V294Zm7.084-6.281c0 .258-.043.498-.129.72a1.92 1.92 0 0 1-.351.598 2.302 2.302 0 0 1-.322.317 2.269 2.269 0 0 1-.405.257c.176.082.338.178.487.287.152.106.285.229.398.37a2.134 2.134 0 0 1 .51 1.412c0 .394-.072.744-.217 1.049a2.165 2.165 0 0 1-.592.761 2.621 2.621 0 0 1-.89.469 3.64 3.64 0 0 1-1.09.158c-.399 0-.77-.053-1.114-.158a2.556 2.556 0 0 1-.884-.469 2.144 2.144 0 0 1-.598-.756 2.482 2.482 0 0 1-.211-1.054c0-.235.031-.457.094-.668.066-.211.16-.407.281-.586.121-.172.266-.326.434-.463a2.68 2.68 0 0 1 .574-.358 2.293 2.293 0 0 1-.492-.328 2.093 2.093 0 0 1-.616-.955 2.064 2.064 0 0 1-.087-.603c0-.379.064-.715.193-1.008.133-.293.314-.541.545-.744.226-.203.498-.356.814-.457.321-.106.67-.158 1.049-.158.375 0 .721.052 1.037.158.321.101.6.254.838.457.231.199.412.447.545.744.133.293.199.629.199 1.008Zm-1.213 3.885c0-.211-.035-.403-.105-.575a1.365 1.365 0 0 0-.281-.457 1.307 1.307 0 0 0-.446-.281 1.572 1.572 0 0 0-.568-.1c-.215 0-.408.034-.58.1-.168.066-.313.16-.434.281a1.365 1.365 0 0 0-.281.457 1.704 1.704 0 0 0-.094.58c0 .219.034.416.1.592.066.172.162.317.287.434.121.113.266.201.434.263.172.059.365.088.58.088.203 0 .388-.031.556-.093.172-.063.321-.153.446-.27.117-.121.211-.266.281-.434.07-.171.105-.367.105-.585Zm-.181-3.833a1.38 1.38 0 0 0-.094-.521 1.291 1.291 0 0 0-.246-.41 1.188 1.188 0 0 0-.387-.258 1.294 1.294 0 0 0-.504-.094c-.183 0-.349.032-.498.094a1.097 1.097 0 0 0-.375.252 1.123 1.123 0 0 0-.234.404c-.055.16-.082.338-.082.533 0 .192.027.368.082.528.055.156.137.289.246.398.105.114.232.201.381.264.148.062.314.094.498.094.183 0 .349-.032.498-.094a1.154 1.154 0 0 0 .627-.662 1.54 1.54 0 0 0 .088-.528Zm3.504 1.999.457-4.301h4.588v1.242h-3.422l-.223 2.045c.141-.082.324-.16.551-.235.23-.074.494-.111.791-.111.402 0 .762.067 1.078.199.32.133.592.323.814.569.219.25.387.552.504.908.118.352.176.748.176 1.189 0 .391-.057.76-.17 1.108a2.437 2.437 0 0 1-.51.902 2.356 2.356 0 0 1-.861.61c-.348.148-.758.222-1.23.222-.36 0-.704-.051-1.032-.152a2.663 2.663 0 0 1-.873-.469 2.463 2.463 0 0 1-.627-.756 2.545 2.545 0 0 1-.275-1.049h1.365c.051.418.203.739.457.961.258.223.586.334.985.334.234 0 .437-.043.609-.129.172-.086.316-.207.434-.363a1.63 1.63 0 0 0 .246-.551c.054-.218.082-.455.082-.709 0-.246-.033-.47-.1-.673a1.49 1.49 0 0 0-.287-.54 1.283 1.283 0 0 0-.48-.351 1.621 1.621 0 0 0-.668-.129c-.168 0-.315.014-.44.041a1.46 1.46 0 0 0-.592.27 2.535 2.535 0 0 0-.228.193l-1.119-.275Z"
              className="285"
            />
            <path
              d="M592.529 309h-5.724v-.973l2.777-3.023c.23-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.554-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.424 6.424 0 0 1-.557.744c-.21.25-.441.508-.691.774l-1.898 2.027h3.972V309Zm7.084-6.281c0 .258-.043.498-.129.72a1.92 1.92 0 0 1-.351.598 2.302 2.302 0 0 1-.322.317 2.269 2.269 0 0 1-.405.257c.176.082.338.178.487.287.152.106.285.229.398.37a2.134 2.134 0 0 1 .51 1.412c0 .394-.072.744-.217 1.049a2.165 2.165 0 0 1-.592.761 2.621 2.621 0 0 1-.89.469 3.64 3.64 0 0 1-1.09.158c-.399 0-.77-.053-1.114-.158a2.556 2.556 0 0 1-.884-.469 2.144 2.144 0 0 1-.598-.756 2.482 2.482 0 0 1-.211-1.054c0-.235.031-.457.094-.668.066-.211.16-.407.281-.586.121-.172.266-.326.434-.463a2.68 2.68 0 0 1 .574-.358 2.293 2.293 0 0 1-.492-.328 2.093 2.093 0 0 1-.616-.955 2.064 2.064 0 0 1-.087-.603c0-.379.064-.715.193-1.008.133-.293.314-.541.545-.744.226-.203.498-.356.814-.457.321-.106.67-.158 1.049-.158.375 0 .721.052 1.037.158.321.101.6.254.838.457.231.199.412.447.545.744.133.293.199.629.199 1.008Zm-1.213 3.885c0-.211-.035-.403-.105-.575a1.365 1.365 0 0 0-.281-.457 1.307 1.307 0 0 0-.446-.281 1.572 1.572 0 0 0-.568-.1c-.215 0-.408.034-.58.1-.168.066-.313.16-.434.281a1.365 1.365 0 0 0-.281.457 1.704 1.704 0 0 0-.094.58c0 .219.034.416.1.592.066.172.162.317.287.434.121.113.266.201.434.263.172.059.365.088.58.088.203 0 .388-.031.556-.093.172-.063.321-.153.446-.27.117-.121.211-.266.281-.434.07-.171.105-.367.105-.585Zm-.181-3.833a1.38 1.38 0 0 0-.094-.521 1.291 1.291 0 0 0-.246-.41 1.188 1.188 0 0 0-.387-.258 1.294 1.294 0 0 0-.504-.094c-.183 0-.349.032-.498.094a1.097 1.097 0 0 0-.375.252 1.123 1.123 0 0 0-.234.404c-.055.16-.082.338-.082.533 0 .192.027.368.082.528.055.156.137.289.246.398.105.114.232.201.381.264.148.062.314.094.498.094.183 0 .349-.032.498-.094a1.154 1.154 0 0 0 .627-.662 1.54 1.54 0 0 0 .088-.528Zm8.765 2.977c0 .547-.064 1.031-.193 1.453a2.875 2.875 0 0 1-.545 1.049 2.237 2.237 0 0 1-.867.656c-.34.145-.727.217-1.16.217-.43 0-.817-.072-1.16-.217a2.286 2.286 0 0 1-.873-.656 2.877 2.877 0 0 1-.557-1.049 5.121 5.121 0 0 1-.188-1.453v-2.021c0-.547.063-1.03.188-1.448.129-.422.312-.777.551-1.066.238-.285.527-.5.867-.645.344-.148.73-.222 1.16-.222.434 0 .82.074 1.16.222.344.145.637.36.879.645.234.289.416.644.545 1.066.129.418.193.901.193 1.448v2.021Zm-4.136-.498 2.713-2.057a3.226 3.226 0 0 0-.129-.791 1.433 1.433 0 0 0-.287-.545 1.034 1.034 0 0 0-.405-.281 1.435 1.435 0 0 0-.533-.094c-.215 0-.404.038-.568.112a1.04 1.04 0 0 0-.41.328 1.642 1.642 0 0 0-.288.639 3.94 3.94 0 0 0-.093.914v1.775Zm2.724.732v-1.711l-2.713 2.045c.02.27.061.508.123.715.067.207.155.379.264.516.109.148.244.26.404.334.164.074.354.111.569.111.211 0 .396-.035.556-.105a1.14 1.14 0 0 0 .411-.323c.128-.164.224-.378.287-.644.066-.266.099-.578.099-.938Z"
              className="280"
            />
            <path
              d="M606.529 286h-5.724v-.973l2.777-3.023c.23-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.554-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.424 6.424 0 0 1-.557.744c-.21.25-.441.508-.691.774l-1.898 2.027h3.972V286Zm7.278-7.746L610.396 286h-1.476l3.41-7.359h-4.424v-1.172h5.901v.785Zm2.841 6.592c.485 0 .897-.055 1.237-.164.34-.11.619-.266.838-.469.234-.223.406-.477.515-.762.11-.289.18-.599.211-.931v-.03a1.989 1.989 0 0 1-.662.492c-.141.067-.297.12-.469.159a2.46 2.46 0 0 1-.556.058c-.414 0-.776-.078-1.084-.234a2.24 2.24 0 0 1-.762-.627 2.738 2.738 0 0 1-.463-.914 3.827 3.827 0 0 1-.152-1.084c0-.41.06-.795.181-1.154a2.91 2.91 0 0 1 .539-.956 2.53 2.53 0 0 1 .862-.638c.344-.16.734-.24 1.172-.24.441 0 .832.084 1.172.252.343.167.634.396.873.685.25.313.439.691.568 1.137.129.441.193.906.193 1.394v.492a7.72 7.72 0 0 1-.234 1.922 3.89 3.89 0 0 1-.826 1.6c-.321.375-.742.67-1.266.885-.519.215-1.146.322-1.881.322h-.117v-1.195h.111Zm1.413-2.754a1.4 1.4 0 0 0 .867-.293c.121-.09.226-.195.316-.317a1.79 1.79 0 0 0 .229-.404v-.486c0-.34-.039-.641-.118-.903a2.13 2.13 0 0 0-.298-.656 1.317 1.317 0 0 0-.452-.398 1.126 1.126 0 0 0-.55-.141c-.219 0-.414.049-.586.147a1.235 1.235 0 0 0-.422.386 1.87 1.87 0 0 0-.27.58 2.759 2.759 0 0 0-.006 1.366c.055.215.141.406.258.574.114.164.254.297.422.398.172.098.375.147.61.147Z"
              className="279"
            />
            <path
              d="M636.529 298h-5.724v-.973l2.777-3.023c.23-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.554-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.424 6.424 0 0 1-.557.744c-.21.25-.441.508-.691.774l-1.898 2.027h3.972V298Zm7.278-7.746L640.396 298h-1.476l3.41-7.359h-4.424v-1.172h5.901v.785Zm5.888-.826v1.189h-.093c-.465 0-.87.065-1.213.194a2.382 2.382 0 0 0-1.418 1.341 3.507 3.507 0 0 0-.241 1.02c.094-.106.204-.207.329-.305.125-.101.263-.191.416-.269.144-.075.304-.133.48-.176.176-.047.361-.07.557-.07.414 0 .773.078 1.078.234.308.156.562.367.762.633.203.265.351.57.445.914.098.344.146.701.146 1.072 0 .406-.062.787-.187 1.143a2.673 2.673 0 0 1-.533.92c-.239.265-.53.474-.873.627-.34.148-.729.222-1.166.222-.45 0-.85-.086-1.202-.258a2.64 2.64 0 0 1-.89-.697 3.137 3.137 0 0 1-.586-1.072 4.248 4.248 0 0 1-.199-1.307v-.58c0-.687.088-1.342.263-1.963a3.95 3.95 0 0 1 .891-1.611 3.473 3.473 0 0 1 1.301-.891c.515-.207 1.105-.31 1.769-.31h.164Zm-1.529 4.06c-.168 0-.328.026-.48.076a1.668 1.668 0 0 0-.422.211c-.118.09-.223.194-.317.311a1.71 1.71 0 0 0-.234.393v.433c0 .34.037.639.111.897.078.257.184.472.317.644.132.172.287.303.463.393.175.09.363.134.562.134.219 0 .414-.042.586-.128.172-.09.318-.211.439-.364.121-.156.213-.34.276-.55.062-.215.094-.448.094-.698 0-.238-.032-.463-.094-.674a1.716 1.716 0 0 0-.264-.562 1.24 1.24 0 0 0-.439-.375 1.226 1.226 0 0 0-.598-.141Z"
              className="276"
            />
            <path
              d="M697.529 283h-5.724v-.973l2.777-3.023c.23-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.554-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.424 6.424 0 0 1-.557.744c-.21.25-.441.508-.691.774l-1.898 2.027h3.972V283Zm5.959-8.572v1.189h-.093c-.465 0-.87.065-1.213.194a2.368 2.368 0 0 0-1.418 1.341 3.507 3.507 0 0 0-.241 1.02c.094-.106.204-.207.329-.305.125-.101.263-.191.416-.269.144-.075.304-.133.48-.176.176-.047.361-.07.557-.07.414 0 .773.078 1.078.234.308.156.562.367.762.633.203.265.351.57.445.914.098.344.146.701.146 1.072 0 .406-.062.787-.187 1.143a2.673 2.673 0 0 1-.533.92c-.239.265-.53.474-.873.627-.34.148-.729.222-1.166.222-.45 0-.85-.086-1.202-.258a2.64 2.64 0 0 1-.89-.697 3.137 3.137 0 0 1-.586-1.072 4.248 4.248 0 0 1-.199-1.307v-.58c0-.687.088-1.342.263-1.963a3.95 3.95 0 0 1 .891-1.611 3.473 3.473 0 0 1 1.301-.891c.515-.207 1.105-.31 1.769-.31h.164Zm-1.529 4.06c-.168 0-.328.026-.48.076a1.668 1.668 0 0 0-.422.211c-.118.09-.223.194-.317.311a1.675 1.675 0 0 0-.234.393v.433c0 .34.037.639.111.897.078.257.184.472.317.644.132.172.287.303.462.393.176.09.364.134.563.134.219 0 .414-.042.586-.128.172-.09.318-.211.439-.364.121-.156.213-.34.276-.55.062-.215.094-.448.094-.698 0-.238-.032-.463-.094-.674a1.716 1.716 0 0 0-.264-.562 1.24 1.24 0 0 0-.439-.375 1.226 1.226 0 0 0-.598-.141Zm8.736-4.06v1.189h-.093c-.465 0-.87.065-1.213.194a2.382 2.382 0 0 0-1.418 1.341 3.507 3.507 0 0 0-.241 1.02c.094-.106.204-.207.329-.305.125-.101.263-.191.416-.269.144-.075.304-.133.48-.176.176-.047.361-.07.557-.07.414 0 .773.078 1.078.234.308.156.562.367.762.633.203.265.351.57.445.914.098.344.146.701.146 1.072 0 .406-.062.787-.187 1.143a2.673 2.673 0 0 1-.533.92c-.239.265-.53.474-.873.627-.34.148-.729.222-1.166.222-.45 0-.85-.086-1.202-.258a2.64 2.64 0 0 1-.89-.697 3.137 3.137 0 0 1-.586-1.072 4.248 4.248 0 0 1-.199-1.307v-.58c0-.687.088-1.342.263-1.963a3.95 3.95 0 0 1 .891-1.611 3.473 3.473 0 0 1 1.301-.891c.515-.207 1.105-.31 1.769-.31h.164Zm-1.529 4.06c-.168 0-.328.026-.48.076a1.668 1.668 0 0 0-.422.211c-.118.09-.223.194-.317.311a1.71 1.71 0 0 0-.234.393v.433c0 .34.037.639.111.897.078.257.184.472.317.644.132.172.287.303.463.393.175.09.363.134.562.134.219 0 .414-.042.586-.128.172-.09.318-.211.439-.364.121-.156.213-.34.276-.55.062-.215.094-.448.094-.698 0-.238-.032-.463-.094-.674a1.716 1.716 0 0 0-.264-.562 1.24 1.24 0 0 0-.439-.375 1.226 1.226 0 0 0-.598-.141Z"
              className="266"
            />
            <path
              d="M765.529 323h-5.724v-.973l2.777-3.023c.23-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.554-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.424 6.424 0 0 1-.557.744c-.21.25-.441.508-.691.774l-1.898 2.027h3.972V323Zm5.959-8.572v1.189h-.093c-.465 0-.87.065-1.213.194a2.368 2.368 0 0 0-1.418 1.341 3.507 3.507 0 0 0-.241 1.02c.094-.106.204-.207.329-.305.125-.101.263-.191.416-.269.144-.075.304-.133.48-.176.176-.047.361-.07.557-.07.414 0 .773.078 1.078.234.308.156.562.367.762.633.203.265.351.57.445.914.098.344.146.701.146 1.072 0 .406-.062.787-.187 1.143a2.673 2.673 0 0 1-.533.92c-.239.265-.53.474-.873.627-.34.148-.729.222-1.166.222-.45 0-.85-.086-1.202-.258a2.64 2.64 0 0 1-.89-.697 3.137 3.137 0 0 1-.586-1.072 4.248 4.248 0 0 1-.199-1.307v-.58c0-.687.088-1.342.263-1.963a3.95 3.95 0 0 1 .891-1.611 3.473 3.473 0 0 1 1.301-.891c.515-.207 1.105-.31 1.769-.31h.164Zm-1.529 4.06c-.168 0-.328.026-.48.076a1.668 1.668 0 0 0-.422.211c-.118.09-.223.194-.317.311a1.675 1.675 0 0 0-.234.393v.433c0 .34.037.639.111.897.078.257.184.472.317.644.132.172.287.303.462.393.176.09.364.134.563.134.219 0 .414-.042.586-.128.172-.09.318-.211.439-.364.121-.156.213-.34.276-.55.062-.215.094-.448.094-.698 0-.238-.032-.463-.094-.674a1.716 1.716 0 0 0-.264-.562 1.24 1.24 0 0 0-.439-.375 1.226 1.226 0 0 0-.598-.141Zm9.861-1.769c0 .258-.043.498-.129.72a1.92 1.92 0 0 1-.351.598 2.302 2.302 0 0 1-.322.317 2.269 2.269 0 0 1-.405.257c.176.082.338.178.487.287.152.106.285.229.398.37a2.134 2.134 0 0 1 .51 1.412c0 .394-.072.744-.217 1.049a2.165 2.165 0 0 1-.592.761 2.621 2.621 0 0 1-.89.469 3.64 3.64 0 0 1-1.09.158c-.399 0-.77-.053-1.114-.158a2.556 2.556 0 0 1-.884-.469 2.144 2.144 0 0 1-.598-.756 2.482 2.482 0 0 1-.211-1.054c0-.235.031-.457.094-.668.066-.211.16-.407.281-.586.121-.172.266-.326.434-.463a2.68 2.68 0 0 1 .574-.358 2.293 2.293 0 0 1-.492-.328 2.093 2.093 0 0 1-.615-.955 2.031 2.031 0 0 1-.088-.603c0-.379.064-.715.193-1.008.133-.293.314-.541.545-.744.226-.203.498-.356.814-.457.321-.106.67-.158 1.049-.158.375 0 .721.052 1.037.158.321.101.6.254.838.457.231.199.412.447.545.744.133.293.199.629.199 1.008Zm-1.213 3.885c0-.211-.035-.403-.105-.575a1.365 1.365 0 0 0-.281-.457 1.307 1.307 0 0 0-.446-.281 1.568 1.568 0 0 0-.568-.1c-.215 0-.408.034-.58.1-.168.066-.313.16-.434.281a1.382 1.382 0 0 0-.281.457 1.704 1.704 0 0 0-.094.58c0 .219.034.416.1.592.066.172.162.317.287.434.121.113.266.201.434.263.172.059.365.088.58.088.203 0 .388-.031.556-.093.172-.063.321-.153.446-.27.117-.121.211-.266.281-.434.07-.171.105-.367.105-.585Zm-.181-3.833a1.38 1.38 0 0 0-.094-.521 1.291 1.291 0 0 0-.246-.41 1.188 1.188 0 0 0-.387-.258 1.294 1.294 0 0 0-.504-.094c-.183 0-.349.032-.498.094a1.097 1.097 0 0 0-.375.252 1.123 1.123 0 0 0-.234.404c-.055.16-.082.338-.082.533 0 .192.027.368.082.528.055.156.137.289.246.398.105.114.232.201.381.264.148.062.314.094.498.094.183 0 .349-.032.498-.094a1.154 1.154 0 0 0 .627-.662 1.54 1.54 0 0 0 .088-.528Z"
              className="268"
            />
            <path
              d="M806.529 273h-5.724v-.973l2.777-3.023c.23-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.554-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.424 6.424 0 0 1-.557.744c-.21.25-.441.508-.691.774l-1.898 2.027h3.972V273Zm5.959-8.572v1.189h-.093c-.465 0-.87.065-1.213.194a2.368 2.368 0 0 0-1.418 1.341 3.507 3.507 0 0 0-.241 1.02c.094-.106.204-.207.329-.305.125-.101.263-.191.416-.269.144-.075.304-.133.48-.176.176-.047.361-.07.557-.07.414 0 .773.078 1.078.234.308.156.562.367.762.633.203.265.351.57.445.914.098.344.146.701.146 1.072 0 .406-.062.787-.187 1.143a2.673 2.673 0 0 1-.533.92c-.239.265-.53.474-.873.627-.34.148-.729.222-1.166.222-.45 0-.85-.086-1.202-.258a2.64 2.64 0 0 1-.89-.697 3.137 3.137 0 0 1-.586-1.072 4.248 4.248 0 0 1-.199-1.307v-.58c0-.687.088-1.342.263-1.963a3.95 3.95 0 0 1 .891-1.611 3.473 3.473 0 0 1 1.301-.891c.515-.207 1.105-.31 1.769-.31h.164Zm-1.529 4.06c-.168 0-.328.026-.48.076a1.668 1.668 0 0 0-.422.211c-.118.09-.223.194-.317.311a1.675 1.675 0 0 0-.234.393v.433c0 .34.037.639.111.897.078.257.184.472.317.644.132.172.287.303.462.393.176.09.364.134.563.134.219 0 .414-.042.586-.128.172-.09.318-.211.439-.364.121-.156.213-.34.276-.55.062-.215.094-.448.094-.698 0-.238-.032-.463-.094-.674a1.716 1.716 0 0 0-.264-.562 1.24 1.24 0 0 0-.439-.375 1.226 1.226 0 0 0-.598-.141Zm10.055-3.234-3.41 7.746h-1.477l3.41-7.359h-4.424v-1.172h5.901v.785Z"
              className="267"
            />
            <path
              d="M868.58 291.102h.838c.25 0 .469-.034.656-.1a1.23 1.23 0 0 0 .463-.293c.113-.109.199-.244.258-.404.062-.164.094-.34.094-.528 0-.203-.03-.384-.088-.545a1.102 1.102 0 0 0-.246-.41 1.138 1.138 0 0 0-.416-.246 1.704 1.704 0 0 0-.569-.088c-.191 0-.369.03-.533.088a1.198 1.198 0 0 0-.703.621c-.066.149-.1.315-.1.498h-1.4c0-.34.068-.652.205-.937a2.3 2.3 0 0 1 .568-.744c.243-.207.528-.369.856-.487a3.258 3.258 0 0 1 1.09-.175c.402 0 .771.052 1.107.158.34.101.629.254.867.457a2.1 2.1 0 0 1 .563.762c.133.3.199.65.199 1.048 0 .176-.027.352-.082.528a1.96 1.96 0 0 1-.234.509 2.264 2.264 0 0 1-.961.809c.254.086.468.199.644.34.18.137.326.291.44.463.113.176.195.365.246.568.051.199.076.406.076.621 0 .399-.074.754-.223 1.067a2.222 2.222 0 0 1-.597.779 2.706 2.706 0 0 1-.914.492 3.766 3.766 0 0 1-1.131.164c-.367 0-.721-.051-1.061-.152a2.673 2.673 0 0 1-.896-.457 2.308 2.308 0 0 1-.621-.75 2.286 2.286 0 0 1-.229-1.049h1.4c0 .187.034.361.1.521.07.157.17.29.299.399.125.113.273.201.445.264.176.062.369.093.58.093.227 0 .43-.029.61-.088.183-.062.338-.154.463-.275a1.09 1.09 0 0 0 .275-.422c.066-.172.1-.367.1-.586 0-.246-.038-.457-.112-.633a1.135 1.135 0 0 0-.322-.439 1.401 1.401 0 0 0-.51-.252 2.264 2.264 0 0 0-.656-.088h-.838v-1.101Zm9.516 4.898h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V296Zm8.918-7.746-3.41 7.746h-1.477l3.41-7.359h-4.424v-1.172h5.901v.785Z"
              className="317"
            />
            <path
              d="M869.58 329.102h.838c.25 0 .469-.034.656-.1a1.23 1.23 0 0 0 .463-.293c.113-.109.199-.244.258-.404.062-.164.094-.34.094-.528 0-.203-.03-.384-.088-.545a1.102 1.102 0 0 0-.246-.41 1.138 1.138 0 0 0-.416-.246 1.704 1.704 0 0 0-.569-.088c-.191 0-.369.03-.533.088a1.198 1.198 0 0 0-.703.621c-.066.149-.1.315-.1.498h-1.4c0-.34.068-.652.205-.937a2.3 2.3 0 0 1 .568-.744c.243-.207.528-.369.856-.487a3.258 3.258 0 0 1 1.09-.175c.402 0 .771.052 1.107.158.34.101.629.254.867.457a2.1 2.1 0 0 1 .563.762c.133.3.199.65.199 1.048 0 .176-.027.352-.082.528a1.96 1.96 0 0 1-.234.509 2.264 2.264 0 0 1-.961.809c.254.086.468.199.644.34.18.137.326.291.44.463.113.176.195.365.246.568.051.199.076.406.076.621 0 .399-.074.754-.223 1.067a2.222 2.222 0 0 1-.597.779 2.706 2.706 0 0 1-.914.492 3.766 3.766 0 0 1-1.131.164c-.367 0-.721-.051-1.061-.152a2.673 2.673 0 0 1-.896-.457 2.308 2.308 0 0 1-.621-.75 2.286 2.286 0 0 1-.229-1.049h1.4c0 .187.034.361.1.521.07.157.17.29.299.399.125.113.273.201.445.264.176.062.369.093.58.093.227 0 .43-.029.61-.088.183-.062.338-.154.463-.275a1.09 1.09 0 0 0 .275-.422c.066-.172.1-.367.1-.586 0-.246-.038-.457-.112-.633a1.135 1.135 0 0 0-.322-.439 1.401 1.401 0 0 0-.51-.252 2.264 2.264 0 0 0-.656-.088h-.838v-1.101Zm9.516 4.898h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V334Zm7.599-8.572v1.189h-.093c-.465 0-.87.065-1.213.194a2.382 2.382 0 0 0-1.418 1.341 3.507 3.507 0 0 0-.241 1.02c.094-.106.204-.207.329-.305.125-.101.263-.191.416-.269.144-.075.304-.133.48-.176.176-.047.361-.07.557-.07.414 0 .773.078 1.078.234.308.156.562.367.762.633.203.265.351.57.445.914.098.344.146.701.146 1.072 0 .406-.062.787-.187 1.143a2.673 2.673 0 0 1-.533.92c-.239.265-.53.474-.873.627-.34.148-.729.222-1.166.222-.45 0-.85-.086-1.202-.258a2.64 2.64 0 0 1-.89-.697 3.137 3.137 0 0 1-.586-1.072 4.248 4.248 0 0 1-.199-1.307v-.58c0-.687.088-1.342.263-1.963a3.95 3.95 0 0 1 .891-1.611 3.473 3.473 0 0 1 1.301-.891c.515-.207 1.105-.31 1.769-.31h.164Zm-1.529 4.06c-.168 0-.328.026-.48.076a1.668 1.668 0 0 0-.422.211c-.118.09-.223.194-.317.311a1.71 1.71 0 0 0-.234.393v.433c0 .34.037.639.111.897.078.257.184.472.317.644.132.172.287.303.463.393.175.09.363.134.562.134.219 0 .414-.042.586-.128.172-.09.318-.211.439-.364.121-.156.213-.34.276-.55.062-.215.094-.448.094-.698 0-.238-.032-.463-.094-.674a1.716 1.716 0 0 0-.264-.562 1.24 1.24 0 0 0-.439-.375 1.226 1.226 0 0 0-.598-.141Z"
              className="316"
            />
            <path
              d="M868.58 367.102h.838c.25 0 .469-.034.656-.1a1.23 1.23 0 0 0 .463-.293c.113-.109.199-.244.258-.404.062-.164.094-.34.094-.528 0-.203-.03-.384-.088-.545a1.102 1.102 0 0 0-.246-.41 1.138 1.138 0 0 0-.416-.246 1.704 1.704 0 0 0-.569-.088c-.191 0-.369.03-.533.088a1.198 1.198 0 0 0-.703.621c-.066.149-.1.315-.1.498h-1.4c0-.34.068-.652.205-.937a2.3 2.3 0 0 1 .568-.744c.243-.207.528-.369.856-.487a3.258 3.258 0 0 1 1.09-.175c.402 0 .771.052 1.107.158.34.101.629.254.867.457a2.1 2.1 0 0 1 .563.762c.133.3.199.65.199 1.048 0 .176-.027.352-.082.528a1.96 1.96 0 0 1-.234.509 2.264 2.264 0 0 1-.961.809c.254.086.468.199.644.34.18.137.326.291.44.463.113.176.195.365.246.568.051.199.076.406.076.621 0 .399-.074.754-.223 1.067a2.222 2.222 0 0 1-.597.779 2.706 2.706 0 0 1-.914.492 3.766 3.766 0 0 1-1.131.164c-.367 0-.721-.051-1.061-.152a2.673 2.673 0 0 1-.896-.457 2.308 2.308 0 0 1-.621-.75 2.286 2.286 0 0 1-.229-1.049h1.4c0 .187.034.361.1.521.07.157.17.29.299.399.125.113.273.201.445.264.176.062.369.093.58.093.227 0 .43-.029.61-.088.183-.062.338-.154.463-.275a1.09 1.09 0 0 0 .275-.422c.066-.172.1-.367.1-.586 0-.246-.038-.457-.112-.633a1.135 1.135 0 0 0-.322-.439 1.401 1.401 0 0 0-.51-.252 2.264 2.264 0 0 0-.656-.088h-.838v-1.101Zm9.516 4.898h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V372Zm3.627-4.23.457-4.301h4.588v1.242h-3.422l-.223 2.045c.141-.082.324-.16.551-.235.23-.074.494-.111.791-.111.402 0 .762.067 1.078.199.32.133.592.323.814.569.219.25.387.552.504.908.118.352.176.748.176 1.189 0 .391-.057.76-.17 1.108a2.437 2.437 0 0 1-.51.902 2.356 2.356 0 0 1-.861.61c-.348.148-.758.222-1.23.222-.36 0-.704-.051-1.032-.152a2.663 2.663 0 0 1-.873-.469 2.463 2.463 0 0 1-.627-.756 2.545 2.545 0 0 1-.275-1.049h1.365c.051.418.203.739.457.961.258.223.586.334.985.334.234 0 .437-.043.609-.129.172-.086.316-.207.434-.363a1.63 1.63 0 0 0 .246-.551c.054-.218.082-.455.082-.709 0-.246-.033-.47-.1-.673a1.49 1.49 0 0 0-.287-.54 1.283 1.283 0 0 0-.48-.351 1.621 1.621 0 0 0-.668-.129c-.168 0-.315.014-.44.041a1.46 1.46 0 0 0-.592.27 2.535 2.535 0 0 0-.228.193l-1.119-.275Z"
              className="315"
            />
            <path
              d="M869.58 416.102h.838c.25 0 .469-.034.656-.1a1.23 1.23 0 0 0 .463-.293c.113-.109.199-.244.258-.404.062-.164.094-.34.094-.528 0-.203-.03-.384-.088-.545a1.102 1.102 0 0 0-.246-.41 1.138 1.138 0 0 0-.416-.246 1.704 1.704 0 0 0-.569-.088c-.191 0-.369.03-.533.088a1.198 1.198 0 0 0-.703.621c-.066.149-.1.315-.1.498h-1.4c0-.34.068-.652.205-.937a2.3 2.3 0 0 1 .568-.744c.243-.207.528-.369.856-.487a3.258 3.258 0 0 1 1.09-.175c.402 0 .771.052 1.107.158.34.101.629.254.867.457a2.1 2.1 0 0 1 .563.762c.133.3.199.65.199 1.048 0 .176-.027.352-.082.528a1.96 1.96 0 0 1-.234.509 2.264 2.264 0 0 1-.961.809c.254.086.468.199.644.34.18.137.326.291.44.463.113.176.195.365.246.568.051.199.076.406.076.621 0 .399-.074.754-.223 1.067a2.222 2.222 0 0 1-.597.779 2.706 2.706 0 0 1-.914.492 3.766 3.766 0 0 1-1.131.164c-.367 0-.721-.051-1.061-.152a2.673 2.673 0 0 1-.896-.457 2.308 2.308 0 0 1-.621-.75 2.286 2.286 0 0 1-.229-1.049h1.4c0 .187.034.361.1.521.07.157.17.29.299.399.125.113.273.201.445.264.176.062.369.093.58.093.227 0 .43-.029.61-.088.183-.062.338-.154.463-.275a1.09 1.09 0 0 0 .275-.422c.066-.172.1-.367.1-.586 0-.246-.038-.457-.112-.633a1.135 1.135 0 0 0-.322-.439 1.401 1.401 0 0 0-.51-.252 2.264 2.264 0 0 0-.656-.088h-.838v-1.101Zm9.516 4.898h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V421Zm8.724-6.281c0 .258-.043.498-.129.72a1.92 1.92 0 0 1-.351.598 2.302 2.302 0 0 1-.322.317 2.269 2.269 0 0 1-.405.257c.176.082.338.178.487.287.152.106.285.229.398.37a2.134 2.134 0 0 1 .51 1.412c0 .394-.072.744-.217 1.049a2.165 2.165 0 0 1-.592.761 2.621 2.621 0 0 1-.89.469 3.64 3.64 0 0 1-1.09.158c-.399 0-.77-.053-1.114-.158a2.556 2.556 0 0 1-.884-.469 2.144 2.144 0 0 1-.598-.756 2.482 2.482 0 0 1-.211-1.054c0-.235.031-.457.094-.668.066-.211.16-.407.281-.586.121-.172.266-.326.434-.463a2.68 2.68 0 0 1 .574-.358 2.293 2.293 0 0 1-.492-.328 2.093 2.093 0 0 1-.615-.955 2.031 2.031 0 0 1-.088-.603c0-.379.064-.715.193-1.008.133-.293.314-.541.545-.744.226-.203.498-.356.814-.457.321-.106.67-.158 1.049-.158.375 0 .721.052 1.037.158.321.101.6.254.838.457.231.199.412.447.545.744.133.293.199.629.199 1.008Zm-1.213 3.885c0-.211-.035-.403-.105-.575a1.365 1.365 0 0 0-.281-.457 1.307 1.307 0 0 0-.446-.281 1.568 1.568 0 0 0-.568-.1c-.215 0-.408.034-.58.1-.168.066-.313.16-.434.281a1.382 1.382 0 0 0-.281.457 1.704 1.704 0 0 0-.094.58c0 .219.034.416.1.592.066.172.162.317.287.434.121.113.266.201.434.263.172.059.365.088.58.088.203 0 .388-.031.556-.093.172-.063.321-.153.446-.27.117-.121.211-.266.281-.434.07-.171.105-.367.105-.585Zm-.181-3.833a1.38 1.38 0 0 0-.094-.521 1.291 1.291 0 0 0-.246-.41 1.188 1.188 0 0 0-.387-.258 1.294 1.294 0 0 0-.504-.094c-.183 0-.349.032-.498.094a1.097 1.097 0 0 0-.375.252 1.123 1.123 0 0 0-.234.404c-.055.16-.082.338-.082.533 0 .192.027.368.082.528.055.156.137.289.246.398.105.114.232.201.381.264.148.062.314.094.498.094.183 0 .349-.032.498-.094a1.154 1.154 0 0 0 .627-.662 1.54 1.54 0 0 0 .088-.528Z"
              className="318"
            />
            <path
              d="M812.529 404h-5.724v-.973l2.777-3.023c.23-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.554-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.424 6.424 0 0 1-.557.744c-.21.25-.441.508-.691.774l-1.898 2.027h3.972V404Zm5.959-8.572v1.189h-.093c-.465 0-.87.065-1.213.194a2.368 2.368 0 0 0-1.418 1.341 3.507 3.507 0 0 0-.241 1.02c.094-.106.204-.207.329-.305.125-.101.263-.191.416-.269.144-.075.304-.133.48-.176.176-.047.361-.07.557-.07.414 0 .773.078 1.078.234.308.156.562.367.762.633.203.265.351.57.445.914.098.344.146.701.146 1.072 0 .406-.062.787-.187 1.143a2.673 2.673 0 0 1-.533.92c-.239.265-.53.474-.873.627-.34.148-.729.222-1.166.222-.45 0-.85-.086-1.202-.258a2.64 2.64 0 0 1-.89-.697 3.137 3.137 0 0 1-.586-1.072 4.248 4.248 0 0 1-.199-1.307v-.58c0-.687.088-1.342.263-1.963a3.95 3.95 0 0 1 .891-1.611 3.473 3.473 0 0 1 1.301-.891c.515-.207 1.105-.31 1.769-.31h.164Zm-1.529 4.06c-.168 0-.328.026-.48.076a1.668 1.668 0 0 0-.422.211c-.118.09-.223.194-.317.311a1.675 1.675 0 0 0-.234.393v.433c0 .34.037.639.111.897.078.257.184.472.317.644.132.172.287.303.462.393.176.09.364.134.563.134.219 0 .414-.042.586-.128.172-.09.318-.211.439-.364.121-.156.213-.34.276-.55.062-.215.094-.448.094-.698 0-.238-.032-.463-.094-.674a1.716 1.716 0 0 0-.264-.562 1.24 1.24 0 0 0-.439-.375 1.226 1.226 0 0 0-.598-.141Zm5.689 3.358c.485 0 .897-.055 1.237-.164.34-.11.619-.266.838-.469.234-.223.406-.477.515-.762.11-.289.18-.599.211-.931v-.03a1.989 1.989 0 0 1-.662.492c-.141.067-.297.12-.469.159a2.46 2.46 0 0 1-.556.058c-.414 0-.776-.078-1.084-.234a2.24 2.24 0 0 1-.762-.627 2.738 2.738 0 0 1-.463-.914 3.827 3.827 0 0 1-.152-1.084c0-.41.06-.795.181-1.154a2.91 2.91 0 0 1 .539-.956 2.53 2.53 0 0 1 .862-.638c.344-.16.734-.24 1.172-.24.441 0 .832.084 1.172.252.343.167.634.396.873.685.25.313.439.691.568 1.137.129.441.193.906.193 1.394v.492a7.72 7.72 0 0 1-.234 1.922 3.89 3.89 0 0 1-.826 1.6c-.321.375-.742.67-1.266.885-.519.215-1.146.322-1.881.322h-.117v-1.195h.111Zm1.413-2.754a1.4 1.4 0 0 0 .867-.293c.121-.09.226-.195.316-.317a1.79 1.79 0 0 0 .229-.404v-.486c0-.34-.039-.641-.118-.903a2.13 2.13 0 0 0-.298-.656 1.317 1.317 0 0 0-.452-.398 1.126 1.126 0 0 0-.55-.141c-.219 0-.414.049-.586.147a1.235 1.235 0 0 0-.422.386 1.87 1.87 0 0 0-.27.58 2.759 2.759 0 0 0-.006 1.366c.055.215.141.406.258.574.114.164.254.297.422.398.172.098.375.147.61.147Z"
              className="269"
            />
            <path
              d="M622.58 258.102h.838c.25 0 .469-.034.656-.1a1.23 1.23 0 0 0 .463-.293c.113-.109.199-.244.258-.404.062-.164.094-.34.094-.528 0-.203-.03-.384-.088-.545a1.102 1.102 0 0 0-.246-.41 1.138 1.138 0 0 0-.416-.246 1.704 1.704 0 0 0-.569-.088c-.191 0-.369.03-.533.088a1.198 1.198 0 0 0-.703.621c-.066.149-.1.315-.1.498h-1.4c0-.34.068-.652.205-.937a2.3 2.3 0 0 1 .568-.744c.243-.207.528-.369.856-.487a3.258 3.258 0 0 1 1.09-.175c.402 0 .771.052 1.107.158.34.101.629.254.867.457a2.1 2.1 0 0 1 .563.762c.133.3.199.65.199 1.048 0 .176-.027.352-.082.528a1.96 1.96 0 0 1-.234.509 2.264 2.264 0 0 1-.961.809c.254.086.468.199.644.34.18.137.326.291.44.463.113.176.195.365.246.568.051.199.076.406.076.621 0 .399-.074.754-.223 1.067a2.222 2.222 0 0 1-.597.779 2.706 2.706 0 0 1-.914.492 3.766 3.766 0 0 1-1.131.164c-.367 0-.721-.051-1.061-.152a2.673 2.673 0 0 1-.896-.457 2.308 2.308 0 0 1-.621-.75 2.286 2.286 0 0 1-.229-1.049h1.4c0 .187.034.361.1.521.07.157.17.29.299.399.125.113.273.201.445.264.176.062.369.093.58.093.227 0 .43-.029.61-.088.183-.062.338-.154.463-.275a1.09 1.09 0 0 0 .275-.422c.066-.172.1-.367.1-.586 0-.246-.038-.457-.112-.633a1.135 1.135 0 0 0-.322-.439 1.401 1.401 0 0 0-.51-.252 2.264 2.264 0 0 0-.656-.088h-.838v-1.101Zm9.516 4.898h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V263Zm4.898-4.898h.838c.25 0 .469-.034.656-.1a1.23 1.23 0 0 0 .463-.293c.113-.109.199-.244.258-.404.062-.164.094-.34.094-.528 0-.203-.03-.384-.088-.545a1.102 1.102 0 0 0-.246-.41 1.138 1.138 0 0 0-.416-.246 1.704 1.704 0 0 0-.569-.088c-.191 0-.369.03-.533.088a1.198 1.198 0 0 0-.703.621c-.066.149-.1.315-.1.498h-1.4c0-.34.068-.652.205-.937a2.3 2.3 0 0 1 .568-.744c.243-.207.528-.369.856-.487a3.258 3.258 0 0 1 1.09-.175c.402 0 .771.052 1.107.158.34.101.629.254.867.457a2.1 2.1 0 0 1 .563.762c.133.3.199.65.199 1.048 0 .176-.027.352-.082.528a1.96 1.96 0 0 1-.234.509 2.264 2.264 0 0 1-.961.809c.254.086.469.199.644.34.18.137.326.291.44.463.113.176.195.365.246.568.051.199.076.406.076.621 0 .399-.074.754-.223 1.067a2.222 2.222 0 0 1-.597.779 2.706 2.706 0 0 1-.914.492 3.766 3.766 0 0 1-1.131.164c-.367 0-.721-.051-1.061-.152a2.673 2.673 0 0 1-.896-.457 2.308 2.308 0 0 1-.621-.75 2.286 2.286 0 0 1-.229-1.049h1.401c0 .187.033.361.099.521.07.157.17.29.299.399.125.113.273.201.445.264.176.062.369.093.58.093.227 0 .43-.029.61-.088.183-.062.338-.154.463-.275.121-.113.213-.254.275-.422.066-.172.1-.367.1-.586a1.61 1.61 0 0 0-.112-.633 1.135 1.135 0 0 0-.322-.439 1.393 1.393 0 0 0-.51-.252 2.264 2.264 0 0 0-.656-.088h-.838v-1.101Z"
              className="313"
            />
            <path
              d="M477.529 277h-5.724v-.973l2.777-3.023c.23-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.554-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.424 6.424 0 0 1-.557.744c-.21.25-.441.508-.691.774l-1.898 2.027h3.972V277Zm3.258-4.898h.838c.25 0 .469-.034.656-.1a1.23 1.23 0 0 0 .463-.293c.113-.109.199-.244.258-.404.062-.164.094-.34.094-.528 0-.203-.03-.384-.088-.545a1.102 1.102 0 0 0-.246-.41 1.138 1.138 0 0 0-.416-.246 1.704 1.704 0 0 0-.569-.088c-.191 0-.369.03-.533.088a1.198 1.198 0 0 0-.703.621c-.066.149-.1.315-.1.498h-1.4c0-.34.068-.652.205-.937a2.3 2.3 0 0 1 .568-.744c.243-.207.528-.369.856-.487a3.258 3.258 0 0 1 1.09-.175c.402 0 .771.052 1.107.158.34.101.629.254.867.457a2.1 2.1 0 0 1 .563.762c.133.3.199.65.199 1.048 0 .176-.027.352-.082.528a1.96 1.96 0 0 1-.234.509 2.264 2.264 0 0 1-.961.809c.254.086.469.199.644.34.18.137.326.291.44.463.113.176.195.365.246.568.051.199.076.406.076.621 0 .399-.074.754-.223 1.067a2.222 2.222 0 0 1-.597.779 2.706 2.706 0 0 1-.914.492 3.766 3.766 0 0 1-1.131.164c-.367 0-.721-.051-1.061-.152a2.673 2.673 0 0 1-.896-.457 2.308 2.308 0 0 1-.621-.75 2.286 2.286 0 0 1-.229-1.049h1.401c0 .187.033.361.099.521.07.157.17.29.299.399.125.113.273.201.445.264.176.062.369.093.58.093.227 0 .43-.029.61-.088.183-.062.338-.154.463-.275a1.09 1.09 0 0 0 .275-.422c.066-.172.1-.367.1-.586a1.61 1.61 0 0 0-.112-.633 1.135 1.135 0 0 0-.322-.439 1.401 1.401 0 0 0-.51-.252 2.264 2.264 0 0 0-.656-.088h-.838v-1.101Zm5.936.668.457-4.301h4.588v1.242h-3.422l-.223 2.045c.141-.082.324-.16.551-.235.23-.074.494-.111.791-.111.402 0 .762.067 1.078.199.32.133.592.323.814.569.219.25.387.552.504.908.118.352.176.748.176 1.189 0 .391-.057.76-.17 1.108a2.437 2.437 0 0 1-.51.902 2.356 2.356 0 0 1-.861.61c-.348.148-.758.222-1.23.222-.36 0-.704-.051-1.032-.152a2.663 2.663 0 0 1-.873-.469 2.463 2.463 0 0 1-.627-.756 2.545 2.545 0 0 1-.275-1.049h1.365c.051.418.203.739.457.961.258.223.586.334.985.334.234 0 .437-.043.609-.129.172-.086.316-.207.434-.363a1.63 1.63 0 0 0 .246-.551c.054-.218.082-.455.082-.709 0-.246-.033-.47-.1-.673a1.49 1.49 0 0 0-.287-.54 1.283 1.283 0 0 0-.48-.351 1.621 1.621 0 0 0-.668-.129c-.168 0-.315.014-.44.041a1.46 1.46 0 0 0-.592.27 2.535 2.535 0 0 0-.228.193l-1.119-.275Z"
              className="235"
            />
            <path
              d="M459.529 245h-5.724v-.973l2.777-3.023c.23-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.554-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.424 6.424 0 0 1-.557.744c-.21.25-.441.508-.691.774l-1.898 2.027h3.972V245Zm3.258-4.898h.838c.25 0 .469-.034.656-.1a1.23 1.23 0 0 0 .463-.293c.113-.109.199-.244.258-.404.062-.164.094-.34.094-.528 0-.203-.03-.384-.088-.545a1.102 1.102 0 0 0-.246-.41 1.138 1.138 0 0 0-.416-.246 1.704 1.704 0 0 0-.569-.088c-.191 0-.369.03-.533.088a1.198 1.198 0 0 0-.703.621c-.066.149-.1.315-.1.498h-1.4c0-.34.068-.652.205-.937a2.3 2.3 0 0 1 .568-.744c.243-.207.528-.369.856-.487a3.258 3.258 0 0 1 1.09-.175c.402 0 .771.052 1.107.158.34.101.629.254.867.457a2.1 2.1 0 0 1 .563.762c.133.3.199.65.199 1.048 0 .176-.027.352-.082.528a1.96 1.96 0 0 1-.234.509 2.264 2.264 0 0 1-.961.809c.254.086.469.199.644.34.18.137.326.291.44.463.113.176.195.365.246.568.051.199.076.406.076.621 0 .399-.074.754-.223 1.067a2.222 2.222 0 0 1-.597.779 2.706 2.706 0 0 1-.914.492 3.766 3.766 0 0 1-1.131.164c-.367 0-.721-.051-1.061-.152a2.673 2.673 0 0 1-.896-.457 2.308 2.308 0 0 1-.621-.75 2.286 2.286 0 0 1-.229-1.049h1.401c0 .187.033.361.099.521.07.157.17.29.299.399.125.113.273.201.445.264.176.062.369.093.58.093.227 0 .43-.029.61-.088.183-.062.338-.154.463-.275a1.09 1.09 0 0 0 .275-.422c.066-.172.1-.367.1-.586a1.61 1.61 0 0 0-.112-.633 1.135 1.135 0 0 0-.322-.439 1.401 1.401 0 0 0-.51-.252 2.264 2.264 0 0 0-.656-.088h-.838v-1.101Zm9.908-3.674v1.189h-.093c-.465 0-.87.065-1.213.194a2.382 2.382 0 0 0-1.418 1.341 3.507 3.507 0 0 0-.241 1.02c.094-.106.204-.207.329-.305.125-.101.263-.191.416-.269.144-.075.304-.133.48-.176.176-.047.361-.07.557-.07.414 0 .773.078 1.078.234.308.156.562.367.762.633.203.265.351.57.445.914.098.344.146.701.146 1.072 0 .406-.062.787-.187 1.143a2.673 2.673 0 0 1-.533.92c-.239.265-.53.474-.873.627-.34.148-.729.222-1.166.222-.45 0-.85-.086-1.202-.258a2.64 2.64 0 0 1-.89-.697 3.137 3.137 0 0 1-.586-1.072 4.248 4.248 0 0 1-.199-1.307v-.58c0-.687.088-1.342.263-1.963a3.95 3.95 0 0 1 .891-1.611 3.473 3.473 0 0 1 1.301-.891c.515-.207 1.105-.31 1.769-.31h.164Zm-1.529 4.06c-.168 0-.328.026-.48.076a1.668 1.668 0 0 0-.422.211c-.118.09-.223.194-.317.311a1.71 1.71 0 0 0-.234.393v.433c0 .34.037.639.111.897.078.257.184.472.317.644.132.172.287.303.463.393.175.09.363.134.562.134.219 0 .414-.042.586-.128.172-.09.318-.211.439-.364.121-.156.213-.34.276-.55.062-.215.094-.448.094-.698 0-.238-.032-.463-.094-.674a1.716 1.716 0 0 0-.264-.562 1.24 1.24 0 0 0-.439-.375 1.226 1.226 0 0 0-.598-.141Z"
              className="236"
            />
            <path
              d="M397.385 168.428v1.189h-.094c-.465 0-.869.065-1.213.194a2.384 2.384 0 0 0-1.418 1.341 3.474 3.474 0 0 0-.24 1.02c.094-.106.203-.207.328-.305.125-.101.264-.191.416-.269.145-.075.305-.133.481-.176a2.14 2.14 0 0 1 .556-.07c.414 0 .774.078 1.078.234.309.156.563.367.762.633.203.265.352.57.445.914.098.344.147.701.147 1.072 0 .406-.063.787-.188 1.143a2.673 2.673 0 0 1-.533.92 2.548 2.548 0 0 1-.873.627c-.34.148-.728.222-1.166.222-.449 0-.85-.086-1.201-.258a2.634 2.634 0 0 1-.891-.697 3.137 3.137 0 0 1-.586-1.072 4.248 4.248 0 0 1-.199-1.307v-.58c0-.687.088-1.342.264-1.963a3.936 3.936 0 0 1 .89-1.611 3.489 3.489 0 0 1 1.301-.891c.516-.207 1.106-.31 1.77-.31h.164Zm-1.53 4.06c-.167 0-.328.026-.48.076a1.684 1.684 0 0 0-.422.211c-.117.09-.223.194-.316.311a1.713 1.713 0 0 0-.235.393v.433c0 .34.037.639.112.897.078.257.183.472.316.644.133.172.287.303.463.393.176.09.363.134.562.134.219 0 .415-.042.586-.128.172-.09.319-.211.44-.364.121-.156.213-.34.275-.55.063-.215.094-.448.094-.698 0-.238-.031-.463-.094-.674a1.694 1.694 0 0 0-.263-.562 1.243 1.243 0 0 0-.44-.375 1.226 1.226 0 0 0-.598-.141Zm10.026 1.26c0 .547-.065 1.031-.193 1.453a2.89 2.89 0 0 1-.545 1.049 2.248 2.248 0 0 1-.868.656 2.926 2.926 0 0 1-1.16.217c-.429 0-.816-.072-1.16-.217a2.286 2.286 0 0 1-.873-.656 2.892 2.892 0 0 1-.557-1.049 5.123 5.123 0 0 1-.187-1.453v-2.021c0-.547.062-1.03.187-1.448.129-.422.313-.777.551-1.066.238-.285.528-.5.867-.645a2.91 2.91 0 0 1 1.161-.222c.433 0 .82.074 1.16.222.343.145.636.36.879.645.234.289.416.644.545 1.066.128.418.193.901.193 1.448v2.021Zm-4.137-.498 2.713-2.057a3.226 3.226 0 0 0-.129-.791 1.419 1.419 0 0 0-.287-.545 1.024 1.024 0 0 0-.404-.281 1.439 1.439 0 0 0-.533-.094c-.215 0-.405.038-.569.112a1.04 1.04 0 0 0-.41.328 1.627 1.627 0 0 0-.287.639 3.881 3.881 0 0 0-.094.914v1.775Zm2.725.732v-1.711l-2.713 2.045c.019.27.06.508.123.715.066.207.154.379.264.516.109.148.244.26.404.334.164.074.353.111.568.111.211 0 .397-.035.557-.105.16-.075.297-.182.41-.323.129-.164.225-.378.287-.644.067-.266.1-.578.1-.938Z"
              className="60"
            />
            <path
              d="m347.412 182.77.457-4.301h4.588v1.242h-3.422l-.223 2.045c.141-.082.325-.16.551-.235.231-.074.494-.111.791-.111.403 0 .762.067 1.078.199.321.133.592.323.815.569.219.25.387.552.504.908.117.352.176.748.176 1.189 0 .391-.057.76-.17 1.108-.11.344-.28.644-.51.902a2.373 2.373 0 0 1-.861.61c-.348.148-.758.222-1.231.222-.359 0-.703-.051-1.031-.152a2.663 2.663 0 0 1-.873-.469 2.463 2.463 0 0 1-.627-.756 2.561 2.561 0 0 1-.276-1.049h1.366c.05.418.203.739.457.961.258.223.586.334.984.334.234 0 .438-.043.609-.129.172-.086.317-.207.434-.363a1.63 1.63 0 0 0 .246-.551c.055-.218.082-.455.082-.709 0-.246-.033-.47-.099-.673a1.508 1.508 0 0 0-.288-.54 1.275 1.275 0 0 0-.48-.351 1.615 1.615 0 0 0-.668-.129c-.168 0-.314.014-.439.041a1.61 1.61 0 0 0-.323.106 1.486 1.486 0 0 0-.269.164 2.545 2.545 0 0 0-.229.193l-1.119-.275Zm12.305-2.051c0 .258-.043.498-.129.72a1.904 1.904 0 0 1-.352.598 2.249 2.249 0 0 1-.726.574c.176.082.338.178.486.287.152.106.285.229.399.37a2.134 2.134 0 0 1 .509 1.412c0 .394-.072.744-.216 1.049a2.165 2.165 0 0 1-.592.761 2.617 2.617 0 0 1-.891.469 3.635 3.635 0 0 1-1.09.158c-.398 0-.769-.053-1.113-.158a2.552 2.552 0 0 1-.885-.469 2.13 2.13 0 0 1-.597-.756 2.482 2.482 0 0 1-.211-1.054c0-.235.031-.457.093-.668.067-.211.16-.407.282-.586.121-.172.265-.326.433-.463a2.68 2.68 0 0 1 .574-.358 2.157 2.157 0 0 1-.861-.755 2.074 2.074 0 0 1-.334-1.131c0-.379.065-.715.193-1.008a2.181 2.181 0 0 1 1.36-1.201 3.32 3.32 0 0 1 1.049-.158c.375 0 .72.052 1.037.158.32.101.599.254.838.457.23.199.412.447.545.744.132.293.199.629.199 1.008Zm-1.213 3.885c0-.211-.035-.403-.106-.575a1.365 1.365 0 0 0-.281-.457 1.303 1.303 0 0 0-.445-.281 1.572 1.572 0 0 0-.568-.1c-.215 0-.409.034-.581.1-.168.066-.312.16-.433.281a1.365 1.365 0 0 0-.281.457 1.68 1.68 0 0 0-.094.58c0 .219.033.416.099.592.067.172.163.317.288.434.121.113.265.201.433.263.172.059.365.088.58.088a1.6 1.6 0 0 0 .557-.093c.172-.063.32-.153.445-.27.117-.121.211-.266.281-.434.071-.171.106-.367.106-.585Zm-.182-3.833a1.4 1.4 0 0 0-.34-.931 1.194 1.194 0 0 0-.386-.258 1.301 1.301 0 0 0-.504-.094c-.184 0-.35.032-.498.094-.145.059-.27.143-.375.252a1.11 1.11 0 0 0-.235.404 1.66 1.66 0 0 0-.082.533c0 .192.028.368.082.528.055.156.137.289.246.398a1.1 1.1 0 0 0 .381.264c.149.062.315.094.498.094.184 0 .35-.032.498-.094.149-.063.276-.15.381-.264.106-.109.188-.242.246-.398.059-.16.088-.336.088-.528Z"
              className="58"
            />
            <path
              d="m315.412 191.77.457-4.301h4.588v1.242h-3.422l-.223 2.045c.141-.082.325-.16.551-.235.231-.074.494-.111.791-.111.403 0 .762.067 1.078.199.321.133.592.323.815.569.219.25.387.552.504.908.117.352.176.748.176 1.189 0 .391-.057.76-.17 1.108-.11.344-.28.644-.51.902a2.373 2.373 0 0 1-.861.61c-.348.148-.758.222-1.231.222-.359 0-.703-.051-1.031-.152a2.663 2.663 0 0 1-.873-.469 2.463 2.463 0 0 1-.627-.756 2.561 2.561 0 0 1-.276-1.049h1.366c.05.418.203.739.457.961.258.223.586.334.984.334.234 0 .438-.043.609-.129.172-.086.317-.207.434-.363a1.63 1.63 0 0 0 .246-.551c.055-.218.082-.455.082-.709 0-.246-.033-.47-.099-.673a1.508 1.508 0 0 0-.288-.54 1.275 1.275 0 0 0-.48-.351 1.615 1.615 0 0 0-.668-.129c-.168 0-.314.014-.439.041a1.61 1.61 0 0 0-.323.106 1.486 1.486 0 0 0-.269.164 2.545 2.545 0 0 0-.229.193l-1.119-.275Zm11.18-4.342v1.189h-.094c-.465 0-.869.065-1.213.194a2.384 2.384 0 0 0-1.418 1.341 3.474 3.474 0 0 0-.24 1.02c.094-.106.203-.207.328-.305.125-.101.264-.191.416-.269.145-.075.305-.133.481-.176a2.14 2.14 0 0 1 .556-.07c.414 0 .774.078 1.078.234.309.156.563.367.762.633.203.265.352.57.445.914.098.344.147.701.147 1.072 0 .406-.063.787-.188 1.143a2.657 2.657 0 0 1-.533.92 2.548 2.548 0 0 1-.873.627c-.34.148-.728.222-1.166.222-.449 0-.85-.086-1.201-.258a2.634 2.634 0 0 1-.891-.697 3.137 3.137 0 0 1-.586-1.072 4.279 4.279 0 0 1-.199-1.307v-.58c0-.687.088-1.342.264-1.963a3.936 3.936 0 0 1 .89-1.611 3.489 3.489 0 0 1 1.301-.891c.516-.207 1.106-.31 1.77-.31h.164Zm-1.53 4.06c-.167 0-.328.026-.48.076a1.684 1.684 0 0 0-.422.211c-.117.09-.222.194-.316.311a1.713 1.713 0 0 0-.235.393v.433c0 .34.037.639.112.897.078.257.183.472.316.644.133.172.287.303.463.393.176.09.363.134.562.134.219 0 .415-.042.586-.128.172-.09.319-.211.44-.364.121-.156.213-.34.275-.55.063-.215.094-.448.094-.698 0-.238-.031-.463-.094-.674a1.694 1.694 0 0 0-.263-.562 1.243 1.243 0 0 0-.44-.375 1.226 1.226 0 0 0-.598-.141Z"
              className="56"
            />
            <path
              d="m304.412 225.77.457-4.301h4.588v1.242h-3.422l-.223 2.045c.141-.082.325-.16.551-.235.231-.074.494-.111.791-.111.403 0 .762.067 1.078.199.321.133.592.323.815.569.219.25.387.552.504.908.117.352.176.748.176 1.189 0 .391-.057.76-.17 1.108-.11.344-.28.644-.51.902a2.373 2.373 0 0 1-.861.61c-.348.148-.758.222-1.231.222-.359 0-.703-.051-1.031-.152a2.663 2.663 0 0 1-.873-.469 2.463 2.463 0 0 1-.627-.756 2.561 2.561 0 0 1-.276-1.049h1.366c.05.418.203.739.457.961.258.223.586.334.984.334.234 0 .438-.043.609-.129.172-.086.317-.207.434-.363a1.63 1.63 0 0 0 .246-.551c.055-.218.082-.455.082-.709 0-.246-.033-.47-.099-.673a1.508 1.508 0 0 0-.288-.54 1.275 1.275 0 0 0-.48-.351 1.615 1.615 0 0 0-.668-.129c-.168 0-.314.014-.439.041a1.61 1.61 0 0 0-.323.106 1.486 1.486 0 0 0-.269.164 2.545 2.545 0 0 0-.229.193l-1.119-.275Zm7.207 0 .457-4.301h4.588v1.242h-3.422l-.222 2.045c.14-.082.324-.16.55-.235.231-.074.494-.111.791-.111.403 0 .762.067 1.078.199.321.133.592.323.815.569.219.25.387.552.504.908.117.352.176.748.176 1.189 0 .391-.057.76-.17 1.108-.11.344-.28.644-.51.902a2.373 2.373 0 0 1-.861.61c-.348.148-.758.222-1.231.222-.359 0-.703-.051-1.031-.152a2.663 2.663 0 0 1-.873-.469 2.463 2.463 0 0 1-.627-.756 2.561 2.561 0 0 1-.276-1.049h1.366c.05.418.203.739.457.961.258.223.586.334.984.334.234 0 .438-.043.609-.129.172-.086.317-.207.434-.363a1.63 1.63 0 0 0 .246-.551c.055-.218.082-.455.082-.709 0-.246-.033-.47-.099-.673a1.508 1.508 0 0 0-.288-.54 1.275 1.275 0 0 0-.48-.351 1.615 1.615 0 0 0-.668-.129c-.168 0-.314.014-.439.041a1.632 1.632 0 0 0-.323.106 1.486 1.486 0 0 0-.269.164 2.545 2.545 0 0 0-.229.193l-1.119-.275Z"
              className="55"
            />
            <path
              d="M365.385 224.428v1.189h-.094c-.465 0-.869.065-1.213.194a2.384 2.384 0 0 0-1.418 1.341 3.474 3.474 0 0 0-.24 1.02c.094-.106.203-.207.328-.305.125-.101.264-.191.416-.269.145-.075.305-.133.481-.176a2.14 2.14 0 0 1 .556-.07c.414 0 .774.078 1.078.234.309.156.563.367.762.633.203.265.352.57.445.914.098.344.147.701.147 1.072 0 .406-.063.787-.188 1.143a2.673 2.673 0 0 1-.533.92 2.548 2.548 0 0 1-.873.627c-.34.148-.728.222-1.166.222-.449 0-.85-.086-1.201-.258a2.634 2.634 0 0 1-.891-.697 3.137 3.137 0 0 1-.586-1.072 4.248 4.248 0 0 1-.199-1.307v-.58c0-.687.088-1.342.264-1.963a3.936 3.936 0 0 1 .89-1.611 3.489 3.489 0 0 1 1.301-.891c.516-.207 1.106-.31 1.77-.31h.164Zm-1.53 4.06c-.167 0-.328.026-.48.076a1.684 1.684 0 0 0-.422.211c-.117.09-.223.194-.316.311a1.713 1.713 0 0 0-.235.393v.433c0 .34.037.639.112.897.078.257.183.472.316.644.133.172.287.303.463.393.176.09.363.134.562.134.219 0 .415-.042.586-.128.172-.09.319-.211.44-.364.121-.156.213-.34.275-.55.063-.215.094-.448.094-.698 0-.238-.031-.463-.094-.674a1.694 1.694 0 0 0-.263-.562 1.243 1.243 0 0 0-.44-.375 1.226 1.226 0 0 0-.598-.141Zm8.344 4.512h-1.412v-6.797l-2.185.803v-1.236l3.509-1.301h.088V233Z"
              className="61"
            />
            <path
              d="M249.992 203h-1.412v-6.797l-2.185.803v-1.236l3.509-1.301h.088V203Zm8.848 0h-5.725v-.973l2.778-3.023c.23-.254.423-.481.58-.68.156-.203.283-.388.381-.556.093-.168.16-.325.199-.469.043-.149.064-.297.064-.445 0-.2-.029-.381-.088-.545a1.141 1.141 0 0 0-.258-.422 1.215 1.215 0 0 0-.41-.276 1.342 1.342 0 0 0-.527-.099c-.25 0-.467.035-.65.105-.184.071-.336.17-.457.299a1.337 1.337 0 0 0-.282.498c-.062.191-.093.41-.093.656h-1.407c0-.371.069-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.555-.441.914-.586a3.27 3.27 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.612.289.838.504.223.215.393.473.51.774.117.296.176.625.176.984 0 .269-.045.531-.135.785-.086.25-.205.498-.357.744a6.541 6.541 0 0 1-.557.744c-.211.25-.441.508-.691.774l-1.899 2.027h3.973V203Z"
              className="12"
            />
            <path
              d="M137.992 256h-1.412v-6.797l-2.185.803v-1.236l3.509-1.301h.088V256Zm4.899-4.898h.838c.25 0 .468-.034.656-.1.187-.07.342-.168.463-.293a1.05 1.05 0 0 0 .257-.404 1.46 1.46 0 0 0 .094-.528c0-.203-.029-.384-.088-.545a1.076 1.076 0 0 0-.246-.41 1.13 1.13 0 0 0-.416-.246 1.698 1.698 0 0 0-.568-.088c-.192 0-.369.03-.533.088a1.198 1.198 0 0 0-.703.621 1.2 1.2 0 0 0-.1.498h-1.4c0-.34.068-.652.205-.937.136-.285.326-.533.568-.744.242-.207.527-.369.855-.487a3.262 3.262 0 0 1 1.09-.175c.403 0 .772.052 1.108.158.34.101.629.254.867.457.242.207.43.461.562.762.133.3.2.65.2 1.048 0 .176-.028.352-.082.528a1.93 1.93 0 0 1-.235.509 2.227 2.227 0 0 1-.961.809c.254.086.469.199.645.34.179.137.326.291.439.463.114.176.196.365.246.568.051.199.077.406.077.621 0 .399-.075.754-.223 1.067a2.236 2.236 0 0 1-.598.779 2.696 2.696 0 0 1-.914.492 3.761 3.761 0 0 1-1.131.164c-.367 0-.72-.051-1.06-.152a2.678 2.678 0 0 1-.897-.457 2.308 2.308 0 0 1-.621-.75 2.299 2.299 0 0 1-.228-1.049h1.4c0 .187.033.361.1.521.07.157.17.29.298.399.125.113.274.201.446.264.176.062.369.093.58.093.226 0 .43-.029.609-.088a1.21 1.21 0 0 0 .463-.275c.121-.113.213-.254.276-.422.066-.172.099-.367.099-.586a1.63 1.63 0 0 0-.111-.633 1.145 1.145 0 0 0-.322-.439 1.401 1.401 0 0 0-.51-.252 2.269 2.269 0 0 0-.656-.088h-.838v-1.101Z"
              className="13"
            />
            <path
              d="M132.992 359h-1.412v-6.797l-2.185.803v-1.236l3.509-1.301h.088V359Zm7.6-8.572v1.189h-.094c-.465 0-.869.065-1.213.194a2.384 2.384 0 0 0-1.418 1.341 3.474 3.474 0 0 0-.24 1.02c.094-.106.203-.207.328-.305.125-.101.264-.191.416-.269.145-.075.305-.133.481-.176a2.14 2.14 0 0 1 .556-.07c.414 0 .774.078 1.078.234.309.156.563.367.762.633.203.265.352.57.445.914.098.344.147.701.147 1.072 0 .406-.063.787-.188 1.143a2.657 2.657 0 0 1-.533.92 2.548 2.548 0 0 1-.873.627c-.34.148-.728.222-1.166.222-.449 0-.85-.086-1.201-.258a2.634 2.634 0 0 1-.891-.697 3.137 3.137 0 0 1-.586-1.072 4.279 4.279 0 0 1-.199-1.307v-.58c0-.687.088-1.342.264-1.963a3.936 3.936 0 0 1 .89-1.611 3.489 3.489 0 0 1 1.301-.891c.516-.207 1.106-.31 1.77-.31h.164Zm-1.53 4.06c-.167 0-.328.026-.48.076a1.684 1.684 0 0 0-.422.211c-.117.09-.222.194-.316.311a1.713 1.713 0 0 0-.235.393v.433c0 .34.037.639.112.897.078.257.183.472.316.644.133.172.287.303.463.393.176.09.363.134.562.134.219 0 .415-.042.586-.128.172-.09.319-.211.44-.364.121-.156.213-.34.275-.55.063-.215.094-.448.094-.698 0-.238-.031-.463-.094-.674a1.694 1.694 0 0 0-.263-.562 1.243 1.243 0 0 0-.44-.375 1.226 1.226 0 0 0-.598-.141Z"
              className="16"
            />
            <path
              d="M131.992 397h-1.412v-6.797l-2.185.803v-1.236l3.509-1.301h.088V397Zm8.918-7.746L137.5 397h-1.477l3.411-7.359h-4.424v-1.172h5.9v.785Z"
              className="17"
            />
            <path
              d="M171.992 401h-1.412v-6.797l-2.185.803v-1.236l3.509-1.301h.088V401Zm8.725-6.281c0 .258-.043.498-.129.72a1.904 1.904 0 0 1-.352.598 2.249 2.249 0 0 1-.726.574c.176.082.338.178.486.287.152.106.285.229.399.37a2.134 2.134 0 0 1 .509 1.412c0 .394-.072.744-.216 1.049a2.165 2.165 0 0 1-.592.761 2.617 2.617 0 0 1-.891.469 3.635 3.635 0 0 1-1.09.158c-.398 0-.769-.053-1.113-.158a2.552 2.552 0 0 1-.885-.469 2.13 2.13 0 0 1-.597-.756 2.482 2.482 0 0 1-.211-1.054c0-.235.031-.457.093-.668.067-.211.16-.407.282-.586.121-.172.265-.326.433-.463a2.68 2.68 0 0 1 .574-.358 2.157 2.157 0 0 1-.861-.755 2.074 2.074 0 0 1-.334-1.131c0-.379.065-.715.193-1.008a2.181 2.181 0 0 1 1.36-1.201 3.32 3.32 0 0 1 1.049-.158c.375 0 .72.052 1.037.158.32.101.599.254.838.457.23.199.412.447.545.744.132.293.199.629.199 1.008Zm-1.213 3.885c0-.211-.035-.403-.106-.575a1.365 1.365 0 0 0-.281-.457 1.303 1.303 0 0 0-.445-.281 1.572 1.572 0 0 0-.568-.1c-.215 0-.409.034-.581.1-.168.066-.312.16-.433.281a1.365 1.365 0 0 0-.281.457 1.68 1.68 0 0 0-.094.58c0 .219.033.416.099.592.067.172.163.317.288.434.121.113.265.201.433.263.172.059.365.088.58.088a1.6 1.6 0 0 0 .557-.093c.172-.063.32-.153.445-.27.117-.121.211-.266.281-.434.071-.171.106-.367.106-.585Zm-.182-3.833a1.4 1.4 0 0 0-.34-.931 1.194 1.194 0 0 0-.386-.258 1.301 1.301 0 0 0-.504-.094c-.184 0-.35.032-.498.094-.145.059-.27.143-.375.252a1.11 1.11 0 0 0-.235.404 1.66 1.66 0 0 0-.082.533c0 .192.028.368.082.528.055.156.137.289.246.398a1.1 1.1 0 0 0 .381.264c.149.062.315.094.498.094.184 0 .35-.032.498-.094.149-.063.276-.15.381-.264.106-.109.188-.242.246-.398.059-.16.088-.336.088-.528Z"
              className="18"
            />
            <path
              d="M178.992 434h-1.412v-6.797l-2.185.803v-1.236l3.509-1.301h.088V434Zm4.553-1.154c.484 0 .896-.055 1.236-.164.34-.11.619-.266.838-.469.235-.223.406-.477.516-.762.109-.289.179-.599.211-.931v-.03a2.038 2.038 0 0 1-.662.492c-.141.067-.297.12-.469.159a2.468 2.468 0 0 1-.557.058c-.414 0-.775-.078-1.084-.234a2.26 2.26 0 0 1-.762-.627 2.717 2.717 0 0 1-.462-.914 3.792 3.792 0 0 1-.153-1.084c0-.41.061-.795.182-1.154a2.91 2.91 0 0 1 .539-.956c.234-.269.521-.482.861-.638.344-.16.735-.24 1.172-.24.442 0 .832.084 1.172.252.344.167.635.396.873.685.25.313.44.691.568 1.137.129.441.194.906.194 1.394v.492c0 .672-.078 1.313-.235 1.922a3.877 3.877 0 0 1-.826 1.6c-.32.375-.742.67-1.265.885-.52.215-1.147.322-1.881.322h-.117v-1.195h.111Zm1.412-2.754a1.41 1.41 0 0 0 .867-.293c.121-.09.227-.195.317-.317.093-.125.17-.259.228-.404v-.486c0-.34-.039-.641-.117-.903a2.13 2.13 0 0 0-.299-.656 1.314 1.314 0 0 0-.451-.398 1.132 1.132 0 0 0-.551-.141c-.219 0-.414.049-.586.147a1.244 1.244 0 0 0-.422.386 1.846 1.846 0 0 0-.269.58c-.059.219-.088.45-.088.692 0 .234.027.459.082.674.055.215.141.406.258.574.113.164.254.297.422.398.172.098.375.147.609.147Z"
              className="19"
            />
            <path
              d="M159.633 462h-5.725v-.973l2.778-3.023c.23-.254.423-.481.58-.68a5.2 5.2 0 0 0 .38-.556c.094-.168.161-.325.2-.469.043-.149.064-.297.064-.445 0-.2-.029-.381-.088-.545a1.141 1.141 0 0 0-.258-.422 1.215 1.215 0 0 0-.41-.276 1.342 1.342 0 0 0-.527-.099c-.25 0-.467.035-.65.105-.184.071-.336.17-.457.299a1.337 1.337 0 0 0-.282.498c-.062.191-.093.41-.093.656h-1.407c0-.371.069-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.555-.441.914-.586a3.27 3.27 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.612.289.838.504.223.215.393.473.51.774.117.296.176.625.176.984 0 .269-.045.531-.135.785-.086.25-.205.498-.357.744a6.541 6.541 0 0 1-.557.744c-.211.25-.441.508-.691.774l-1.899 2.027h3.973V462Zm7.248-3.252c0 .547-.065 1.031-.193 1.453a2.89 2.89 0 0 1-.545 1.049 2.248 2.248 0 0 1-.868.656 2.926 2.926 0 0 1-1.16.217c-.429 0-.816-.072-1.16-.217a2.286 2.286 0 0 1-.873-.656 2.892 2.892 0 0 1-.557-1.049 5.123 5.123 0 0 1-.187-1.453v-2.021c0-.547.062-1.03.187-1.448.129-.422.313-.777.551-1.066.238-.285.528-.5.867-.645a2.91 2.91 0 0 1 1.161-.222c.433 0 .82.074 1.16.222.343.145.636.36.879.645.234.289.416.644.545 1.066.128.418.193.901.193 1.448v2.021Zm-4.137-.498 2.713-2.057a3.226 3.226 0 0 0-.129-.791 1.419 1.419 0 0 0-.287-.545 1.024 1.024 0 0 0-.404-.281 1.439 1.439 0 0 0-.533-.094c-.215 0-.405.038-.569.112a1.04 1.04 0 0 0-.41.328 1.627 1.627 0 0 0-.287.639 3.881 3.881 0 0 0-.094.914v1.775Zm2.725.732v-1.711l-2.713 2.045c.019.27.06.508.123.715.066.207.154.379.264.516.109.148.244.26.404.334.164.074.353.111.568.111.211 0 .397-.035.557-.105.16-.075.297-.182.41-.323.129-.164.225-.378.287-.644.067-.266.1-.578.1-.938Z"
              className="20"
            />
            <path
              d="M224.684 469.102h.837c.25 0 .469-.034.657-.1.187-.07.342-.168.463-.293a1.05 1.05 0 0 0 .257-.404 1.46 1.46 0 0 0 .094-.528c0-.203-.029-.384-.088-.545a1.076 1.076 0 0 0-.246-.41 1.13 1.13 0 0 0-.416-.246 1.698 1.698 0 0 0-.568-.088c-.192 0-.369.03-.533.088a1.19 1.19 0 0 0-.703.621 1.2 1.2 0 0 0-.1.498h-1.4c0-.34.068-.652.205-.937.136-.285.326-.533.568-.744.242-.207.527-.369.855-.487a3.262 3.262 0 0 1 1.09-.175c.403 0 .772.052 1.108.158.34.101.629.254.867.457.242.207.43.461.562.762.133.3.2.65.2 1.048 0 .176-.028.352-.082.528a1.93 1.93 0 0 1-.235.509 2.227 2.227 0 0 1-.961.809c.254.086.469.199.645.34.179.137.326.291.439.463.113.176.196.365.246.568.051.199.076.406.076.621 0 .399-.074.754-.222 1.067a2.236 2.236 0 0 1-.598.779 2.696 2.696 0 0 1-.914.492 3.766 3.766 0 0 1-1.131.164c-.367 0-.72-.051-1.06-.152a2.678 2.678 0 0 1-.897-.457 2.308 2.308 0 0 1-.621-.75 2.299 2.299 0 0 1-.228-1.049h1.4c0 .187.033.361.1.521.07.157.17.29.298.399.125.113.274.201.446.264.176.062.369.093.58.093.226 0 .43-.029.609-.088a1.21 1.21 0 0 0 .463-.275c.121-.113.213-.254.275-.422.067-.172.1-.367.1-.586a1.63 1.63 0 0 0-.111-.633 1.145 1.145 0 0 0-.322-.439 1.401 1.401 0 0 0-.51-.252 2.271 2.271 0 0 0-.657-.088h-.837v-1.101Zm5.935.668.457-4.301h4.588v1.242h-3.422l-.222 2.045c.14-.082.324-.16.55-.235.231-.074.494-.111.791-.111.403 0 .762.067 1.078.199.321.133.592.323.815.569.219.25.387.552.504.908.117.352.176.748.176 1.189 0 .391-.057.76-.17 1.108-.11.344-.28.644-.51.902a2.373 2.373 0 0 1-.861.61c-.348.148-.758.222-1.231.222-.359 0-.703-.051-1.031-.152a2.663 2.663 0 0 1-.873-.469 2.463 2.463 0 0 1-.627-.756 2.561 2.561 0 0 1-.276-1.049h1.366c.05.418.203.739.457.961.258.223.586.334.984.334.234 0 .438-.043.609-.129.172-.086.317-.207.434-.363a1.63 1.63 0 0 0 .246-.551c.055-.218.082-.455.082-.709 0-.246-.033-.47-.099-.673a1.508 1.508 0 0 0-.288-.54 1.275 1.275 0 0 0-.48-.351 1.615 1.615 0 0 0-.668-.129c-.168 0-.314.014-.439.041a1.632 1.632 0 0 0-.323.106 1.486 1.486 0 0 0-.269.164 2.545 2.545 0 0 0-.229.193l-1.119-.275Z"
              className="35"
            />
            <path
              d="M267.807 485.959h1.072v1.137h-1.072V489h-1.401v-1.904h-3.691l-.035-.862 3.685-5.765h1.442v5.49Zm-3.698 0h2.297v-3.615l-.164.304-2.133 3.311ZM275.84 489h-5.725v-.973l2.778-3.023c.23-.254.423-.481.58-.68.156-.203.283-.388.381-.556.093-.168.16-.325.199-.469.043-.149.064-.297.064-.445 0-.2-.029-.381-.088-.545a1.141 1.141 0 0 0-.258-.422 1.215 1.215 0 0 0-.41-.276 1.342 1.342 0 0 0-.527-.099c-.25 0-.467.035-.65.105-.184.071-.336.17-.457.299a1.337 1.337 0 0 0-.282.498c-.062.191-.093.41-.093.656h-1.407c0-.371.069-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.555-.441.914-.586a3.27 3.27 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.612.289.838.504.223.215.393.473.51.774.117.296.176.625.176.984 0 .269-.045.531-.135.785-.086.25-.205.498-.357.744a6.541 6.541 0 0 1-.557.744c-.211.25-.441.508-.691.774l-1.899 2.027h3.973V489Z"
              className="42"
            />
            <path
              d="M239.684 509.102h.837c.25 0 .469-.034.657-.1.187-.07.342-.168.463-.293a1.05 1.05 0 0 0 .257-.404 1.46 1.46 0 0 0 .094-.528c0-.203-.029-.384-.088-.545a1.076 1.076 0 0 0-.246-.41 1.13 1.13 0 0 0-.416-.246 1.698 1.698 0 0 0-.568-.088c-.192 0-.369.03-.533.088a1.19 1.19 0 0 0-.703.621 1.2 1.2 0 0 0-.1.498h-1.4c0-.34.068-.652.205-.937.136-.285.326-.533.568-.744.242-.207.527-.369.855-.487a3.262 3.262 0 0 1 1.09-.175c.403 0 .772.052 1.108.158.34.101.629.254.867.457.242.207.43.461.562.762.133.3.2.65.2 1.048 0 .176-.028.352-.082.528a1.93 1.93 0 0 1-.235.509 2.227 2.227 0 0 1-.961.809c.254.086.469.199.645.34.179.137.326.291.439.463.113.176.196.365.246.568.051.199.076.406.076.621 0 .399-.074.754-.222 1.067a2.236 2.236 0 0 1-.598.779 2.696 2.696 0 0 1-.914.492 3.766 3.766 0 0 1-1.131.164c-.367 0-.72-.051-1.06-.152a2.678 2.678 0 0 1-.897-.457 2.308 2.308 0 0 1-.621-.75 2.299 2.299 0 0 1-.228-1.049h1.4c0 .187.033.361.1.521.07.157.17.29.298.399.125.113.274.201.446.264.176.062.369.093.58.093.226 0 .43-.029.609-.088a1.21 1.21 0 0 0 .463-.275c.121-.113.213-.254.275-.422.067-.172.1-.367.1-.586a1.63 1.63 0 0 0-.111-.633 1.145 1.145 0 0 0-.322-.439 1.401 1.401 0 0 0-.51-.252 2.271 2.271 0 0 0-.657-.088h-.837v-1.101Zm6.861 3.744c.484 0 .896-.055 1.236-.164.34-.11.619-.266.838-.469.235-.223.406-.477.516-.762.109-.289.179-.599.211-.931v-.03a2.038 2.038 0 0 1-.662.492c-.141.067-.297.12-.469.159a2.468 2.468 0 0 1-.557.058c-.414 0-.775-.078-1.084-.234a2.26 2.26 0 0 1-.762-.627 2.717 2.717 0 0 1-.462-.914 3.792 3.792 0 0 1-.153-1.084c0-.41.061-.795.182-1.154a2.91 2.91 0 0 1 .539-.956c.234-.269.521-.482.861-.638.344-.16.735-.24 1.172-.24.442 0 .832.084 1.172.252.344.167.635.396.873.685.25.313.44.691.568 1.137.129.441.194.906.194 1.394v.492c0 .672-.078 1.313-.235 1.922a3.877 3.877 0 0 1-.826 1.6c-.32.375-.742.67-1.265.885-.52.215-1.147.322-1.881.322h-.117v-1.195h.111Zm1.412-2.754a1.41 1.41 0 0 0 .867-.293c.121-.09.227-.195.317-.317.093-.125.17-.259.228-.404v-.486c0-.34-.039-.641-.117-.903a2.13 2.13 0 0 0-.299-.656 1.314 1.314 0 0 0-.451-.398 1.132 1.132 0 0 0-.551-.141c-.219 0-.414.049-.586.147a1.244 1.244 0 0 0-.422.386 1.846 1.846 0 0 0-.269.58c-.059.219-.088.45-.088.692 0 .234.027.459.082.674.055.215.141.406.258.574.113.164.254.297.422.398.172.098.375.147.609.147Z"
              className="39"
            />
            <path
              d="M202.684 509.102h.837c.25 0 .469-.034.657-.1.187-.07.342-.168.463-.293a1.05 1.05 0 0 0 .257-.404 1.46 1.46 0 0 0 .094-.528c0-.203-.029-.384-.088-.545a1.076 1.076 0 0 0-.246-.41 1.13 1.13 0 0 0-.416-.246 1.698 1.698 0 0 0-.568-.088c-.192 0-.369.03-.533.088a1.19 1.19 0 0 0-.703.621 1.2 1.2 0 0 0-.1.498h-1.4c0-.34.068-.652.205-.937.136-.285.326-.533.568-.744.242-.207.527-.369.855-.487a3.262 3.262 0 0 1 1.09-.175c.403 0 .772.052 1.108.158.34.101.629.254.867.457.242.207.43.461.562.762.133.3.2.65.2 1.048 0 .176-.028.352-.082.528a1.93 1.93 0 0 1-.235.509 2.227 2.227 0 0 1-.961.809c.254.086.469.199.645.34.179.137.326.291.439.463.113.176.196.365.246.568.051.199.076.406.076.621 0 .399-.074.754-.222 1.067a2.236 2.236 0 0 1-.598.779 2.696 2.696 0 0 1-.914.492 3.766 3.766 0 0 1-1.131.164c-.367 0-.72-.051-1.06-.152a2.678 2.678 0 0 1-.897-.457 2.308 2.308 0 0 1-.621-.75 2.299 2.299 0 0 1-.228-1.049h1.4c0 .187.033.361.1.521.07.157.17.29.298.399.125.113.274.201.446.264.176.062.369.093.58.093.226 0 .43-.029.609-.088a1.21 1.21 0 0 0 .463-.275c.121-.113.213-.254.275-.422.067-.172.1-.367.1-.586a1.63 1.63 0 0 0-.111-.633 1.145 1.145 0 0 0-.322-.439 1.401 1.401 0 0 0-.51-.252 2.271 2.271 0 0 0-.657-.088h-.837v-1.101Zm10.33 1.857h1.072v1.137h-1.072V514h-1.401v-1.904h-3.691l-.035-.862 3.685-5.765h1.442v5.49Zm-3.698 0h2.297v-3.615l-.164.304-2.133 3.311Z"
              className="34"
            />
            <path
              d="M216.684 533.102h.837c.25 0 .469-.034.657-.1.187-.07.342-.168.463-.293a1.05 1.05 0 0 0 .257-.404 1.46 1.46 0 0 0 .094-.528c0-.203-.029-.384-.088-.545a1.076 1.076 0 0 0-.246-.41 1.13 1.13 0 0 0-.416-.246 1.698 1.698 0 0 0-.568-.088c-.192 0-.369.03-.533.088a1.19 1.19 0 0 0-.703.621 1.2 1.2 0 0 0-.1.498h-1.4c0-.34.068-.652.205-.937.136-.285.326-.533.568-.744.242-.207.527-.369.855-.487a3.262 3.262 0 0 1 1.09-.175c.403 0 .772.052 1.108.158.34.101.629.254.867.457.242.207.43.461.562.762.133.3.2.65.2 1.048 0 .176-.028.352-.082.528a1.93 1.93 0 0 1-.235.509 2.227 2.227 0 0 1-.961.809c.254.086.469.199.645.34.179.137.326.291.439.463.113.176.196.365.246.568.051.199.076.406.076.621 0 .399-.074.754-.222 1.067a2.236 2.236 0 0 1-.598.779 2.696 2.696 0 0 1-.914.492 3.766 3.766 0 0 1-1.131.164c-.367 0-.72-.051-1.06-.152a2.678 2.678 0 0 1-.897-.457 2.308 2.308 0 0 1-.621-.75 2.299 2.299 0 0 1-.228-1.049h1.4c0 .187.033.361.1.521.07.157.17.29.298.399.125.113.274.201.446.264.176.062.369.093.58.093.226 0 .43-.029.609-.088a1.21 1.21 0 0 0 .463-.275c.121-.113.213-.254.275-.422.067-.172.1-.367.1-.586a1.63 1.63 0 0 0-.111-.633 1.145 1.145 0 0 0-.322-.439 1.401 1.401 0 0 0-.51-.252 2.271 2.271 0 0 0-.657-.088h-.837v-1.101Zm7.207 0h.838c.25 0 .468-.034.656-.1.187-.07.342-.168.463-.293a1.05 1.05 0 0 0 .257-.404 1.46 1.46 0 0 0 .094-.528c0-.203-.029-.384-.088-.545a1.076 1.076 0 0 0-.246-.41 1.13 1.13 0 0 0-.416-.246 1.698 1.698 0 0 0-.568-.088c-.192 0-.369.03-.533.088a1.198 1.198 0 0 0-.703.621 1.2 1.2 0 0 0-.1.498h-1.4c0-.34.068-.652.205-.937.136-.285.326-.533.568-.744.242-.207.527-.369.855-.487a3.262 3.262 0 0 1 1.09-.175c.403 0 .772.052 1.108.158.34.101.629.254.867.457.242.207.43.461.562.762.133.3.2.65.2 1.048 0 .176-.028.352-.082.528a1.93 1.93 0 0 1-.235.509 2.227 2.227 0 0 1-.961.809c.254.086.469.199.645.34.179.137.326.291.439.463.114.176.196.365.246.568.051.199.077.406.077.621 0 .399-.075.754-.223 1.067a2.236 2.236 0 0 1-.598.779 2.696 2.696 0 0 1-.914.492 3.761 3.761 0 0 1-1.131.164c-.367 0-.72-.051-1.06-.152a2.678 2.678 0 0 1-.897-.457 2.308 2.308 0 0 1-.621-.75 2.299 2.299 0 0 1-.228-1.049h1.4c0 .187.033.361.1.521.07.157.17.29.298.399.125.113.274.201.446.264.176.062.369.093.58.093.226 0 .43-.029.609-.088a1.21 1.21 0 0 0 .463-.275c.121-.113.213-.254.276-.422.066-.172.099-.367.099-.586a1.63 1.63 0 0 0-.111-.633 1.145 1.145 0 0 0-.322-.439 1.401 1.401 0 0 0-.51-.252 2.269 2.269 0 0 0-.656-.088h-.838v-1.101Z"
              className="33"
            />
            <path
              d="M218.684 554.102h.837c.25 0 .469-.034.657-.1.187-.07.342-.168.463-.293a1.05 1.05 0 0 0 .257-.404 1.46 1.46 0 0 0 .094-.528c0-.203-.029-.384-.088-.545a1.076 1.076 0 0 0-.246-.41 1.13 1.13 0 0 0-.416-.246 1.698 1.698 0 0 0-.568-.088c-.192 0-.369.03-.533.088a1.19 1.19 0 0 0-.703.621 1.2 1.2 0 0 0-.1.498h-1.4c0-.34.068-.652.205-.937.136-.285.326-.533.568-.744.242-.207.527-.369.855-.487a3.262 3.262 0 0 1 1.09-.175c.403 0 .772.052 1.108.158.34.101.629.254.867.457.242.207.43.461.562.762.133.3.2.65.2 1.048 0 .176-.028.352-.082.528a1.93 1.93 0 0 1-.235.509 2.227 2.227 0 0 1-.961.809c.254.086.469.199.645.34.179.137.326.291.439.463.113.176.196.365.246.568.051.199.076.406.076.621 0 .399-.074.754-.222 1.067a2.236 2.236 0 0 1-.598.779 2.696 2.696 0 0 1-.914.492 3.766 3.766 0 0 1-1.131.164c-.367 0-.72-.051-1.06-.152a2.678 2.678 0 0 1-.897-.457 2.308 2.308 0 0 1-.621-.75 2.299 2.299 0 0 1-.228-1.049h1.4c0 .187.033.361.1.521.07.157.17.29.298.399.125.113.274.201.446.264.176.062.369.093.58.093.226 0 .43-.029.609-.088a1.21 1.21 0 0 0 .463-.275c.121-.113.213-.254.275-.422.067-.172.1-.367.1-.586a1.63 1.63 0 0 0-.111-.633 1.145 1.145 0 0 0-.322-.439 1.401 1.401 0 0 0-.51-.252 2.271 2.271 0 0 0-.657-.088h-.837v-1.101ZM229.84 559h-5.725v-.973l2.778-3.023c.23-.254.423-.481.58-.68.156-.203.283-.388.381-.556.093-.168.16-.325.199-.469.043-.149.064-.297.064-.445 0-.2-.029-.381-.088-.545a1.141 1.141 0 0 0-.258-.422 1.215 1.215 0 0 0-.41-.276 1.342 1.342 0 0 0-.527-.099c-.25 0-.467.035-.65.105-.184.071-.336.17-.457.299a1.337 1.337 0 0 0-.282.498c-.062.191-.093.41-.093.656h-1.407c0-.371.069-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.555-.441.914-.586a3.27 3.27 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.612.289.838.504.223.215.393.473.51.774.117.296.176.625.176.984 0 .269-.045.531-.135.785-.086.25-.205.498-.357.744a6.541 6.541 0 0 1-.557.744c-.211.25-.441.508-.691.774l-1.899 2.027h3.973V559Z"
              className="32"
            />
            <path
              d="M254.807 553.959h1.072v1.137h-1.072V557h-1.401v-1.904h-3.691l-.035-.862 3.685-5.765h1.442v5.49Zm-3.698 0h2.297v-3.615l-.164.304-2.133 3.311Zm6.51-1.189.457-4.301h4.588v1.242h-3.422l-.222 2.045c.14-.082.324-.16.55-.235.231-.074.494-.111.791-.111.403 0 .762.067 1.078.199.321.133.592.323.815.569.219.25.387.552.504.908.117.352.176.748.176 1.189 0 .391-.057.76-.17 1.108-.11.344-.28.644-.51.902a2.373 2.373 0 0 1-.861.61c-.348.148-.758.222-1.231.222-.359 0-.703-.051-1.031-.152a2.663 2.663 0 0 1-.873-.469 2.463 2.463 0 0 1-.627-.756 2.561 2.561 0 0 1-.276-1.049h1.366c.05.418.203.739.457.961.258.223.586.334.984.334.234 0 .438-.043.609-.129.172-.086.317-.207.434-.363a1.63 1.63 0 0 0 .246-.551c.055-.218.082-.455.082-.709 0-.246-.033-.47-.099-.673a1.508 1.508 0 0 0-.288-.54 1.275 1.275 0 0 0-.48-.351 1.615 1.615 0 0 0-.668-.129c-.168 0-.314.014-.439.041a1.632 1.632 0 0 0-.323.106 1.486 1.486 0 0 0-.269.164 2.545 2.545 0 0 0-.229.193l-1.119-.275Z"
              className="45"
            />
            <path
              d="M276.807 519.959h1.072v1.137h-1.072V523h-1.401v-1.904h-3.691l-.035-.862 3.685-5.765h1.442v5.49Zm-3.698 0h2.297v-3.615l-.164.304-2.133 3.311Zm10.483-5.531v1.189h-.094c-.465 0-.869.065-1.213.194a2.384 2.384 0 0 0-1.418 1.341 3.474 3.474 0 0 0-.24 1.02c.094-.106.203-.207.328-.305.125-.101.264-.191.416-.269.145-.075.305-.133.481-.176a2.14 2.14 0 0 1 .556-.07c.414 0 .774.078 1.078.234.309.156.563.367.762.633.203.265.352.57.445.914.098.344.147.701.147 1.072 0 .406-.063.787-.188 1.143a2.657 2.657 0 0 1-.533.92 2.548 2.548 0 0 1-.873.627c-.34.148-.728.222-1.166.222-.449 0-.85-.086-1.201-.258a2.634 2.634 0 0 1-.891-.697 3.137 3.137 0 0 1-.586-1.072 4.279 4.279 0 0 1-.199-1.307v-.58c0-.687.088-1.342.264-1.963a3.936 3.936 0 0 1 .89-1.611 3.489 3.489 0 0 1 1.301-.891c.516-.207 1.106-.31 1.77-.31h.164Zm-1.53 4.06c-.167 0-.328.026-.48.076a1.684 1.684 0 0 0-.422.211c-.117.09-.222.194-.316.311a1.713 1.713 0 0 0-.235.393v.433c0 .34.037.639.112.897.078.257.183.472.316.644.133.172.287.303.463.393.176.09.363.134.562.134.219 0 .415-.042.586-.128.172-.09.319-.211.44-.364.121-.156.213-.34.275-.55.063-.215.094-.448.094-.698 0-.238-.031-.463-.094-.674a1.694 1.694 0 0 0-.263-.562 1.243 1.243 0 0 0-.44-.375 1.226 1.226 0 0 0-.598-.141Z"
              className="46"
            />
            <path
              d="m312.703 494.254-3.41 7.746h-1.477l3.411-7.359h-4.424v-1.172h5.9v.785Zm3.188 2.848h.838c.25 0 .468-.034.656-.1.187-.07.342-.168.463-.293a1.05 1.05 0 0 0 .257-.404 1.46 1.46 0 0 0 .094-.528c0-.203-.029-.384-.088-.545a1.076 1.076 0 0 0-.246-.41 1.13 1.13 0 0 0-.416-.246 1.698 1.698 0 0 0-.568-.088c-.192 0-.369.03-.533.088a1.198 1.198 0 0 0-.703.621 1.2 1.2 0 0 0-.1.498h-1.4c0-.34.068-.652.205-.937.136-.285.326-.533.568-.744.242-.207.527-.369.855-.487a3.262 3.262 0 0 1 1.09-.175c.403 0 .772.052 1.108.158.34.101.629.254.867.457.242.207.43.461.562.762.133.3.2.65.2 1.048 0 .176-.028.352-.082.528a1.93 1.93 0 0 1-.235.509 2.227 2.227 0 0 1-.961.809c.254.086.469.199.645.34.179.137.326.291.439.463.114.176.196.365.246.568.051.199.077.406.077.621 0 .399-.075.754-.223 1.067a2.236 2.236 0 0 1-.598.779 2.696 2.696 0 0 1-.914.492 3.761 3.761 0 0 1-1.131.164c-.367 0-.72-.051-1.06-.152a2.678 2.678 0 0 1-.897-.457 2.308 2.308 0 0 1-.621-.75 2.299 2.299 0 0 1-.228-1.049h1.4c0 .187.033.361.1.521.07.157.17.29.298.399.125.113.274.201.446.264.176.062.369.093.58.093.226 0 .43-.029.609-.088a1.21 1.21 0 0 0 .463-.275c.121-.113.213-.254.276-.422.066-.172.099-.367.099-.586a1.63 1.63 0 0 0-.111-.633 1.145 1.145 0 0 0-.322-.439 1.401 1.401 0 0 0-.51-.252 2.269 2.269 0 0 0-.656-.088h-.838v-1.101Z"
              className="73"
            />
            <path
              d="m315.703 534.254-3.41 7.746h-1.477l3.411-7.359h-4.424v-1.172h5.9v.785ZM322.84 542h-5.725v-.973l2.778-3.023c.23-.254.423-.481.58-.68.156-.203.283-.388.381-.556.093-.168.16-.325.199-.469.043-.149.064-.297.064-.445 0-.2-.029-.381-.088-.545a1.141 1.141 0 0 0-.258-.422 1.215 1.215 0 0 0-.41-.276 1.342 1.342 0 0 0-.527-.099c-.25 0-.467.035-.65.105-.184.071-.336.17-.457.299a1.337 1.337 0 0 0-.282.498c-.062.191-.093.41-.093.656h-1.407c0-.371.069-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.555-.441.914-.586a3.27 3.27 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.612.289.838.504.223.215.393.473.51.774.117.296.176.625.176.984 0 .269-.045.531-.135.785-.086.25-.205.498-.357.744a6.541 6.541 0 0 1-.557.744c-.211.25-.441.508-.691.774l-1.899 2.027h3.973V542Z"
              className="72"
            />
            <path
              d="m298.703 557.254-3.41 7.746h-1.477l3.411-7.359h-4.424v-1.172h5.9v.785Zm5.496 7.746h-1.412v-6.797l-2.185.803v-1.236l3.509-1.301h.088V565Z"
              className="71"
            />
            <path
              d="m359.703 509.254-3.41 7.746h-1.477l3.411-7.359h-4.424v-1.172h5.9v.785Zm7.014 1.465c0 .258-.043.498-.129.72a1.904 1.904 0 0 1-.352.598 2.249 2.249 0 0 1-.726.574c.176.082.338.178.486.287.152.106.285.229.399.37a2.134 2.134 0 0 1 .509 1.412c0 .394-.072.744-.216 1.049a2.165 2.165 0 0 1-.592.761 2.617 2.617 0 0 1-.891.469 3.635 3.635 0 0 1-1.09.158c-.398 0-.769-.053-1.113-.158a2.552 2.552 0 0 1-.885-.469 2.13 2.13 0 0 1-.597-.756 2.482 2.482 0 0 1-.211-1.054c0-.235.031-.457.093-.668.067-.211.16-.407.282-.586.121-.172.265-.326.433-.463a2.68 2.68 0 0 1 .574-.358 2.157 2.157 0 0 1-.861-.755 2.074 2.074 0 0 1-.334-1.131c0-.379.065-.715.193-1.008a2.181 2.181 0 0 1 1.36-1.201 3.32 3.32 0 0 1 1.049-.158c.375 0 .72.052 1.037.158.32.101.599.254.838.457.23.199.412.447.545.744.132.293.199.629.199 1.008Zm-1.213 3.885c0-.211-.035-.403-.106-.575a1.365 1.365 0 0 0-.281-.457 1.303 1.303 0 0 0-.445-.281 1.572 1.572 0 0 0-.568-.1c-.215 0-.409.034-.581.1-.168.066-.312.16-.433.281a1.365 1.365 0 0 0-.281.457 1.68 1.68 0 0 0-.094.58c0 .219.033.416.099.592.067.172.163.317.288.434.121.113.265.201.433.263.172.059.365.088.58.088a1.6 1.6 0 0 0 .557-.093c.172-.063.32-.153.445-.27.117-.121.211-.266.281-.434.071-.171.106-.367.106-.585Zm-.182-3.833a1.4 1.4 0 0 0-.34-.931 1.194 1.194 0 0 0-.386-.258 1.301 1.301 0 0 0-.504-.094c-.184 0-.35.032-.498.094-.145.059-.27.143-.375.252a1.11 1.11 0 0 0-.235.404 1.66 1.66 0 0 0-.082.533c0 .192.028.368.082.528.055.156.137.289.246.398a1.1 1.1 0 0 0 .381.264c.149.062.315.094.498.094.184 0 .35-.032.498-.094.149-.063.276-.15.381-.264.106-.109.188-.242.246-.398.059-.16.088-.336.088-.528Z"
              className="78"
            />
            <path
              d="m333.703 523.254-3.41 7.746h-1.477l3.411-7.359h-4.424v-1.172h5.9v.785Zm1.916 3.516.457-4.301h4.588v1.242h-3.422l-.222 2.045c.14-.082.324-.16.55-.235.231-.074.494-.111.791-.111.403 0 .762.067 1.078.199.321.133.592.323.815.569.219.25.387.552.504.908.117.352.176.748.176 1.189 0 .391-.057.76-.17 1.108-.11.344-.28.644-.51.902a2.373 2.373 0 0 1-.861.61c-.348.148-.758.222-1.231.222-.359 0-.703-.051-1.031-.152a2.663 2.663 0 0 1-.873-.469 2.463 2.463 0 0 1-.627-.756 2.561 2.561 0 0 1-.276-1.049h1.366c.05.418.203.739.457.961.258.223.586.334.984.334.234 0 .438-.043.609-.129.172-.086.317-.207.434-.363a1.63 1.63 0 0 0 .246-.551c.055-.218.082-.455.082-.709 0-.246-.033-.47-.099-.673a1.508 1.508 0 0 0-.288-.54 1.275 1.275 0 0 0-.48-.351 1.615 1.615 0 0 0-.668-.129c-.168 0-.314.014-.439.041a1.632 1.632 0 0 0-.323.106 1.486 1.486 0 0 0-.269.164 2.545 2.545 0 0 0-.229.193l-1.119-.275Z"
              className="75"
            />
            <path
              d="m331.703 551.254-3.41 7.746h-1.477l3.411-7.359h-4.424v-1.172h5.9v.785Zm6.311 4.705h1.072v1.137h-1.072V559h-1.401v-1.904h-3.691l-.035-.862 3.685-5.765h1.442v5.49Zm-3.698 0h2.297v-3.615l-.164.304-2.133 3.311Z"
              className="74"
            />
            <path
              d="m360.703 539.254-3.41 7.746h-1.477l3.411-7.359h-4.424v-1.172h5.9v.785Zm7.207 0L364.5 547h-1.477l3.411-7.359h-4.424v-1.172h5.9v.785Z"
              className="77"
            />
            <path
              d="M397.889 549h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V549Zm3.627-4.23.457-4.301h4.588v1.242h-3.422l-.223 2.045c.141-.082.324-.16.551-.235.23-.074.494-.111.791-.111.402 0 .762.067 1.078.199.32.133.592.323.814.569.219.25.387.552.504.908.117.352.176.748.176 1.189 0 .391-.057.76-.17 1.108a2.437 2.437 0 0 1-.51.902 2.356 2.356 0 0 1-.861.61c-.348.148-.758.222-1.23.222-.36 0-.704-.051-1.032-.152a2.663 2.663 0 0 1-.873-.469 2.463 2.463 0 0 1-.627-.756 2.545 2.545 0 0 1-.275-1.049h1.365c.051.418.203.739.457.961.258.223.586.334.985.334.234 0 .437-.043.609-.129.172-.086.316-.207.434-.363a1.63 1.63 0 0 0 .246-.551c.054-.218.082-.455.082-.709 0-.246-.034-.47-.1-.673a1.49 1.49 0 0 0-.287-.54 1.279 1.279 0 0 0-.481-.351 1.613 1.613 0 0 0-.667-.129c-.168 0-.315.014-.44.041a1.46 1.46 0 0 0-.592.27 2.535 2.535 0 0 0-.228.193l-1.119-.275Zm8.132 3.076c.485 0 .897-.055 1.237-.164.34-.11.619-.266.838-.469.234-.223.406-.477.515-.762.11-.289.18-.599.211-.931v-.03a1.989 1.989 0 0 1-.662.492c-.141.067-.297.12-.469.159a2.46 2.46 0 0 1-.556.058c-.414 0-.776-.078-1.084-.234a2.24 2.24 0 0 1-.762-.627 2.738 2.738 0 0 1-.463-.914 3.827 3.827 0 0 1-.152-1.084c0-.41.06-.795.181-1.154a2.91 2.91 0 0 1 .539-.956 2.53 2.53 0 0 1 .862-.638c.344-.16.734-.24 1.172-.24.441 0 .832.084 1.172.252.343.167.634.396.873.685.25.313.439.691.568 1.137.129.441.193.906.193 1.394v.492a7.72 7.72 0 0 1-.234 1.922 3.89 3.89 0 0 1-.826 1.6c-.321.375-.742.67-1.266.885-.519.215-1.146.322-1.881.322h-.117v-1.195h.111Zm1.413-2.754a1.4 1.4 0 0 0 .867-.293c.121-.09.226-.195.316-.317a1.79 1.79 0 0 0 .229-.404v-.486c0-.34-.039-.641-.118-.903a2.13 2.13 0 0 0-.298-.656 1.317 1.317 0 0 0-.452-.398 1.126 1.126 0 0 0-.55-.141c-.219 0-.414.049-.586.147a1.235 1.235 0 0 0-.422.386 1.87 1.87 0 0 0-.27.58 2.759 2.759 0 0 0-.006 1.366c.055.215.141.406.258.574.114.164.254.297.422.398.172.098.375.147.61.147Z"
              className="159"
            />
            <path
              d="m355.703 569.254-3.41 7.746h-1.477l3.411-7.359h-4.424v-1.172h5.9v.785Zm5.889-.826v1.189h-.094c-.465 0-.869.065-1.213.194a2.384 2.384 0 0 0-1.418 1.341 3.474 3.474 0 0 0-.24 1.02c.094-.106.203-.207.328-.305.125-.101.264-.191.416-.269.145-.075.305-.133.481-.176a2.14 2.14 0 0 1 .556-.07c.414 0 .774.078 1.078.234.309.156.563.367.762.633.203.265.352.57.445.914.098.344.147.701.147 1.072 0 .406-.063.787-.188 1.143a2.657 2.657 0 0 1-.533.92 2.548 2.548 0 0 1-.873.627c-.34.148-.728.222-1.166.222-.449 0-.85-.086-1.201-.258a2.634 2.634 0 0 1-.891-.697 3.137 3.137 0 0 1-.586-1.072 4.279 4.279 0 0 1-.199-1.307v-.58c0-.687.088-1.342.264-1.963a3.936 3.936 0 0 1 .89-1.611 3.489 3.489 0 0 1 1.301-.891c.516-.207 1.106-.31 1.77-.31h.164Zm-1.53 4.06c-.167 0-.328.026-.48.076a1.684 1.684 0 0 0-.422.211c-.117.09-.222.194-.316.311a1.713 1.713 0 0 0-.235.393v.433c0 .34.037.639.112.897.078.257.183.472.316.644.133.172.287.303.463.393.176.09.363.134.562.134.219 0 .415-.042.586-.128.172-.09.319-.211.44-.364.121-.156.213-.34.275-.55.063-.215.094-.448.094-.698 0-.238-.031-.463-.094-.674a1.694 1.694 0 0 0-.263-.562 1.243 1.243 0 0 0-.44-.375 1.226 1.226 0 0 0-.598-.141Z"
              className="76"
            />
            <path
              d="M318.889 638h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V638Zm3.627-4.23.457-4.301h4.588v1.242h-3.422l-.223 2.045c.141-.082.324-.16.551-.235.23-.074.494-.111.791-.111.402 0 .762.067 1.078.199.32.133.592.323.814.569.219.25.387.552.504.908.117.352.176.748.176 1.189 0 .391-.057.76-.17 1.108a2.437 2.437 0 0 1-.51.902 2.356 2.356 0 0 1-.861.61c-.348.148-.758.222-1.23.222-.36 0-.704-.051-1.032-.152a2.663 2.663 0 0 1-.873-.469 2.463 2.463 0 0 1-.627-.756 2.545 2.545 0 0 1-.275-1.049h1.365c.051.418.203.739.457.961.258.223.586.334.985.334.234 0 .437-.043.609-.129.172-.086.316-.207.434-.363a1.63 1.63 0 0 0 .246-.551c.054-.218.082-.455.082-.709 0-.246-.034-.47-.1-.673a1.49 1.49 0 0 0-.287-.54 1.279 1.279 0 0 0-.481-.351 1.613 1.613 0 0 0-.667-.129c-.168 0-.315.014-.44.041a1.46 1.46 0 0 0-.592.27 2.535 2.535 0 0 0-.228.193l-1.119-.275Zm11.601 1.189h1.072v1.137h-1.072V638h-1.4v-1.904h-3.692l-.035-.862 3.686-5.765h1.441v5.49Zm-3.697 0h2.297v-3.615l-.164.304-2.133 3.311Z"
              className="154"
            />
            <path
              d="M289.889 617h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V617Zm3.627-4.23.457-4.301h4.588v1.242h-3.422l-.223 2.045c.141-.082.324-.16.551-.235.23-.074.494-.111.791-.111.402 0 .762.067 1.078.199.32.133.592.323.814.569.219.25.387.552.504.908.117.352.176.748.176 1.189 0 .391-.057.76-.17 1.108a2.437 2.437 0 0 1-.51.902 2.356 2.356 0 0 1-.861.61c-.348.148-.758.222-1.23.222-.36 0-.704-.051-1.032-.152a2.663 2.663 0 0 1-.873-.469 2.463 2.463 0 0 1-.627-.756 2.545 2.545 0 0 1-.275-1.049h1.365c.051.418.203.739.457.961.258.223.586.334.985.334.234 0 .437-.043.609-.129.172-.086.316-.207.434-.363a1.63 1.63 0 0 0 .246-.551c.054-.218.082-.455.082-.709 0-.246-.034-.47-.1-.673a1.49 1.49 0 0 0-.287-.54 1.279 1.279 0 0 0-.481-.351 1.613 1.613 0 0 0-.667-.129c-.168 0-.315.014-.44.041a1.46 1.46 0 0 0-.592.27 2.535 2.535 0 0 0-.228.193l-1.119-.275Zm8.478-.668h.838c.25 0 .469-.034.656-.1a1.23 1.23 0 0 0 .463-.293c.113-.109.199-.244.258-.404.062-.164.094-.34.094-.528 0-.203-.03-.384-.088-.545a1.102 1.102 0 0 0-.246-.41 1.138 1.138 0 0 0-.416-.246 1.704 1.704 0 0 0-.569-.088c-.191 0-.369.03-.533.088a1.198 1.198 0 0 0-.703.621c-.066.149-.1.315-.1.498h-1.4c0-.34.068-.652.205-.937a2.3 2.3 0 0 1 .568-.744c.243-.207.528-.369.856-.487a3.258 3.258 0 0 1 1.09-.175c.402 0 .771.052 1.107.158.34.101.629.254.867.457a2.1 2.1 0 0 1 .563.762c.133.3.199.65.199 1.048 0 .176-.027.352-.082.528a1.96 1.96 0 0 1-.234.509 2.264 2.264 0 0 1-.961.809c.254.086.469.199.644.34.18.137.326.291.44.463.113.176.195.365.246.568.051.199.076.406.076.621 0 .399-.074.754-.223 1.067a2.222 2.222 0 0 1-.597.779 2.706 2.706 0 0 1-.914.492 3.766 3.766 0 0 1-1.131.164c-.367 0-.721-.051-1.061-.152a2.673 2.673 0 0 1-.896-.457 2.308 2.308 0 0 1-.621-.75 2.286 2.286 0 0 1-.229-1.049h1.401c0 .187.033.361.099.521.07.157.17.29.299.399.125.113.273.201.445.264.176.062.369.093.58.093.227 0 .43-.029.61-.088.183-.062.338-.154.463-.275.121-.113.213-.254.275-.422.066-.172.1-.367.1-.586a1.61 1.61 0 0 0-.112-.633 1.135 1.135 0 0 0-.322-.439 1.393 1.393 0 0 0-.51-.252 2.264 2.264 0 0 0-.656-.088h-.838v-1.101Z"
              className="153"
            />
            <path
              d="M276.889 640h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V640Zm3.627-4.23.457-4.301h4.588v1.242h-3.422l-.223 2.045c.141-.082.324-.16.551-.235.23-.074.494-.111.791-.111.402 0 .762.067 1.078.199.32.133.592.323.814.569.219.25.387.552.504.908.117.352.176.748.176 1.189 0 .391-.057.76-.17 1.108a2.437 2.437 0 0 1-.51.902 2.356 2.356 0 0 1-.861.61c-.348.148-.758.222-1.23.222-.36 0-.704-.051-1.032-.152a2.663 2.663 0 0 1-.873-.469 2.463 2.463 0 0 1-.627-.756 2.545 2.545 0 0 1-.275-1.049h1.365c.051.418.203.739.457.961.258.223.586.334.985.334.234 0 .437-.043.609-.129.172-.086.316-.207.434-.363a1.63 1.63 0 0 0 .246-.551c.054-.218.082-.455.082-.709 0-.246-.034-.47-.1-.673a1.49 1.49 0 0 0-.287-.54 1.279 1.279 0 0 0-.481-.351 1.613 1.613 0 0 0-.667-.129c-.168 0-.315.014-.44.041a1.46 1.46 0 0 0-.592.27 2.535 2.535 0 0 0-.228.193l-1.119-.275Zm12.427 4.23h-5.724v-.973l2.777-3.023c.231-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.342 1.342 0 0 0-.527-.099c-.25 0-.467.035-.651.105a1.22 1.22 0 0 0-.457.299 1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.555-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.205.498-.358.744a6.528 6.528 0 0 1-.556.744c-.211.25-.442.508-.692.774l-1.898 2.027h3.972V640Z"
              className="152"
            />
            <path
              d="M352.889 609h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V609Zm3.627-4.23.457-4.301h4.588v1.242h-3.422l-.223 2.045c.141-.082.324-.16.551-.235.23-.074.494-.111.791-.111.402 0 .762.067 1.078.199.32.133.592.323.814.569.219.25.387.552.504.908.117.352.176.748.176 1.189 0 .391-.057.76-.17 1.108a2.437 2.437 0 0 1-.51.902 2.356 2.356 0 0 1-.861.61c-.348.148-.758.222-1.23.222-.36 0-.704-.051-1.032-.152a2.663 2.663 0 0 1-.873-.469 2.463 2.463 0 0 1-.627-.756 2.545 2.545 0 0 1-.275-1.049h1.365c.051.418.203.739.457.961.258.223.586.334.985.334.234 0 .437-.043.609-.129.172-.086.316-.207.434-.363a1.63 1.63 0 0 0 .246-.551c.054-.218.082-.455.082-.709 0-.246-.034-.47-.1-.673a1.49 1.49 0 0 0-.287-.54 1.279 1.279 0 0 0-.481-.351 1.613 1.613 0 0 0-.667-.129c-.168 0-.315.014-.44.041a1.46 1.46 0 0 0-.592.27 2.535 2.535 0 0 0-.228.193l-1.119-.275Zm7.207 0 .457-4.301h4.588v1.242h-3.422l-.223 2.045c.141-.082.324-.16.551-.235.23-.074.494-.111.791-.111.402 0 .762.067 1.078.199.32.133.592.323.814.569.219.25.387.552.504.908.118.352.176.748.176 1.189 0 .391-.057.76-.17 1.108a2.437 2.437 0 0 1-.51.902 2.356 2.356 0 0 1-.861.61c-.348.148-.758.222-1.23.222-.36 0-.704-.051-1.032-.152a2.663 2.663 0 0 1-.873-.469 2.463 2.463 0 0 1-.627-.756 2.545 2.545 0 0 1-.275-1.049h1.365c.051.418.203.739.457.961.258.223.586.334.985.334.234 0 .437-.043.609-.129.172-.086.316-.207.434-.363a1.63 1.63 0 0 0 .246-.551c.054-.218.082-.455.082-.709 0-.246-.033-.47-.1-.673a1.49 1.49 0 0 0-.287-.54 1.283 1.283 0 0 0-.48-.351 1.621 1.621 0 0 0-.668-.129c-.168 0-.315.014-.44.041a1.46 1.46 0 0 0-.592.27 2.535 2.535 0 0 0-.228.193l-1.119-.275Z"
              className="155"
            />
            <path
              d="M378.889 589h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V589Zm3.627-4.23.457-4.301h4.588v1.242h-3.422l-.223 2.045c.141-.082.324-.16.551-.235.23-.074.494-.111.791-.111.402 0 .762.067 1.078.199.32.133.592.323.814.569.219.25.387.552.504.908.117.352.176.748.176 1.189 0 .391-.057.76-.17 1.108a2.437 2.437 0 0 1-.51.902 2.356 2.356 0 0 1-.861.61c-.348.148-.758.222-1.23.222-.36 0-.704-.051-1.032-.152a2.663 2.663 0 0 1-.873-.469 2.463 2.463 0 0 1-.627-.756 2.545 2.545 0 0 1-.275-1.049h1.365c.051.418.203.739.457.961.258.223.586.334.985.334.234 0 .437-.043.609-.129.172-.086.316-.207.434-.363a1.63 1.63 0 0 0 .246-.551c.054-.218.082-.455.082-.709 0-.246-.034-.47-.1-.673a1.49 1.49 0 0 0-.287-.54 1.279 1.279 0 0 0-.481-.351 1.613 1.613 0 0 0-.667-.129c-.168 0-.315.014-.44.041a1.46 1.46 0 0 0-.592.27 2.535 2.535 0 0 0-.228.193l-1.119-.275Zm11.179-4.342v1.189h-.093c-.465 0-.87.065-1.213.194a2.382 2.382 0 0 0-1.418 1.341 3.507 3.507 0 0 0-.241 1.02c.094-.106.204-.207.329-.305.125-.101.263-.191.416-.269.144-.075.304-.133.48-.176.176-.047.361-.07.557-.07.414 0 .773.078 1.078.234.308.156.562.367.762.633.203.265.351.57.445.914.098.344.146.701.146 1.072 0 .406-.062.787-.187 1.143a2.673 2.673 0 0 1-.533.92c-.239.265-.53.474-.873.627-.34.148-.729.222-1.166.222-.45 0-.85-.086-1.202-.258a2.64 2.64 0 0 1-.89-.697 3.137 3.137 0 0 1-.586-1.072 4.248 4.248 0 0 1-.199-1.307v-.58c0-.687.088-1.342.263-1.963a3.95 3.95 0 0 1 .891-1.611 3.473 3.473 0 0 1 1.301-.891c.515-.207 1.105-.31 1.769-.31h.164Zm-1.529 4.06c-.168 0-.328.026-.48.076a1.668 1.668 0 0 0-.422.211c-.118.09-.223.194-.317.311a1.71 1.71 0 0 0-.234.393v.433c0 .34.037.639.111.897.078.257.184.472.317.644.132.172.287.303.463.393.175.09.363.134.562.134.219 0 .414-.042.586-.128.172-.09.318-.211.439-.364.121-.156.213-.34.276-.55.062-.215.094-.448.094-.698 0-.238-.032-.463-.094-.674a1.716 1.716 0 0 0-.264-.562 1.24 1.24 0 0 0-.439-.375 1.226 1.226 0 0 0-.598-.141Z"
              className="156"
            />
            <path
              d="M386.889 626h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V626Zm8.888-3.252c0 .547-.064 1.031-.193 1.453a2.875 2.875 0 0 1-.545 1.049 2.237 2.237 0 0 1-.867.656c-.34.145-.727.217-1.16.217-.43 0-.817-.072-1.16-.217a2.286 2.286 0 0 1-.873-.656 2.877 2.877 0 0 1-.557-1.049 5.121 5.121 0 0 1-.188-1.453v-2.021c0-.547.063-1.03.188-1.448.129-.422.312-.777.551-1.066.238-.285.527-.5.867-.645.344-.148.73-.222 1.16-.222.434 0 .82.074 1.16.222.344.145.637.36.879.645.234.289.416.644.545 1.066.129.418.193.901.193 1.448v2.021Zm-4.136-.498 2.713-2.057a3.226 3.226 0 0 0-.129-.791 1.447 1.447 0 0 0-.287-.545 1.034 1.034 0 0 0-.405-.281 1.435 1.435 0 0 0-.533-.094c-.215 0-.404.038-.568.112a1.05 1.05 0 0 0-.411.328 1.656 1.656 0 0 0-.287.639 3.94 3.94 0 0 0-.093.914v1.775Zm2.724.732v-1.711l-2.713 2.045c.02.27.061.508.123.715.067.207.155.379.264.516.109.148.244.26.404.334.164.074.354.111.569.111.211 0 .396-.035.556-.105a1.14 1.14 0 0 0 .411-.323c.128-.164.224-.378.287-.644.066-.266.099-.578.099-.938Zm8.578 3.018h-5.724v-.973l2.777-3.023c.231-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.342 1.342 0 0 0-.527-.099c-.25 0-.467.035-.651.105a1.22 1.22 0 0 0-.457.299 1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.555-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.205.498-.358.744a6.528 6.528 0 0 1-.556.744c-.211.25-.442.508-.692.774l-1.898 2.027h3.972V626Z"
              className="102"
            />
            <path
              d="M405.889 579h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V579Zm3.627-4.23.457-4.301h4.588v1.242h-3.422l-.223 2.045c.141-.082.324-.16.551-.235.23-.074.494-.111.791-.111.402 0 .762.067 1.078.199.32.133.592.323.814.569.219.25.387.552.504.908.117.352.176.748.176 1.189 0 .391-.057.76-.17 1.108a2.437 2.437 0 0 1-.51.902 2.356 2.356 0 0 1-.861.61c-.348.148-.758.222-1.23.222-.36 0-.704-.051-1.032-.152a2.663 2.663 0 0 1-.873-.469 2.463 2.463 0 0 1-.627-.756 2.545 2.545 0 0 1-.275-1.049h1.365c.051.418.203.739.457.961.258.223.586.334.985.334.234 0 .437-.043.609-.129.172-.086.316-.207.434-.363a1.63 1.63 0 0 0 .246-.551c.054-.218.082-.455.082-.709 0-.246-.034-.47-.1-.673a1.49 1.49 0 0 0-.287-.54 1.279 1.279 0 0 0-.481-.351 1.613 1.613 0 0 0-.667-.129c-.168 0-.315.014-.44.041a1.46 1.46 0 0 0-.592.27 2.535 2.535 0 0 0-.228.193l-1.119-.275Zm12.304-2.051c0 .258-.043.498-.129.72a1.92 1.92 0 0 1-.351.598 2.302 2.302 0 0 1-.322.317 2.269 2.269 0 0 1-.405.257c.176.082.338.178.487.287.152.106.285.229.398.37a2.134 2.134 0 0 1 .51 1.412c0 .394-.072.744-.217 1.049a2.165 2.165 0 0 1-.592.761 2.621 2.621 0 0 1-.89.469 3.64 3.64 0 0 1-1.09.158c-.399 0-.77-.053-1.114-.158a2.556 2.556 0 0 1-.884-.469 2.144 2.144 0 0 1-.598-.756 2.482 2.482 0 0 1-.211-1.054c0-.235.031-.457.094-.668.066-.211.16-.407.281-.586.121-.172.266-.326.434-.463a2.68 2.68 0 0 1 .574-.358 2.293 2.293 0 0 1-.492-.328 2.093 2.093 0 0 1-.615-.955 2.031 2.031 0 0 1-.088-.603c0-.379.064-.715.193-1.008.133-.293.314-.541.545-.744.226-.203.498-.356.814-.457.321-.106.67-.158 1.049-.158.375 0 .721.052 1.037.158.321.101.6.254.838.457.231.199.412.447.545.744.133.293.199.629.199 1.008Zm-1.213 3.885c0-.211-.035-.403-.105-.575a1.365 1.365 0 0 0-.281-.457 1.307 1.307 0 0 0-.446-.281 1.568 1.568 0 0 0-.568-.1c-.215 0-.408.034-.58.1-.168.066-.313.16-.434.281a1.382 1.382 0 0 0-.281.457 1.704 1.704 0 0 0-.094.58c0 .219.034.416.1.592.066.172.162.317.287.434.121.113.266.201.434.263.172.059.365.088.58.088.203 0 .388-.031.556-.093.172-.063.321-.153.446-.27.117-.121.211-.266.281-.434.07-.171.105-.367.105-.585Zm-.181-3.833a1.38 1.38 0 0 0-.094-.521 1.291 1.291 0 0 0-.246-.41 1.188 1.188 0 0 0-.387-.258 1.294 1.294 0 0 0-.504-.094c-.183 0-.349.032-.498.094a1.097 1.097 0 0 0-.375.252 1.123 1.123 0 0 0-.234.404c-.055.16-.082.338-.082.533 0 .192.027.368.082.528.055.156.137.289.246.398.105.114.232.201.381.264.148.062.314.094.498.094.183 0 .349-.032.498-.094a1.154 1.154 0 0 0 .627-.662 1.54 1.54 0 0 0 .088-.528Z"
              className="158"
            />
            <path
              d="M406.889 597h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V597Zm3.627-4.23.457-4.301h4.588v1.242h-3.422l-.223 2.045c.141-.082.324-.16.551-.235.23-.074.494-.111.791-.111.402 0 .762.067 1.078.199.32.133.592.323.814.569.219.25.387.552.504.908.117.352.176.748.176 1.189 0 .391-.057.76-.17 1.108a2.437 2.437 0 0 1-.51.902 2.356 2.356 0 0 1-.861.61c-.348.148-.758.222-1.23.222-.36 0-.704-.051-1.032-.152a2.663 2.663 0 0 1-.873-.469 2.463 2.463 0 0 1-.627-.756 2.545 2.545 0 0 1-.275-1.049h1.365c.051.418.203.739.457.961.258.223.586.334.985.334.234 0 .437-.043.609-.129.172-.086.316-.207.434-.363a1.63 1.63 0 0 0 .246-.551c.054-.218.082-.455.082-.709 0-.246-.034-.47-.1-.673a1.49 1.49 0 0 0-.287-.54 1.279 1.279 0 0 0-.481-.351 1.613 1.613 0 0 0-.667-.129c-.168 0-.315.014-.44.041a1.46 1.46 0 0 0-.592.27 2.535 2.535 0 0 0-.228.193l-1.119-.275Zm12.498-3.516-3.41 7.746h-1.477l3.41-7.359h-4.424v-1.172h5.901v.785Z"
              className="157"
            />
            <path
              d="M419.889 638h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V638Zm8.888-3.252c0 .547-.064 1.031-.193 1.453a2.875 2.875 0 0 1-.545 1.049 2.237 2.237 0 0 1-.867.656c-.34.145-.727.217-1.16.217-.43 0-.817-.072-1.16-.217a2.286 2.286 0 0 1-.873-.656 2.877 2.877 0 0 1-.557-1.049 5.121 5.121 0 0 1-.188-1.453v-2.021c0-.547.063-1.03.188-1.448.129-.422.312-.777.551-1.066.238-.285.527-.5.867-.645.344-.148.73-.222 1.16-.222.434 0 .82.074 1.16.222.344.145.637.36.879.645.234.289.416.644.545 1.066.129.418.193.901.193 1.448v2.021Zm-4.136-.498 2.713-2.057a3.226 3.226 0 0 0-.129-.791 1.447 1.447 0 0 0-.287-.545 1.034 1.034 0 0 0-.405-.281 1.435 1.435 0 0 0-.533-.094c-.215 0-.404.038-.568.112a1.05 1.05 0 0 0-.411.328 1.656 1.656 0 0 0-.287.639 3.94 3.94 0 0 0-.093.914v1.775Zm2.724.732v-1.711l-2.713 2.045c.02.27.061.508.123.715.067.207.155.379.264.516.109.148.244.26.404.334.164.074.354.111.569.111.211 0 .396-.035.556-.105a1.14 1.14 0 0 0 .411-.323c.128-.164.224-.378.287-.644.066-.266.099-.578.099-.938Zm4.629-1.88h.838c.25 0 .469-.034.656-.1a1.23 1.23 0 0 0 .463-.293c.113-.109.199-.244.258-.404.062-.164.094-.34.094-.528 0-.203-.03-.384-.088-.545a1.102 1.102 0 0 0-.246-.41 1.138 1.138 0 0 0-.416-.246 1.704 1.704 0 0 0-.569-.088c-.191 0-.369.03-.533.088a1.198 1.198 0 0 0-.703.621c-.066.149-.1.315-.1.498h-1.4c0-.34.068-.652.205-.937a2.3 2.3 0 0 1 .568-.744c.243-.207.528-.369.856-.487a3.258 3.258 0 0 1 1.09-.175c.402 0 .771.052 1.107.158.34.101.629.254.867.457a2.1 2.1 0 0 1 .563.762c.133.3.199.65.199 1.048 0 .176-.027.352-.082.528a1.96 1.96 0 0 1-.234.509 2.264 2.264 0 0 1-.961.809c.254.086.469.199.644.34.18.137.326.291.44.463.113.176.195.365.246.568.051.199.076.406.076.621 0 .399-.074.754-.223 1.067a2.222 2.222 0 0 1-.597.779 2.706 2.706 0 0 1-.914.492 3.766 3.766 0 0 1-1.131.164c-.367 0-.721-.051-1.061-.152a2.673 2.673 0 0 1-.896-.457 2.308 2.308 0 0 1-.621-.75 2.286 2.286 0 0 1-.229-1.049h1.401c0 .187.033.361.099.521.07.157.17.29.299.399.125.113.273.201.445.264.176.062.369.093.58.093.227 0 .43-.029.61-.088.183-.062.338-.154.463-.275.121-.113.213-.254.275-.422.066-.172.1-.367.1-.586a1.61 1.61 0 0 0-.112-.633 1.135 1.135 0 0 0-.322-.439 1.393 1.393 0 0 0-.51-.252 2.264 2.264 0 0 0-.656-.088h-.838v-1.101Z"
              className="103"
            />
            <path
              d="M355.889 672h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V672Zm8.888-3.252c0 .547-.064 1.031-.193 1.453a2.875 2.875 0 0 1-.545 1.049 2.237 2.237 0 0 1-.867.656c-.34.145-.727.217-1.16.217-.43 0-.817-.072-1.16-.217a2.286 2.286 0 0 1-.873-.656 2.877 2.877 0 0 1-.557-1.049 5.121 5.121 0 0 1-.188-1.453v-2.021c0-.547.063-1.03.188-1.448.129-.422.312-.777.551-1.066.238-.285.527-.5.867-.645.344-.148.73-.222 1.16-.222.434 0 .82.074 1.16.222.344.145.637.36.879.645.234.289.416.644.545 1.066.129.418.193.901.193 1.448v2.021Zm-4.136-.498 2.713-2.057a3.226 3.226 0 0 0-.129-.791 1.447 1.447 0 0 0-.287-.545 1.034 1.034 0 0 0-.405-.281 1.435 1.435 0 0 0-.533-.094c-.215 0-.404.038-.568.112a1.05 1.05 0 0 0-.411.328 1.656 1.656 0 0 0-.287.639 3.94 3.94 0 0 0-.093.914v1.775Zm2.724.732v-1.711l-2.713 2.045c.02.27.061.508.123.715.067.207.155.379.264.516.109.148.244.26.404.334.164.074.354.111.569.111.211 0 .396-.035.556-.105a1.14 1.14 0 0 0 .411-.323c.128-.164.224-.378.287-.644.066-.266.099-.578.099-.938Zm6.938 3.018h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V672Z"
              className="101"
            />
            <path
              d="M250.385 675.428v1.189h-.094c-.465 0-.869.065-1.213.194a2.384 2.384 0 0 0-1.418 1.341 3.474 3.474 0 0 0-.24 1.02c.094-.106.203-.207.328-.305.125-.101.264-.191.416-.269.145-.075.305-.133.481-.176a2.14 2.14 0 0 1 .556-.07c.414 0 .774.078 1.078.234.309.156.563.367.762.633.203.265.352.57.445.914.098.344.147.701.147 1.072 0 .406-.063.787-.188 1.143a2.673 2.673 0 0 1-.533.92 2.548 2.548 0 0 1-.873.627c-.34.148-.728.222-1.166.222-.449 0-.85-.086-1.201-.258a2.634 2.634 0 0 1-.891-.697 3.137 3.137 0 0 1-.586-1.072 4.248 4.248 0 0 1-.199-1.307v-.58c0-.687.088-1.342.264-1.963a3.936 3.936 0 0 1 .89-1.611 3.489 3.489 0 0 1 1.301-.891c.516-.207 1.106-.31 1.77-.31h.164Zm-1.53 4.06c-.167 0-.328.026-.48.076a1.684 1.684 0 0 0-.422.211c-.117.09-.223.194-.316.311a1.713 1.713 0 0 0-.235.393v.433c0 .34.037.639.112.897.078.257.183.472.316.644.133.172.287.303.463.393.176.09.363.134.562.134.219 0 .415-.042.586-.128.172-.09.319-.211.44-.364.121-.156.213-.34.275-.55.063-.215.094-.448.094-.698 0-.238-.031-.463-.094-.674a1.694 1.694 0 0 0-.263-.562 1.243 1.243 0 0 0-.44-.375 1.226 1.226 0 0 0-.598-.141Zm5.69 3.358c.484 0 .896-.055 1.236-.164.34-.11.619-.266.838-.469.235-.223.406-.477.516-.762.109-.289.179-.599.211-.931v-.03a2.038 2.038 0 0 1-.662.492c-.141.067-.297.12-.469.159a2.468 2.468 0 0 1-.557.058c-.414 0-.775-.078-1.084-.234a2.26 2.26 0 0 1-.762-.627 2.717 2.717 0 0 1-.462-.914 3.792 3.792 0 0 1-.153-1.084c0-.41.061-.795.182-1.154a2.91 2.91 0 0 1 .539-.956c.234-.269.521-.482.861-.638.344-.16.735-.24 1.172-.24.442 0 .832.084 1.172.252.344.167.635.396.873.685.25.313.44.691.568 1.137.129.441.194.906.194 1.394v.492c0 .672-.078 1.313-.235 1.922a3.877 3.877 0 0 1-.826 1.6c-.32.375-.742.67-1.265.885-.52.215-1.147.322-1.881.322h-.117v-1.195h.111Zm1.412-2.754a1.41 1.41 0 0 0 .867-.293c.121-.09.227-.195.317-.317.093-.125.17-.259.228-.404v-.486c0-.34-.039-.641-.117-.903a2.13 2.13 0 0 0-.299-.656 1.314 1.314 0 0 0-.451-.398 1.132 1.132 0 0 0-.551-.141c-.219 0-.414.049-.586.147a1.244 1.244 0 0 0-.422.386 1.846 1.846 0 0 0-.269.58c-.059.219-.088.45-.088.692 0 .234.027.459.082.674.055.215.141.406.258.574.113.164.254.297.422.398.172.098.375.147.609.147Z"
              className="69"
            />
            <path
              d="M250.385 709.428v1.189h-.094c-.465 0-.869.065-1.213.194a2.384 2.384 0 0 0-1.418 1.341 3.474 3.474 0 0 0-.24 1.02c.094-.106.203-.207.328-.305.125-.101.264-.191.416-.269.145-.075.305-.133.481-.176a2.14 2.14 0 0 1 .556-.07c.414 0 .774.078 1.078.234.309.156.563.367.762.633.203.265.352.57.445.914.098.344.147.701.147 1.072 0 .406-.063.787-.188 1.143a2.673 2.673 0 0 1-.533.92 2.548 2.548 0 0 1-.873.627c-.34.148-.728.222-1.166.222-.449 0-.85-.086-1.201-.258a2.634 2.634 0 0 1-.891-.697 3.137 3.137 0 0 1-.586-1.072 4.248 4.248 0 0 1-.199-1.307v-.58c0-.687.088-1.342.264-1.963a3.936 3.936 0 0 1 .89-1.611 3.489 3.489 0 0 1 1.301-.891c.516-.207 1.106-.31 1.77-.31h.164Zm-1.53 4.06c-.167 0-.328.026-.48.076a1.684 1.684 0 0 0-.422.211c-.117.09-.223.194-.316.311a1.713 1.713 0 0 0-.235.393v.433c0 .34.037.639.112.897.078.257.183.472.316.644.133.172.287.303.463.393.176.09.363.134.562.134.219 0 .415-.042.586-.128.172-.09.319-.211.44-.364.121-.156.213-.34.275-.55.063-.215.094-.448.094-.698 0-.238-.031-.463-.094-.674a1.694 1.694 0 0 0-.263-.562 1.243 1.243 0 0 0-.44-.375 1.226 1.226 0 0 0-.598-.141Zm10.055-3.234L255.5 718h-1.477l3.411-7.359h-4.424v-1.172h5.9v.785Z"
              className="67"
            />
            <path
              d="M206.385 722.428v1.189h-.094c-.465 0-.869.065-1.213.194a2.384 2.384 0 0 0-1.418 1.341 3.474 3.474 0 0 0-.24 1.02c.094-.106.203-.207.328-.305.125-.101.264-.191.416-.269.145-.075.305-.133.481-.176a2.14 2.14 0 0 1 .556-.07c.414 0 .774.078 1.078.234.309.156.563.367.762.633.203.265.352.57.445.914.098.344.147.701.147 1.072 0 .406-.063.787-.188 1.143a2.673 2.673 0 0 1-.533.92 2.548 2.548 0 0 1-.873.627c-.34.148-.728.222-1.166.222-.449 0-.85-.086-1.201-.258a2.634 2.634 0 0 1-.891-.697 3.137 3.137 0 0 1-.586-1.072 4.248 4.248 0 0 1-.199-1.307v-.58c0-.687.088-1.342.264-1.963a3.936 3.936 0 0 1 .89-1.611 3.489 3.489 0 0 1 1.301-.891c.516-.207 1.106-.31 1.77-.31h.164Zm-1.53 4.06c-.167 0-.328.026-.48.076a1.684 1.684 0 0 0-.422.211c-.117.09-.223.194-.316.311a1.713 1.713 0 0 0-.235.393v.433c0 .34.037.639.112.897.078.257.183.472.316.644.133.172.287.303.463.393.176.09.363.134.562.134.219 0 .415-.042.586-.128.172-.09.319-.211.44-.364.121-.156.213-.34.275-.55.063-.215.094-.448.094-.698 0-.238-.031-.463-.094-.674a1.694 1.694 0 0 0-.263-.562 1.243 1.243 0 0 0-.44-.375 1.226 1.226 0 0 0-.598-.141Zm8.737-4.06v1.189h-.094c-.465 0-.869.065-1.213.194a2.384 2.384 0 0 0-1.418 1.341 3.474 3.474 0 0 0-.24 1.02c.094-.106.203-.207.328-.305.125-.101.264-.191.416-.269.145-.075.305-.133.481-.176a2.14 2.14 0 0 1 .556-.07c.414 0 .774.078 1.078.234.309.156.563.367.762.633.203.265.352.57.445.914.098.344.147.701.147 1.072 0 .406-.063.787-.188 1.143a2.657 2.657 0 0 1-.533.92 2.548 2.548 0 0 1-.873.627c-.34.148-.728.222-1.166.222-.449 0-.85-.086-1.201-.258a2.634 2.634 0 0 1-.891-.697 3.137 3.137 0 0 1-.586-1.072 4.279 4.279 0 0 1-.199-1.307v-.58c0-.687.088-1.342.264-1.963a3.936 3.936 0 0 1 .89-1.611 3.489 3.489 0 0 1 1.301-.891c.516-.207 1.106-.31 1.77-.31h.164Zm-1.53 4.06c-.167 0-.328.026-.48.076a1.684 1.684 0 0 0-.422.211c-.117.09-.222.194-.316.311a1.713 1.713 0 0 0-.235.393v.433c0 .34.037.639.112.897.078.257.183.472.316.644.133.172.287.303.463.393.176.09.363.134.562.134.219 0 .415-.042.586-.128.172-.09.319-.211.44-.364.121-.156.213-.34.275-.55.063-.215.094-.448.094-.698 0-.238-.031-.463-.094-.674a1.694 1.694 0 0 0-.263-.562 1.243 1.243 0 0 0-.44-.375 1.226 1.226 0 0 0-.598-.141Z"
              className="66"
            />
            <path
              d="M151.633 723h-5.725v-.973l2.778-3.023c.23-.254.423-.481.58-.68a5.2 5.2 0 0 0 .38-.556c.094-.168.161-.325.2-.469.043-.149.064-.297.064-.445 0-.2-.029-.381-.088-.545a1.141 1.141 0 0 0-.258-.422 1.215 1.215 0 0 0-.41-.276 1.342 1.342 0 0 0-.527-.099c-.25 0-.467.035-.65.105-.184.071-.336.17-.457.299a1.337 1.337 0 0 0-.282.498c-.062.191-.093.41-.093.656h-1.407c0-.371.069-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.555-.441.914-.586a3.27 3.27 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.612.289.838.504.223.215.393.473.51.774.117.296.176.625.176.984 0 .269-.045.531-.135.785-.086.25-.205.498-.357.744a6.541 6.541 0 0 1-.557.744c-.211.25-.441.508-.691.774l-1.899 2.027h3.973V723Zm7.277-7.746L155.5 723h-1.477l3.411-7.359h-4.424v-1.172h5.9v.785Z"
              className="27"
            />
            <path
              d="M259.385 751.428v1.189h-.094c-.465 0-.869.065-1.213.194a2.384 2.384 0 0 0-1.418 1.341 3.474 3.474 0 0 0-.24 1.02c.094-.106.203-.207.328-.305.125-.101.264-.191.416-.269.145-.075.305-.133.481-.176a2.14 2.14 0 0 1 .556-.07c.414 0 .774.078 1.078.234.309.156.563.367.762.633.203.265.352.57.445.914.098.344.147.701.147 1.072 0 .406-.063.787-.188 1.143a2.673 2.673 0 0 1-.533.92 2.548 2.548 0 0 1-.873.627c-.34.148-.728.222-1.166.222-.449 0-.85-.086-1.201-.258a2.634 2.634 0 0 1-.891-.697 3.137 3.137 0 0 1-.586-1.072 4.248 4.248 0 0 1-.199-1.307v-.58c0-.687.088-1.342.264-1.963a3.936 3.936 0 0 1 .89-1.611 3.489 3.489 0 0 1 1.301-.891c.516-.207 1.106-.31 1.77-.31h.164Zm-1.53 4.06c-.167 0-.328.026-.48.076a1.684 1.684 0 0 0-.422.211c-.117.09-.223.194-.316.311a1.713 1.713 0 0 0-.235.393v.433c0 .34.037.639.112.897.078.257.183.472.316.644.133.172.287.303.463.393.176.09.363.134.562.134.219 0 .415-.042.586-.128.172-.09.319-.211.44-.364.121-.156.213-.34.275-.55.063-.215.094-.448.094-.698 0-.238-.031-.463-.094-.674a1.694 1.694 0 0 0-.263-.562 1.243 1.243 0 0 0-.44-.375 1.226 1.226 0 0 0-.598-.141Zm4.764.282.457-4.301h4.588v1.242h-3.422l-.222 2.045c.14-.082.324-.16.55-.235.231-.074.494-.111.791-.111.403 0 .762.067 1.078.199.321.133.592.323.815.569.219.25.387.552.504.908.117.352.176.748.176 1.189 0 .391-.057.76-.17 1.108-.11.344-.28.644-.51.902a2.373 2.373 0 0 1-.861.61c-.348.148-.758.222-1.231.222-.359 0-.703-.051-1.031-.152a2.663 2.663 0 0 1-.873-.469 2.463 2.463 0 0 1-.627-.756 2.561 2.561 0 0 1-.276-1.049h1.366c.05.418.203.739.457.961.258.223.586.334.984.334.234 0 .438-.043.609-.129.172-.086.317-.207.434-.363a1.63 1.63 0 0 0 .246-.551c.055-.218.082-.455.082-.709 0-.246-.033-.47-.099-.673a1.508 1.508 0 0 0-.288-.54 1.275 1.275 0 0 0-.48-.351 1.615 1.615 0 0 0-.668-.129c-.168 0-.314.014-.439.041a1.632 1.632 0 0 0-.323.106 1.486 1.486 0 0 0-.269.164 2.545 2.545 0 0 0-.229.193l-1.119-.275Z"
              className="65"
            />
            <path
              d="M293.385 766.428v1.189h-.094c-.465 0-.869.065-1.213.194a2.384 2.384 0 0 0-1.418 1.341 3.474 3.474 0 0 0-.24 1.02c.094-.106.203-.207.328-.305.125-.101.264-.191.416-.269.145-.075.305-.133.481-.176a2.14 2.14 0 0 1 .556-.07c.414 0 .774.078 1.078.234.309.156.563.367.762.633.203.265.352.57.445.914.098.344.147.701.147 1.072 0 .406-.063.787-.188 1.143a2.673 2.673 0 0 1-.533.92 2.548 2.548 0 0 1-.873.627c-.34.148-.728.222-1.166.222-.449 0-.85-.086-1.201-.258a2.634 2.634 0 0 1-.891-.697 3.137 3.137 0 0 1-.586-1.072 4.248 4.248 0 0 1-.199-1.307v-.58c0-.687.088-1.342.264-1.963a3.936 3.936 0 0 1 .89-1.611 3.489 3.489 0 0 1 1.301-.891c.516-.207 1.106-.31 1.77-.31h.164Zm-1.53 4.06c-.167 0-.328.026-.48.076a1.684 1.684 0 0 0-.422.211c-.117.09-.223.194-.316.311a1.713 1.713 0 0 0-.235.393v.433c0 .34.037.639.112.897.078.257.183.472.316.644.133.172.287.303.463.393.176.09.363.134.562.134.219 0 .415-.042.586-.128.172-.09.319-.211.44-.364.121-.156.213-.34.275-.55.063-.215.094-.448.094-.698 0-.238-.031-.463-.094-.674a1.694 1.694 0 0 0-.263-.562 1.243 1.243 0 0 0-.44-.375 1.226 1.226 0 0 0-.598-.141Zm9.159 1.471h1.072v1.137h-1.072V775h-1.401v-1.904h-3.691l-.035-.862 3.685-5.765h1.442v5.49Zm-3.698 0h2.297v-3.615l-.164.304-2.133 3.311Z"
              className="64"
            />
            <path
              d="M335.889 760h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V760Zm3.627-4.23.457-4.301h4.588v1.242h-3.422l-.223 2.045c.141-.082.324-.16.551-.235.23-.074.494-.111.791-.111.402 0 .762.067 1.078.199.32.133.592.323.814.569.219.25.387.552.504.908.117.352.176.748.176 1.189 0 .391-.057.76-.17 1.108a2.437 2.437 0 0 1-.51.902 2.356 2.356 0 0 1-.861.61c-.348.148-.758.222-1.23.222-.36 0-.704-.051-1.032-.152a2.663 2.663 0 0 1-.873-.469 2.463 2.463 0 0 1-.627-.756 2.545 2.545 0 0 1-.275-1.049h1.365c.051.418.203.739.457.961.258.223.586.334.985.334.234 0 .437-.043.609-.129.172-.086.316-.207.434-.363a1.63 1.63 0 0 0 .246-.551c.054-.218.082-.455.082-.709 0-.246-.034-.47-.1-.673a1.49 1.49 0 0 0-.287-.54 1.279 1.279 0 0 0-.481-.351 1.613 1.613 0 0 0-.667-.129c-.168 0-.315.014-.44.041a1.46 1.46 0 0 0-.592.27 2.535 2.535 0 0 0-.228.193l-1.119-.275Zm10.787 4.23h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V760Z"
              className="151"
            />
            <path
              d="M390.529 778h-5.724v-.973l2.777-3.023c.23-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.554-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.424 6.424 0 0 1-.557.744c-.21.25-.441.508-.691.774l-1.898 2.027h3.972V778Zm7.207 0h-5.724v-.973l2.777-3.023c.231-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.555-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.528 6.528 0 0 1-.556.744c-.211.25-.442.508-.692.774l-1.898 2.027h3.972V778Zm7.248-3.252c0 .547-.064 1.031-.193 1.453a2.875 2.875 0 0 1-.545 1.049 2.237 2.237 0 0 1-.867.656c-.34.145-.727.217-1.16.217-.43 0-.817-.072-1.16-.217a2.286 2.286 0 0 1-.873-.656 2.877 2.877 0 0 1-.557-1.049 5.121 5.121 0 0 1-.188-1.453v-2.021c0-.547.063-1.03.188-1.448.129-.422.312-.777.551-1.066.238-.285.527-.5.867-.645.344-.148.73-.222 1.16-.222.434 0 .82.074 1.16.222.344.145.637.36.879.645.234.289.416.644.545 1.066.129.418.193.901.193 1.448v2.021Zm-4.136-.498 2.713-2.057a3.226 3.226 0 0 0-.129-.791 1.433 1.433 0 0 0-.287-.545 1.034 1.034 0 0 0-.405-.281 1.435 1.435 0 0 0-.533-.094c-.215 0-.404.038-.568.112a1.04 1.04 0 0 0-.41.328 1.642 1.642 0 0 0-.288.639 3.94 3.94 0 0 0-.093.914v1.775Zm2.724.732v-1.711l-2.713 2.045c.02.27.061.508.123.715.067.207.155.379.264.516.109.148.244.26.404.334.164.074.354.111.569.111.211 0 .396-.035.556-.105a1.14 1.14 0 0 0 .411-.323c.128-.164.224-.378.287-.644.066-.266.099-.578.099-.938Z"
              className="220"
            />
            <path
              d="M423.889 733h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V733Zm8.888-3.252c0 .547-.064 1.031-.193 1.453a2.875 2.875 0 0 1-.545 1.049 2.237 2.237 0 0 1-.867.656c-.34.145-.727.217-1.16.217-.43 0-.817-.072-1.16-.217a2.286 2.286 0 0 1-.873-.656 2.877 2.877 0 0 1-.557-1.049 5.121 5.121 0 0 1-.188-1.453v-2.021c0-.547.063-1.03.188-1.448.129-.422.312-.777.551-1.066.238-.285.527-.5.867-.645.344-.148.73-.222 1.16-.222.434 0 .82.074 1.16.222.344.145.637.36.879.645.234.289.416.644.545 1.066.129.418.193.901.193 1.448v2.021Zm-4.136-.498 2.713-2.057a3.226 3.226 0 0 0-.129-.791 1.447 1.447 0 0 0-.287-.545 1.034 1.034 0 0 0-.405-.281 1.435 1.435 0 0 0-.533-.094c-.215 0-.404.038-.568.112a1.05 1.05 0 0 0-.411.328 1.656 1.656 0 0 0-.287.639 3.94 3.94 0 0 0-.093.914v1.775Zm2.724.732v-1.711l-2.713 2.045c.02.27.061.508.123.715.067.207.155.379.264.516.109.148.244.26.404.334.164.074.354.111.569.111.211 0 .396-.035.556-.105a1.14 1.14 0 0 0 .411-.323c.128-.164.224-.378.287-.644.066-.266.099-.578.099-.938Zm7.33-5.554v1.189h-.093c-.465 0-.87.065-1.213.194a2.382 2.382 0 0 0-1.418 1.341 3.507 3.507 0 0 0-.241 1.02c.094-.106.204-.207.329-.305.125-.101.263-.191.416-.269.144-.075.304-.133.48-.176.176-.047.361-.07.557-.07.414 0 .773.078 1.078.234.308.156.562.367.762.633.203.265.351.57.445.914.098.344.146.701.146 1.072 0 .406-.062.787-.187 1.143a2.673 2.673 0 0 1-.533.92c-.239.265-.53.474-.873.627-.34.148-.729.222-1.166.222-.45 0-.85-.086-1.202-.258a2.64 2.64 0 0 1-.89-.697 3.137 3.137 0 0 1-.586-1.072 4.248 4.248 0 0 1-.199-1.307v-.58c0-.687.088-1.342.263-1.963a3.95 3.95 0 0 1 .891-1.611 3.473 3.473 0 0 1 1.301-.891c.515-.207 1.105-.31 1.769-.31h.164Zm-1.529 4.06c-.168 0-.328.026-.48.076a1.668 1.668 0 0 0-.422.211c-.118.09-.223.194-.317.311a1.71 1.71 0 0 0-.234.393v.433c0 .34.037.639.111.897.078.257.184.472.317.644.132.172.287.303.463.393.175.09.363.134.562.134.219 0 .414-.042.586-.128.172-.09.318-.211.439-.364.121-.156.213-.34.276-.55.062-.215.094-.448.094-.698 0-.238-.032-.463-.094-.674a1.716 1.716 0 0 0-.264-.562 1.24 1.24 0 0 0-.439-.375 1.226 1.226 0 0 0-.598-.141Z"
              className="106"
            />
            <path
              d="M174.633 825h-5.725v-.973l2.778-3.023c.23-.254.423-.481.58-.68a5.2 5.2 0 0 0 .38-.556c.094-.168.161-.325.2-.469.043-.149.064-.297.064-.445 0-.2-.029-.381-.088-.545a1.141 1.141 0 0 0-.258-.422 1.215 1.215 0 0 0-.41-.276 1.342 1.342 0 0 0-.527-.099c-.25 0-.467.035-.65.105-.184.071-.336.17-.457.299a1.337 1.337 0 0 0-.282.498c-.062.191-.093.41-.093.656h-1.407c0-.371.069-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.555-.441.914-.586a3.27 3.27 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.612.289.838.504.223.215.393.473.51.774.117.296.176.625.176.984 0 .269-.045.531-.135.785-.086.25-.205.498-.357.744a6.541 6.541 0 0 1-.557.744c-.211.25-.441.508-.691.774l-1.899 2.027h3.973V825Zm2.912-1.154c.484 0 .896-.055 1.236-.164.34-.11.619-.266.838-.469.235-.223.406-.477.516-.762.109-.289.179-.599.211-.931v-.03a2.038 2.038 0 0 1-.662.492c-.141.067-.297.12-.469.159a2.468 2.468 0 0 1-.557.058c-.414 0-.775-.078-1.084-.234a2.26 2.26 0 0 1-.762-.627 2.717 2.717 0 0 1-.462-.914 3.792 3.792 0 0 1-.153-1.084c0-.41.061-.795.182-1.154a2.91 2.91 0 0 1 .539-.956c.234-.269.521-.482.861-.638.344-.16.735-.24 1.172-.24.442 0 .832.084 1.172.252.344.167.635.396.873.685.25.313.44.691.568 1.137.129.441.194.906.194 1.394v.492c0 .672-.078 1.313-.235 1.922a3.877 3.877 0 0 1-.826 1.6c-.32.375-.742.67-1.265.885-.52.215-1.147.322-1.881.322h-.117v-1.195h.111Zm1.412-2.754a1.41 1.41 0 0 0 .867-.293c.121-.09.227-.195.317-.317.093-.125.17-.259.228-.404v-.486c0-.34-.039-.641-.117-.903a2.13 2.13 0 0 0-.299-.656 1.314 1.314 0 0 0-.451-.398 1.132 1.132 0 0 0-.551-.141c-.219 0-.414.049-.586.147a1.244 1.244 0 0 0-.422.386 1.846 1.846 0 0 0-.269.58c-.059.219-.088.45-.088.692 0 .234.027.459.082.674.055.215.141.406.258.574.113.164.254.297.422.398.172.098.375.147.609.147Z"
              className="29"
            />
            <path
              d="M218.385 835.428v1.189h-.094c-.465 0-.869.065-1.213.194a2.384 2.384 0 0 0-1.418 1.341 3.474 3.474 0 0 0-.24 1.02c.094-.106.203-.207.328-.305.125-.101.264-.191.416-.269.145-.075.305-.133.481-.176a2.14 2.14 0 0 1 .556-.07c.414 0 .774.078 1.078.234.309.156.563.367.762.633.203.265.352.57.445.914.098.344.147.701.147 1.072 0 .406-.063.787-.188 1.143a2.673 2.673 0 0 1-.533.92 2.548 2.548 0 0 1-.873.627c-.34.148-.728.222-1.166.222-.449 0-.85-.086-1.201-.258a2.634 2.634 0 0 1-.891-.697 3.137 3.137 0 0 1-.586-1.072 4.248 4.248 0 0 1-.199-1.307v-.58c0-.687.088-1.342.264-1.963a3.936 3.936 0 0 1 .89-1.611 3.489 3.489 0 0 1 1.301-.891c.516-.207 1.106-.31 1.77-.31h.164Zm-1.53 4.06c-.167 0-.328.026-.48.076a1.684 1.684 0 0 0-.422.211c-.117.09-.223.194-.316.311a1.713 1.713 0 0 0-.235.393v.433c0 .34.037.639.112.897.078.257.183.472.316.644.133.172.287.303.463.393.176.09.363.134.562.134.219 0 .415-.042.586-.128.172-.09.319-.211.44-.364.121-.156.213-.34.275-.55.063-.215.094-.448.094-.698 0-.238-.031-.463-.094-.674a1.694 1.694 0 0 0-.263-.562 1.243 1.243 0 0 0-.44-.375 1.226 1.226 0 0 0-.598-.141ZM226.84 844h-5.725v-.973l2.778-3.023c.23-.254.423-.481.58-.68.156-.203.283-.388.381-.556.093-.168.16-.325.199-.469.043-.149.064-.297.064-.445 0-.2-.029-.381-.088-.545a1.141 1.141 0 0 0-.258-.422 1.215 1.215 0 0 0-.41-.276 1.342 1.342 0 0 0-.527-.099c-.25 0-.467.035-.65.105-.184.071-.336.17-.457.299a1.337 1.337 0 0 0-.282.498c-.062.191-.093.41-.093.656h-1.407c0-.371.069-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.555-.441.914-.586a3.27 3.27 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.612.289.838.504.223.215.393.473.51.774.117.296.176.625.176.984 0 .269-.045.531-.135.785-.086.25-.205.498-.357.744a6.541 6.541 0 0 1-.557.744c-.211.25-.441.508-.691.774l-1.899 2.027h3.973V844Z"
              className="62"
            />
            <path
              d="M201.684 792.102h.837c.25 0 .469-.034.657-.1.187-.07.342-.168.463-.293a1.05 1.05 0 0 0 .257-.404 1.46 1.46 0 0 0 .094-.528c0-.203-.029-.384-.088-.545a1.076 1.076 0 0 0-.246-.41 1.13 1.13 0 0 0-.416-.246 1.698 1.698 0 0 0-.568-.088c-.192 0-.369.03-.533.088a1.19 1.19 0 0 0-.703.621 1.2 1.2 0 0 0-.1.498h-1.4c0-.34.068-.652.205-.937.136-.285.326-.533.568-.744.242-.207.527-.369.855-.487a3.262 3.262 0 0 1 1.09-.175c.403 0 .772.052 1.108.158.34.101.629.254.867.457.242.207.43.461.562.762.133.3.2.65.2 1.048 0 .176-.028.352-.082.528a1.93 1.93 0 0 1-.235.509 2.227 2.227 0 0 1-.961.809c.254.086.469.199.645.34.179.137.326.291.439.463.113.176.196.365.246.568.051.199.076.406.076.621 0 .399-.074.754-.222 1.067a2.236 2.236 0 0 1-.598.779 2.696 2.696 0 0 1-.914.492 3.766 3.766 0 0 1-1.131.164c-.367 0-.72-.051-1.06-.152a2.678 2.678 0 0 1-.897-.457 2.308 2.308 0 0 1-.621-.75 2.299 2.299 0 0 1-.228-1.049h1.4c0 .187.033.361.1.521.07.157.17.29.298.399.125.113.274.201.446.264.176.062.369.093.58.093.226 0 .43-.029.609-.088a1.21 1.21 0 0 0 .463-.275c.121-.113.213-.254.275-.422.067-.172.1-.367.1-.586a1.63 1.63 0 0 0-.111-.633 1.145 1.145 0 0 0-.322-.439 1.401 1.401 0 0 0-.51-.252 2.271 2.271 0 0 0-.657-.088h-.837v-1.101Zm11.197 1.646c0 .547-.065 1.031-.193 1.453a2.89 2.89 0 0 1-.545 1.049 2.248 2.248 0 0 1-.868.656 2.926 2.926 0 0 1-1.16.217c-.429 0-.816-.072-1.16-.217a2.286 2.286 0 0 1-.873-.656 2.892 2.892 0 0 1-.557-1.049 5.123 5.123 0 0 1-.187-1.453v-2.021c0-.547.062-1.03.187-1.448.129-.422.313-.777.551-1.066.238-.285.528-.5.867-.645a2.91 2.91 0 0 1 1.161-.222c.433 0 .82.074 1.16.222.343.145.636.36.879.645.234.289.416.644.545 1.066.128.418.193.901.193 1.448v2.021Zm-4.137-.498 2.713-2.057a3.226 3.226 0 0 0-.129-.791 1.419 1.419 0 0 0-.287-.545 1.024 1.024 0 0 0-.404-.281 1.439 1.439 0 0 0-.533-.094c-.215 0-.405.038-.569.112a1.04 1.04 0 0 0-.41.328 1.627 1.627 0 0 0-.287.639 3.881 3.881 0 0 0-.094.914v1.775Zm2.725.732v-1.711l-2.713 2.045c.019.27.06.508.123.715.066.207.154.379.264.516.109.148.244.26.404.334.164.074.353.111.568.111.211 0 .397-.035.557-.105.16-.075.297-.182.41-.323.129-.164.225-.378.287-.644.067-.266.1-.578.1-.938Z"
              className="30"
            />
            <path
              d="M273.385 816.428v1.189h-.094c-.465 0-.869.065-1.213.194a2.384 2.384 0 0 0-1.418 1.341 3.474 3.474 0 0 0-.24 1.02c.094-.106.203-.207.328-.305.125-.101.264-.191.416-.269.145-.075.305-.133.481-.176a2.14 2.14 0 0 1 .556-.07c.414 0 .774.078 1.078.234.309.156.563.367.762.633.203.265.352.57.445.914.098.344.147.701.147 1.072 0 .406-.063.787-.188 1.143a2.673 2.673 0 0 1-.533.92 2.548 2.548 0 0 1-.873.627c-.34.148-.728.222-1.166.222-.449 0-.85-.086-1.201-.258a2.634 2.634 0 0 1-.891-.697 3.137 3.137 0 0 1-.586-1.072 4.248 4.248 0 0 1-.199-1.307v-.58c0-.687.088-1.342.264-1.963a3.936 3.936 0 0 1 .89-1.611 3.489 3.489 0 0 1 1.301-.891c.516-.207 1.106-.31 1.77-.31h.164Zm-1.53 4.06c-.167 0-.328.026-.48.076a1.684 1.684 0 0 0-.422.211c-.117.09-.223.194-.316.311a1.713 1.713 0 0 0-.235.393v.433c0 .34.037.639.112.897.078.257.183.472.316.644.133.172.287.303.463.393.176.09.363.134.562.134.219 0 .415-.042.586-.128.172-.09.319-.211.44-.364.121-.156.213-.34.275-.55.063-.215.094-.448.094-.698 0-.238-.031-.463-.094-.674a1.694 1.694 0 0 0-.263-.562 1.243 1.243 0 0 0-.44-.375 1.226 1.226 0 0 0-.598-.141Zm6.036-.386h.838c.25 0 .468-.034.656-.1.187-.07.342-.168.463-.293a1.05 1.05 0 0 0 .257-.404 1.46 1.46 0 0 0 .094-.528c0-.203-.029-.384-.088-.545a1.076 1.076 0 0 0-.246-.41 1.13 1.13 0 0 0-.416-.246 1.698 1.698 0 0 0-.568-.088c-.192 0-.369.03-.533.088a1.198 1.198 0 0 0-.703.621 1.2 1.2 0 0 0-.1.498h-1.4c0-.34.068-.652.205-.937.136-.285.326-.533.568-.744.242-.207.527-.369.855-.487a3.262 3.262 0 0 1 1.09-.175c.403 0 .772.052 1.108.158.34.101.629.254.867.457.242.207.43.461.562.762.133.3.2.65.2 1.048 0 .176-.028.352-.082.528a1.93 1.93 0 0 1-.235.509 2.227 2.227 0 0 1-.961.809c.254.086.469.199.645.34.179.137.326.291.439.463.114.176.196.365.246.568.051.199.077.406.077.621 0 .399-.075.754-.223 1.067a2.236 2.236 0 0 1-.598.779 2.696 2.696 0 0 1-.914.492 3.761 3.761 0 0 1-1.131.164c-.367 0-.72-.051-1.06-.152a2.678 2.678 0 0 1-.897-.457 2.308 2.308 0 0 1-.621-.75 2.299 2.299 0 0 1-.228-1.049h1.4c0 .187.033.361.1.521.07.157.17.29.298.399.125.113.274.201.446.264.176.062.369.093.58.093.226 0 .43-.029.609-.088a1.21 1.21 0 0 0 .463-.275c.121-.113.213-.254.276-.422.066-.172.099-.367.099-.586a1.63 1.63 0 0 0-.111-.633 1.145 1.145 0 0 0-.322-.439 1.401 1.401 0 0 0-.51-.252 2.269 2.269 0 0 0-.656-.088h-.838v-1.101Z"
              className="63"
            />
            <path
              d="M334.529 845h-5.724v-.973l2.777-3.023c.23-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.554-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.424 6.424 0 0 1-.557.744c-.21.25-.441.508-.691.774l-1.898 2.027h3.972V845Zm7.207 0h-5.724v-.973l2.777-3.023c.231-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.555-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.528 6.528 0 0 1-.556.744c-.211.25-.442.508-.692.774l-1.898 2.027h3.972V845Zm2.912-1.154c.485 0 .897-.055 1.237-.164.34-.11.619-.266.838-.469.234-.223.406-.477.515-.762.11-.289.18-.599.211-.931v-.03a1.989 1.989 0 0 1-.662.492c-.141.067-.297.12-.469.159a2.46 2.46 0 0 1-.556.058c-.414 0-.776-.078-1.084-.234a2.24 2.24 0 0 1-.762-.627 2.738 2.738 0 0 1-.463-.914 3.827 3.827 0 0 1-.152-1.084c0-.41.06-.795.181-1.154a2.91 2.91 0 0 1 .539-.956 2.53 2.53 0 0 1 .862-.638c.344-.16.734-.24 1.172-.24.441 0 .832.084 1.172.252.343.167.634.396.873.685.25.313.439.691.568 1.137.129.441.193.906.193 1.394v.492a7.72 7.72 0 0 1-.234 1.922 3.89 3.89 0 0 1-.826 1.6c-.321.375-.742.67-1.266.885-.519.215-1.146.322-1.881.322h-.117v-1.195h.111Zm1.413-2.754a1.4 1.4 0 0 0 .867-.293c.121-.09.226-.195.316-.317a1.79 1.79 0 0 0 .229-.404v-.486c0-.34-.039-.641-.118-.903a2.13 2.13 0 0 0-.298-.656 1.317 1.317 0 0 0-.452-.398 1.126 1.126 0 0 0-.55-.141c-.219 0-.414.049-.586.147a1.235 1.235 0 0 0-.422.386 1.87 1.87 0 0 0-.27.58 2.759 2.759 0 0 0-.006 1.366c.055.215.141.406.258.574.114.164.254.297.422.398.172.098.375.147.61.147Z"
              className="229"
            />
            <path
              d="M374.529 884h-5.724v-.973l2.777-3.023c.23-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.554-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.424 6.424 0 0 1-.557.744c-.21.25-.441.508-.691.774l-1.898 2.027h3.972V884Zm7.207 0h-5.724v-.973l2.777-3.023c.231-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.555-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.528 6.528 0 0 1-.556.744c-.211.25-.442.508-.692.774l-1.898 2.027h3.972V884Zm7.084-6.281c0 .258-.043.498-.129.72a1.92 1.92 0 0 1-.351.598 2.302 2.302 0 0 1-.322.317 2.269 2.269 0 0 1-.405.257c.176.082.338.178.487.287.152.106.285.229.398.37a2.134 2.134 0 0 1 .51 1.412c0 .394-.072.744-.217 1.049a2.165 2.165 0 0 1-.592.761 2.621 2.621 0 0 1-.89.469 3.64 3.64 0 0 1-1.09.158c-.399 0-.77-.053-1.114-.158a2.556 2.556 0 0 1-.884-.469 2.144 2.144 0 0 1-.598-.756 2.482 2.482 0 0 1-.211-1.054c0-.235.031-.457.094-.668.066-.211.16-.407.281-.586.121-.172.266-.326.434-.463a2.68 2.68 0 0 1 .574-.358 2.293 2.293 0 0 1-.492-.328 2.093 2.093 0 0 1-.615-.955 2.031 2.031 0 0 1-.088-.603c0-.379.064-.715.193-1.008.133-.293.314-.541.545-.744.226-.203.498-.356.814-.457.321-.106.67-.158 1.049-.158.375 0 .721.052 1.037.158.321.101.6.254.838.457.231.199.412.447.545.744.133.293.199.629.199 1.008Zm-1.213 3.885c0-.211-.035-.403-.105-.575a1.365 1.365 0 0 0-.281-.457 1.307 1.307 0 0 0-.446-.281 1.568 1.568 0 0 0-.568-.1c-.215 0-.408.034-.58.1-.168.066-.313.16-.434.281a1.382 1.382 0 0 0-.281.457 1.704 1.704 0 0 0-.094.58c0 .219.034.416.1.592.066.172.162.317.287.434.121.113.266.201.434.263.172.059.365.088.58.088.203 0 .388-.031.556-.093.172-.063.321-.153.446-.27.117-.121.211-.266.281-.434.07-.171.105-.367.105-.585Zm-.181-3.833a1.38 1.38 0 0 0-.094-.521 1.291 1.291 0 0 0-.246-.41 1.188 1.188 0 0 0-.387-.258 1.294 1.294 0 0 0-.504-.094c-.183 0-.349.032-.498.094a1.097 1.097 0 0 0-.375.252 1.123 1.123 0 0 0-.234.404c-.055.16-.082.338-.082.533 0 .192.027.368.082.528.055.156.137.289.246.398.105.114.232.201.381.264.148.062.314.094.498.094.183 0 .349-.032.498-.094a1.154 1.154 0 0 0 .627-.662 1.54 1.54 0 0 0 .088-.528Z"
              className="228"
            />
            <path
              d="M458.58 820.102h.838c.25 0 .469-.034.656-.1a1.23 1.23 0 0 0 .463-.293c.113-.109.199-.244.258-.404.062-.164.094-.34.094-.528 0-.203-.03-.384-.088-.545a1.102 1.102 0 0 0-.246-.41 1.138 1.138 0 0 0-.416-.246 1.704 1.704 0 0 0-.569-.088c-.191 0-.369.03-.533.088a1.198 1.198 0 0 0-.703.621c-.066.149-.1.315-.1.498h-1.4c0-.34.068-.652.205-.937a2.3 2.3 0 0 1 .568-.744c.243-.207.528-.369.856-.487a3.258 3.258 0 0 1 1.09-.175c.402 0 .771.052 1.107.158.34.101.629.254.867.457a2.1 2.1 0 0 1 .563.762c.133.3.199.65.199 1.048 0 .176-.027.352-.082.528a1.96 1.96 0 0 1-.234.509 2.264 2.264 0 0 1-.961.809c.254.086.468.199.644.34.18.137.326.291.44.463.113.176.195.365.246.568.051.199.076.406.076.621 0 .399-.074.754-.223 1.067a2.222 2.222 0 0 1-.597.779 2.706 2.706 0 0 1-.914.492 3.766 3.766 0 0 1-1.131.164c-.367 0-.721-.051-1.061-.152a2.673 2.673 0 0 1-.896-.457 2.308 2.308 0 0 1-.621-.75 2.286 2.286 0 0 1-.229-1.049h1.4c0 .187.034.361.1.521.07.157.17.29.299.399.125.113.273.201.445.264.176.062.369.093.58.093.227 0 .43-.029.61-.088.183-.062.338-.154.463-.275a1.09 1.09 0 0 0 .275-.422c.066-.172.1-.367.1-.586 0-.246-.038-.457-.112-.633a1.135 1.135 0 0 0-.322-.439 1.401 1.401 0 0 0-.51-.252 2.264 2.264 0 0 0-.656-.088h-.838v-1.101Zm9.516 4.898h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V825Zm8.021-3.041h1.072v1.137h-1.072V825h-1.4v-1.904h-3.692l-.035-.862 3.686-5.765h1.441v5.49Zm-3.697 0h2.297v-3.615l-.164.304-2.133 3.311Z"
              className="314"
            />
            <path
              d="M507.529 824h-5.724v-.973l2.777-3.023c.23-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.554-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.424 6.424 0 0 1-.557.744c-.21.25-.441.508-.691.774l-1.898 2.027h3.972V824Zm5.567 0h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V824Zm8.724-6.281c0 .258-.043.498-.129.72a1.92 1.92 0 0 1-.351.598 2.302 2.302 0 0 1-.322.317 2.269 2.269 0 0 1-.405.257c.176.082.338.178.487.287.152.106.285.229.398.37a2.134 2.134 0 0 1 .51 1.412c0 .394-.072.744-.217 1.049a2.165 2.165 0 0 1-.592.761 2.621 2.621 0 0 1-.89.469 3.64 3.64 0 0 1-1.09.158c-.399 0-.77-.053-1.114-.158a2.556 2.556 0 0 1-.884-.469 2.144 2.144 0 0 1-.598-.756 2.482 2.482 0 0 1-.211-1.054c0-.235.031-.457.094-.668.066-.211.16-.407.281-.586.121-.172.266-.326.434-.463a2.68 2.68 0 0 1 .574-.358 2.293 2.293 0 0 1-.492-.328 2.093 2.093 0 0 1-.615-.955 2.031 2.031 0 0 1-.088-.603c0-.379.064-.715.193-1.008.133-.293.314-.541.545-.744.226-.203.498-.356.814-.457.321-.106.67-.158 1.049-.158.375 0 .721.052 1.037.158.321.101.6.254.838.457.231.199.412.447.545.744.133.293.199.629.199 1.008Zm-1.213 3.885c0-.211-.035-.403-.105-.575a1.365 1.365 0 0 0-.281-.457 1.307 1.307 0 0 0-.446-.281 1.568 1.568 0 0 0-.568-.1c-.215 0-.408.034-.58.1-.168.066-.313.16-.434.281a1.382 1.382 0 0 0-.281.457 1.704 1.704 0 0 0-.094.58c0 .219.034.416.1.592.066.172.162.317.287.434.121.113.266.201.434.263.172.059.365.088.58.088.203 0 .388-.031.556-.093.172-.063.321-.153.446-.27.117-.121.211-.266.281-.434.07-.171.105-.367.105-.585Zm-.181-3.833a1.38 1.38 0 0 0-.094-.521 1.291 1.291 0 0 0-.246-.41 1.188 1.188 0 0 0-.387-.258 1.294 1.294 0 0 0-.504-.094c-.183 0-.349.032-.498.094a1.097 1.097 0 0 0-.375.252 1.123 1.123 0 0 0-.234.404c-.055.16-.082.338-.082.533 0 .192.027.368.082.528.055.156.137.289.246.398.105.114.232.201.381.264.148.062.314.094.498.094.183 0 .349-.032.498-.094a1.154 1.154 0 0 0 .627-.662 1.54 1.54 0 0 0 .088-.528Z"
              className="218"
            />
            <path
              d="M572.529 828h-5.724v-.973l2.777-3.023c.23-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.554-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.424 6.424 0 0 1-.557.744c-.21.25-.441.508-.691.774l-1.898 2.027h3.972V828Zm5.567 0h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V828Zm8.918-7.746-3.41 7.746h-1.477l3.41-7.359h-4.424v-1.172h5.901v.785Z"
              className="217"
            />
            <path
              d="M470.529 855h-5.724v-.973l2.777-3.023c.23-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.554-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.424 6.424 0 0 1-.557.744c-.21.25-.441.508-.691.774l-1.898 2.027h3.972V855Zm5.567 0h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V855Zm4.552-1.154c.485 0 .897-.055 1.237-.164.34-.11.619-.266.838-.469.234-.223.406-.477.515-.762.11-.289.18-.599.211-.931v-.03a1.989 1.989 0 0 1-.662.492c-.141.067-.297.12-.469.159a2.46 2.46 0 0 1-.556.058c-.414 0-.776-.078-1.084-.234a2.24 2.24 0 0 1-.762-.627 2.738 2.738 0 0 1-.463-.914 3.827 3.827 0 0 1-.152-1.084c0-.41.06-.795.181-1.154a2.91 2.91 0 0 1 .539-.956 2.53 2.53 0 0 1 .862-.638c.344-.16.734-.24 1.172-.24.441 0 .832.084 1.172.252.343.167.634.396.873.685.25.313.439.691.568 1.137.129.441.193.906.193 1.394v.492a7.72 7.72 0 0 1-.234 1.922 3.89 3.89 0 0 1-.826 1.6c-.321.375-.742.67-1.266.885-.519.215-1.146.322-1.881.322h-.117v-1.195h.111Zm1.413-2.754a1.4 1.4 0 0 0 .867-.293c.121-.09.226-.195.316-.317a1.79 1.79 0 0 0 .229-.404v-.486c0-.34-.039-.641-.118-.903a2.13 2.13 0 0 0-.298-.656 1.317 1.317 0 0 0-.452-.398 1.126 1.126 0 0 0-.55-.141c-.219 0-.414.049-.586.147a1.235 1.235 0 0 0-.422.386 1.87 1.87 0 0 0-.27.58 2.759 2.759 0 0 0-.006 1.366c.055.215.141.406.258.574.114.164.254.297.422.398.172.098.375.147.61.147Z"
              className="219"
            />
            <path
              d="M504.529 879h-5.724v-.973l2.777-3.023c.23-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.554-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.424 6.424 0 0 1-.557.744c-.21.25-.441.508-.691.774l-1.898 2.027h3.972V879Zm7.207 0h-5.724v-.973l2.777-3.023c.231-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.555-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.528 6.528 0 0 1-.556.744c-.211.25-.442.508-.692.774l-1.898 2.027h3.972V879Zm1.987-4.23.457-4.301h4.588v1.242h-3.422l-.223 2.045c.141-.082.324-.16.551-.235.23-.074.494-.111.791-.111.402 0 .762.067 1.078.199.32.133.592.323.814.569.219.25.387.552.504.908.118.352.176.748.176 1.189 0 .391-.057.76-.17 1.108a2.437 2.437 0 0 1-.51.902 2.356 2.356 0 0 1-.861.61c-.348.148-.758.222-1.23.222-.36 0-.704-.051-1.032-.152a2.663 2.663 0 0 1-.873-.469 2.463 2.463 0 0 1-.627-.756 2.545 2.545 0 0 1-.275-1.049h1.365c.051.418.203.739.457.961.258.223.586.334.985.334.234 0 .437-.043.609-.129.172-.086.316-.207.434-.363a1.63 1.63 0 0 0 .246-.551c.054-.218.082-.455.082-.709 0-.246-.033-.47-.1-.673a1.49 1.49 0 0 0-.287-.54 1.283 1.283 0 0 0-.48-.351 1.621 1.621 0 0 0-.668-.129c-.168 0-.315.014-.44.041a1.46 1.46 0 0 0-.592.27 2.535 2.535 0 0 0-.228.193l-1.119-.275Z"
              className="225"
            />
            <path
              d="M459.889 787h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V787Zm8.888-3.252c0 .547-.064 1.031-.193 1.453a2.875 2.875 0 0 1-.545 1.049 2.237 2.237 0 0 1-.867.656c-.34.145-.727.217-1.16.217-.43 0-.817-.072-1.16-.217a2.286 2.286 0 0 1-.873-.656 2.877 2.877 0 0 1-.557-1.049 5.121 5.121 0 0 1-.188-1.453v-2.021c0-.547.063-1.03.188-1.448.129-.422.312-.777.551-1.066.238-.285.527-.5.867-.645.344-.148.73-.222 1.16-.222.434 0 .82.074 1.16.222.344.145.637.36.879.645.234.289.416.644.545 1.066.129.418.193.901.193 1.448v2.021Zm-4.136-.498 2.713-2.057a3.226 3.226 0 0 0-.129-.791 1.447 1.447 0 0 0-.287-.545 1.034 1.034 0 0 0-.405-.281 1.435 1.435 0 0 0-.533-.094c-.215 0-.404.038-.568.112a1.05 1.05 0 0 0-.411.328 1.656 1.656 0 0 0-.287.639 3.94 3.94 0 0 0-.093.914v1.775Zm2.724.732v-1.711l-2.713 2.045c.02.27.061.508.123.715.067.207.155.379.264.516.109.148.244.26.404.334.164.074.354.111.569.111.211 0 .396-.035.556-.105a1.14 1.14 0 0 0 .411-.323c.128-.164.224-.378.287-.644.066-.266.099-.578.099-.938Zm8.455-3.263c0 .258-.043.498-.129.72a1.92 1.92 0 0 1-.351.598 2.302 2.302 0 0 1-.322.317 2.269 2.269 0 0 1-.405.257c.176.082.338.178.487.287.152.106.285.229.398.37a2.134 2.134 0 0 1 .51 1.412c0 .394-.072.744-.217 1.049a2.165 2.165 0 0 1-.592.761 2.621 2.621 0 0 1-.89.469 3.64 3.64 0 0 1-1.09.158c-.399 0-.77-.053-1.114-.158a2.556 2.556 0 0 1-.884-.469 2.144 2.144 0 0 1-.598-.756 2.482 2.482 0 0 1-.211-1.054c0-.235.031-.457.094-.668.066-.211.16-.407.281-.586.121-.172.266-.326.434-.463a2.68 2.68 0 0 1 .574-.358 2.293 2.293 0 0 1-.492-.328 2.093 2.093 0 0 1-.615-.955 2.031 2.031 0 0 1-.088-.603c0-.379.064-.715.193-1.008.133-.293.314-.541.545-.744.226-.203.498-.356.814-.457.321-.106.67-.158 1.049-.158.375 0 .721.052 1.037.158.321.101.6.254.838.457.231.199.412.447.545.744.133.293.199.629.199 1.008Zm-1.213 3.885c0-.211-.035-.403-.105-.575a1.365 1.365 0 0 0-.281-.457 1.307 1.307 0 0 0-.446-.281 1.568 1.568 0 0 0-.568-.1c-.215 0-.408.034-.58.1-.168.066-.313.16-.434.281a1.382 1.382 0 0 0-.281.457 1.704 1.704 0 0 0-.094.58c0 .219.034.416.1.592.066.172.162.317.287.434.121.113.266.201.434.263.172.059.365.088.58.088.203 0 .388-.031.556-.093.172-.063.321-.153.446-.27.117-.121.211-.266.281-.434.07-.171.105-.367.105-.585Zm-.181-3.833a1.38 1.38 0 0 0-.094-.521 1.291 1.291 0 0 0-.246-.41 1.188 1.188 0 0 0-.387-.258 1.294 1.294 0 0 0-.504-.094c-.183 0-.349.032-.498.094a1.097 1.097 0 0 0-.375.252 1.123 1.123 0 0 0-.234.404c-.055.16-.082.338-.082.533 0 .192.027.368.082.528.055.156.137.289.246.398.105.114.232.201.381.264.148.062.314.094.498.094.183 0 .349-.032.498-.094a1.154 1.154 0 0 0 .627-.662 1.54 1.54 0 0 0 .088-.528Z"
              className="108"
            />
            <path
              d="M476.889 774h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V774Zm8.888-3.252c0 .547-.064 1.031-.193 1.453a2.875 2.875 0 0 1-.545 1.049 2.237 2.237 0 0 1-.867.656c-.34.145-.727.217-1.16.217-.43 0-.817-.072-1.16-.217a2.286 2.286 0 0 1-.873-.656 2.877 2.877 0 0 1-.557-1.049 5.121 5.121 0 0 1-.188-1.453v-2.021c0-.547.063-1.03.188-1.448.129-.422.312-.777.551-1.066.238-.285.527-.5.867-.645.344-.148.73-.222 1.16-.222.434 0 .82.074 1.16.222.344.145.637.36.879.645.234.289.416.644.545 1.066.129.418.193.901.193 1.448v2.021Zm-4.136-.498 2.713-2.057a3.226 3.226 0 0 0-.129-.791 1.447 1.447 0 0 0-.287-.545 1.034 1.034 0 0 0-.405-.281 1.435 1.435 0 0 0-.533-.094c-.215 0-.404.038-.568.112a1.05 1.05 0 0 0-.411.328 1.656 1.656 0 0 0-.287.639 3.94 3.94 0 0 0-.093.914v1.775Zm2.724.732v-1.711l-2.713 2.045c.02.27.061.508.123.715.067.207.155.379.264.516.109.148.244.26.404.334.164.074.354.111.569.111.211 0 .396-.035.556-.105a1.14 1.14 0 0 0 .411-.323c.128-.164.224-.378.287-.644.066-.266.099-.578.099-.938Zm4.283 1.864c.485 0 .897-.055 1.237-.164.34-.11.619-.266.838-.469.234-.223.406-.477.515-.762.11-.289.18-.599.211-.931v-.03a1.989 1.989 0 0 1-.662.492c-.141.067-.297.12-.469.159a2.46 2.46 0 0 1-.556.058c-.414 0-.776-.078-1.084-.234a2.24 2.24 0 0 1-.762-.627 2.738 2.738 0 0 1-.463-.914 3.827 3.827 0 0 1-.152-1.084c0-.41.06-.795.181-1.154a2.91 2.91 0 0 1 .539-.956 2.53 2.53 0 0 1 .862-.638c.344-.16.734-.24 1.172-.24.441 0 .832.084 1.172.252.343.167.634.396.873.685.25.313.439.691.568 1.137.129.441.193.906.193 1.394v.492a7.72 7.72 0 0 1-.234 1.922 3.89 3.89 0 0 1-.826 1.6c-.321.375-.742.67-1.266.885-.519.215-1.146.322-1.881.322h-.117v-1.195h.111Zm1.413-2.754a1.4 1.4 0 0 0 .867-.293c.121-.09.226-.195.316-.317a1.79 1.79 0 0 0 .229-.404v-.486c0-.34-.039-.641-.118-.903a2.13 2.13 0 0 0-.298-.656 1.317 1.317 0 0 0-.452-.398 1.126 1.126 0 0 0-.55-.141c-.219 0-.414.049-.586.147a1.235 1.235 0 0 0-.422.386 1.87 1.87 0 0 0-.27.58 2.759 2.759 0 0 0-.006 1.366c.055.215.141.406.258.574.114.164.254.297.422.398.172.098.375.147.61.147Z"
              className="109"
            />
            <path
              d="M499.889 783h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V783Zm7.207 0h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V783Zm8.888-3.252c0 .547-.064 1.031-.193 1.453a2.875 2.875 0 0 1-.545 1.049 2.237 2.237 0 0 1-.867.656c-.34.145-.727.217-1.16.217-.43 0-.817-.072-1.16-.217a2.286 2.286 0 0 1-.873-.656 2.877 2.877 0 0 1-.557-1.049 5.121 5.121 0 0 1-.188-1.453v-2.021c0-.547.063-1.03.188-1.448.129-.422.312-.777.551-1.066.238-.285.527-.5.867-.645.344-.148.73-.222 1.16-.222.434 0 .82.074 1.16.222.344.145.637.36.879.645.234.289.416.644.545 1.066.129.418.193.901.193 1.448v2.021Zm-4.136-.498 2.713-2.057a3.226 3.226 0 0 0-.129-.791 1.433 1.433 0 0 0-.287-.545 1.034 1.034 0 0 0-.405-.281 1.435 1.435 0 0 0-.533-.094c-.215 0-.404.038-.568.112a1.04 1.04 0 0 0-.41.328 1.642 1.642 0 0 0-.288.639 3.94 3.94 0 0 0-.093.914v1.775Zm2.724.732v-1.711l-2.713 2.045c.02.27.061.508.123.715.067.207.155.379.264.516.109.148.244.26.404.334.164.074.354.111.569.111.211 0 .396-.035.556-.105a1.14 1.14 0 0 0 .411-.323c.128-.164.224-.378.287-.644.066-.266.099-.578.099-.938Z"
              className="110"
            />
            <path
              d="M551.529 765h-5.724v-.973l2.777-3.023c.23-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.554-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.424 6.424 0 0 1-.557.744c-.21.25-.441.508-.691.774l-1.898 2.027h3.972V765Zm7.207 0h-5.724v-.973l2.777-3.023c.231-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.555-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.528 6.528 0 0 1-.556.744c-.211.25-.442.508-.692.774l-1.898 2.027h3.972V765Zm3.258-4.898h.838c.25 0 .469-.034.656-.1a1.23 1.23 0 0 0 .463-.293c.113-.109.199-.244.258-.404.062-.164.094-.34.094-.528 0-.203-.03-.384-.088-.545a1.102 1.102 0 0 0-.246-.41 1.138 1.138 0 0 0-.416-.246 1.704 1.704 0 0 0-.569-.088c-.191 0-.369.03-.533.088a1.198 1.198 0 0 0-.703.621c-.066.149-.1.315-.1.498h-1.4c0-.34.068-.652.205-.937a2.3 2.3 0 0 1 .568-.744c.243-.207.528-.369.856-.487a3.258 3.258 0 0 1 1.09-.175c.402 0 .771.052 1.107.158.34.101.629.254.867.457a2.1 2.1 0 0 1 .563.762c.133.3.199.65.199 1.048 0 .176-.027.352-.082.528a1.96 1.96 0 0 1-.234.509 2.264 2.264 0 0 1-.961.809c.254.086.469.199.644.34.18.137.326.291.44.463.113.176.195.365.246.568.051.199.076.406.076.621 0 .399-.074.754-.223 1.067a2.222 2.222 0 0 1-.597.779 2.706 2.706 0 0 1-.914.492 3.766 3.766 0 0 1-1.131.164c-.367 0-.721-.051-1.061-.152a2.673 2.673 0 0 1-.896-.457 2.308 2.308 0 0 1-.621-.75 2.286 2.286 0 0 1-.229-1.049h1.401c0 .187.033.361.099.521.07.157.17.29.299.399.125.113.273.201.445.264.176.062.369.093.58.093.227 0 .43-.029.61-.088.183-.062.338-.154.463-.275.121-.113.213-.254.275-.422.066-.172.1-.367.1-.586a1.61 1.61 0 0 0-.112-.633 1.135 1.135 0 0 0-.322-.439 1.393 1.393 0 0 0-.51-.252 2.264 2.264 0 0 0-.656-.088h-.838v-1.101Z"
              className="223"
            />
            <path
              d="M610.889 768h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V768Zm4.552-1.154c.485 0 .897-.055 1.237-.164.34-.11.619-.266.838-.469.234-.223.406-.477.515-.762.11-.289.18-.599.211-.931v-.03a1.989 1.989 0 0 1-.662.492c-.141.067-.297.12-.469.159a2.46 2.46 0 0 1-.556.058c-.414 0-.776-.078-1.084-.234a2.24 2.24 0 0 1-.762-.627 2.738 2.738 0 0 1-.463-.914 3.827 3.827 0 0 1-.152-1.084c0-.41.06-.795.181-1.154a2.91 2.91 0 0 1 .539-.956 2.53 2.53 0 0 1 .862-.638c.344-.16.734-.24 1.172-.24.441 0 .832.084 1.172.252.343.167.634.396.873.685.25.313.439.691.568 1.137.129.441.193.906.193 1.394v.492a7.72 7.72 0 0 1-.234 1.922 3.89 3.89 0 0 1-.826 1.6c-.321.375-.742.67-1.266.885-.519.215-1.146.322-1.881.322h-.117v-1.195h.111Zm1.413-2.754a1.4 1.4 0 0 0 .867-.293c.121-.09.226-.195.316-.317a1.79 1.79 0 0 0 .229-.404v-.486c0-.34-.039-.641-.118-.903a2.13 2.13 0 0 0-.298-.656 1.317 1.317 0 0 0-.452-.398 1.126 1.126 0 0 0-.55-.141c-.219 0-.414.049-.586.147a1.235 1.235 0 0 0-.422.386 1.87 1.87 0 0 0-.27.58 2.759 2.759 0 0 0-.006 1.366c.055.215.141.406.258.574.114.164.254.297.422.398.172.098.375.147.61.147Zm9.263.867h1.072v1.137h-1.072V768h-1.4v-1.904h-3.692l-.035-.862 3.686-5.765h1.441v5.49Zm-3.697 0h2.297v-3.615l-.164.304-2.133 3.311Z"
              className="194"
            />
            <path
              d="M634.889 741h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V741Zm8.724-6.281c0 .258-.043.498-.129.72a1.92 1.92 0 0 1-.351.598 2.302 2.302 0 0 1-.322.317 2.269 2.269 0 0 1-.405.257c.176.082.338.178.487.287.152.106.285.229.398.37a2.134 2.134 0 0 1 .51 1.412c0 .394-.072.744-.217 1.049a2.165 2.165 0 0 1-.592.761 2.621 2.621 0 0 1-.89.469 3.64 3.64 0 0 1-1.09.158c-.399 0-.77-.053-1.114-.158a2.556 2.556 0 0 1-.884-.469 2.144 2.144 0 0 1-.598-.756 2.482 2.482 0 0 1-.211-1.054c0-.235.031-.457.094-.668.066-.211.16-.407.281-.586.121-.172.266-.326.434-.463a2.68 2.68 0 0 1 .574-.358 2.293 2.293 0 0 1-.492-.328 2.093 2.093 0 0 1-.616-.955 2.064 2.064 0 0 1-.087-.603c0-.379.064-.715.193-1.008.133-.293.314-.541.545-.744.226-.203.498-.356.814-.457.321-.106.67-.158 1.049-.158.375 0 .721.052 1.037.158.321.101.6.254.838.457.231.199.412.447.545.744.133.293.199.629.199 1.008Zm-1.213 3.885c0-.211-.035-.403-.105-.575a1.365 1.365 0 0 0-.281-.457 1.307 1.307 0 0 0-.446-.281 1.572 1.572 0 0 0-.568-.1c-.215 0-.408.034-.58.1-.168.066-.313.16-.434.281a1.365 1.365 0 0 0-.281.457 1.704 1.704 0 0 0-.094.58c0 .219.034.416.1.592.066.172.162.317.287.434.121.113.266.201.434.263.172.059.365.088.58.088.203 0 .388-.031.556-.093.172-.063.321-.153.446-.27.117-.121.211-.266.281-.434.07-.171.105-.367.105-.585Zm-.181-3.833a1.38 1.38 0 0 0-.094-.521 1.291 1.291 0 0 0-.246-.41 1.188 1.188 0 0 0-.387-.258 1.294 1.294 0 0 0-.504-.094c-.183 0-.349.032-.498.094a1.097 1.097 0 0 0-.375.252 1.123 1.123 0 0 0-.234.404c-.055.16-.082.338-.082.533 0 .192.027.368.082.528.055.156.137.289.246.398.105.114.232.201.381.264.148.062.314.094.498.094.183 0 .349-.032.498-.094a1.154 1.154 0 0 0 .627-.662 1.54 1.54 0 0 0 .088-.528Zm8.795-1.517-3.41 7.746h-1.477l3.41-7.359h-4.424v-1.172h5.901v.785Z"
              className="187"
            />
            <path
              d="M655.889 713h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V713Zm8.724-6.281c0 .258-.043.498-.129.72a1.92 1.92 0 0 1-.351.598 2.302 2.302 0 0 1-.322.317 2.269 2.269 0 0 1-.405.257c.176.082.338.178.487.287.152.106.285.229.398.37a2.134 2.134 0 0 1 .51 1.412c0 .394-.072.744-.217 1.049a2.165 2.165 0 0 1-.592.761 2.621 2.621 0 0 1-.89.469 3.64 3.64 0 0 1-1.09.158c-.399 0-.77-.053-1.114-.158a2.556 2.556 0 0 1-.884-.469 2.144 2.144 0 0 1-.598-.756 2.482 2.482 0 0 1-.211-1.054c0-.235.031-.457.094-.668.066-.211.16-.407.281-.586.121-.172.266-.326.434-.463a2.68 2.68 0 0 1 .574-.358 2.293 2.293 0 0 1-.492-.328 2.093 2.093 0 0 1-.616-.955 2.064 2.064 0 0 1-.087-.603c0-.379.064-.715.193-1.008.133-.293.314-.541.545-.744.226-.203.498-.356.814-.457.321-.106.67-.158 1.049-.158.375 0 .721.052 1.037.158.321.101.6.254.838.457.231.199.412.447.545.744.133.293.199.629.199 1.008Zm-1.213 3.885c0-.211-.035-.403-.105-.575a1.365 1.365 0 0 0-.281-.457 1.307 1.307 0 0 0-.446-.281 1.572 1.572 0 0 0-.568-.1c-.215 0-.408.034-.58.1-.168.066-.313.16-.434.281a1.365 1.365 0 0 0-.281.457 1.704 1.704 0 0 0-.094.58c0 .219.034.416.1.592.066.172.162.317.287.434.121.113.266.201.434.263.172.059.365.088.58.088.203 0 .388-.031.556-.093.172-.063.321-.153.446-.27.117-.121.211-.266.281-.434.07-.171.105-.367.105-.585Zm-.181-3.833a1.38 1.38 0 0 0-.094-.521 1.291 1.291 0 0 0-.246-.41 1.188 1.188 0 0 0-.387-.258 1.294 1.294 0 0 0-.504-.094c-.183 0-.349.032-.498.094a1.097 1.097 0 0 0-.375.252 1.123 1.123 0 0 0-.234.404c-.055.16-.082.338-.082.533 0 .192.027.368.082.528.055.156.137.289.246.398.105.114.232.201.381.264.148.062.314.094.498.094.183 0 .349-.032.498-.094a1.154 1.154 0 0 0 .627-.662 1.54 1.54 0 0 0 .088-.528Zm7.476-2.343v1.189h-.093c-.465 0-.87.065-1.213.194a2.382 2.382 0 0 0-1.418 1.341 3.507 3.507 0 0 0-.241 1.02c.094-.106.204-.207.329-.305.125-.101.263-.191.416-.269.144-.075.304-.133.48-.176.176-.047.361-.07.557-.07.414 0 .773.078 1.078.234.308.156.562.367.762.633.203.265.351.57.445.914.098.344.146.701.146 1.072 0 .406-.062.787-.187 1.143a2.673 2.673 0 0 1-.533.92c-.239.265-.53.474-.873.627-.34.148-.729.222-1.166.222-.45 0-.85-.086-1.202-.258a2.64 2.64 0 0 1-.89-.697 3.137 3.137 0 0 1-.586-1.072 4.248 4.248 0 0 1-.199-1.307v-.58c0-.687.088-1.342.263-1.963a3.95 3.95 0 0 1 .891-1.611 3.473 3.473 0 0 1 1.301-.891c.515-.207 1.105-.31 1.769-.31h.164Zm-1.529 4.06c-.168 0-.328.026-.48.076a1.668 1.668 0 0 0-.422.211c-.118.09-.223.194-.317.311a1.71 1.71 0 0 0-.234.393v.433c0 .34.037.639.111.897.078.257.184.472.317.644.132.172.287.303.463.393.175.09.363.134.562.134.219 0 .414-.042.586-.128.172-.09.318-.211.439-.364.121-.156.213-.34.276-.55.062-.215.094-.448.094-.698 0-.238-.032-.463-.094-.674a1.716 1.716 0 0 0-.264-.562 1.24 1.24 0 0 0-.439-.375 1.226 1.226 0 0 0-.598-.141Z"
              className="186"
            />
            <path
              d="M687.889 693h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V693Zm4.898-4.898h.838c.25 0 .469-.034.656-.1a1.23 1.23 0 0 0 .463-.293c.113-.109.199-.244.258-.404.062-.164.094-.34.094-.528 0-.203-.03-.384-.088-.545a1.102 1.102 0 0 0-.246-.41 1.138 1.138 0 0 0-.416-.246 1.704 1.704 0 0 0-.569-.088c-.191 0-.369.03-.533.088a1.198 1.198 0 0 0-.703.621c-.066.149-.1.315-.1.498h-1.4c0-.34.068-.652.205-.937a2.3 2.3 0 0 1 .568-.744c.243-.207.528-.369.856-.487a3.258 3.258 0 0 1 1.09-.175c.402 0 .771.052 1.107.158.34.101.629.254.867.457a2.1 2.1 0 0 1 .563.762c.133.3.199.65.199 1.048 0 .176-.027.352-.082.528a1.96 1.96 0 0 1-.234.509 2.264 2.264 0 0 1-.961.809c.254.086.469.199.644.34.18.137.326.291.44.463.113.176.195.365.246.568.051.199.076.406.076.621 0 .399-.074.754-.223 1.067a2.222 2.222 0 0 1-.597.779 2.706 2.706 0 0 1-.914.492 3.766 3.766 0 0 1-1.131.164c-.367 0-.721-.051-1.061-.152a2.673 2.673 0 0 1-.896-.457 2.308 2.308 0 0 1-.621-.75 2.286 2.286 0 0 1-.229-1.049h1.401c0 .187.033.361.099.521.07.157.17.29.299.399.125.113.273.201.445.264.176.062.369.093.58.093.227 0 .43-.029.61-.088.183-.062.338-.154.463-.275a1.09 1.09 0 0 0 .275-.422c.066-.172.1-.367.1-.586a1.61 1.61 0 0 0-.112-.633 1.135 1.135 0 0 0-.322-.439 1.401 1.401 0 0 0-.51-.252 2.264 2.264 0 0 0-.656-.088h-.838v-1.101Zm6.861 3.744c.485 0 .897-.055 1.237-.164.34-.11.619-.266.838-.469.234-.223.406-.477.515-.762.11-.289.18-.599.211-.931v-.03a1.989 1.989 0 0 1-.662.492c-.141.067-.297.12-.469.159a2.46 2.46 0 0 1-.556.058c-.414 0-.776-.078-1.084-.234a2.24 2.24 0 0 1-.762-.627 2.738 2.738 0 0 1-.463-.914 3.827 3.827 0 0 1-.152-1.084c0-.41.06-.795.181-1.154a2.91 2.91 0 0 1 .539-.956 2.53 2.53 0 0 1 .862-.638c.344-.16.734-.24 1.172-.24.441 0 .832.084 1.172.252.343.167.634.396.873.685.25.313.439.691.568 1.137.129.441.193.906.193 1.394v.492a7.72 7.72 0 0 1-.234 1.922 3.89 3.89 0 0 1-.826 1.6c-.321.375-.742.67-1.266.885-.519.215-1.146.322-1.881.322h-.117v-1.195h.111Zm1.413-2.754a1.4 1.4 0 0 0 .867-.293c.121-.09.226-.195.316-.317a1.79 1.79 0 0 0 .229-.404v-.486c0-.34-.039-.641-.118-.903a2.13 2.13 0 0 0-.298-.656 1.317 1.317 0 0 0-.452-.398 1.126 1.126 0 0 0-.55-.141c-.219 0-.414.049-.586.147a1.235 1.235 0 0 0-.422.386 1.87 1.87 0 0 0-.27.58 2.759 2.759 0 0 0-.006 1.366c.055.215.141.406.258.574.114.164.254.297.422.398.172.098.375.147.61.147Z"
              className="139"
            />
            <path
              d="M737.889 730h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V730Zm8.724-6.281c0 .258-.043.498-.129.72a1.92 1.92 0 0 1-.351.598 2.302 2.302 0 0 1-.322.317 2.269 2.269 0 0 1-.405.257c.176.082.338.178.487.287.152.106.285.229.398.37a2.134 2.134 0 0 1 .51 1.412c0 .394-.072.744-.217 1.049a2.165 2.165 0 0 1-.592.761 2.621 2.621 0 0 1-.89.469 3.64 3.64 0 0 1-1.09.158c-.399 0-.77-.053-1.114-.158a2.556 2.556 0 0 1-.884-.469 2.144 2.144 0 0 1-.598-.756 2.482 2.482 0 0 1-.211-1.054c0-.235.031-.457.094-.668.066-.211.16-.407.281-.586.121-.172.266-.326.434-.463a2.68 2.68 0 0 1 .574-.358 2.293 2.293 0 0 1-.492-.328 2.093 2.093 0 0 1-.616-.955 2.064 2.064 0 0 1-.087-.603c0-.379.064-.715.193-1.008.133-.293.314-.541.545-.744.226-.203.498-.356.814-.457.321-.106.67-.158 1.049-.158.375 0 .721.052 1.037.158.321.101.6.254.838.457.231.199.412.447.545.744.133.293.199.629.199 1.008Zm-1.213 3.885c0-.211-.035-.403-.105-.575a1.365 1.365 0 0 0-.281-.457 1.307 1.307 0 0 0-.446-.281 1.572 1.572 0 0 0-.568-.1c-.215 0-.408.034-.58.1-.168.066-.313.16-.434.281a1.365 1.365 0 0 0-.281.457 1.704 1.704 0 0 0-.094.58c0 .219.034.416.1.592.066.172.162.317.287.434.121.113.266.201.434.263.172.059.365.088.58.088.203 0 .388-.031.556-.093.172-.063.321-.153.446-.27.117-.121.211-.266.281-.434.07-.171.105-.367.105-.585Zm-.181-3.833a1.38 1.38 0 0 0-.094-.521 1.291 1.291 0 0 0-.246-.41 1.188 1.188 0 0 0-.387-.258 1.294 1.294 0 0 0-.504-.094c-.183 0-.349.032-.498.094a1.097 1.097 0 0 0-.375.252 1.123 1.123 0 0 0-.234.404c-.055.16-.082.338-.082.533 0 .192.027.368.082.528.055.156.137.289.246.398.105.114.232.201.381.264.148.062.314.094.498.094.183 0 .349-.032.498-.094a1.154 1.154 0 0 0 .627-.662 1.54 1.54 0 0 0 .088-.528Zm7.898 3.188h1.072v1.137h-1.072V730h-1.4v-1.904h-3.692l-.035-.862 3.686-5.765h1.441v5.49Zm-3.697 0h2.297v-3.615l-.164.304-2.133 3.311Z"
              className="184"
            />
            <path
              d="M797.889 754h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V754Zm8.724-6.281c0 .258-.043.498-.129.72a1.92 1.92 0 0 1-.351.598 2.302 2.302 0 0 1-.322.317 2.269 2.269 0 0 1-.405.257c.176.082.338.178.487.287.152.106.285.229.398.37a2.134 2.134 0 0 1 .51 1.412c0 .394-.072.744-.217 1.049a2.165 2.165 0 0 1-.592.761 2.621 2.621 0 0 1-.89.469 3.64 3.64 0 0 1-1.09.158c-.399 0-.77-.053-1.114-.158a2.556 2.556 0 0 1-.884-.469 2.144 2.144 0 0 1-.598-.756 2.482 2.482 0 0 1-.211-1.054c0-.235.031-.457.094-.668.066-.211.16-.407.281-.586.121-.172.266-.326.434-.463a2.68 2.68 0 0 1 .574-.358 2.293 2.293 0 0 1-.492-.328 2.093 2.093 0 0 1-.616-.955 2.064 2.064 0 0 1-.087-.603c0-.379.064-.715.193-1.008.133-.293.314-.541.545-.744.226-.203.498-.356.814-.457.321-.106.67-.158 1.049-.158.375 0 .721.052 1.037.158.321.101.6.254.838.457.231.199.412.447.545.744.133.293.199.629.199 1.008Zm-1.213 3.885c0-.211-.035-.403-.105-.575a1.365 1.365 0 0 0-.281-.457 1.307 1.307 0 0 0-.446-.281 1.572 1.572 0 0 0-.568-.1c-.215 0-.408.034-.58.1-.168.066-.313.16-.434.281a1.365 1.365 0 0 0-.281.457 1.704 1.704 0 0 0-.094.58c0 .219.034.416.1.592.066.172.162.317.287.434.121.113.266.201.434.263.172.059.365.088.58.088.203 0 .388-.031.556-.093.172-.063.321-.153.446-.27.117-.121.211-.266.281-.434.07-.171.105-.367.105-.585Zm-.181-3.833a1.38 1.38 0 0 0-.094-.521 1.291 1.291 0 0 0-.246-.41 1.188 1.188 0 0 0-.387-.258 1.294 1.294 0 0 0-.504-.094c-.183 0-.349.032-.498.094a1.097 1.097 0 0 0-.375.252 1.123 1.123 0 0 0-.234.404c-.055.16-.082.338-.082.533 0 .192.027.368.082.528.055.156.137.289.246.398.105.114.232.201.381.264.148.062.314.094.498.094.183 0 .349-.032.498-.094a1.154 1.154 0 0 0 .627-.662 1.54 1.54 0 0 0 .088-.528Zm3.504 1.999.457-4.301h4.588v1.242h-3.422l-.223 2.045c.141-.082.324-.16.551-.235.23-.074.494-.111.791-.111.402 0 .762.067 1.078.199.32.133.592.323.814.569.219.25.387.552.504.908.118.352.176.748.176 1.189 0 .391-.057.76-.17 1.108a2.437 2.437 0 0 1-.51.902 2.356 2.356 0 0 1-.861.61c-.348.148-.758.222-1.23.222-.36 0-.704-.051-1.032-.152a2.663 2.663 0 0 1-.873-.469 2.463 2.463 0 0 1-.627-.756 2.545 2.545 0 0 1-.275-1.049h1.365c.051.418.203.739.457.961.258.223.586.334.985.334.234 0 .437-.043.609-.129.172-.086.316-.207.434-.363a1.63 1.63 0 0 0 .246-.551c.054-.218.082-.455.082-.709 0-.246-.033-.47-.1-.673a1.49 1.49 0 0 0-.287-.54 1.283 1.283 0 0 0-.48-.351 1.621 1.621 0 0 0-.668-.129c-.168 0-.315.014-.44.041a1.46 1.46 0 0 0-.592.27 2.535 2.535 0 0 0-.228.193l-1.119-.275Z"
              className="185"
            />
            <path
              d="M917.58 664.102h.838c.25 0 .469-.034.656-.1a1.23 1.23 0 0 0 .463-.293c.113-.109.199-.244.258-.404.062-.164.094-.34.094-.528 0-.203-.03-.384-.088-.545a1.102 1.102 0 0 0-.246-.41 1.138 1.138 0 0 0-.416-.246 1.704 1.704 0 0 0-.569-.088c-.191 0-.369.03-.533.088a1.198 1.198 0 0 0-.703.621c-.066.149-.1.315-.1.498h-1.4c0-.34.068-.652.205-.937a2.3 2.3 0 0 1 .568-.744c.243-.207.528-.369.856-.487a3.258 3.258 0 0 1 1.09-.175c.402 0 .771.052 1.107.158.34.101.629.254.867.457a2.1 2.1 0 0 1 .563.762c.133.3.199.65.199 1.048 0 .176-.027.352-.082.528a1.96 1.96 0 0 1-.234.509 2.264 2.264 0 0 1-.961.809c.254.086.468.199.644.34.18.137.326.291.44.463.113.176.195.365.246.568.051.199.076.406.076.621 0 .399-.074.754-.223 1.067a2.222 2.222 0 0 1-.597.779 2.706 2.706 0 0 1-.914.492 3.766 3.766 0 0 1-1.131.164c-.367 0-.721-.051-1.061-.152a2.673 2.673 0 0 1-.896-.457 2.308 2.308 0 0 1-.621-.75 2.286 2.286 0 0 1-.229-1.049h1.4c0 .187.034.361.1.521.07.157.17.29.299.399.125.113.273.201.445.264.176.062.369.093.58.093.227 0 .43-.029.61-.088.183-.062.338-.154.463-.275a1.09 1.09 0 0 0 .275-.422c.066-.172.1-.367.1-.586 0-.246-.038-.457-.112-.633a1.135 1.135 0 0 0-.322-.439 1.401 1.401 0 0 0-.51-.252 2.264 2.264 0 0 0-.656-.088h-.838v-1.101Zm7.207 0h.838c.25 0 .469-.034.656-.1a1.23 1.23 0 0 0 .463-.293c.113-.109.199-.244.258-.404.062-.164.094-.34.094-.528 0-.203-.03-.384-.088-.545a1.102 1.102 0 0 0-.246-.41 1.138 1.138 0 0 0-.416-.246 1.704 1.704 0 0 0-.569-.088c-.191 0-.369.03-.533.088a1.198 1.198 0 0 0-.703.621c-.066.149-.1.315-.1.498h-1.4c0-.34.068-.652.205-.937a2.3 2.3 0 0 1 .568-.744c.243-.207.528-.369.856-.487a3.258 3.258 0 0 1 1.09-.175c.402 0 .771.052 1.107.158.34.101.629.254.867.457a2.1 2.1 0 0 1 .563.762c.133.3.199.65.199 1.048 0 .176-.027.352-.082.528a1.96 1.96 0 0 1-.234.509 2.264 2.264 0 0 1-.961.809c.254.086.469.199.644.34.18.137.326.291.44.463.113.176.195.365.246.568.051.199.076.406.076.621 0 .399-.074.754-.223 1.067a2.222 2.222 0 0 1-.597.779 2.706 2.706 0 0 1-.914.492 3.766 3.766 0 0 1-1.131.164c-.367 0-.721-.051-1.061-.152a2.673 2.673 0 0 1-.896-.457 2.308 2.308 0 0 1-.621-.75 2.286 2.286 0 0 1-.229-1.049h1.401c0 .187.033.361.099.521.07.157.17.29.299.399.125.113.273.201.445.264.176.062.369.093.58.093.227 0 .43-.029.61-.088.183-.062.338-.154.463-.275a1.09 1.09 0 0 0 .275-.422c.066-.172.1-.367.1-.586a1.61 1.61 0 0 0-.112-.633 1.135 1.135 0 0 0-.322-.439 1.401 1.401 0 0 0-.51-.252 2.264 2.264 0 0 0-.656-.088h-.838v-1.101Zm9.516 4.898h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V669Z"
              className="331"
            />
            <path
              d="M944.58 686.102h.838c.25 0 .469-.034.656-.1a1.23 1.23 0 0 0 .463-.293c.113-.109.199-.244.258-.404.062-.164.094-.34.094-.528 0-.203-.03-.384-.088-.545a1.102 1.102 0 0 0-.246-.41 1.138 1.138 0 0 0-.416-.246 1.704 1.704 0 0 0-.569-.088c-.191 0-.369.03-.533.088a1.198 1.198 0 0 0-.703.621c-.066.149-.1.315-.1.498h-1.4c0-.34.068-.652.205-.937a2.3 2.3 0 0 1 .568-.744c.243-.207.528-.369.856-.487a3.258 3.258 0 0 1 1.09-.175c.402 0 .771.052 1.107.158.34.101.629.254.867.457a2.1 2.1 0 0 1 .563.762c.133.3.199.65.199 1.048 0 .176-.027.352-.082.528a1.96 1.96 0 0 1-.234.509 2.264 2.264 0 0 1-.961.809c.254.086.468.199.644.34.18.137.326.291.44.463.113.176.195.365.246.568.051.199.076.406.076.621 0 .399-.074.754-.223 1.067a2.222 2.222 0 0 1-.597.779 2.706 2.706 0 0 1-.914.492 3.766 3.766 0 0 1-1.131.164c-.367 0-.721-.051-1.061-.152a2.673 2.673 0 0 1-.896-.457 2.308 2.308 0 0 1-.621-.75 2.286 2.286 0 0 1-.229-1.049h1.4c0 .187.034.361.1.521.07.157.17.29.299.399.125.113.273.201.445.264.176.062.369.093.58.093.227 0 .43-.029.61-.088.183-.062.338-.154.463-.275a1.09 1.09 0 0 0 .275-.422c.066-.172.1-.367.1-.586 0-.246-.038-.457-.112-.633a1.135 1.135 0 0 0-.322-.439 1.401 1.401 0 0 0-.51-.252 2.264 2.264 0 0 0-.656-.088h-.838v-1.101Zm7.207 0h.838c.25 0 .469-.034.656-.1a1.23 1.23 0 0 0 .463-.293c.113-.109.199-.244.258-.404.062-.164.094-.34.094-.528 0-.203-.03-.384-.088-.545a1.102 1.102 0 0 0-.246-.41 1.138 1.138 0 0 0-.416-.246 1.704 1.704 0 0 0-.569-.088c-.191 0-.369.03-.533.088a1.198 1.198 0 0 0-.703.621c-.066.149-.1.315-.1.498h-1.4c0-.34.068-.652.205-.937a2.3 2.3 0 0 1 .568-.744c.243-.207.528-.369.856-.487a3.258 3.258 0 0 1 1.09-.175c.402 0 .771.052 1.107.158.34.101.629.254.867.457a2.1 2.1 0 0 1 .563.762c.133.3.199.65.199 1.048 0 .176-.027.352-.082.528a1.96 1.96 0 0 1-.234.509 2.264 2.264 0 0 1-.961.809c.254.086.469.199.644.34.18.137.326.291.44.463.113.176.195.365.246.568.051.199.076.406.076.621 0 .399-.074.754-.223 1.067a2.222 2.222 0 0 1-.597.779 2.706 2.706 0 0 1-.914.492 3.766 3.766 0 0 1-1.131.164c-.367 0-.721-.051-1.061-.152a2.673 2.673 0 0 1-.896-.457 2.308 2.308 0 0 1-.621-.75 2.286 2.286 0 0 1-.229-1.049h1.401c0 .187.033.361.099.521.07.157.17.29.299.399.125.113.273.201.445.264.176.062.369.093.58.093.227 0 .43-.029.61-.088.183-.062.338-.154.463-.275a1.09 1.09 0 0 0 .275-.422c.066-.172.1-.367.1-.586a1.61 1.61 0 0 0-.112-.633 1.135 1.135 0 0 0-.322-.439 1.401 1.401 0 0 0-.51-.252 2.264 2.264 0 0 0-.656-.088h-.838v-1.101ZM962.943 691h-5.724v-.973l2.777-3.023c.231-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.342 1.342 0 0 0-.527-.099c-.25 0-.467.035-.651.105a1.22 1.22 0 0 0-.457.299 1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.555-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.205.498-.358.744a6.528 6.528 0 0 1-.556.744c-.211.25-.442.508-.692.774l-1.898 2.027h3.972V691Z"
              className="332"
            />
            <path
              d="M969.58 520.102h.838c.25 0 .469-.034.656-.1a1.23 1.23 0 0 0 .463-.293c.113-.109.199-.244.258-.404.062-.164.094-.34.094-.528 0-.203-.03-.384-.088-.545a1.102 1.102 0 0 0-.246-.41 1.138 1.138 0 0 0-.416-.246 1.704 1.704 0 0 0-.569-.088c-.191 0-.369.03-.533.088a1.198 1.198 0 0 0-.703.621c-.066.149-.1.315-.1.498h-1.4c0-.34.068-.652.205-.937a2.3 2.3 0 0 1 .568-.744c.243-.207.528-.369.856-.487a3.258 3.258 0 0 1 1.09-.175c.402 0 .771.052 1.107.158.34.101.629.254.867.457a2.1 2.1 0 0 1 .563.762c.133.3.199.65.199 1.048 0 .176-.027.352-.082.528a1.96 1.96 0 0 1-.234.509 2.264 2.264 0 0 1-.961.809c.254.086.468.199.644.34.18.137.326.291.44.463.113.176.195.365.246.568.051.199.076.406.076.621 0 .399-.074.754-.223 1.067a2.222 2.222 0 0 1-.597.779 2.706 2.706 0 0 1-.914.492 3.766 3.766 0 0 1-1.131.164c-.367 0-.721-.051-1.061-.152a2.673 2.673 0 0 1-.896-.457 2.308 2.308 0 0 1-.621-.75 2.286 2.286 0 0 1-.229-1.049h1.4c0 .187.034.361.1.521.07.157.17.29.299.399.125.113.273.201.445.264.176.062.369.093.58.093.227 0 .43-.029.61-.088.183-.062.338-.154.463-.275a1.09 1.09 0 0 0 .275-.422c.066-.172.1-.367.1-.586 0-.246-.038-.457-.112-.633a1.135 1.135 0 0 0-.322-.439 1.401 1.401 0 0 0-.51-.252 2.264 2.264 0 0 0-.656-.088h-.838v-1.101Zm7.207 0h.838c.25 0 .469-.034.656-.1a1.23 1.23 0 0 0 .463-.293c.113-.109.199-.244.258-.404.062-.164.094-.34.094-.528 0-.203-.03-.384-.088-.545a1.102 1.102 0 0 0-.246-.41 1.138 1.138 0 0 0-.416-.246 1.704 1.704 0 0 0-.569-.088c-.191 0-.369.03-.533.088a1.198 1.198 0 0 0-.703.621c-.066.149-.1.315-.1.498h-1.4c0-.34.068-.652.205-.937a2.3 2.3 0 0 1 .568-.744c.243-.207.528-.369.856-.487a3.258 3.258 0 0 1 1.09-.175c.402 0 .771.052 1.107.158.34.101.629.254.867.457a2.1 2.1 0 0 1 .563.762c.133.3.199.65.199 1.048 0 .176-.027.352-.082.528a1.96 1.96 0 0 1-.234.509 2.264 2.264 0 0 1-.961.809c.254.086.469.199.644.34.18.137.326.291.44.463.113.176.195.365.246.568.051.199.076.406.076.621 0 .399-.074.754-.223 1.067a2.222 2.222 0 0 1-.597.779 2.706 2.706 0 0 1-.914.492 3.766 3.766 0 0 1-1.131.164c-.367 0-.721-.051-1.061-.152a2.673 2.673 0 0 1-.896-.457 2.308 2.308 0 0 1-.621-.75 2.286 2.286 0 0 1-.229-1.049h1.401c0 .187.033.361.099.521.07.157.17.29.299.399.125.113.273.201.445.264.176.062.369.093.58.093.227 0 .43-.029.61-.088.183-.062.338-.154.463-.275a1.09 1.09 0 0 0 .275-.422c.066-.172.1-.367.1-.586a1.61 1.61 0 0 0-.112-.633 1.135 1.135 0 0 0-.322-.439 1.401 1.401 0 0 0-.51-.252 2.264 2.264 0 0 0-.656-.088h-.838v-1.101Zm11.197 1.646c0 .547-.064 1.031-.193 1.453a2.875 2.875 0 0 1-.545 1.049 2.237 2.237 0 0 1-.867.656c-.34.145-.727.217-1.16.217-.43 0-.817-.072-1.16-.217a2.286 2.286 0 0 1-.873-.656 2.877 2.877 0 0 1-.557-1.049 5.121 5.121 0 0 1-.188-1.453v-2.021c0-.547.063-1.03.188-1.448.129-.422.312-.777.551-1.066.238-.285.527-.5.867-.645.344-.148.73-.222 1.16-.222.434 0 .82.074 1.16.222.344.145.637.36.879.645.234.289.416.644.545 1.066.129.418.193.901.193 1.448v2.021Zm-4.136-.498 2.713-2.057a3.226 3.226 0 0 0-.129-.791 1.433 1.433 0 0 0-.287-.545 1.034 1.034 0 0 0-.405-.281 1.435 1.435 0 0 0-.533-.094c-.215 0-.404.038-.568.112a1.04 1.04 0 0 0-.41.328 1.642 1.642 0 0 0-.288.639 3.94 3.94 0 0 0-.093.914v1.775Zm2.724.732v-1.711l-2.713 2.045c.02.27.061.508.123.715.067.207.155.379.264.516.109.148.244.26.404.334.164.074.354.111.569.111.211 0 .396-.035.556-.105a1.14 1.14 0 0 0 .411-.323c.128-.164.224-.378.287-.644.066-.266.099-.578.099-.938Z"
              className="330"
            />
            <path
              d="M787.889 669h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V669Zm8.021-3.041h1.072v1.137h-1.072V669h-1.4v-1.904h-3.692l-.035-.862 3.686-5.765h1.441v5.49Zm-3.697 0h2.297v-3.615l-.164.304-2.133 3.311Zm11.771-.211c0 .547-.064 1.031-.193 1.453a2.875 2.875 0 0 1-.545 1.049 2.237 2.237 0 0 1-.867.656c-.34.145-.727.217-1.16.217-.43 0-.817-.072-1.16-.217a2.286 2.286 0 0 1-.873-.656 2.877 2.877 0 0 1-.557-1.049 5.121 5.121 0 0 1-.188-1.453v-2.021c0-.547.063-1.03.188-1.448.129-.422.312-.777.551-1.066.238-.285.527-.5.867-.645.344-.148.73-.222 1.16-.222.434 0 .82.074 1.16.222.344.145.637.36.879.645.234.289.416.644.545 1.066.129.418.193.901.193 1.448v2.021Zm-4.136-.498 2.713-2.057a3.226 3.226 0 0 0-.129-.791 1.433 1.433 0 0 0-.287-.545 1.034 1.034 0 0 0-.405-.281 1.435 1.435 0 0 0-.533-.094c-.215 0-.404.038-.568.112a1.04 1.04 0 0 0-.41.328 1.642 1.642 0 0 0-.288.639 3.94 3.94 0 0 0-.093.914v1.775Zm2.724.732v-1.711l-2.713 2.045c.02.27.061.508.123.715.067.207.155.379.264.516.109.148.244.26.404.334.164.074.354.111.569.111.211 0 .396-.035.556-.105a1.14 1.14 0 0 0 .411-.323c.128-.164.224-.378.287-.644.066-.266.099-.578.099-.938Z"
              className="140"
            />
            <path
              d="M796.889 580h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V580Zm8.021-3.041h1.072v1.137h-1.072V580h-1.4v-1.904h-3.692l-.035-.862 3.686-5.765h1.441v5.49Zm-3.697 0h2.297v-3.615l-.164.304-2.133 3.311Zm10.09 3.041h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V580Z"
              className="141"
            />
            <path
              d="M712.889 662h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V662Zm4.898-4.898h.838c.25 0 .469-.034.656-.1a1.23 1.23 0 0 0 .463-.293c.113-.109.199-.244.258-.404.062-.164.094-.34.094-.528 0-.203-.03-.384-.088-.545a1.102 1.102 0 0 0-.246-.41 1.138 1.138 0 0 0-.416-.246 1.704 1.704 0 0 0-.569-.088c-.191 0-.369.03-.533.088a1.198 1.198 0 0 0-.703.621c-.066.149-.1.315-.1.498h-1.4c0-.34.068-.652.205-.937a2.3 2.3 0 0 1 .568-.744c.243-.207.528-.369.856-.487a3.258 3.258 0 0 1 1.09-.175c.402 0 .771.052 1.107.158.34.101.629.254.867.457a2.1 2.1 0 0 1 .563.762c.133.3.199.65.199 1.048 0 .176-.027.352-.082.528a1.96 1.96 0 0 1-.234.509 2.264 2.264 0 0 1-.961.809c.254.086.469.199.644.34.18.137.326.291.44.463.113.176.195.365.246.568.051.199.076.406.076.621 0 .399-.074.754-.223 1.067a2.222 2.222 0 0 1-.597.779 2.706 2.706 0 0 1-.914.492 3.766 3.766 0 0 1-1.131.164c-.367 0-.721-.051-1.061-.152a2.673 2.673 0 0 1-.896-.457 2.308 2.308 0 0 1-.621-.75 2.286 2.286 0 0 1-.229-1.049h1.401c0 .187.033.361.099.521.07.157.17.29.299.399.125.113.273.201.445.264.176.062.369.093.58.093.227 0 .43-.029.61-.088.183-.062.338-.154.463-.275a1.09 1.09 0 0 0 .275-.422c.066-.172.1-.367.1-.586a1.61 1.61 0 0 0-.112-.633 1.135 1.135 0 0 0-.322-.439 1.401 1.401 0 0 0-.51-.252 2.264 2.264 0 0 0-.656-.088h-.838v-1.101Zm11.227-2.848-3.41 7.746h-1.477l3.41-7.359h-4.424v-1.172h5.901v.785Z"
              className="137"
            />
            <path
              d="M718.889 621h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V621Zm4.898-4.898h.838c.25 0 .469-.034.656-.1a1.23 1.23 0 0 0 .463-.293c.113-.109.199-.244.258-.404.062-.164.094-.34.094-.528 0-.203-.03-.384-.088-.545a1.102 1.102 0 0 0-.246-.41 1.138 1.138 0 0 0-.416-.246 1.704 1.704 0 0 0-.569-.088c-.191 0-.369.03-.533.088a1.198 1.198 0 0 0-.703.621c-.066.149-.1.315-.1.498h-1.4c0-.34.068-.652.205-.937a2.3 2.3 0 0 1 .568-.744c.243-.207.528-.369.856-.487a3.258 3.258 0 0 1 1.09-.175c.402 0 .771.052 1.107.158.34.101.629.254.867.457a2.1 2.1 0 0 1 .563.762c.133.3.199.65.199 1.048 0 .176-.027.352-.082.528a1.96 1.96 0 0 1-.234.509 2.264 2.264 0 0 1-.961.809c.254.086.469.199.644.34.18.137.326.291.44.463.113.176.195.365.246.568.051.199.076.406.076.621 0 .399-.074.754-.223 1.067a2.222 2.222 0 0 1-.597.779 2.706 2.706 0 0 1-.914.492 3.766 3.766 0 0 1-1.131.164c-.367 0-.721-.051-1.061-.152a2.673 2.673 0 0 1-.896-.457 2.308 2.308 0 0 1-.621-.75 2.286 2.286 0 0 1-.229-1.049h1.401c0 .187.033.361.099.521.07.157.17.29.299.399.125.113.273.201.445.264.176.062.369.093.58.093.227 0 .43-.029.61-.088.183-.062.338-.154.463-.275a1.09 1.09 0 0 0 .275-.422c.066-.172.1-.367.1-.586a1.61 1.61 0 0 0-.112-.633 1.135 1.135 0 0 0-.322-.439 1.401 1.401 0 0 0-.51-.252 2.264 2.264 0 0 0-.656-.088h-.838v-1.101Zm9.908-3.674v1.189h-.093c-.465 0-.87.065-1.213.194a2.382 2.382 0 0 0-1.418 1.341 3.507 3.507 0 0 0-.241 1.02c.094-.106.204-.207.329-.305.125-.101.263-.191.416-.269.144-.075.304-.133.48-.176.176-.047.361-.07.557-.07.414 0 .773.078 1.078.234.308.156.562.367.762.633.203.265.351.57.445.914.098.344.146.701.146 1.072 0 .406-.062.787-.187 1.143a2.673 2.673 0 0 1-.533.92c-.239.265-.53.474-.873.627-.34.148-.729.222-1.166.222-.45 0-.85-.086-1.202-.258a2.64 2.64 0 0 1-.89-.697 3.137 3.137 0 0 1-.586-1.072 4.248 4.248 0 0 1-.199-1.307v-.58c0-.687.088-1.342.263-1.963a3.95 3.95 0 0 1 .891-1.611 3.473 3.473 0 0 1 1.301-.891c.515-.207 1.105-.31 1.769-.31h.164Zm-1.529 4.06c-.168 0-.328.026-.48.076a1.668 1.668 0 0 0-.422.211c-.118.09-.223.194-.317.311a1.71 1.71 0 0 0-.234.393v.433c0 .34.037.639.111.897.078.257.184.472.317.644.132.172.287.303.463.393.175.09.363.134.562.134.219 0 .414-.042.586-.128.172-.09.318-.211.439-.364.121-.156.213-.34.276-.55.062-.215.094-.448.094-.698 0-.238-.032-.463-.094-.674a1.716 1.716 0 0 0-.264-.562 1.24 1.24 0 0 0-.439-.375 1.226 1.226 0 0 0-.598-.141Z"
              className="136"
            />
            <path
              d="M667.889 620h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V620Zm4.898-4.898h.838c.25 0 .469-.034.656-.1a1.23 1.23 0 0 0 .463-.293c.113-.109.199-.244.258-.404.062-.164.094-.34.094-.528 0-.203-.03-.384-.088-.545a1.102 1.102 0 0 0-.246-.41 1.138 1.138 0 0 0-.416-.246 1.704 1.704 0 0 0-.569-.088c-.191 0-.369.03-.533.088a1.198 1.198 0 0 0-.703.621c-.066.149-.1.315-.1.498h-1.4c0-.34.068-.652.205-.937a2.3 2.3 0 0 1 .568-.744c.243-.207.528-.369.856-.487a3.258 3.258 0 0 1 1.09-.175c.402 0 .771.052 1.107.158.34.101.629.254.867.457a2.1 2.1 0 0 1 .563.762c.133.3.199.65.199 1.048 0 .176-.027.352-.082.528a1.96 1.96 0 0 1-.234.509 2.264 2.264 0 0 1-.961.809c.254.086.469.199.644.34.18.137.326.291.44.463.113.176.195.365.246.568.051.199.076.406.076.621 0 .399-.074.754-.223 1.067a2.222 2.222 0 0 1-.597.779 2.706 2.706 0 0 1-.914.492 3.766 3.766 0 0 1-1.131.164c-.367 0-.721-.051-1.061-.152a2.673 2.673 0 0 1-.896-.457 2.308 2.308 0 0 1-.621-.75 2.286 2.286 0 0 1-.229-1.049h1.401c0 .187.033.361.099.521.07.157.17.29.299.399.125.113.273.201.445.264.176.062.369.093.58.093.227 0 .43-.029.61-.088.183-.062.338-.154.463-.275a1.09 1.09 0 0 0 .275-.422c.066-.172.1-.367.1-.586a1.61 1.61 0 0 0-.112-.633 1.135 1.135 0 0 0-.322-.439 1.401 1.401 0 0 0-.51-.252 2.264 2.264 0 0 0-.656-.088h-.838v-1.101Zm7.207 0h.838c.25 0 .469-.034.656-.1a1.23 1.23 0 0 0 .463-.293c.113-.109.199-.244.258-.404.062-.164.094-.34.094-.528 0-.203-.03-.384-.088-.545a1.102 1.102 0 0 0-.246-.41 1.138 1.138 0 0 0-.416-.246 1.704 1.704 0 0 0-.569-.088c-.191 0-.369.03-.533.088a1.198 1.198 0 0 0-.703.621c-.066.149-.1.315-.1.498h-1.4c0-.34.068-.652.205-.937a2.3 2.3 0 0 1 .568-.744c.243-.207.528-.369.856-.487a3.258 3.258 0 0 1 1.09-.175c.402 0 .771.052 1.107.158.34.101.629.254.867.457a2.1 2.1 0 0 1 .563.762c.133.3.199.65.199 1.048 0 .176-.027.352-.082.528a1.96 1.96 0 0 1-.234.509 2.264 2.264 0 0 1-.961.809c.254.086.469.199.644.34.18.137.326.291.44.463.113.176.195.365.246.568.051.199.076.406.076.621 0 .399-.074.754-.223 1.067a2.222 2.222 0 0 1-.597.779 2.706 2.706 0 0 1-.914.492 3.766 3.766 0 0 1-1.131.164c-.367 0-.721-.051-1.061-.152a2.673 2.673 0 0 1-.896-.457 2.308 2.308 0 0 1-.621-.75 2.286 2.286 0 0 1-.229-1.049h1.401c0 .187.033.361.099.521.07.157.17.29.299.399.125.113.273.201.445.264.176.062.369.093.58.093.227 0 .43-.029.61-.088.183-.062.338-.154.463-.275.121-.113.213-.254.275-.422.066-.172.1-.367.1-.586a1.61 1.61 0 0 0-.112-.633 1.135 1.135 0 0 0-.322-.439 1.393 1.393 0 0 0-.51-.252 2.264 2.264 0 0 0-.656-.088h-.838v-1.101Z"
              className="133"
            />
            <path
              d="M639.889 624h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V624Zm4.898-4.898h.838c.25 0 .469-.034.656-.1a1.23 1.23 0 0 0 .463-.293c.113-.109.199-.244.258-.404.062-.164.094-.34.094-.528 0-.203-.03-.384-.088-.545a1.102 1.102 0 0 0-.246-.41 1.138 1.138 0 0 0-.416-.246 1.704 1.704 0 0 0-.569-.088c-.191 0-.369.03-.533.088a1.198 1.198 0 0 0-.703.621c-.066.149-.1.315-.1.498h-1.4c0-.34.068-.652.205-.937a2.3 2.3 0 0 1 .568-.744c.243-.207.528-.369.856-.487a3.258 3.258 0 0 1 1.09-.175c.402 0 .771.052 1.107.158.34.101.629.254.867.457a2.1 2.1 0 0 1 .563.762c.133.3.199.65.199 1.048 0 .176-.027.352-.082.528a1.96 1.96 0 0 1-.234.509 2.264 2.264 0 0 1-.961.809c.254.086.469.199.644.34.18.137.326.291.44.463.113.176.195.365.246.568.051.199.076.406.076.621 0 .399-.074.754-.223 1.067a2.222 2.222 0 0 1-.597.779 2.706 2.706 0 0 1-.914.492 3.766 3.766 0 0 1-1.131.164c-.367 0-.721-.051-1.061-.152a2.673 2.673 0 0 1-.896-.457 2.308 2.308 0 0 1-.621-.75 2.286 2.286 0 0 1-.229-1.049h1.401c0 .187.033.361.099.521.07.157.17.29.299.399.125.113.273.201.445.264.176.062.369.093.58.093.227 0 .43-.029.61-.088.183-.062.338-.154.463-.275a1.09 1.09 0 0 0 .275-.422c.066-.172.1-.367.1-.586a1.61 1.61 0 0 0-.112-.633 1.135 1.135 0 0 0-.322-.439 1.401 1.401 0 0 0-.51-.252 2.264 2.264 0 0 0-.656-.088h-.838v-1.101Zm11.197 1.646c0 .547-.064 1.031-.193 1.453a2.875 2.875 0 0 1-.545 1.049 2.237 2.237 0 0 1-.867.656c-.34.145-.727.217-1.16.217-.43 0-.817-.072-1.16-.217a2.286 2.286 0 0 1-.873-.656 2.877 2.877 0 0 1-.557-1.049 5.121 5.121 0 0 1-.188-1.453v-2.021c0-.547.063-1.03.188-1.448.129-.422.312-.777.551-1.066.238-.285.527-.5.867-.645.344-.148.73-.222 1.16-.222.434 0 .82.074 1.16.222.344.145.637.36.879.645.234.289.416.644.545 1.066.129.418.193.901.193 1.448v2.021Zm-4.136-.498 2.713-2.057a3.226 3.226 0 0 0-.129-.791 1.433 1.433 0 0 0-.287-.545 1.034 1.034 0 0 0-.405-.281 1.435 1.435 0 0 0-.533-.094c-.215 0-.404.038-.568.112a1.04 1.04 0 0 0-.41.328 1.642 1.642 0 0 0-.288.639 3.94 3.94 0 0 0-.093.914v1.775Zm2.724.732v-1.711l-2.713 2.045c.02.27.061.508.123.715.067.207.155.379.264.516.109.148.244.26.404.334.164.074.354.111.569.111.211 0 .396-.035.556-.105a1.14 1.14 0 0 0 .411-.323c.128-.164.224-.378.287-.644.066-.266.099-.578.099-.938Z"
              className="130"
            />
            <path
              d="M616.889 638h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V638Zm8.847 0h-5.724v-.973l2.777-3.023c.231-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.555-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.528 6.528 0 0 1-.556.744c-.211.25-.442.508-.692.774l-1.898 2.027h3.972V638Zm7.278-7.746-3.41 7.746h-1.477l3.41-7.359h-4.424v-1.172h5.901v.785Z"
              className="127"
            />
            <path
              d="M588.889 629h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V629Zm8.847 0h-5.724v-.973l2.777-3.023c.231-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.555-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.528 6.528 0 0 1-.556.744c-.211.25-.442.508-.692.774l-1.898 2.027h3.972V629Zm5.959-8.572v1.189h-.093c-.465 0-.87.065-1.213.194a2.382 2.382 0 0 0-1.418 1.341 3.507 3.507 0 0 0-.241 1.02c.094-.106.204-.207.329-.305.125-.101.263-.191.416-.269.144-.075.304-.133.48-.176.176-.047.361-.07.557-.07.414 0 .773.078 1.078.234.308.156.562.367.762.633.203.265.351.57.445.914.098.344.146.701.146 1.072 0 .406-.062.787-.187 1.143a2.673 2.673 0 0 1-.533.92c-.239.265-.53.474-.873.627-.34.148-.729.222-1.166.222-.45 0-.85-.086-1.202-.258a2.64 2.64 0 0 1-.89-.697 3.137 3.137 0 0 1-.586-1.072 4.248 4.248 0 0 1-.199-1.307v-.58c0-.687.088-1.342.263-1.963a3.95 3.95 0 0 1 .891-1.611 3.473 3.473 0 0 1 1.301-.891c.515-.207 1.105-.31 1.769-.31h.164Zm-1.529 4.06c-.168 0-.328.026-.48.076a1.668 1.668 0 0 0-.422.211c-.118.09-.223.194-.317.311a1.71 1.71 0 0 0-.234.393v.433c0 .34.037.639.111.897.078.257.184.472.317.644.132.172.287.303.463.393.175.09.363.134.562.134.219 0 .414-.042.586-.128.172-.09.318-.211.439-.364.121-.156.213-.34.276-.55.062-.215.094-.448.094-.698 0-.238-.032-.463-.094-.674a1.716 1.716 0 0 0-.264-.562 1.24 1.24 0 0 0-.439-.375 1.226 1.226 0 0 0-.598-.141Z"
              className="126"
            />
            <path
              d="M569.889 616h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V616Zm8.847 0h-5.724v-.973l2.777-3.023c.231-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.555-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.528 6.528 0 0 1-.556.744c-.211.25-.442.508-.692.774l-1.898 2.027h3.972V616Zm5.567 0h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V616Z"
              className="121"
            />
            <path
              d="M551.889 634h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V634Zm8.847 0h-5.724v-.973l2.777-3.023c.231-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.555-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.528 6.528 0 0 1-.556.744c-.211.25-.442.508-.692.774l-1.898 2.027h3.972V634Zm7.248-3.252c0 .547-.064 1.031-.193 1.453a2.875 2.875 0 0 1-.545 1.049 2.237 2.237 0 0 1-.867.656c-.34.145-.727.217-1.16.217-.43 0-.817-.072-1.16-.217a2.286 2.286 0 0 1-.873-.656 2.877 2.877 0 0 1-.557-1.049 5.121 5.121 0 0 1-.188-1.453v-2.021c0-.547.063-1.03.188-1.448.129-.422.312-.777.551-1.066.238-.285.527-.5.867-.645.344-.148.73-.222 1.16-.222.434 0 .82.074 1.16.222.344.145.637.36.879.645.234.289.416.644.545 1.066.129.418.193.901.193 1.448v2.021Zm-4.136-.498 2.713-2.057a3.226 3.226 0 0 0-.129-.791 1.433 1.433 0 0 0-.287-.545 1.034 1.034 0 0 0-.405-.281 1.435 1.435 0 0 0-.533-.094c-.215 0-.404.038-.568.112a1.04 1.04 0 0 0-.41.328 1.642 1.642 0 0 0-.288.639 3.94 3.94 0 0 0-.093.914v1.775Zm2.724.732v-1.711l-2.713 2.045c.02.27.061.508.123.715.067.207.155.379.264.516.109.148.244.26.404.334.164.074.354.111.569.111.211 0 .396-.035.556-.105a1.14 1.14 0 0 0 .411-.323c.128-.164.224-.378.287-.644.066-.266.099-.578.099-.938Z"
              className="120"
            />
            <path
              d="M529.889 636h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V636Zm7.207 0h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V636Zm7.599-8.572v1.189h-.093c-.465 0-.87.065-1.213.194a2.382 2.382 0 0 0-1.418 1.341 3.507 3.507 0 0 0-.241 1.02c.094-.106.204-.207.329-.305.125-.101.263-.191.416-.269.144-.075.304-.133.48-.176.176-.047.361-.07.557-.07.414 0 .773.078 1.078.234.308.156.562.367.762.633.203.265.351.57.445.914.098.344.146.701.146 1.072 0 .406-.062.787-.187 1.143a2.673 2.673 0 0 1-.533.92c-.239.265-.53.474-.873.627-.34.148-.729.222-1.166.222-.45 0-.85-.086-1.202-.258a2.64 2.64 0 0 1-.89-.697 3.137 3.137 0 0 1-.586-1.072 4.248 4.248 0 0 1-.199-1.307v-.58c0-.687.088-1.342.263-1.963a3.95 3.95 0 0 1 .891-1.611 3.473 3.473 0 0 1 1.301-.891c.515-.207 1.105-.31 1.769-.31h.164Zm-1.529 4.06c-.168 0-.328.026-.48.076a1.668 1.668 0 0 0-.422.211c-.118.09-.223.194-.317.311a1.71 1.71 0 0 0-.234.393v.433c0 .34.037.639.111.897.078.257.184.472.317.644.132.172.287.303.463.393.175.09.363.134.562.134.219 0 .414-.042.586-.128.172-.09.318-.211.439-.364.121-.156.213-.34.276-.55.062-.215.094-.448.094-.698 0-.238-.032-.463-.094-.674a1.716 1.716 0 0 0-.264-.562 1.24 1.24 0 0 0-.439-.375 1.226 1.226 0 0 0-.598-.141Z"
              className="116"
            />
            <path
              d="M504.889 619h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V619Zm7.207 0h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V619Zm3.627-4.23.457-4.301h4.588v1.242h-3.422l-.223 2.045c.141-.082.324-.16.551-.235.23-.074.494-.111.791-.111.402 0 .762.067 1.078.199.32.133.592.323.814.569.219.25.387.552.504.908.118.352.176.748.176 1.189 0 .391-.057.76-.17 1.108a2.437 2.437 0 0 1-.51.902 2.356 2.356 0 0 1-.861.61c-.348.148-.758.222-1.23.222-.36 0-.704-.051-1.032-.152a2.663 2.663 0 0 1-.873-.469 2.463 2.463 0 0 1-.627-.756 2.545 2.545 0 0 1-.275-1.049h1.365c.051.418.203.739.457.961.258.223.586.334.985.334.234 0 .437-.043.609-.129.172-.086.316-.207.434-.363a1.63 1.63 0 0 0 .246-.551c.054-.218.082-.455.082-.709 0-.246-.033-.47-.1-.673a1.49 1.49 0 0 0-.287-.54 1.283 1.283 0 0 0-.48-.351 1.621 1.621 0 0 0-.668-.129c-.168 0-.315.014-.44.041a1.46 1.46 0 0 0-.592.27 2.535 2.535 0 0 0-.228.193l-1.119-.275Z"
              className="115"
            />
            <path
              d="M524.889 596h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V596Zm7.207 0h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V596Zm8.724-6.281c0 .258-.043.498-.129.72a1.92 1.92 0 0 1-.351.598 2.302 2.302 0 0 1-.322.317 2.269 2.269 0 0 1-.405.257c.176.082.338.178.487.287.152.106.285.229.398.37a2.134 2.134 0 0 1 .51 1.412c0 .394-.072.744-.217 1.049a2.165 2.165 0 0 1-.592.761 2.621 2.621 0 0 1-.89.469 3.64 3.64 0 0 1-1.09.158c-.399 0-.77-.053-1.114-.158a2.556 2.556 0 0 1-.884-.469 2.144 2.144 0 0 1-.598-.756 2.482 2.482 0 0 1-.211-1.054c0-.235.031-.457.094-.668.066-.211.16-.407.281-.586.121-.172.266-.326.434-.463a2.68 2.68 0 0 1 .574-.358 2.293 2.293 0 0 1-.492-.328 2.093 2.093 0 0 1-.615-.955 2.031 2.031 0 0 1-.088-.603c0-.379.064-.715.193-1.008.133-.293.314-.541.545-.744.226-.203.498-.356.814-.457.321-.106.67-.158 1.049-.158.375 0 .721.052 1.037.158.321.101.6.254.838.457.231.199.412.447.545.744.133.293.199.629.199 1.008Zm-1.213 3.885c0-.211-.035-.403-.105-.575a1.365 1.365 0 0 0-.281-.457 1.307 1.307 0 0 0-.446-.281 1.568 1.568 0 0 0-.568-.1c-.215 0-.408.034-.58.1-.168.066-.313.16-.434.281a1.382 1.382 0 0 0-.281.457 1.704 1.704 0 0 0-.094.58c0 .219.034.416.1.592.066.172.162.317.287.434.121.113.266.201.434.263.172.059.365.088.58.088.203 0 .388-.031.556-.093.172-.063.321-.153.446-.27.117-.121.211-.266.281-.434.07-.171.105-.367.105-.585Zm-.181-3.833a1.38 1.38 0 0 0-.094-.521 1.291 1.291 0 0 0-.246-.41 1.188 1.188 0 0 0-.387-.258 1.294 1.294 0 0 0-.504-.094c-.183 0-.349.032-.498.094a1.097 1.097 0 0 0-.375.252 1.123 1.123 0 0 0-.234.404c-.055.16-.082.338-.082.533 0 .192.027.368.082.528.055.156.137.289.246.398.105.114.232.201.381.264.148.062.314.094.498.094.183 0 .349-.032.498-.094a1.154 1.154 0 0 0 .627-.662 1.54 1.54 0 0 0 .088-.528Z"
              className="118"
            />
            <path
              d="M547.889 598h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V598Zm7.207 0h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V598Zm4.552-1.154c.485 0 .897-.055 1.237-.164.34-.11.619-.266.838-.469.234-.223.406-.477.515-.762.11-.289.18-.599.211-.931v-.03a1.989 1.989 0 0 1-.662.492c-.141.067-.297.12-.469.159a2.46 2.46 0 0 1-.556.058c-.414 0-.776-.078-1.084-.234a2.24 2.24 0 0 1-.762-.627 2.738 2.738 0 0 1-.463-.914 3.827 3.827 0 0 1-.152-1.084c0-.41.06-.795.181-1.154a2.91 2.91 0 0 1 .539-.956 2.53 2.53 0 0 1 .862-.638c.344-.16.734-.24 1.172-.24.441 0 .832.084 1.172.252.343.167.634.396.873.685.25.313.439.691.568 1.137.129.441.193.906.193 1.394v.492a7.72 7.72 0 0 1-.234 1.922 3.89 3.89 0 0 1-.826 1.6c-.321.375-.742.67-1.266.885-.519.215-1.146.322-1.881.322h-.117v-1.195h.111Zm1.413-2.754a1.4 1.4 0 0 0 .867-.293c.121-.09.226-.195.316-.317a1.79 1.79 0 0 0 .229-.404v-.486c0-.34-.039-.641-.118-.903a2.13 2.13 0 0 0-.298-.656 1.317 1.317 0 0 0-.452-.398 1.126 1.126 0 0 0-.55-.141c-.219 0-.414.049-.586.147a1.235 1.235 0 0 0-.422.386 1.87 1.87 0 0 0-.27.58 2.759 2.759 0 0 0-.006 1.366c.055.215.141.406.258.574.114.164.254.297.422.398.172.098.375.147.61.147Z"
              className="119"
            />
            <path
              d="M585.889 572h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V572Zm8.847 0h-5.724v-.973l2.777-3.023c.231-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.555-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.528 6.528 0 0 1-.556.744c-.211.25-.442.508-.692.774l-1.898 2.027h3.972V572Zm3.258-4.898h.838c.25 0 .469-.034.656-.1a1.23 1.23 0 0 0 .463-.293c.113-.109.199-.244.258-.404.062-.164.094-.34.094-.528 0-.203-.03-.384-.088-.545a1.102 1.102 0 0 0-.246-.41 1.138 1.138 0 0 0-.416-.246 1.704 1.704 0 0 0-.569-.088c-.191 0-.369.03-.533.088a1.198 1.198 0 0 0-.703.621c-.066.149-.1.315-.1.498h-1.4c0-.34.068-.652.205-.937a2.3 2.3 0 0 1 .568-.744c.243-.207.528-.369.856-.487a3.258 3.258 0 0 1 1.09-.175c.402 0 .771.052 1.107.158.34.101.629.254.867.457a2.1 2.1 0 0 1 .563.762c.133.3.199.65.199 1.048 0 .176-.027.352-.082.528a1.96 1.96 0 0 1-.234.509 2.264 2.264 0 0 1-.961.809c.254.086.469.199.644.34.18.137.326.291.44.463.113.176.195.365.246.568.051.199.076.406.076.621 0 .399-.074.754-.223 1.067a2.222 2.222 0 0 1-.597.779 2.706 2.706 0 0 1-.914.492 3.766 3.766 0 0 1-1.131.164c-.367 0-.721-.051-1.061-.152a2.673 2.673 0 0 1-.896-.457 2.308 2.308 0 0 1-.621-.75 2.286 2.286 0 0 1-.229-1.049h1.401c0 .187.033.361.099.521.07.157.17.29.299.399.125.113.273.201.445.264.176.062.369.093.58.093.227 0 .43-.029.61-.088.183-.062.338-.154.463-.275.121-.113.213-.254.275-.422.066-.172.1-.367.1-.586a1.61 1.61 0 0 0-.112-.633 1.135 1.135 0 0 0-.322-.439 1.393 1.393 0 0 0-.51-.252 2.264 2.264 0 0 0-.656-.088h-.838v-1.101Z"
              className="123"
            />
            <path
              d="M551.889 568h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V568Zm8.847 0h-5.724v-.973l2.777-3.023c.231-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.555-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.528 6.528 0 0 1-.556.744c-.211.25-.442.508-.692.774l-1.898 2.027h3.972V568Zm7.207 0h-5.724v-.973l2.777-3.023c.231-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.342 1.342 0 0 0-.527-.099c-.25 0-.467.035-.651.105a1.22 1.22 0 0 0-.457.299 1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.555-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.205.498-.358.744a6.528 6.528 0 0 1-.556.744c-.211.25-.442.508-.692.774l-1.898 2.027h3.972V568Z"
              className="122"
            />
            <path
              d="M528.889 564h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V564Zm7.599-8.572v1.189h-.093c-.465 0-.87.065-1.213.194a2.368 2.368 0 0 0-1.418 1.341 3.507 3.507 0 0 0-.241 1.02c.094-.106.204-.207.329-.305.125-.101.263-.191.416-.269.144-.075.304-.133.48-.176.176-.047.361-.07.557-.07.414 0 .773.078 1.078.234.308.156.562.367.762.633.203.265.351.57.445.914.098.344.146.701.146 1.072 0 .406-.062.787-.187 1.143a2.673 2.673 0 0 1-.533.92c-.239.265-.53.474-.873.627-.34.148-.729.222-1.166.222-.45 0-.85-.086-1.202-.258a2.64 2.64 0 0 1-.89-.697 3.137 3.137 0 0 1-.586-1.072 4.248 4.248 0 0 1-.199-1.307v-.58c0-.687.088-1.342.263-1.963a3.95 3.95 0 0 1 .891-1.611 3.473 3.473 0 0 1 1.301-.891c.515-.207 1.105-.31 1.769-.31h.164Zm-1.529 4.06c-.168 0-.328.026-.48.076a1.668 1.668 0 0 0-.422.211c-.118.09-.223.194-.317.311a1.675 1.675 0 0 0-.234.393v.433c0 .34.037.639.111.897.078.257.184.472.317.644.132.172.287.303.462.393.176.09.364.134.563.134.219 0 .414-.042.586-.128.172-.09.318-.211.439-.364.121-.156.213-.34.276-.55.062-.215.094-.448.094-.698 0-.238-.032-.463-.094-.674a1.716 1.716 0 0 0-.264-.562 1.24 1.24 0 0 0-.439-.375 1.226 1.226 0 0 0-.598-.141Zm8.736-4.06v1.189h-.093c-.465 0-.87.065-1.213.194a2.382 2.382 0 0 0-1.418 1.341 3.507 3.507 0 0 0-.241 1.02c.094-.106.204-.207.329-.305.125-.101.263-.191.416-.269.144-.075.304-.133.48-.176.176-.047.361-.07.557-.07.414 0 .773.078 1.078.234.308.156.562.367.762.633.203.265.351.57.445.914.098.344.146.701.146 1.072 0 .406-.062.787-.187 1.143a2.673 2.673 0 0 1-.533.92c-.239.265-.53.474-.873.627-.34.148-.729.222-1.166.222-.45 0-.85-.086-1.202-.258a2.64 2.64 0 0 1-.89-.697 3.137 3.137 0 0 1-.586-1.072 4.248 4.248 0 0 1-.199-1.307v-.58c0-.687.088-1.342.263-1.963a3.95 3.95 0 0 1 .891-1.611 3.473 3.473 0 0 1 1.301-.891c.515-.207 1.105-.31 1.769-.31h.164Zm-1.529 4.06c-.168 0-.328.026-.48.076a1.668 1.668 0 0 0-.422.211c-.118.09-.223.194-.317.311a1.71 1.71 0 0 0-.234.393v.433c0 .34.037.639.111.897.078.257.184.472.317.644.132.172.287.303.463.393.175.09.363.134.562.134.219 0 .414-.042.586-.128.172-.09.318-.211.439-.364.121-.156.213-.34.276-.55.062-.215.094-.448.094-.698 0-.238-.032-.463-.094-.674a1.716 1.716 0 0 0-.264-.562 1.24 1.24 0 0 0-.439-.375 1.226 1.226 0 0 0-.598-.141Z"
              className="166"
            />
            <path
              d="M514.889 551h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V551Zm7.599-8.572v1.189h-.093c-.465 0-.87.065-1.213.194a2.368 2.368 0 0 0-1.418 1.341 3.507 3.507 0 0 0-.241 1.02c.094-.106.204-.207.329-.305.125-.101.263-.191.416-.269.144-.075.304-.133.48-.176.176-.047.361-.07.557-.07.414 0 .773.078 1.078.234.308.156.562.367.762.633.203.265.351.57.445.914.098.344.146.701.146 1.072 0 .406-.062.787-.187 1.143a2.673 2.673 0 0 1-.533.92c-.239.265-.53.474-.873.627-.34.148-.729.222-1.166.222-.45 0-.85-.086-1.202-.258a2.64 2.64 0 0 1-.89-.697 3.137 3.137 0 0 1-.586-1.072 4.248 4.248 0 0 1-.199-1.307v-.58c0-.687.088-1.342.263-1.963a3.95 3.95 0 0 1 .891-1.611 3.473 3.473 0 0 1 1.301-.891c.515-.207 1.105-.31 1.769-.31h.164Zm-1.529 4.06c-.168 0-.328.026-.48.076a1.668 1.668 0 0 0-.422.211c-.118.09-.223.194-.317.311a1.675 1.675 0 0 0-.234.393v.433c0 .34.037.639.111.897.078.257.184.472.317.644.132.172.287.303.462.393.176.09.364.134.563.134.219 0 .414-.042.586-.128.172-.09.318-.211.439-.364.121-.156.213-.34.276-.55.062-.215.094-.448.094-.698 0-.238-.032-.463-.094-.674a1.716 1.716 0 0 0-.264-.562 1.24 1.24 0 0 0-.439-.375 1.226 1.226 0 0 0-.598-.141Zm4.764.282.457-4.301h4.588v1.242h-3.422l-.223 2.045c.141-.082.324-.16.551-.235.23-.074.494-.111.791-.111.402 0 .762.067 1.078.199.32.133.592.323.814.569.219.25.387.552.504.908.118.352.176.748.176 1.189 0 .391-.057.76-.17 1.108a2.437 2.437 0 0 1-.51.902 2.356 2.356 0 0 1-.861.61c-.348.148-.758.222-1.23.222-.36 0-.704-.051-1.032-.152a2.663 2.663 0 0 1-.873-.469 2.463 2.463 0 0 1-.627-.756 2.545 2.545 0 0 1-.275-1.049h1.365c.051.418.203.739.457.961.258.223.586.334.985.334.234 0 .437-.043.609-.129.172-.086.316-.207.434-.363a1.63 1.63 0 0 0 .246-.551c.054-.218.082-.455.082-.709 0-.246-.033-.47-.1-.673a1.49 1.49 0 0 0-.287-.54 1.283 1.283 0 0 0-.48-.351 1.621 1.621 0 0 0-.668-.129c-.168 0-.315.014-.44.041a1.46 1.46 0 0 0-.592.27 2.535 2.535 0 0 0-.228.193l-1.119-.275Z"
              className="165"
            />
            <path
              d="M534.889 540h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V540Zm7.599-8.572v1.189h-.093c-.465 0-.87.065-1.213.194a2.368 2.368 0 0 0-1.418 1.341 3.507 3.507 0 0 0-.241 1.02c.094-.106.204-.207.329-.305.125-.101.263-.191.416-.269.144-.075.304-.133.48-.176.176-.047.361-.07.557-.07.414 0 .773.078 1.078.234.308.156.562.367.762.633.203.265.351.57.445.914.098.344.146.701.146 1.072 0 .406-.062.787-.187 1.143a2.673 2.673 0 0 1-.533.92c-.239.265-.53.474-.873.627-.34.148-.729.222-1.166.222-.45 0-.85-.086-1.202-.258a2.64 2.64 0 0 1-.89-.697 3.137 3.137 0 0 1-.586-1.072 4.248 4.248 0 0 1-.199-1.307v-.58c0-.687.088-1.342.263-1.963a3.95 3.95 0 0 1 .891-1.611 3.473 3.473 0 0 1 1.301-.891c.515-.207 1.105-.31 1.769-.31h.164Zm-1.529 4.06c-.168 0-.328.026-.48.076a1.668 1.668 0 0 0-.422.211c-.118.09-.223.194-.317.311a1.675 1.675 0 0 0-.234.393v.433c0 .34.037.639.111.897.078.257.184.472.317.644.132.172.287.303.462.393.176.09.364.134.563.134.219 0 .414-.042.586-.128.172-.09.318-.211.439-.364.121-.156.213-.34.276-.55.062-.215.094-.448.094-.698 0-.238-.032-.463-.094-.674a1.716 1.716 0 0 0-.264-.562 1.24 1.24 0 0 0-.439-.375 1.226 1.226 0 0 0-.598-.141Zm10.055-3.234-3.41 7.746h-1.477l3.41-7.359h-4.424v-1.172h5.901v.785Z"
              className="167"
            />
            <path
              d="M557.889 524h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V524Zm8.918-7.746L563.396 524h-1.476l3.41-7.359h-4.424v-1.172h5.901v.785Zm7.177 4.494c0 .547-.064 1.031-.193 1.453a2.875 2.875 0 0 1-.545 1.049 2.237 2.237 0 0 1-.867.656c-.34.145-.727.217-1.16.217-.43 0-.817-.072-1.16-.217a2.286 2.286 0 0 1-.873-.656 2.877 2.877 0 0 1-.557-1.049 5.121 5.121 0 0 1-.188-1.453v-2.021c0-.547.063-1.03.188-1.448.129-.422.312-.777.551-1.066.238-.285.527-.5.867-.645.344-.148.73-.222 1.16-.222.434 0 .82.074 1.16.222.344.145.637.36.879.645.234.289.416.644.545 1.066.129.418.193.901.193 1.448v2.021Zm-4.136-.498 2.713-2.057a3.226 3.226 0 0 0-.129-.791 1.433 1.433 0 0 0-.287-.545 1.034 1.034 0 0 0-.405-.281 1.435 1.435 0 0 0-.533-.094c-.215 0-.404.038-.568.112a1.04 1.04 0 0 0-.41.328 1.642 1.642 0 0 0-.288.639 3.94 3.94 0 0 0-.093.914v1.775Zm2.724.732v-1.711l-2.713 2.045c.02.27.061.508.123.715.067.207.155.379.264.516.109.148.244.26.404.334.164.074.354.111.569.111.211 0 .396-.035.556-.105a1.14 1.14 0 0 0 .411-.323c.128-.164.224-.378.287-.644.066-.266.099-.578.099-.938Z"
              className="170"
            />
            <path
              d="M571.889 545h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V545Zm8.847 0h-5.724v-.973l2.777-3.023c.231-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.555-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.528 6.528 0 0 1-.556.744c-.211.25-.442.508-.692.774l-1.898 2.027h3.972V545Zm6.381-3.041h1.072v1.137h-1.072V545h-1.4v-1.904h-3.692l-.035-.862 3.686-5.765h1.441v5.49Zm-3.697 0h2.297v-3.615l-.164.304-2.133 3.311Z"
              className="124"
            />
            <path
              d="M592.58 531.102h.838c.25 0 .469-.034.656-.1a1.23 1.23 0 0 0 .463-.293c.113-.109.199-.244.258-.404.062-.164.094-.34.094-.528 0-.203-.03-.384-.088-.545a1.102 1.102 0 0 0-.246-.41 1.138 1.138 0 0 0-.416-.246 1.704 1.704 0 0 0-.569-.088c-.191 0-.369.03-.533.088a1.198 1.198 0 0 0-.703.621c-.066.149-.1.315-.1.498h-1.4c0-.34.068-.652.205-.937a2.3 2.3 0 0 1 .568-.744c.243-.207.528-.369.856-.487a3.258 3.258 0 0 1 1.09-.175c.402 0 .771.052 1.107.158.34.101.629.254.867.457a2.1 2.1 0 0 1 .563.762c.133.3.199.65.199 1.048 0 .176-.027.352-.082.528a1.96 1.96 0 0 1-.234.509 2.264 2.264 0 0 1-.961.809c.254.086.468.199.644.34.18.137.326.291.44.463.113.176.195.365.246.568.051.199.076.406.076.621 0 .399-.074.754-.223 1.067a2.222 2.222 0 0 1-.597.779 2.706 2.706 0 0 1-.914.492 3.766 3.766 0 0 1-1.131.164c-.367 0-.721-.051-1.061-.152a2.673 2.673 0 0 1-.896-.457 2.308 2.308 0 0 1-.621-.75 2.286 2.286 0 0 1-.229-1.049h1.4c0 .187.034.361.1.521.07.157.17.29.299.399.125.113.273.201.445.264.176.062.369.093.58.093.227 0 .43-.029.61-.088.183-.062.338-.154.463-.275a1.09 1.09 0 0 0 .275-.422c.066-.172.1-.367.1-.586 0-.246-.038-.457-.112-.633a1.135 1.135 0 0 0-.322-.439 1.401 1.401 0 0 0-.51-.252 2.264 2.264 0 0 0-.656-.088h-.838v-1.101ZM603.736 536h-5.724v-.973l2.777-3.023c.231-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.555-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.528 6.528 0 0 1-.556.744c-.211.25-.442.508-.692.774l-1.898 2.027h3.972V536Zm7.084-6.281c0 .258-.043.498-.129.72a1.92 1.92 0 0 1-.351.598 2.302 2.302 0 0 1-.322.317 2.269 2.269 0 0 1-.405.257c.176.082.338.178.487.287.152.106.285.229.398.37a2.134 2.134 0 0 1 .51 1.412c0 .394-.072.744-.217 1.049a2.165 2.165 0 0 1-.592.761 2.621 2.621 0 0 1-.89.469 3.64 3.64 0 0 1-1.09.158c-.399 0-.77-.053-1.114-.158a2.556 2.556 0 0 1-.884-.469 2.144 2.144 0 0 1-.598-.756 2.482 2.482 0 0 1-.211-1.054c0-.235.031-.457.094-.668.066-.211.16-.407.281-.586.121-.172.266-.326.434-.463a2.68 2.68 0 0 1 .574-.358 2.293 2.293 0 0 1-.492-.328 2.093 2.093 0 0 1-.615-.955 2.031 2.031 0 0 1-.088-.603c0-.379.064-.715.193-1.008.133-.293.314-.541.545-.744.226-.203.498-.356.814-.457.321-.106.67-.158 1.049-.158.375 0 .721.052 1.037.158.321.101.6.254.838.457.231.199.412.447.545.744.133.293.199.629.199 1.008Zm-1.213 3.885c0-.211-.035-.403-.105-.575a1.365 1.365 0 0 0-.281-.457 1.307 1.307 0 0 0-.446-.281 1.568 1.568 0 0 0-.568-.1c-.215 0-.408.034-.58.1-.168.066-.313.16-.434.281a1.382 1.382 0 0 0-.281.457 1.704 1.704 0 0 0-.094.58c0 .219.034.416.1.592.066.172.162.317.287.434.121.113.266.201.434.263.172.059.365.088.58.088.203 0 .388-.031.556-.093.172-.063.321-.153.446-.27.117-.121.211-.266.281-.434.07-.171.105-.367.105-.585Zm-.181-3.833a1.38 1.38 0 0 0-.094-.521 1.291 1.291 0 0 0-.246-.41 1.188 1.188 0 0 0-.387-.258 1.294 1.294 0 0 0-.504-.094c-.183 0-.349.032-.498.094a1.097 1.097 0 0 0-.375.252 1.123 1.123 0 0 0-.234.404c-.055.16-.082.338-.082.533 0 .192.027.368.082.528.055.156.137.289.246.398.105.114.232.201.381.264.148.062.314.094.498.094.183 0 .349-.032.498-.094a1.154 1.154 0 0 0 .627-.662 1.54 1.54 0 0 0 .088-.528Z"
              className="328"
            />
            <path
              d="M582.889 515h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V515Zm8.918-7.746L588.396 515h-1.476l3.41-7.359h-4.424v-1.172h5.901v.785Zm3.187 2.848h.838c.25 0 .469-.034.656-.1a1.23 1.23 0 0 0 .463-.293c.113-.109.199-.244.258-.404.062-.164.094-.34.094-.528 0-.203-.03-.384-.088-.545a1.102 1.102 0 0 0-.246-.41 1.138 1.138 0 0 0-.416-.246 1.704 1.704 0 0 0-.569-.088c-.191 0-.369.03-.533.088a1.198 1.198 0 0 0-.703.621c-.066.149-.1.315-.1.498h-1.4c0-.34.068-.652.205-.937a2.3 2.3 0 0 1 .568-.744c.243-.207.528-.369.856-.487a3.258 3.258 0 0 1 1.09-.175c.402 0 .771.052 1.107.158.34.101.629.254.867.457a2.1 2.1 0 0 1 .563.762c.133.3.199.65.199 1.048 0 .176-.027.352-.082.528a1.96 1.96 0 0 1-.234.509 2.264 2.264 0 0 1-.961.809c.254.086.469.199.644.34.18.137.326.291.44.463.113.176.195.365.246.568.051.199.076.406.076.621 0 .399-.074.754-.223 1.067a2.222 2.222 0 0 1-.597.779 2.706 2.706 0 0 1-.914.492 3.766 3.766 0 0 1-1.131.164c-.367 0-.721-.051-1.061-.152a2.673 2.673 0 0 1-.896-.457 2.308 2.308 0 0 1-.621-.75 2.286 2.286 0 0 1-.229-1.049h1.401c0 .187.033.361.099.521.07.157.17.29.299.399.125.113.273.201.445.264.176.062.369.093.58.093.227 0 .43-.029.61-.088.183-.062.338-.154.463-.275.121-.113.213-.254.275-.422.066-.172.1-.367.1-.586a1.61 1.61 0 0 0-.112-.633 1.135 1.135 0 0 0-.322-.439 1.393 1.393 0 0 0-.51-.252 2.264 2.264 0 0 0-.656-.088h-.838v-1.101Z"
              className="173"
            />
            <path
              d="M557.889 490h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V490Zm8.918-7.746L563.396 490h-1.476l3.41-7.359h-4.424v-1.172h5.901v.785Zm6.31 4.705h1.072v1.137h-1.072V490h-1.4v-1.904h-3.692l-.035-.862 3.686-5.765h1.441v5.49Zm-3.697 0h2.297v-3.615l-.164.304-2.133 3.311Z"
              className="174"
            />
            <path
              d="M532.889 509h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V509Zm7.599-8.572v1.189h-.093c-.465 0-.87.065-1.213.194a2.368 2.368 0 0 0-1.418 1.341 3.507 3.507 0 0 0-.241 1.02c.094-.106.204-.207.329-.305.125-.101.263-.191.416-.269.144-.075.304-.133.48-.176.176-.047.361-.07.557-.07.414 0 .773.078 1.078.234.308.156.562.367.762.633.203.265.351.57.445.914.098.344.146.701.146 1.072 0 .406-.062.787-.187 1.143a2.673 2.673 0 0 1-.533.92c-.239.265-.53.474-.873.627-.34.148-.729.222-1.166.222-.45 0-.85-.086-1.202-.258a2.64 2.64 0 0 1-.89-.697 3.137 3.137 0 0 1-.586-1.072 4.248 4.248 0 0 1-.199-1.307v-.58c0-.687.088-1.342.263-1.963a3.95 3.95 0 0 1 .891-1.611 3.473 3.473 0 0 1 1.301-.891c.515-.207 1.105-.31 1.769-.31h.164Zm-1.529 4.06c-.168 0-.328.026-.48.076a1.668 1.668 0 0 0-.422.211c-.118.09-.223.194-.317.311a1.675 1.675 0 0 0-.234.393v.433c0 .34.037.639.111.897.078.257.184.472.317.644.132.172.287.303.462.393.176.09.364.134.563.134.219 0 .414-.042.586-.128.172-.09.318-.211.439-.364.121-.156.213-.34.276-.55.062-.215.094-.448.094-.698 0-.238-.032-.463-.094-.674a1.716 1.716 0 0 0-.264-.562 1.24 1.24 0 0 0-.439-.375 1.226 1.226 0 0 0-.598-.141Zm5.689 3.358c.485 0 .897-.055 1.237-.164.34-.11.619-.266.838-.469.234-.223.406-.477.515-.762.11-.289.18-.599.211-.931v-.03a1.989 1.989 0 0 1-.662.492c-.141.067-.297.12-.469.159a2.46 2.46 0 0 1-.556.058c-.414 0-.776-.078-1.084-.234a2.24 2.24 0 0 1-.762-.627 2.738 2.738 0 0 1-.463-.914 3.827 3.827 0 0 1-.152-1.084c0-.41.06-.795.181-1.154a2.91 2.91 0 0 1 .539-.956 2.53 2.53 0 0 1 .862-.638c.344-.16.734-.24 1.172-.24.441 0 .832.084 1.172.252.343.167.634.396.873.685.25.313.439.691.568 1.137.129.441.193.906.193 1.394v.492a7.72 7.72 0 0 1-.234 1.922 3.89 3.89 0 0 1-.826 1.6c-.321.375-.742.67-1.266.885-.519.215-1.146.322-1.881.322h-.117v-1.195h.111Zm1.413-2.754a1.4 1.4 0 0 0 .867-.293c.121-.09.226-.195.316-.317a1.79 1.79 0 0 0 .229-.404v-.486c0-.34-.039-.641-.118-.903a2.13 2.13 0 0 0-.298-.656 1.317 1.317 0 0 0-.452-.398 1.126 1.126 0 0 0-.55-.141c-.219 0-.414.049-.586.147a1.235 1.235 0 0 0-.422.386 1.87 1.87 0 0 0-.27.58 2.759 2.759 0 0 0-.006 1.366c.055.215.141.406.258.574.114.164.254.297.422.398.172.098.375.147.61.147Z"
              className="169"
            />
            <path
              d="M516.889 524h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V524Zm7.599-8.572v1.189h-.093c-.465 0-.87.065-1.213.194a2.368 2.368 0 0 0-1.418 1.341 3.507 3.507 0 0 0-.241 1.02c.094-.106.204-.207.329-.305.125-.101.263-.191.416-.269.144-.075.304-.133.48-.176.176-.047.361-.07.557-.07.414 0 .773.078 1.078.234.308.156.562.367.762.633.203.265.351.57.445.914.098.344.146.701.146 1.072 0 .406-.062.787-.187 1.143a2.673 2.673 0 0 1-.533.92c-.239.265-.53.474-.873.627-.34.148-.729.222-1.166.222-.45 0-.85-.086-1.202-.258a2.64 2.64 0 0 1-.89-.697 3.137 3.137 0 0 1-.586-1.072 4.248 4.248 0 0 1-.199-1.307v-.58c0-.687.088-1.342.263-1.963a3.95 3.95 0 0 1 .891-1.611 3.473 3.473 0 0 1 1.301-.891c.515-.207 1.105-.31 1.769-.31h.164Zm-1.529 4.06c-.168 0-.328.026-.48.076a1.668 1.668 0 0 0-.422.211c-.118.09-.223.194-.317.311a1.675 1.675 0 0 0-.234.393v.433c0 .34.037.639.111.897.078.257.184.472.317.644.132.172.287.303.462.393.176.09.364.134.563.134.219 0 .414-.042.586-.128.172-.09.318-.211.439-.364.121-.156.213-.34.276-.55.062-.215.094-.448.094-.698 0-.238-.032-.463-.094-.674a1.716 1.716 0 0 0-.264-.562 1.24 1.24 0 0 0-.439-.375 1.226 1.226 0 0 0-.598-.141Zm9.861-1.769c0 .258-.043.498-.129.72a1.92 1.92 0 0 1-.351.598 2.302 2.302 0 0 1-.322.317 2.269 2.269 0 0 1-.405.257c.176.082.338.178.487.287.152.106.285.229.398.37a2.134 2.134 0 0 1 .51 1.412c0 .394-.072.744-.217 1.049a2.165 2.165 0 0 1-.592.761 2.621 2.621 0 0 1-.89.469 3.64 3.64 0 0 1-1.09.158c-.399 0-.77-.053-1.114-.158a2.556 2.556 0 0 1-.884-.469 2.144 2.144 0 0 1-.598-.756 2.482 2.482 0 0 1-.211-1.054c0-.235.031-.457.094-.668.066-.211.16-.407.281-.586.121-.172.266-.326.434-.463a2.68 2.68 0 0 1 .574-.358 2.293 2.293 0 0 1-.492-.328 2.093 2.093 0 0 1-.615-.955 2.031 2.031 0 0 1-.088-.603c0-.379.064-.715.193-1.008.133-.293.314-.541.545-.744.226-.203.498-.356.814-.457.321-.106.67-.158 1.049-.158.375 0 .721.052 1.037.158.321.101.6.254.838.457.231.199.412.447.545.744.133.293.199.629.199 1.008Zm-1.213 3.885c0-.211-.035-.403-.105-.575a1.365 1.365 0 0 0-.281-.457 1.307 1.307 0 0 0-.446-.281 1.568 1.568 0 0 0-.568-.1c-.215 0-.408.034-.58.1-.168.066-.313.16-.434.281a1.382 1.382 0 0 0-.281.457 1.704 1.704 0 0 0-.094.58c0 .219.034.416.1.592.066.172.162.317.287.434.121.113.266.201.434.263.172.059.365.088.58.088.203 0 .388-.031.556-.093.172-.063.321-.153.446-.27.117-.121.211-.266.281-.434.07-.171.105-.367.105-.585Zm-.181-3.833a1.38 1.38 0 0 0-.094-.521 1.291 1.291 0 0 0-.246-.41 1.188 1.188 0 0 0-.387-.258 1.294 1.294 0 0 0-.504-.094c-.183 0-.349.032-.498.094a1.097 1.097 0 0 0-.375.252 1.123 1.123 0 0 0-.234.404c-.055.16-.082.338-.082.533 0 .192.027.368.082.528.055.156.137.289.246.398.105.114.232.201.381.264.148.062.314.094.498.094.183 0 .349-.032.498-.094a1.154 1.154 0 0 0 .627-.662 1.54 1.54 0 0 0 .088-.528Z"
              className="168"
            />
            <path
              d="M496.338 494.846c.484 0 .896-.055 1.236-.164.34-.11.619-.266.838-.469a2.08 2.08 0 0 0 .516-.762c.109-.289.179-.599.211-.931v-.03a2.038 2.038 0 0 1-.662.492c-.141.067-.297.12-.469.159a2.468 2.468 0 0 1-.557.058c-.414 0-.775-.078-1.084-.234a2.25 2.25 0 0 1-.762-.627 2.717 2.717 0 0 1-.462-.914 3.792 3.792 0 0 1-.153-1.084c0-.41.061-.795.182-1.154a2.91 2.91 0 0 1 .539-.956c.234-.269.521-.482.861-.638.344-.16.735-.24 1.172-.24.442 0 .832.084 1.172.252.344.167.635.396.873.685.25.313.44.691.568 1.137.129.441.194.906.194 1.394v.492c0 .672-.078 1.313-.235 1.922a3.877 3.877 0 0 1-.826 1.6c-.32.375-.742.67-1.265.885-.52.215-1.147.322-1.881.322h-.117v-1.195h.111Zm1.412-2.754a1.41 1.41 0 0 0 .867-.293c.121-.09.227-.195.317-.317.093-.125.17-.259.228-.404v-.486c0-.34-.039-.641-.117-.903a2.13 2.13 0 0 0-.299-.656 1.314 1.314 0 0 0-.451-.398 1.132 1.132 0 0 0-.551-.141c-.219 0-.414.049-.586.147a1.244 1.244 0 0 0-.422.386 1.846 1.846 0 0 0-.269.58c-.059.219-.088.45-.088.692 0 .234.027.459.082.674.055.215.141.406.258.574.113.164.254.297.422.398.171.098.375.147.609.147Zm9.967-2.373c0 .258-.043.498-.129.72a1.904 1.904 0 0 1-.352.598 2.249 2.249 0 0 1-.726.574c.176.082.338.178.486.287.152.106.285.229.399.37a2.134 2.134 0 0 1 .509 1.412c0 .394-.072.744-.216 1.049a2.165 2.165 0 0 1-.592.761 2.617 2.617 0 0 1-.891.469 3.635 3.635 0 0 1-1.09.158c-.398 0-.769-.053-1.113-.158a2.552 2.552 0 0 1-.885-.469 2.13 2.13 0 0 1-.597-.756 2.482 2.482 0 0 1-.211-1.054c0-.235.031-.457.093-.668.067-.211.16-.407.282-.586.121-.172.265-.326.433-.463a2.68 2.68 0 0 1 .574-.358 2.157 2.157 0 0 1-.861-.755 2.074 2.074 0 0 1-.334-1.131c0-.379.065-.715.193-1.008a2.181 2.181 0 0 1 1.36-1.201 3.32 3.32 0 0 1 1.049-.158c.375 0 .72.052 1.037.158.32.101.599.254.838.457.23.199.412.447.545.744.132.293.199.629.199 1.008Zm-1.213 3.885c0-.211-.035-.403-.106-.575a1.365 1.365 0 0 0-.281-.457 1.303 1.303 0 0 0-.445-.281 1.572 1.572 0 0 0-.568-.1c-.215 0-.409.034-.581.1-.168.066-.312.16-.433.281a1.365 1.365 0 0 0-.281.457 1.68 1.68 0 0 0-.094.58c0 .219.033.416.099.592.067.172.163.317.288.434.121.113.265.201.433.263.172.059.365.088.58.088a1.6 1.6 0 0 0 .557-.093c.172-.063.32-.153.445-.27.117-.121.211-.266.281-.434.071-.171.106-.367.106-.585Zm-.182-3.833a1.4 1.4 0 0 0-.34-.931 1.194 1.194 0 0 0-.386-.258 1.301 1.301 0 0 0-.504-.094c-.184 0-.35.032-.498.094-.145.059-.27.143-.375.252a1.11 1.11 0 0 0-.235.404 1.66 1.66 0 0 0-.082.533c0 .192.028.368.082.528.055.156.137.289.246.398a1.1 1.1 0 0 0 .381.264c.149.062.315.094.498.094.184 0 .35-.032.498-.094.149-.063.276-.15.381-.264.106-.109.188-.242.246-.398.059-.16.088-.336.088-.528Z"
              className="98"
            />
            <path
              d="M458.889 524h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V524Zm7.599-8.572v1.189h-.093c-.465 0-.87.065-1.213.194a2.368 2.368 0 0 0-1.418 1.341 3.507 3.507 0 0 0-.241 1.02c.094-.106.204-.207.329-.305.125-.101.263-.191.416-.269.144-.075.304-.133.48-.176.176-.047.361-.07.557-.07.414 0 .773.078 1.078.234.308.156.562.367.762.633.203.265.351.57.445.914.098.344.146.701.146 1.072 0 .406-.062.787-.187 1.143a2.673 2.673 0 0 1-.533.92c-.239.265-.53.474-.873.627-.34.148-.729.222-1.166.222-.45 0-.85-.086-1.202-.258a2.64 2.64 0 0 1-.89-.697 3.137 3.137 0 0 1-.586-1.072 4.248 4.248 0 0 1-.199-1.307v-.58c0-.687.088-1.342.263-1.963a3.95 3.95 0 0 1 .891-1.611 3.473 3.473 0 0 1 1.301-.891c.515-.207 1.105-.31 1.769-.31h.164Zm-1.529 4.06c-.168 0-.328.026-.48.076a1.668 1.668 0 0 0-.422.211c-.118.09-.223.194-.317.311a1.675 1.675 0 0 0-.234.393v.433c0 .34.037.639.111.897.078.257.184.472.317.644.132.172.287.303.462.393.176.09.364.134.563.134.219 0 .414-.042.586-.128.172-.09.318-.211.439-.364.121-.156.213-.34.276-.55.062-.215.094-.448.094-.698 0-.238-.032-.463-.094-.674a1.716 1.716 0 0 0-.264-.562 1.24 1.24 0 0 0-.439-.375 1.226 1.226 0 0 0-.598-.141Zm6.035-.386h.838c.25 0 .469-.034.656-.1a1.23 1.23 0 0 0 .463-.293c.113-.109.199-.244.258-.404.062-.164.094-.34.094-.528 0-.203-.03-.384-.088-.545a1.102 1.102 0 0 0-.246-.41 1.138 1.138 0 0 0-.416-.246 1.704 1.704 0 0 0-.569-.088c-.191 0-.369.03-.533.088a1.198 1.198 0 0 0-.703.621c-.066.149-.1.315-.1.498h-1.4c0-.34.068-.652.205-.937a2.3 2.3 0 0 1 .568-.744c.243-.207.528-.369.856-.487a3.258 3.258 0 0 1 1.09-.175c.402 0 .771.052 1.107.158.34.101.629.254.867.457a2.1 2.1 0 0 1 .563.762c.133.3.199.65.199 1.048 0 .176-.027.352-.082.528a1.96 1.96 0 0 1-.234.509 2.264 2.264 0 0 1-.961.809c.254.086.469.199.644.34.18.137.326.291.44.463.113.176.195.365.246.568.051.199.076.406.076.621 0 .399-.074.754-.223 1.067a2.222 2.222 0 0 1-.597.779 2.706 2.706 0 0 1-.914.492 3.766 3.766 0 0 1-1.131.164c-.367 0-.721-.051-1.061-.152a2.673 2.673 0 0 1-.896-.457 2.308 2.308 0 0 1-.621-.75 2.286 2.286 0 0 1-.229-1.049h1.401c0 .187.033.361.099.521.07.157.17.29.299.399.125.113.273.201.445.264.176.062.369.093.58.093.227 0 .43-.029.61-.088.183-.062.338-.154.463-.275.121-.113.213-.254.275-.422.066-.172.1-.367.1-.586a1.61 1.61 0 0 0-.112-.633 1.135 1.135 0 0 0-.322-.439 1.393 1.393 0 0 0-.51-.252 2.264 2.264 0 0 0-.656-.088h-.838v-1.101Z"
              className="163"
            />
            <path
              d="M450.338 488.846c.484 0 .896-.055 1.236-.164.34-.11.619-.266.838-.469a2.08 2.08 0 0 0 .516-.762c.109-.289.179-.599.211-.931v-.03a2.038 2.038 0 0 1-.662.492c-.141.067-.297.12-.469.159a2.468 2.468 0 0 1-.557.058c-.414 0-.775-.078-1.084-.234a2.25 2.25 0 0 1-.762-.627 2.717 2.717 0 0 1-.462-.914 3.792 3.792 0 0 1-.153-1.084c0-.41.061-.795.182-1.154a2.91 2.91 0 0 1 .539-.956c.234-.269.521-.482.861-.638.344-.16.735-.24 1.172-.24.442 0 .832.084 1.172.252.344.167.635.396.873.685.25.313.44.691.568 1.137.129.441.194.906.194 1.394v.492c0 .672-.078 1.313-.235 1.922a3.877 3.877 0 0 1-.826 1.6c-.32.375-.742.67-1.265.885-.52.215-1.147.322-1.881.322h-.117v-1.195h.111Zm1.412-2.754a1.41 1.41 0 0 0 .867-.293c.121-.09.227-.195.317-.317.093-.125.17-.259.228-.404v-.486c0-.34-.039-.641-.117-.903a2.13 2.13 0 0 0-.299-.656 1.314 1.314 0 0 0-.451-.398 1.132 1.132 0 0 0-.551-.141c-.219 0-.414.049-.586.147a1.244 1.244 0 0 0-.422.386 1.846 1.846 0 0 0-.269.58c-.059.219-.088.45-.088.692 0 .234.027.459.082.674.055.215.141.406.258.574.113.164.254.297.422.398.171.098.375.147.609.147Zm8.449 3.908h-1.412v-6.797l-2.185.803v-1.236l3.509-1.301h.088V490Z"
              className="91"
            />
            <path
              d="M469.338 464.846c.484 0 .896-.055 1.236-.164.34-.11.619-.266.838-.469a2.08 2.08 0 0 0 .516-.762c.109-.289.179-.599.211-.931v-.03a2.038 2.038 0 0 1-.662.492c-.141.067-.297.12-.469.159a2.468 2.468 0 0 1-.557.058c-.414 0-.775-.078-1.084-.234a2.25 2.25 0 0 1-.762-.627 2.717 2.717 0 0 1-.462-.914 3.792 3.792 0 0 1-.153-1.084c0-.41.061-.795.182-1.154a2.91 2.91 0 0 1 .539-.956c.234-.269.521-.482.861-.638.344-.16.735-.24 1.172-.24.442 0 .832.084 1.172.252.344.167.635.396.873.685.25.313.44.691.568 1.137.129.441.194.906.194 1.394v.492c0 .672-.078 1.313-.235 1.922a3.877 3.877 0 0 1-.826 1.6c-.32.375-.742.67-1.265.885-.52.215-1.147.322-1.881.322h-.117v-1.195h.111Zm1.412-2.754a1.41 1.41 0 0 0 .867-.293c.121-.09.227-.195.317-.317.093-.125.17-.259.228-.404v-.486c0-.34-.039-.641-.117-.903a2.13 2.13 0 0 0-.299-.656 1.314 1.314 0 0 0-.451-.398 1.132 1.132 0 0 0-.551-.141c-.219 0-.414.049-.586.147a1.244 1.244 0 0 0-.422.386 1.846 1.846 0 0 0-.269.58c-.059.219-.088.45-.088.692 0 .234.027.459.082.674.055.215.141.406.258.574.113.164.254.297.422.398.171.098.375.147.609.147Zm10.16-3.838L477.5 466h-1.477l3.411-7.359h-4.424v-1.172h5.9v.785Z"
              className="97"
            />
            <path
              d="M505.338 444.846c.484 0 .896-.055 1.236-.164.34-.11.619-.266.838-.469a2.08 2.08 0 0 0 .516-.762c.109-.289.179-.599.211-.931v-.03a2.038 2.038 0 0 1-.662.492c-.141.067-.297.12-.469.159a2.468 2.468 0 0 1-.557.058c-.414 0-.775-.078-1.084-.234a2.25 2.25 0 0 1-.762-.627 2.717 2.717 0 0 1-.462-.914 3.792 3.792 0 0 1-.153-1.084c0-.41.061-.795.182-1.154a2.91 2.91 0 0 1 .539-.956c.234-.269.521-.482.861-.638.344-.16.735-.24 1.172-.24.442 0 .832.084 1.172.252.344.167.635.396.873.685.25.313.44.691.568 1.137.129.441.194.906.194 1.394v.492c0 .672-.078 1.313-.235 1.922a3.877 3.877 0 0 1-.826 1.6c-.32.375-.742.67-1.265.885-.52.215-1.147.322-1.881.322h-.117v-1.195h.111Zm1.412-2.754a1.41 1.41 0 0 0 .867-.293c.121-.09.227-.195.317-.317.093-.125.17-.259.228-.404v-.486c0-.34-.039-.641-.117-.903a2.13 2.13 0 0 0-.299-.656 1.314 1.314 0 0 0-.451-.398 1.132 1.132 0 0 0-.551-.141c-.219 0-.414.049-.586.147a1.244 1.244 0 0 0-.422.386 1.846 1.846 0 0 0-.269.58c-.059.219-.088.45-.088.692 0 .234.027.459.082.674.055.215.141.406.258.574.113.164.254.297.422.398.171.098.375.147.609.147Zm5.795 2.754c.484 0 .896-.055 1.236-.164.34-.11.619-.266.838-.469.235-.223.406-.477.516-.762.109-.289.179-.599.211-.931v-.03a2.038 2.038 0 0 1-.662.492c-.141.067-.297.12-.469.159a2.468 2.468 0 0 1-.557.058c-.414 0-.775-.078-1.084-.234a2.26 2.26 0 0 1-.762-.627 2.717 2.717 0 0 1-.462-.914 3.792 3.792 0 0 1-.153-1.084c0-.41.061-.795.182-1.154a2.91 2.91 0 0 1 .539-.956c.234-.269.521-.482.861-.638.344-.16.735-.24 1.172-.24.442 0 .832.084 1.172.252.344.167.635.396.873.685.25.313.44.691.568 1.137.129.441.194.906.194 1.394v.492c0 .672-.078 1.313-.235 1.922a3.877 3.877 0 0 1-.826 1.6c-.32.375-.742.67-1.265.885-.52.215-1.147.322-1.881.322h-.117v-1.195h.111Zm1.412-2.754a1.41 1.41 0 0 0 .867-.293c.121-.09.227-.195.317-.317.093-.125.17-.259.228-.404v-.486c0-.34-.039-.641-.117-.903a2.13 2.13 0 0 0-.299-.656 1.314 1.314 0 0 0-.451-.398 1.132 1.132 0 0 0-.551-.141c-.219 0-.414.049-.586.147a1.244 1.244 0 0 0-.422.386 1.846 1.846 0 0 0-.269.58c-.059.219-.088.45-.088.692 0 .234.027.459.082.674.055.215.141.406.258.574.113.164.254.297.422.398.172.098.375.147.609.147Z"
              className="99"
            />
            <path
              d="M531.889 445h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V445Zm8.918-7.746L537.396 445h-1.476l3.41-7.359h-4.424v-1.172h5.901v.785Zm7.013 1.465c0 .258-.043.498-.129.72a1.92 1.92 0 0 1-.351.598 2.302 2.302 0 0 1-.322.317 2.269 2.269 0 0 1-.405.257c.176.082.338.178.487.287.152.106.285.229.398.37a2.134 2.134 0 0 1 .51 1.412c0 .394-.072.744-.217 1.049a2.165 2.165 0 0 1-.592.761 2.621 2.621 0 0 1-.89.469 3.64 3.64 0 0 1-1.09.158c-.399 0-.77-.053-1.114-.158a2.556 2.556 0 0 1-.884-.469 2.144 2.144 0 0 1-.598-.756 2.482 2.482 0 0 1-.211-1.054c0-.235.031-.457.094-.668.066-.211.16-.407.281-.586.121-.172.266-.326.434-.463a2.68 2.68 0 0 1 .574-.358 2.293 2.293 0 0 1-.492-.328 2.093 2.093 0 0 1-.615-.955 2.031 2.031 0 0 1-.088-.603c0-.379.064-.715.193-1.008.133-.293.314-.541.545-.744.226-.203.498-.356.814-.457.321-.106.67-.158 1.049-.158.375 0 .721.052 1.037.158.321.101.6.254.838.457.231.199.412.447.545.744.133.293.199.629.199 1.008Zm-1.213 3.885c0-.211-.035-.403-.105-.575a1.365 1.365 0 0 0-.281-.457 1.307 1.307 0 0 0-.446-.281 1.568 1.568 0 0 0-.568-.1c-.215 0-.408.034-.58.1-.168.066-.313.16-.434.281a1.382 1.382 0 0 0-.281.457 1.704 1.704 0 0 0-.094.58c0 .219.034.416.1.592.066.172.162.317.287.434.121.113.266.201.434.263.172.059.365.088.58.088.203 0 .388-.031.556-.093.172-.063.321-.153.446-.27.117-.121.211-.266.281-.434.07-.171.105-.367.105-.585Zm-.181-3.833a1.38 1.38 0 0 0-.094-.521 1.291 1.291 0 0 0-.246-.41 1.188 1.188 0 0 0-.387-.258 1.294 1.294 0 0 0-.504-.094c-.183 0-.349.032-.498.094a1.097 1.097 0 0 0-.375.252 1.123 1.123 0 0 0-.234.404c-.055.16-.082.338-.082.533 0 .192.027.368.082.528.055.156.137.289.246.398.105.114.232.201.381.264.148.062.314.094.498.094.183 0 .349-.032.498-.094a1.154 1.154 0 0 0 .627-.662 1.54 1.54 0 0 0 .088-.528Z"
              className="178"
            />
            <path
              d="M477.529 428h-5.724v-.973l2.777-3.023c.23-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.554-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.424 6.424 0 0 1-.557.744c-.21.25-.441.508-.691.774l-1.898 2.027h3.972V428Zm5.567 0h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V428Zm4.898-4.898h.838c.25 0 .469-.034.656-.1a1.23 1.23 0 0 0 .463-.293c.113-.109.199-.244.258-.404.062-.164.094-.34.094-.528 0-.203-.03-.384-.088-.545a1.102 1.102 0 0 0-.246-.41 1.138 1.138 0 0 0-.416-.246 1.704 1.704 0 0 0-.569-.088c-.191 0-.369.03-.533.088a1.198 1.198 0 0 0-.703.621c-.066.149-.1.315-.1.498h-1.4c0-.34.068-.652.205-.937a2.3 2.3 0 0 1 .568-.744c.243-.207.528-.369.856-.487a3.258 3.258 0 0 1 1.09-.175c.402 0 .771.052 1.107.158.34.101.629.254.867.457a2.1 2.1 0 0 1 .563.762c.133.3.199.65.199 1.048 0 .176-.027.352-.082.528a1.96 1.96 0 0 1-.234.509 2.264 2.264 0 0 1-.961.809c.254.086.469.199.644.34.18.137.326.291.44.463.113.176.195.365.246.568.051.199.076.406.076.621 0 .399-.074.754-.223 1.067a2.222 2.222 0 0 1-.597.779 2.706 2.706 0 0 1-.914.492 3.766 3.766 0 0 1-1.131.164c-.367 0-.721-.051-1.061-.152a2.673 2.673 0 0 1-.896-.457 2.308 2.308 0 0 1-.621-.75 2.286 2.286 0 0 1-.229-1.049h1.401c0 .187.033.361.099.521.07.157.17.29.299.399.125.113.273.201.445.264.176.062.369.093.58.093.227 0 .43-.029.61-.088.183-.062.338-.154.463-.275.121-.113.213-.254.275-.422.066-.172.1-.367.1-.586a1.61 1.61 0 0 0-.112-.633 1.135 1.135 0 0 0-.322-.439 1.393 1.393 0 0 0-.51-.252 2.264 2.264 0 0 0-.656-.088h-.838v-1.101Z"
              className="213"
            />
            <path
              d="M439.338 437.846c.484 0 .896-.055 1.236-.164.34-.11.619-.266.838-.469a2.08 2.08 0 0 0 .516-.762c.109-.289.179-.599.211-.931v-.03a2.038 2.038 0 0 1-.662.492c-.141.067-.297.12-.469.159a2.468 2.468 0 0 1-.557.058c-.414 0-.775-.078-1.084-.234a2.25 2.25 0 0 1-.762-.627 2.717 2.717 0 0 1-.462-.914 3.792 3.792 0 0 1-.153-1.084c0-.41.061-.795.182-1.154a2.91 2.91 0 0 1 .539-.956c.234-.269.521-.482.861-.638.344-.16.735-.24 1.172-.24.442 0 .832.084 1.172.252.344.167.635.396.873.685.25.313.44.691.568 1.137.129.441.194.906.194 1.394v.492c0 .672-.078 1.313-.235 1.922a3.877 3.877 0 0 1-.826 1.6c-.32.375-.742.67-1.265.885-.52.215-1.147.322-1.881.322h-.117v-1.195h.111Zm1.412-2.754a1.41 1.41 0 0 0 .867-.293c.121-.09.227-.195.317-.317.093-.125.17-.259.228-.404v-.486c0-.34-.039-.641-.117-.903a2.13 2.13 0 0 0-.299-.656 1.314 1.314 0 0 0-.451-.398 1.132 1.132 0 0 0-.551-.141c-.219 0-.414.049-.586.147a1.244 1.244 0 0 0-.422.386 1.846 1.846 0 0 0-.269.58c-.059.219-.088.45-.088.692 0 .234.027.459.082.674.055.215.141.406.258.574.113.164.254.297.422.398.171.098.375.147.609.147Zm8.842-4.664v1.189h-.094c-.465 0-.869.065-1.213.194a2.384 2.384 0 0 0-1.418 1.341 3.474 3.474 0 0 0-.24 1.02c.094-.106.203-.207.328-.305.125-.101.264-.191.416-.269.145-.075.305-.133.481-.176a2.14 2.14 0 0 1 .556-.07c.414 0 .774.078 1.078.234.309.156.563.367.762.633.203.265.352.57.445.914.098.344.147.701.147 1.072 0 .406-.063.787-.188 1.143a2.657 2.657 0 0 1-.533.92 2.548 2.548 0 0 1-.873.627c-.34.148-.728.222-1.166.222-.449 0-.85-.086-1.201-.258a2.634 2.634 0 0 1-.891-.697 3.137 3.137 0 0 1-.586-1.072 4.279 4.279 0 0 1-.199-1.307v-.58c0-.687.088-1.342.264-1.963a3.936 3.936 0 0 1 .89-1.611 3.489 3.489 0 0 1 1.301-.891c.516-.207 1.106-.31 1.77-.31h.164Zm-1.53 4.06c-.167 0-.328.026-.48.076a1.684 1.684 0 0 0-.422.211c-.117.09-.222.194-.316.311a1.713 1.713 0 0 0-.235.393v.433c0 .34.037.639.112.897.078.257.183.472.316.644.133.172.287.303.463.393.176.09.363.134.562.134.219 0 .415-.042.586-.128.172-.09.319-.211.44-.364.121-.156.213-.34.275-.55.063-.215.094-.448.094-.698 0-.238-.031-.463-.094-.674a1.694 1.694 0 0 0-.263-.562 1.243 1.243 0 0 0-.44-.375 1.226 1.226 0 0 0-.598-.141Z"
              className="96"
            />
            <path
              d="M423.338 403.846c.484 0 .896-.055 1.236-.164.34-.11.619-.266.838-.469a2.08 2.08 0 0 0 .516-.762c.109-.289.179-.599.211-.931v-.03a2.038 2.038 0 0 1-.662.492c-.141.067-.297.12-.469.159a2.468 2.468 0 0 1-.557.058c-.414 0-.775-.078-1.084-.234a2.25 2.25 0 0 1-.762-.627 2.717 2.717 0 0 1-.462-.914 3.792 3.792 0 0 1-.153-1.084c0-.41.061-.795.182-1.154a2.91 2.91 0 0 1 .539-.956c.234-.269.521-.482.861-.638.344-.16.735-.24 1.172-.24.442 0 .832.084 1.172.252.344.167.635.396.873.685.25.313.44.691.568 1.137.129.441.194.906.194 1.394v.492c0 .672-.078 1.313-.235 1.922a3.877 3.877 0 0 1-.826 1.6c-.32.375-.742.67-1.265.885-.52.215-1.147.322-1.881.322h-.117v-1.195h.111Zm1.412-2.754a1.41 1.41 0 0 0 .867-.293c.121-.09.227-.195.317-.317.093-.125.17-.259.228-.404v-.486c0-.34-.039-.641-.117-.903a2.13 2.13 0 0 0-.299-.656 1.314 1.314 0 0 0-.451-.398 1.132 1.132 0 0 0-.551-.141c-.219 0-.414.049-.586.147a1.244 1.244 0 0 0-.422.386 1.846 1.846 0 0 0-.269.58c-.059.219-.088.45-.088.692 0 .234.027.459.082.674.055.215.141.406.258.574.113.164.254.297.422.398.171.098.375.147.609.147Zm4.869-.322.457-4.301h4.588v1.242h-3.422l-.222 2.045c.14-.082.324-.16.55-.235.231-.074.494-.111.791-.111.403 0 .762.067 1.078.199.321.133.592.323.815.569.219.25.387.552.504.908.117.352.176.748.176 1.189 0 .391-.057.76-.17 1.108-.11.344-.28.644-.51.902a2.373 2.373 0 0 1-.861.61c-.348.148-.758.222-1.231.222-.359 0-.703-.051-1.031-.152a2.663 2.663 0 0 1-.873-.469 2.463 2.463 0 0 1-.627-.756 2.561 2.561 0 0 1-.276-1.049h1.366c.05.418.203.739.457.961.258.223.586.334.984.334.234 0 .438-.043.609-.129.172-.086.317-.207.434-.363a1.63 1.63 0 0 0 .246-.551c.055-.218.082-.455.082-.709 0-.246-.033-.47-.099-.673a1.508 1.508 0 0 0-.288-.54 1.275 1.275 0 0 0-.48-.351 1.615 1.615 0 0 0-.668-.129c-.168 0-.314.014-.439.041a1.632 1.632 0 0 0-.323.106 1.486 1.486 0 0 0-.269.164 2.545 2.545 0 0 0-.229.193l-1.119-.275Z"
              className="95"
            />
            <path
              d="M436.51 506.719c0 .258-.043.498-.129.72a1.904 1.904 0 0 1-.352.598 2.249 2.249 0 0 1-.726.574c.176.082.338.178.486.287.152.106.285.229.399.37.16.187.285.4.374.638.09.239.135.496.135.774 0 .394-.072.744-.217 1.049a2.152 2.152 0 0 1-.591.761 2.617 2.617 0 0 1-.891.469 3.635 3.635 0 0 1-1.09.158c-.398 0-.769-.053-1.113-.158a2.552 2.552 0 0 1-.885-.469 2.144 2.144 0 0 1-.598-.756 2.497 2.497 0 0 1-.21-1.054c0-.235.031-.457.093-.668.067-.211.16-.407.282-.586.121-.172.265-.326.433-.463a2.68 2.68 0 0 1 .574-.358 2.157 2.157 0 0 1-.861-.755 2.074 2.074 0 0 1-.334-1.131c0-.379.065-.715.193-1.008a2.181 2.181 0 0 1 1.36-1.201 3.32 3.32 0 0 1 1.049-.158c.375 0 .72.052 1.037.158.32.101.599.254.838.457.23.199.412.447.545.744.132.293.199.629.199 1.008Zm-1.213 3.885c0-.211-.035-.403-.106-.575a1.365 1.365 0 0 0-.281-.457 1.303 1.303 0 0 0-.445-.281 1.574 1.574 0 0 0-.569-.1c-.214 0-.408.034-.58.1-.168.066-.312.16-.433.281a1.365 1.365 0 0 0-.281.457 1.68 1.68 0 0 0-.094.58c0 .219.033.416.099.592.067.172.163.317.288.434.121.113.265.201.433.263.172.059.365.088.58.088a1.6 1.6 0 0 0 .557-.093c.172-.063.32-.153.445-.27.117-.121.211-.266.281-.434.071-.171.106-.367.106-.585Zm-.182-3.833a1.38 1.38 0 0 0-.094-.521 1.256 1.256 0 0 0-.246-.41 1.194 1.194 0 0 0-.386-.258 1.301 1.301 0 0 0-.504-.094c-.184 0-.35.032-.498.094-.145.059-.27.143-.375.252a1.11 1.11 0 0 0-.235.404 1.66 1.66 0 0 0-.082.533c0 .192.028.368.082.528.055.156.137.289.246.398a1.1 1.1 0 0 0 .381.264c.149.062.315.094.498.094.184 0 .35-.032.498-.094.149-.063.276-.15.381-.264.106-.109.188-.242.246-.398.059-.16.088-.336.088-.528Zm3.504 1.999.457-4.301h4.588v1.242h-3.422l-.222 2.045c.14-.082.324-.16.55-.235.231-.074.494-.111.791-.111.403 0 .762.067 1.078.199.321.133.592.323.815.569.219.25.387.552.504.908.117.352.176.748.176 1.189 0 .391-.057.76-.17 1.108-.11.344-.28.644-.51.902a2.373 2.373 0 0 1-.861.61c-.348.148-.758.222-1.231.222-.359 0-.703-.051-1.031-.152a2.663 2.663 0 0 1-.873-.469 2.463 2.463 0 0 1-.627-.756 2.561 2.561 0 0 1-.276-1.049h1.366c.05.418.203.739.457.961.258.223.586.334.984.334.234 0 .438-.043.609-.129.172-.086.317-.207.434-.363a1.63 1.63 0 0 0 .246-.551c.055-.218.082-.455.082-.709 0-.246-.033-.47-.099-.673a1.508 1.508 0 0 0-.288-.54 1.275 1.275 0 0 0-.48-.351 1.615 1.615 0 0 0-.668-.129c-.168 0-.314.014-.439.041a1.632 1.632 0 0 0-.323.106 1.486 1.486 0 0 0-.269.164 2.545 2.545 0 0 0-.229.193l-1.119-.275Z"
              className="85"
            />
            <path
              d="M416.51 513.719c0 .258-.043.498-.129.72a1.904 1.904 0 0 1-.352.598 2.249 2.249 0 0 1-.726.574c.176.082.338.178.486.287.152.106.285.229.399.37.16.187.285.4.374.638.09.239.135.496.135.774 0 .394-.072.744-.217 1.049a2.152 2.152 0 0 1-.591.761 2.617 2.617 0 0 1-.891.469 3.635 3.635 0 0 1-1.09.158c-.398 0-.769-.053-1.113-.158a2.552 2.552 0 0 1-.885-.469 2.144 2.144 0 0 1-.598-.756 2.497 2.497 0 0 1-.21-1.054c0-.235.031-.457.093-.668.067-.211.16-.407.282-.586.121-.172.265-.326.433-.463a2.68 2.68 0 0 1 .574-.358 2.157 2.157 0 0 1-.861-.755 2.074 2.074 0 0 1-.334-1.131c0-.379.065-.715.193-1.008a2.181 2.181 0 0 1 1.36-1.201 3.32 3.32 0 0 1 1.049-.158c.375 0 .72.052 1.037.158.32.101.599.254.838.457.23.199.412.447.545.744.132.293.199.629.199 1.008Zm-1.213 3.885c0-.211-.035-.403-.106-.575a1.365 1.365 0 0 0-.281-.457 1.303 1.303 0 0 0-.445-.281 1.574 1.574 0 0 0-.569-.1c-.214 0-.408.034-.58.1-.168.066-.312.16-.433.281a1.365 1.365 0 0 0-.281.457 1.68 1.68 0 0 0-.094.58c0 .219.033.416.099.592.067.172.163.317.288.434.121.113.265.201.433.263.172.059.365.088.58.088a1.6 1.6 0 0 0 .557-.093c.172-.063.32-.153.445-.27.117-.121.211-.266.281-.434.071-.171.106-.367.106-.585Zm-.182-3.833a1.38 1.38 0 0 0-.094-.521 1.256 1.256 0 0 0-.246-.41 1.194 1.194 0 0 0-.386-.258 1.301 1.301 0 0 0-.504-.094c-.184 0-.35.032-.498.094-.145.059-.27.143-.375.252a1.11 1.11 0 0 0-.235.404 1.66 1.66 0 0 0-.082.533c0 .192.028.368.082.528.055.156.137.289.246.398a1.1 1.1 0 0 0 .381.264c.149.062.315.094.498.094.184 0 .35-.032.498-.094.149-.063.276-.15.381-.264.106-.109.188-.242.246-.398.059-.16.088-.336.088-.528Zm4.776 1.331h.838c.25 0 .468-.034.656-.1.187-.07.342-.168.463-.293a1.05 1.05 0 0 0 .257-.404 1.46 1.46 0 0 0 .094-.528c0-.203-.029-.384-.088-.545a1.076 1.076 0 0 0-.246-.41 1.13 1.13 0 0 0-.416-.246 1.698 1.698 0 0 0-.568-.088c-.192 0-.369.03-.533.088a1.198 1.198 0 0 0-.703.621 1.2 1.2 0 0 0-.1.498h-1.4c0-.34.068-.652.205-.937.136-.285.326-.533.568-.744.242-.207.527-.369.855-.487a3.262 3.262 0 0 1 1.09-.175c.403 0 .772.052 1.108.158.34.101.629.254.867.457.242.207.43.461.562.762.133.3.2.65.2 1.048 0 .176-.028.352-.082.528a1.93 1.93 0 0 1-.235.509 2.227 2.227 0 0 1-.961.809c.254.086.469.199.645.34.179.137.326.291.439.463.114.176.196.365.246.568.051.199.077.406.077.621 0 .399-.075.754-.223 1.067a2.236 2.236 0 0 1-.598.779 2.696 2.696 0 0 1-.914.492 3.761 3.761 0 0 1-1.131.164c-.367 0-.72-.051-1.06-.152a2.678 2.678 0 0 1-.897-.457 2.308 2.308 0 0 1-.621-.75 2.299 2.299 0 0 1-.228-1.049h1.4c0 .187.033.361.1.521.07.157.17.29.298.399.125.113.274.201.446.264.176.062.369.093.58.093.226 0 .43-.029.609-.088a1.21 1.21 0 0 0 .463-.275c.121-.113.213-.254.276-.422.066-.172.099-.367.099-.586a1.63 1.63 0 0 0-.111-.633 1.145 1.145 0 0 0-.322-.439 1.401 1.401 0 0 0-.51-.252 2.269 2.269 0 0 0-.656-.088h-.838v-1.101Z"
              className="83"
            />
            <path
              d="M422.51 493.719c0 .258-.043.498-.129.72a1.904 1.904 0 0 1-.352.598 2.249 2.249 0 0 1-.726.574c.176.082.338.178.486.287.152.106.285.229.399.37.16.187.285.4.374.638.09.239.135.496.135.774 0 .394-.072.744-.217 1.049a2.152 2.152 0 0 1-.591.761 2.617 2.617 0 0 1-.891.469 3.635 3.635 0 0 1-1.09.158c-.398 0-.769-.053-1.113-.158a2.552 2.552 0 0 1-.885-.469 2.144 2.144 0 0 1-.598-.756 2.497 2.497 0 0 1-.21-1.054c0-.235.031-.457.093-.668.067-.211.16-.407.282-.586.121-.172.265-.326.433-.463a2.68 2.68 0 0 1 .574-.358 2.157 2.157 0 0 1-.861-.755 2.074 2.074 0 0 1-.334-1.131c0-.379.065-.715.193-1.008a2.181 2.181 0 0 1 1.36-1.201 3.32 3.32 0 0 1 1.049-.158c.375 0 .72.052 1.037.158.32.101.599.254.838.457.23.199.412.447.545.744.132.293.199.629.199 1.008Zm-1.213 3.885c0-.211-.035-.403-.106-.575a1.365 1.365 0 0 0-.281-.457 1.303 1.303 0 0 0-.445-.281 1.574 1.574 0 0 0-.569-.1c-.214 0-.408.034-.58.1-.168.066-.312.16-.433.281a1.365 1.365 0 0 0-.281.457 1.68 1.68 0 0 0-.094.58c0 .219.033.416.099.592.067.172.163.317.288.434.121.113.265.201.433.263.172.059.365.088.58.088a1.6 1.6 0 0 0 .557-.093c.172-.063.32-.153.445-.27.117-.121.211-.266.281-.434.071-.171.106-.367.106-.585Zm-.182-3.833a1.38 1.38 0 0 0-.094-.521 1.256 1.256 0 0 0-.246-.41 1.194 1.194 0 0 0-.386-.258 1.301 1.301 0 0 0-.504-.094c-.184 0-.35.032-.498.094-.145.059-.27.143-.375.252a1.11 1.11 0 0 0-.235.404 1.66 1.66 0 0 0-.082.533c0 .192.028.368.082.528.055.156.137.289.246.398a1.1 1.1 0 0 0 .381.264c.149.062.315.094.498.094.184 0 .35-.032.498-.094.149-.063.276-.15.381-.264.106-.109.188-.242.246-.398.059-.16.088-.336.088-.528Zm7.899 3.188h1.072v1.137h-1.072V500h-1.401v-1.904h-3.691l-.035-.862 3.685-5.765h1.442v5.49Zm-3.698 0h2.297v-3.615l-.164.304-2.133 3.311Z"
              className="84"
            />
            <path
              d="M593.889 488h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V488Zm8.918-7.746L599.396 488h-1.476l3.41-7.359h-4.424v-1.172h5.901v.785Zm1.916 3.516.457-4.301h4.588v1.242h-3.422l-.223 2.045c.141-.082.324-.16.551-.235.23-.074.494-.111.791-.111.402 0 .762.067 1.078.199.32.133.592.323.814.569.219.25.387.552.504.908.118.352.176.748.176 1.189 0 .391-.057.76-.17 1.108a2.437 2.437 0 0 1-.51.902 2.356 2.356 0 0 1-.861.61c-.348.148-.758.222-1.23.222-.36 0-.704-.051-1.032-.152a2.663 2.663 0 0 1-.873-.469 2.463 2.463 0 0 1-.627-.756 2.545 2.545 0 0 1-.275-1.049h1.365c.051.418.203.739.457.961.258.223.586.334.985.334.234 0 .437-.043.609-.129.172-.086.316-.207.434-.363a1.63 1.63 0 0 0 .246-.551c.054-.218.082-.455.082-.709 0-.246-.033-.47-.1-.673a1.49 1.49 0 0 0-.287-.54 1.283 1.283 0 0 0-.48-.351 1.621 1.621 0 0 0-.668-.129c-.168 0-.315.014-.44.041a1.46 1.46 0 0 0-.592.27 2.535 2.535 0 0 0-.228.193l-1.119-.275Z"
              className="175"
            />
            <path
              d="M610.889 471h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V471Zm8.918-7.746L616.396 471h-1.476l3.41-7.359h-4.424v-1.172h5.901v.785Zm5.888-.826v1.189h-.093c-.465 0-.87.065-1.213.194a2.382 2.382 0 0 0-1.418 1.341 3.507 3.507 0 0 0-.241 1.02c.094-.106.204-.207.329-.305.125-.101.263-.191.416-.269.144-.075.304-.133.48-.176.176-.047.361-.07.557-.07.414 0 .773.078 1.078.234.308.156.562.367.762.633.203.265.351.57.445.914.098.344.146.701.146 1.072 0 .406-.062.787-.187 1.143a2.673 2.673 0 0 1-.533.92c-.239.265-.53.474-.873.627-.34.148-.729.222-1.166.222-.45 0-.85-.086-1.202-.258a2.64 2.64 0 0 1-.89-.697 3.137 3.137 0 0 1-.586-1.072 4.248 4.248 0 0 1-.199-1.307v-.58c0-.687.088-1.342.263-1.963a3.95 3.95 0 0 1 .891-1.611 3.473 3.473 0 0 1 1.301-.891c.515-.207 1.105-.31 1.769-.31h.164Zm-1.529 4.06c-.168 0-.328.026-.48.076a1.668 1.668 0 0 0-.422.211c-.118.09-.223.194-.317.311a1.71 1.71 0 0 0-.234.393v.433c0 .34.037.639.111.897.078.257.184.472.317.644.132.172.287.303.463.393.175.09.363.134.562.134.219 0 .414-.042.586-.128.172-.09.318-.211.439-.364.121-.156.213-.34.276-.55.062-.215.094-.448.094-.698 0-.238-.032-.463-.094-.674a1.716 1.716 0 0 0-.264-.562 1.24 1.24 0 0 0-.439-.375 1.226 1.226 0 0 0-.598-.141Z"
              className="176"
            />
            <path
              d="M639.889 457h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V457Zm8.724-6.281c0 .258-.043.498-.129.72a1.92 1.92 0 0 1-.351.598 2.302 2.302 0 0 1-.322.317 2.269 2.269 0 0 1-.405.257c.176.082.338.178.487.287.152.106.285.229.398.37a2.134 2.134 0 0 1 .51 1.412c0 .394-.072.744-.217 1.049a2.165 2.165 0 0 1-.592.761 2.621 2.621 0 0 1-.89.469 3.64 3.64 0 0 1-1.09.158c-.399 0-.77-.053-1.114-.158a2.556 2.556 0 0 1-.884-.469 2.144 2.144 0 0 1-.598-.756 2.482 2.482 0 0 1-.211-1.054c0-.235.031-.457.094-.668.066-.211.16-.407.281-.586.121-.172.266-.326.434-.463a2.68 2.68 0 0 1 .574-.358 2.293 2.293 0 0 1-.492-.328 2.093 2.093 0 0 1-.616-.955 2.064 2.064 0 0 1-.087-.603c0-.379.064-.715.193-1.008.133-.293.314-.541.545-.744.226-.203.498-.356.814-.457.321-.106.67-.158 1.049-.158.375 0 .721.052 1.037.158.321.101.6.254.838.457.231.199.412.447.545.744.133.293.199.629.199 1.008Zm-1.213 3.885c0-.211-.035-.403-.105-.575a1.365 1.365 0 0 0-.281-.457 1.307 1.307 0 0 0-.446-.281 1.572 1.572 0 0 0-.568-.1c-.215 0-.408.034-.58.1-.168.066-.313.16-.434.281a1.365 1.365 0 0 0-.281.457 1.704 1.704 0 0 0-.094.58c0 .219.034.416.1.592.066.172.162.317.287.434.121.113.266.201.434.263.172.059.365.088.58.088.203 0 .388-.031.556-.093.172-.063.321-.153.446-.27.117-.121.211-.266.281-.434.07-.171.105-.367.105-.585Zm-.181-3.833a1.38 1.38 0 0 0-.094-.521 1.291 1.291 0 0 0-.246-.41 1.188 1.188 0 0 0-.387-.258 1.294 1.294 0 0 0-.504-.094c-.183 0-.349.032-.498.094a1.097 1.097 0 0 0-.375.252 1.123 1.123 0 0 0-.234.404c-.055.16-.082.338-.082.533 0 .192.027.368.082.528.055.156.137.289.246.398.105.114.232.201.381.264.148.062.314.094.498.094.183 0 .349-.032.498-.094a1.154 1.154 0 0 0 .627-.662 1.54 1.54 0 0 0 .088-.528Zm8.724 6.229h-5.724v-.973l2.777-3.023c.231-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.342 1.342 0 0 0-.527-.099c-.25 0-.467.035-.651.105a1.22 1.22 0 0 0-.457.299 1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.555-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.205.498-.358.744a6.528 6.528 0 0 1-.556.744c-.211.25-.442.508-.692.774l-1.898 2.027h3.972V457Z"
              className="182"
            />
            <path
              d="M600.889 440h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V440Zm8.724-6.281c0 .258-.043.498-.129.72a1.92 1.92 0 0 1-.351.598 2.302 2.302 0 0 1-.322.317 2.269 2.269 0 0 1-.405.257c.176.082.338.178.487.287.152.106.285.229.398.37a2.134 2.134 0 0 1 .51 1.412c0 .394-.072.744-.217 1.049a2.165 2.165 0 0 1-.592.761 2.621 2.621 0 0 1-.89.469 3.64 3.64 0 0 1-1.09.158c-.399 0-.77-.053-1.114-.158a2.556 2.556 0 0 1-.884-.469 2.144 2.144 0 0 1-.598-.756 2.482 2.482 0 0 1-.211-1.054c0-.235.031-.457.094-.668.066-.211.16-.407.281-.586.121-.172.266-.326.434-.463a2.68 2.68 0 0 1 .574-.358 2.293 2.293 0 0 1-.492-.328 2.093 2.093 0 0 1-.616-.955 2.064 2.064 0 0 1-.087-.603c0-.379.064-.715.193-1.008.133-.293.314-.541.545-.744.226-.203.498-.356.814-.457.321-.106.67-.158 1.049-.158.375 0 .721.052 1.037.158.321.101.6.254.838.457.231.199.412.447.545.744.133.293.199.629.199 1.008Zm-1.213 3.885c0-.211-.035-.403-.105-.575a1.365 1.365 0 0 0-.281-.457 1.307 1.307 0 0 0-.446-.281 1.572 1.572 0 0 0-.568-.1c-.215 0-.408.034-.58.1-.168.066-.313.16-.434.281a1.365 1.365 0 0 0-.281.457 1.704 1.704 0 0 0-.094.58c0 .219.034.416.1.592.066.172.162.317.287.434.121.113.266.201.434.263.172.059.365.088.58.088.203 0 .388-.031.556-.093.172-.063.321-.153.446-.27.117-.121.211-.266.281-.434.07-.171.105-.367.105-.585Zm-.181-3.833a1.38 1.38 0 0 0-.094-.521 1.291 1.291 0 0 0-.246-.41 1.188 1.188 0 0 0-.387-.258 1.294 1.294 0 0 0-.504-.094c-.183 0-.349.032-.498.094a1.097 1.097 0 0 0-.375.252 1.123 1.123 0 0 0-.234.404c-.055.16-.082.338-.082.533 0 .192.027.368.082.528.055.156.137.289.246.398.105.114.232.201.381.264.148.062.314.094.498.094.183 0 .349-.032.498-.094a1.154 1.154 0 0 0 .627-.662 1.54 1.54 0 0 0 .088-.528Zm7.084 6.229h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V440Z"
              className="181"
            />
            <path
              d="M577.889 460h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V460Zm8.724-6.281c0 .258-.043.498-.129.72a1.92 1.92 0 0 1-.351.598 2.302 2.302 0 0 1-.322.317 2.269 2.269 0 0 1-.405.257c.176.082.338.178.487.287.152.106.285.229.398.37a2.134 2.134 0 0 1 .51 1.412c0 .394-.072.744-.217 1.049a2.165 2.165 0 0 1-.592.761 2.621 2.621 0 0 1-.89.469 3.64 3.64 0 0 1-1.09.158c-.399 0-.77-.053-1.114-.158a2.556 2.556 0 0 1-.884-.469 2.144 2.144 0 0 1-.598-.756 2.482 2.482 0 0 1-.211-1.054c0-.235.031-.457.094-.668.066-.211.16-.407.281-.586.121-.172.266-.326.434-.463a2.68 2.68 0 0 1 .574-.358 2.293 2.293 0 0 1-.492-.328 2.093 2.093 0 0 1-.616-.955 2.064 2.064 0 0 1-.087-.603c0-.379.064-.715.193-1.008.133-.293.314-.541.545-.744.226-.203.498-.356.814-.457.321-.106.67-.158 1.049-.158.375 0 .721.052 1.037.158.321.101.6.254.838.457.231.199.412.447.545.744.133.293.199.629.199 1.008Zm-1.213 3.885c0-.211-.035-.403-.105-.575a1.365 1.365 0 0 0-.281-.457 1.307 1.307 0 0 0-.446-.281 1.572 1.572 0 0 0-.568-.1c-.215 0-.408.034-.58.1-.168.066-.313.16-.434.281a1.365 1.365 0 0 0-.281.457 1.704 1.704 0 0 0-.094.58c0 .219.034.416.1.592.066.172.162.317.287.434.121.113.266.201.434.263.172.059.365.088.58.088.203 0 .388-.031.556-.093.172-.063.321-.153.446-.27.117-.121.211-.266.281-.434.07-.171.105-.367.105-.585Zm-.181-3.833a1.38 1.38 0 0 0-.094-.521 1.291 1.291 0 0 0-.246-.41 1.188 1.188 0 0 0-.387-.258 1.294 1.294 0 0 0-.504-.094c-.183 0-.349.032-.498.094a1.097 1.097 0 0 0-.375.252 1.123 1.123 0 0 0-.234.404c-.055.16-.082.338-.082.533 0 .192.027.368.082.528.055.156.137.289.246.398.105.114.232.201.381.264.148.062.314.094.498.094.183 0 .349-.032.498-.094a1.154 1.154 0 0 0 .627-.662 1.54 1.54 0 0 0 .088-.528Zm8.765 2.977c0 .547-.064 1.031-.193 1.453a2.875 2.875 0 0 1-.545 1.049 2.237 2.237 0 0 1-.867.656c-.34.145-.727.217-1.16.217-.43 0-.817-.072-1.16-.217a2.286 2.286 0 0 1-.873-.656 2.877 2.877 0 0 1-.557-1.049 5.121 5.121 0 0 1-.188-1.453v-2.021c0-.547.063-1.03.188-1.448.129-.422.312-.777.551-1.066.238-.285.527-.5.867-.645.344-.148.73-.222 1.16-.222.434 0 .82.074 1.16.222.344.145.637.36.879.645.234.289.416.644.545 1.066.129.418.193.901.193 1.448v2.021Zm-4.136-.498 2.713-2.057a3.226 3.226 0 0 0-.129-.791 1.433 1.433 0 0 0-.287-.545 1.034 1.034 0 0 0-.405-.281 1.435 1.435 0 0 0-.533-.094c-.215 0-.404.038-.568.112a1.04 1.04 0 0 0-.41.328 1.642 1.642 0 0 0-.288.639 3.94 3.94 0 0 0-.093.914v1.775Zm2.724.732v-1.711l-2.713 2.045c.02.27.061.508.123.715.067.207.155.379.264.516.109.148.244.26.404.334.164.074.354.111.569.111.211 0 .396-.035.556-.105a1.14 1.14 0 0 0 .411-.323c.128-.164.224-.378.287-.644.066-.266.099-.578.099-.938Z"
              className="180"
            />
            <path
              d="M561.889 434h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V434Zm8.918-7.746L567.396 434h-1.476l3.41-7.359h-4.424v-1.172h5.901v.785Zm2.841 6.592c.485 0 .897-.055 1.237-.164.34-.11.619-.266.838-.469.234-.223.406-.477.515-.762.11-.289.18-.599.211-.931v-.03a1.989 1.989 0 0 1-.662.492c-.141.067-.297.12-.469.159a2.46 2.46 0 0 1-.556.058c-.414 0-.776-.078-1.084-.234a2.24 2.24 0 0 1-.762-.627 2.738 2.738 0 0 1-.463-.914 3.827 3.827 0 0 1-.152-1.084c0-.41.06-.795.181-1.154a2.91 2.91 0 0 1 .539-.956 2.53 2.53 0 0 1 .862-.638c.344-.16.734-.24 1.172-.24.441 0 .832.084 1.172.252.343.167.634.396.873.685.25.313.439.691.568 1.137.129.441.193.906.193 1.394v.492a7.72 7.72 0 0 1-.234 1.922 3.89 3.89 0 0 1-.826 1.6c-.321.375-.742.67-1.266.885-.519.215-1.146.322-1.881.322h-.117v-1.195h.111Zm1.413-2.754a1.4 1.4 0 0 0 .867-.293c.121-.09.226-.195.316-.317a1.79 1.79 0 0 0 .229-.404v-.486c0-.34-.039-.641-.118-.903a2.13 2.13 0 0 0-.298-.656 1.317 1.317 0 0 0-.452-.398 1.126 1.126 0 0 0-.55-.141c-.219 0-.414.049-.586.147a1.235 1.235 0 0 0-.422.386 1.87 1.87 0 0 0-.27.58 2.759 2.759 0 0 0-.006 1.366c.055.215.141.406.258.574.114.164.254.297.422.398.172.098.375.147.61.147Z"
              className="179"
            />
            <path
              d="M547.889 460h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V460Zm8.918-7.746L553.396 460h-1.476l3.41-7.359h-4.424v-1.172h5.901v.785Zm7.207 0-3.41 7.746h-1.477l3.41-7.359h-4.424v-1.172h5.901v.785Z"
              className="177"
            />
            <path
              d="M527.889 473h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V473Zm8.888-3.252c0 .547-.064 1.031-.193 1.453a2.875 2.875 0 0 1-.545 1.049 2.237 2.237 0 0 1-.867.656c-.34.145-.727.217-1.16.217-.43 0-.817-.072-1.16-.217a2.286 2.286 0 0 1-.873-.656 2.877 2.877 0 0 1-.557-1.049 5.121 5.121 0 0 1-.188-1.453v-2.021c0-.547.063-1.03.188-1.448.129-.422.312-.777.551-1.066.238-.285.527-.5.867-.645.344-.148.73-.222 1.16-.222.434 0 .82.074 1.16.222.344.145.637.36.879.645.234.289.416.644.545 1.066.129.418.193.901.193 1.448v2.021Zm-4.136-.498 2.713-2.057a3.226 3.226 0 0 0-.129-.791 1.447 1.447 0 0 0-.287-.545 1.034 1.034 0 0 0-.405-.281 1.435 1.435 0 0 0-.533-.094c-.215 0-.404.038-.568.112a1.05 1.05 0 0 0-.411.328 1.656 1.656 0 0 0-.287.639 3.94 3.94 0 0 0-.093.914v1.775Zm2.724.732v-1.711l-2.713 2.045c.02.27.061.508.123.715.067.207.155.379.264.516.109.148.244.26.404.334.164.074.354.111.569.111.211 0 .396-.035.556-.105a1.14 1.14 0 0 0 .411-.323c.128-.164.224-.378.287-.644.066-.266.099-.578.099-.938Zm8.619-.234c0 .547-.064 1.031-.193 1.453a2.875 2.875 0 0 1-.545 1.049 2.237 2.237 0 0 1-.867.656c-.34.145-.727.217-1.16.217-.43 0-.817-.072-1.16-.217a2.286 2.286 0 0 1-.873-.656 2.877 2.877 0 0 1-.557-1.049 5.121 5.121 0 0 1-.188-1.453v-2.021c0-.547.063-1.03.188-1.448.129-.422.312-.777.551-1.066.238-.285.527-.5.867-.645.344-.148.73-.222 1.16-.222.434 0 .82.074 1.16.222.344.145.637.36.879.645.234.289.416.644.545 1.066.129.418.193.901.193 1.448v2.021Zm-4.136-.498 2.713-2.057a3.226 3.226 0 0 0-.129-.791 1.433 1.433 0 0 0-.287-.545 1.034 1.034 0 0 0-.405-.281 1.435 1.435 0 0 0-.533-.094c-.215 0-.404.038-.568.112a1.04 1.04 0 0 0-.41.328 1.642 1.642 0 0 0-.288.639 3.94 3.94 0 0 0-.093.914v1.775Zm2.724.732v-1.711l-2.713 2.045c.02.27.061.508.123.715.067.207.155.379.264.516.109.148.244.26.404.334.164.074.354.111.569.111.211 0 .396-.035.556-.105a1.14 1.14 0 0 0 .411-.323c.128-.164.224-.378.287-.644.066-.266.099-.578.099-.938Z"
              className="100"
            />
            <path
              d="M506.889 577h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V577Zm7.207 0h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V577Zm8.918-7.746-3.41 7.746h-1.477l3.41-7.359h-4.424v-1.172h5.901v.785Z"
              className="117"
            />
            <path
              d="M471.889 590h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V590Zm7.207 0h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V590Zm8.021-3.041h1.072v1.137h-1.072V590h-1.4v-1.904h-3.692l-.035-.862 3.686-5.765h1.441v5.49Zm-3.697 0h2.297v-3.615l-.164.304-2.133 3.311Z"
              className="114"
            />
            <path
              d="M432.58 588.102h.838c.25 0 .469-.034.656-.1a1.23 1.23 0 0 0 .463-.293c.113-.109.199-.244.258-.404.062-.164.094-.34.094-.528 0-.203-.03-.384-.088-.545a1.102 1.102 0 0 0-.246-.41 1.138 1.138 0 0 0-.416-.246 1.704 1.704 0 0 0-.569-.088c-.191 0-.369.03-.533.088a1.198 1.198 0 0 0-.703.621c-.066.149-.1.315-.1.498h-1.4c0-.34.068-.652.205-.937a2.3 2.3 0 0 1 .568-.744c.243-.207.528-.369.856-.487a3.258 3.258 0 0 1 1.09-.175c.402 0 .771.052 1.107.158.34.101.629.254.867.457a2.1 2.1 0 0 1 .563.762c.133.3.199.65.199 1.048 0 .176-.027.352-.082.528a1.96 1.96 0 0 1-.234.509 2.264 2.264 0 0 1-.961.809c.254.086.468.199.644.34.18.137.326.291.44.463.113.176.195.365.246.568.051.199.076.406.076.621 0 .399-.074.754-.223 1.067a2.222 2.222 0 0 1-.597.779 2.706 2.706 0 0 1-.914.492 3.766 3.766 0 0 1-1.131.164c-.367 0-.721-.051-1.061-.152a2.673 2.673 0 0 1-.896-.457 2.308 2.308 0 0 1-.621-.75 2.286 2.286 0 0 1-.229-1.049h1.4c0 .187.034.361.1.521.07.157.17.29.299.399.125.113.273.201.445.264.176.062.369.093.58.093.227 0 .43-.029.61-.088.183-.062.338-.154.463-.275a1.09 1.09 0 0 0 .275-.422c.066-.172.1-.367.1-.586 0-.246-.038-.457-.112-.633a1.135 1.135 0 0 0-.322-.439 1.401 1.401 0 0 0-.51-.252 2.264 2.264 0 0 0-.656-.088h-.838v-1.101ZM443.736 593h-5.724v-.973l2.777-3.023c.231-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.555-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.528 6.528 0 0 1-.556.744c-.211.25-.442.508-.692.774l-1.898 2.027h3.972V593Zm2.912-1.154c.485 0 .897-.055 1.237-.164.34-.11.619-.266.838-.469.234-.223.406-.477.515-.762.11-.289.18-.599.211-.931v-.03a1.989 1.989 0 0 1-.662.492c-.141.067-.297.12-.469.159a2.46 2.46 0 0 1-.556.058c-.414 0-.776-.078-1.084-.234a2.24 2.24 0 0 1-.762-.627 2.738 2.738 0 0 1-.463-.914 3.827 3.827 0 0 1-.152-1.084c0-.41.06-.795.181-1.154a2.91 2.91 0 0 1 .539-.956 2.53 2.53 0 0 1 .862-.638c.344-.16.734-.24 1.172-.24.441 0 .832.084 1.172.252.343.167.634.396.873.685.25.313.439.691.568 1.137.129.441.193.906.193 1.394v.492a7.72 7.72 0 0 1-.234 1.922 3.89 3.89 0 0 1-.826 1.6c-.321.375-.742.67-1.266.885-.519.215-1.146.322-1.881.322h-.117v-1.195h.111Zm1.413-2.754a1.4 1.4 0 0 0 .867-.293c.121-.09.226-.195.316-.317a1.79 1.79 0 0 0 .229-.404v-.486c0-.34-.039-.641-.118-.903a2.13 2.13 0 0 0-.298-.656 1.317 1.317 0 0 0-.452-.398 1.126 1.126 0 0 0-.55-.141c-.219 0-.414.049-.586.147a1.235 1.235 0 0 0-.422.386 1.87 1.87 0 0 0-.27.58 2.759 2.759 0 0 0-.006 1.366c.055.215.141.406.258.574.114.164.254.297.422.398.172.098.375.147.61.147Z"
              className="329"
            />
            <path
              d="M421.889 565h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V565Zm7.599-8.572v1.189h-.093c-.465 0-.87.065-1.213.194a2.368 2.368 0 0 0-1.418 1.341 3.507 3.507 0 0 0-.241 1.02c.094-.106.204-.207.329-.305.125-.101.263-.191.416-.269.144-.075.304-.133.48-.176.176-.047.361-.07.557-.07.414 0 .773.078 1.078.234.308.156.562.367.762.633.203.265.351.57.445.914.098.344.146.701.146 1.072 0 .406-.062.787-.187 1.143a2.673 2.673 0 0 1-.533.92c-.239.265-.53.474-.873.627-.34.148-.729.222-1.166.222-.45 0-.85-.086-1.202-.258a2.64 2.64 0 0 1-.89-.697 3.137 3.137 0 0 1-.586-1.072 4.248 4.248 0 0 1-.199-1.307v-.58c0-.687.088-1.342.263-1.963a3.95 3.95 0 0 1 .891-1.611 3.473 3.473 0 0 1 1.301-.891c.515-.207 1.105-.31 1.769-.31h.164Zm-1.529 4.06c-.168 0-.328.026-.48.076a1.668 1.668 0 0 0-.422.211c-.118.09-.223.194-.317.311a1.675 1.675 0 0 0-.234.393v.433c0 .34.037.639.111.897.078.257.184.472.317.644.132.172.287.303.462.393.176.09.364.134.563.134.219 0 .414-.042.586-.128.172-.09.318-.211.439-.364.121-.156.213-.34.276-.55.062-.215.094-.448.094-.698 0-.238-.032-.463-.094-.674a1.716 1.716 0 0 0-.264-.562 1.24 1.24 0 0 0-.439-.375 1.226 1.226 0 0 0-.598-.141Zm10.025 1.26c0 .547-.064 1.031-.193 1.453a2.875 2.875 0 0 1-.545 1.049 2.237 2.237 0 0 1-.867.656c-.34.145-.727.217-1.16.217-.43 0-.817-.072-1.16-.217a2.286 2.286 0 0 1-.873-.656 2.877 2.877 0 0 1-.557-1.049 5.121 5.121 0 0 1-.188-1.453v-2.021c0-.547.063-1.03.188-1.448.129-.422.312-.777.551-1.066.238-.285.527-.5.867-.645.344-.148.73-.222 1.16-.222.434 0 .82.074 1.16.222.344.145.637.36.879.645.234.289.416.644.545 1.066.129.418.193.901.193 1.448v2.021Zm-4.136-.498 2.713-2.057a3.226 3.226 0 0 0-.129-.791 1.433 1.433 0 0 0-.287-.545 1.034 1.034 0 0 0-.405-.281 1.435 1.435 0 0 0-.533-.094c-.215 0-.404.038-.568.112a1.04 1.04 0 0 0-.41.328 1.642 1.642 0 0 0-.288.639 3.94 3.94 0 0 0-.093.914v1.775Zm2.724.732v-1.711l-2.713 2.045c.02.27.061.508.123.715.067.207.155.379.264.516.109.148.244.26.404.334.164.074.354.111.569.111.211 0 .396-.035.556-.105a1.14 1.14 0 0 0 .411-.323c.128-.164.224-.378.287-.644.066-.266.099-.578.099-.938Z"
              className="160"
            />
            <path
              d="M442.889 550h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V550Zm7.599-8.572v1.189h-.093c-.465 0-.87.065-1.213.194a2.368 2.368 0 0 0-1.418 1.341 3.507 3.507 0 0 0-.241 1.02c.094-.106.204-.207.329-.305.125-.101.263-.191.416-.269.144-.075.304-.133.48-.176.176-.047.361-.07.557-.07.414 0 .773.078 1.078.234.308.156.562.367.762.633.203.265.351.57.445.914.098.344.146.701.146 1.072 0 .406-.062.787-.187 1.143a2.673 2.673 0 0 1-.533.92c-.239.265-.53.474-.873.627-.34.148-.729.222-1.166.222-.45 0-.85-.086-1.202-.258a2.64 2.64 0 0 1-.89-.697 3.137 3.137 0 0 1-.586-1.072 4.248 4.248 0 0 1-.199-1.307v-.58c0-.687.088-1.342.263-1.963a3.95 3.95 0 0 1 .891-1.611 3.473 3.473 0 0 1 1.301-.891c.515-.207 1.105-.31 1.769-.31h.164Zm-1.529 4.06c-.168 0-.328.026-.48.076a1.668 1.668 0 0 0-.422.211c-.118.09-.223.194-.317.311a1.675 1.675 0 0 0-.234.393v.433c0 .34.037.639.111.897.078.257.184.472.317.644.132.172.287.303.462.393.176.09.364.134.563.134.219 0 .414-.042.586-.128.172-.09.318-.211.439-.364.121-.156.213-.34.276-.55.062-.215.094-.448.094-.698 0-.238-.032-.463-.094-.674a1.716 1.716 0 0 0-.264-.562 1.24 1.24 0 0 0-.439-.375 1.226 1.226 0 0 0-.598-.141Zm9.984 4.512h-5.724v-.973l2.777-3.023c.231-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.342 1.342 0 0 0-.527-.099c-.25 0-.467.035-.651.105a1.22 1.22 0 0 0-.457.299 1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.555-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.205.498-.358.744a6.528 6.528 0 0 1-.556.744c-.211.25-.442.508-.692.774l-1.898 2.027h3.972V550Z"
              className="162"
            />
            <path
              d="M486.889 544h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V544Zm7.599-8.572v1.189h-.093c-.465 0-.87.065-1.213.194a2.368 2.368 0 0 0-1.418 1.341 3.507 3.507 0 0 0-.241 1.02c.094-.106.204-.207.329-.305.125-.101.263-.191.416-.269.144-.075.304-.133.48-.176.176-.047.361-.07.557-.07.414 0 .773.078 1.078.234.308.156.562.367.762.633.203.265.351.57.445.914.098.344.146.701.146 1.072 0 .406-.062.787-.187 1.143a2.673 2.673 0 0 1-.533.92c-.239.265-.53.474-.873.627-.34.148-.729.222-1.166.222-.45 0-.85-.086-1.202-.258a2.64 2.64 0 0 1-.89-.697 3.137 3.137 0 0 1-.586-1.072 4.248 4.248 0 0 1-.199-1.307v-.58c0-.687.088-1.342.263-1.963a3.95 3.95 0 0 1 .891-1.611 3.473 3.473 0 0 1 1.301-.891c.515-.207 1.105-.31 1.769-.31h.164Zm-1.529 4.06c-.168 0-.328.026-.48.076a1.668 1.668 0 0 0-.422.211c-.118.09-.223.194-.317.311a1.675 1.675 0 0 0-.234.393v.433c0 .34.037.639.111.897.078.257.184.472.317.644.132.172.287.303.462.393.176.09.364.134.563.134.219 0 .414-.042.586-.128.172-.09.318-.211.439-.364.121-.156.213-.34.276-.55.062-.215.094-.448.094-.698 0-.238-.032-.463-.094-.674a1.716 1.716 0 0 0-.264-.562 1.24 1.24 0 0 0-.439-.375 1.226 1.226 0 0 0-.598-.141Zm9.158 1.471h1.072v1.137h-1.072V544h-1.4v-1.904h-3.692l-.035-.862 3.686-5.765h1.441v5.49Zm-3.697 0h2.297v-3.615l-.164.304-2.133 3.311Z"
              className="164"
            />
            <path
              d="M600.889 604h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V604Zm8.847 0h-5.724v-.973l2.777-3.023c.231-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.555-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.528 6.528 0 0 1-.556.744c-.211.25-.442.508-.692.774l-1.898 2.027h3.972V604Zm1.987-4.23.457-4.301h4.588v1.242h-3.422l-.223 2.045c.141-.082.324-.16.551-.235.23-.074.494-.111.791-.111.402 0 .762.067 1.078.199.32.133.592.323.814.569.219.25.387.552.504.908.118.352.176.748.176 1.189 0 .391-.057.76-.17 1.108a2.437 2.437 0 0 1-.51.902 2.356 2.356 0 0 1-.861.61c-.348.148-.758.222-1.23.222-.36 0-.704-.051-1.032-.152a2.663 2.663 0 0 1-.873-.469 2.463 2.463 0 0 1-.627-.756 2.545 2.545 0 0 1-.275-1.049h1.365c.051.418.203.739.457.961.258.223.586.334.985.334.234 0 .437-.043.609-.129.172-.086.316-.207.434-.363a1.63 1.63 0 0 0 .246-.551c.054-.218.082-.455.082-.709 0-.246-.033-.47-.1-.673a1.49 1.49 0 0 0-.287-.54 1.283 1.283 0 0 0-.48-.351 1.621 1.621 0 0 0-.668-.129c-.168 0-.315.014-.44.041a1.46 1.46 0 0 0-.592.27 2.535 2.535 0 0 0-.228.193l-1.119-.275Z"
              className="125"
            />
            <path
              d="M617.889 579h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V579Zm8.847 0h-5.724v-.973l2.777-3.023c.231-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.555-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.528 6.528 0 0 1-.556.744c-.211.25-.442.508-.692.774l-1.898 2.027h3.972V579Zm7.084-6.281c0 .258-.043.498-.129.72a1.92 1.92 0 0 1-.351.598 2.302 2.302 0 0 1-.322.317 2.269 2.269 0 0 1-.405.257c.176.082.338.178.487.287.152.106.285.229.398.37a2.134 2.134 0 0 1 .51 1.412c0 .394-.072.744-.217 1.049a2.165 2.165 0 0 1-.592.761 2.621 2.621 0 0 1-.89.469 3.64 3.64 0 0 1-1.09.158c-.399 0-.77-.053-1.114-.158a2.556 2.556 0 0 1-.884-.469 2.144 2.144 0 0 1-.598-.756 2.482 2.482 0 0 1-.211-1.054c0-.235.031-.457.094-.668.066-.211.16-.407.281-.586.121-.172.266-.326.434-.463a2.68 2.68 0 0 1 .574-.358 2.293 2.293 0 0 1-.492-.328 2.093 2.093 0 0 1-.615-.955 2.031 2.031 0 0 1-.088-.603c0-.379.064-.715.193-1.008.133-.293.314-.541.545-.744.226-.203.498-.356.814-.457.321-.106.67-.158 1.049-.158.375 0 .721.052 1.037.158.321.101.6.254.838.457.231.199.412.447.545.744.133.293.199.629.199 1.008Zm-1.213 3.885c0-.211-.035-.403-.105-.575a1.365 1.365 0 0 0-.281-.457 1.307 1.307 0 0 0-.446-.281 1.568 1.568 0 0 0-.568-.1c-.215 0-.408.034-.58.1-.168.066-.313.16-.434.281a1.382 1.382 0 0 0-.281.457 1.704 1.704 0 0 0-.094.58c0 .219.034.416.1.592.066.172.162.317.287.434.121.113.266.201.434.263.172.059.365.088.58.088.203 0 .388-.031.556-.093.172-.063.321-.153.446-.27.117-.121.211-.266.281-.434.07-.171.105-.367.105-.585Zm-.181-3.833a1.38 1.38 0 0 0-.094-.521 1.291 1.291 0 0 0-.246-.41 1.188 1.188 0 0 0-.387-.258 1.294 1.294 0 0 0-.504-.094c-.183 0-.349.032-.498.094a1.097 1.097 0 0 0-.375.252 1.123 1.123 0 0 0-.234.404c-.055.16-.082.338-.082.533 0 .192.027.368.082.528.055.156.137.289.246.398.105.114.232.201.381.264.148.062.314.094.498.094.183 0 .349-.032.498-.094a1.154 1.154 0 0 0 .627-.662 1.54 1.54 0 0 0 .088-.528Z"
              className="128"
            />
            <path
              d="M633.889 550h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V550Zm4.898-4.898h.838c.25 0 .469-.034.656-.1a1.23 1.23 0 0 0 .463-.293c.113-.109.199-.244.258-.404.062-.164.094-.34.094-.528 0-.203-.03-.384-.088-.545a1.102 1.102 0 0 0-.246-.41 1.138 1.138 0 0 0-.416-.246 1.704 1.704 0 0 0-.569-.088c-.191 0-.369.03-.533.088a1.198 1.198 0 0 0-.703.621c-.066.149-.1.315-.1.498h-1.4c0-.34.068-.652.205-.937a2.3 2.3 0 0 1 .568-.744c.243-.207.528-.369.856-.487a3.258 3.258 0 0 1 1.09-.175c.402 0 .771.052 1.107.158.34.101.629.254.867.457a2.1 2.1 0 0 1 .563.762c.133.3.199.65.199 1.048 0 .176-.027.352-.082.528a1.96 1.96 0 0 1-.234.509 2.264 2.264 0 0 1-.961.809c.254.086.469.199.644.34.18.137.326.291.44.463.113.176.195.365.246.568.051.199.076.406.076.621 0 .399-.074.754-.223 1.067a2.222 2.222 0 0 1-.597.779 2.706 2.706 0 0 1-.914.492 3.766 3.766 0 0 1-1.131.164c-.367 0-.721-.051-1.061-.152a2.673 2.673 0 0 1-.896-.457 2.308 2.308 0 0 1-.621-.75 2.286 2.286 0 0 1-.229-1.049h1.401c0 .187.033.361.099.521.07.157.17.29.299.399.125.113.273.201.445.264.176.062.369.093.58.093.227 0 .43-.029.61-.088.183-.062.338-.154.463-.275a1.09 1.09 0 0 0 .275-.422c.066-.172.1-.367.1-.586a1.61 1.61 0 0 0-.112-.633 1.135 1.135 0 0 0-.322-.439 1.401 1.401 0 0 0-.51-.252 2.264 2.264 0 0 0-.656-.088h-.838v-1.101Zm9.516 4.898h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V550Z"
              className="131"
            />
            <path
              d="M616.889 516h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V516Zm8.918-7.746L622.396 516h-1.476l3.41-7.359h-4.424v-1.172h5.901v.785Zm7.136 7.746h-5.724v-.973l2.777-3.023c.231-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.342 1.342 0 0 0-.527-.099c-.25 0-.467.035-.651.105a1.22 1.22 0 0 0-.457.299 1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.555-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.205.498-.358.744a6.528 6.528 0 0 1-.556.744c-.211.25-.442.508-.692.774l-1.898 2.027h3.972V516Z"
              className="172"
            />
            <path
              d="M627.889 608h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V608Zm8.847 0h-5.724v-.973l2.777-3.023c.231-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.555-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.528 6.528 0 0 1-.556.744c-.211.25-.442.508-.692.774l-1.898 2.027h3.972V608Zm2.912-1.154c.485 0 .897-.055 1.237-.164.34-.11.619-.266.838-.469.234-.223.406-.477.515-.762.11-.289.18-.599.211-.931v-.03a1.989 1.989 0 0 1-.662.492c-.141.067-.297.12-.469.159a2.46 2.46 0 0 1-.556.058c-.414 0-.776-.078-1.084-.234a2.24 2.24 0 0 1-.762-.627 2.738 2.738 0 0 1-.463-.914 3.827 3.827 0 0 1-.152-1.084c0-.41.06-.795.181-1.154a2.91 2.91 0 0 1 .539-.956 2.53 2.53 0 0 1 .862-.638c.344-.16.734-.24 1.172-.24.441 0 .832.084 1.172.252.343.167.634.396.873.685.25.313.439.691.568 1.137.129.441.193.906.193 1.394v.492a7.72 7.72 0 0 1-.234 1.922 3.89 3.89 0 0 1-.826 1.6c-.321.375-.742.67-1.266.885-.519.215-1.146.322-1.881.322h-.117v-1.195h.111Zm1.413-2.754a1.4 1.4 0 0 0 .867-.293c.121-.09.226-.195.316-.317a1.79 1.79 0 0 0 .229-.404v-.486c0-.34-.039-.641-.118-.903a2.13 2.13 0 0 0-.298-.656 1.317 1.317 0 0 0-.452-.398 1.126 1.126 0 0 0-.55-.141c-.219 0-.414.049-.586.147a1.235 1.235 0 0 0-.422.386 1.87 1.87 0 0 0-.27.58 2.759 2.759 0 0 0-.006 1.366c.055.215.141.406.258.574.114.164.254.297.422.398.172.098.375.147.61.147Z"
              className="129"
            />
            <path
              d="M739.889 542h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V542Zm8.021-3.041h1.072v1.137h-1.072V542h-1.4v-1.904h-3.692l-.035-.862 3.686-5.765h1.441v5.49Zm-3.697 0h2.297v-3.615l-.164.304-2.133 3.311Zm7.781-1.857h.838c.25 0 .469-.034.656-.1a1.23 1.23 0 0 0 .463-.293c.113-.109.199-.244.258-.404.062-.164.094-.34.094-.528 0-.203-.03-.384-.088-.545a1.102 1.102 0 0 0-.246-.41 1.138 1.138 0 0 0-.416-.246 1.704 1.704 0 0 0-.569-.088c-.191 0-.369.03-.533.088a1.198 1.198 0 0 0-.703.621c-.066.149-.1.315-.1.498h-1.4c0-.34.068-.652.205-.937a2.3 2.3 0 0 1 .568-.744c.243-.207.528-.369.856-.487a3.258 3.258 0 0 1 1.09-.175c.402 0 .771.052 1.107.158.34.101.629.254.867.457a2.1 2.1 0 0 1 .563.762c.133.3.199.65.199 1.048 0 .176-.027.352-.082.528a1.96 1.96 0 0 1-.234.509 2.264 2.264 0 0 1-.961.809c.254.086.469.199.644.34.18.137.326.291.44.463.113.176.195.365.246.568.051.199.076.406.076.621 0 .399-.074.754-.223 1.067a2.222 2.222 0 0 1-.597.779 2.706 2.706 0 0 1-.914.492 3.766 3.766 0 0 1-1.131.164c-.367 0-.721-.051-1.061-.152a2.673 2.673 0 0 1-.896-.457 2.308 2.308 0 0 1-.621-.75 2.286 2.286 0 0 1-.229-1.049h1.401c0 .187.033.361.099.521.07.157.17.29.299.399.125.113.273.201.445.264.176.062.369.093.58.093.227 0 .43-.029.61-.088.183-.062.338-.154.463-.275.121-.113.213-.254.275-.422.066-.172.1-.367.1-.586a1.61 1.61 0 0 0-.112-.633 1.135 1.135 0 0 0-.322-.439 1.393 1.393 0 0 0-.51-.252 2.264 2.264 0 0 0-.656-.088h-.838v-1.101Z"
              className="143"
            />
            <path
              d="M786.889 516h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V516Zm8.021-3.041h1.072v1.137h-1.072V516h-1.4v-1.904h-3.692l-.035-.862 3.686-5.765h1.441v5.49Zm-3.697 0h2.297v-3.615l-.164.304-2.133 3.311Zm10.904 0h1.072v1.137h-1.072V516h-1.4v-1.904h-3.692l-.035-.862 3.686-5.765h1.441v5.49Zm-3.697 0h2.297v-3.615l-.164.304-2.133 3.311Z"
              className="144"
            />
            <path
              d="M756.889 468h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V468Zm8.021-3.041h1.072v1.137h-1.072V468h-1.4v-1.904h-3.692l-.035-.862 3.686-5.765h1.441v5.49Zm-3.697 0h2.297v-3.615l-.164.304-2.133 3.311Zm11.607-3.24c0 .258-.043.498-.129.72a1.92 1.92 0 0 1-.351.598 2.302 2.302 0 0 1-.322.317 2.269 2.269 0 0 1-.405.257c.176.082.338.178.487.287.152.106.285.229.398.37a2.134 2.134 0 0 1 .51 1.412c0 .394-.072.744-.217 1.049a2.165 2.165 0 0 1-.592.761 2.621 2.621 0 0 1-.89.469 3.64 3.64 0 0 1-1.09.158c-.399 0-.77-.053-1.114-.158a2.556 2.556 0 0 1-.884-.469 2.144 2.144 0 0 1-.598-.756 2.482 2.482 0 0 1-.211-1.054c0-.235.031-.457.094-.668.066-.211.16-.407.281-.586.121-.172.266-.326.434-.463a2.68 2.68 0 0 1 .574-.358 2.293 2.293 0 0 1-.492-.328 2.093 2.093 0 0 1-.615-.955 2.031 2.031 0 0 1-.088-.603c0-.379.064-.715.193-1.008.133-.293.314-.541.545-.744.226-.203.498-.356.814-.457.321-.106.67-.158 1.049-.158.375 0 .721.052 1.037.158.321.101.6.254.838.457.231.199.412.447.545.744.133.293.199.629.199 1.008Zm-1.213 3.885c0-.211-.035-.403-.105-.575a1.365 1.365 0 0 0-.281-.457 1.307 1.307 0 0 0-.446-.281 1.568 1.568 0 0 0-.568-.1c-.215 0-.408.034-.58.1-.168.066-.313.16-.434.281a1.382 1.382 0 0 0-.281.457 1.704 1.704 0 0 0-.094.58c0 .219.034.416.1.592.066.172.162.317.287.434.121.113.266.201.434.263.172.059.365.088.58.088.203 0 .388-.031.556-.093.172-.063.321-.153.446-.27.117-.121.211-.266.281-.434.07-.171.105-.367.105-.585Zm-.181-3.833a1.38 1.38 0 0 0-.094-.521 1.291 1.291 0 0 0-.246-.41 1.188 1.188 0 0 0-.387-.258 1.294 1.294 0 0 0-.504-.094c-.183 0-.349.032-.498.094a1.097 1.097 0 0 0-.375.252 1.123 1.123 0 0 0-.234.404c-.055.16-.082.338-.082.533 0 .192.027.368.082.528.055.156.137.289.246.398.105.114.232.201.381.264.148.062.314.094.498.094.183 0 .349-.032.498-.094a1.154 1.154 0 0 0 .627-.662 1.54 1.54 0 0 0 .088-.528Z"
              className="148"
            />
            <path
              d="M723.889 479h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V479Zm8.021-3.041h1.072v1.137h-1.072V479h-1.4v-1.904h-3.692l-.035-.862 3.686-5.765h1.441v5.49Zm-3.697 0h2.297v-3.615l-.164.304-2.133 3.311Zm11.801-4.705-3.41 7.746h-1.477l3.41-7.359h-4.424v-1.172h5.901v.785Z"
              className="147"
            />
            <path
              d="M701.889 506h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V506Zm8.021-3.041h1.072v1.137h-1.072V506h-1.4v-1.904h-3.692l-.035-.862 3.686-5.765h1.441v5.49Zm-3.697 0h2.297v-3.615l-.164.304-2.133 3.311Zm10.482-5.531v1.189h-.093c-.465 0-.87.065-1.213.194a2.382 2.382 0 0 0-1.418 1.341 3.507 3.507 0 0 0-.241 1.02c.094-.106.204-.207.329-.305.125-.101.263-.191.416-.269.144-.075.304-.133.48-.176.176-.047.361-.07.557-.07.414 0 .773.078 1.078.234.308.156.562.367.762.633.203.265.351.57.445.914.098.344.146.701.146 1.072 0 .406-.062.787-.187 1.143a2.673 2.673 0 0 1-.533.92c-.239.265-.53.474-.873.627-.34.148-.729.222-1.166.222-.45 0-.85-.086-1.202-.258a2.64 2.64 0 0 1-.89-.697 3.137 3.137 0 0 1-.586-1.072 4.248 4.248 0 0 1-.199-1.307v-.58c0-.687.088-1.342.263-1.963a3.95 3.95 0 0 1 .891-1.611 3.473 3.473 0 0 1 1.301-.891c.515-.207 1.105-.31 1.769-.31h.164Zm-1.529 4.06c-.168 0-.328.026-.48.076a1.668 1.668 0 0 0-.422.211c-.118.09-.223.194-.317.311a1.71 1.71 0 0 0-.234.393v.433c0 .34.037.639.111.897.078.257.184.472.317.644.132.172.287.303.463.393.175.09.363.134.562.134.219 0 .414-.042.586-.128.172-.09.318-.211.439-.364.121-.156.213-.34.276-.55.062-.215.094-.448.094-.698 0-.238-.032-.463-.094-.674a1.716 1.716 0 0 0-.264-.562 1.24 1.24 0 0 0-.439-.375 1.226 1.226 0 0 0-.598-.141Z"
              className="146"
            />
            <path
              d="M694.889 535h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V535Zm8.021-3.041h1.072v1.137h-1.072V535h-1.4v-1.904h-3.692l-.035-.862 3.686-5.765h1.441v5.49Zm-3.697 0h2.297v-3.615l-.164.304-2.133 3.311Zm6.51-1.189.457-4.301h4.588v1.242h-3.422l-.223 2.045c.141-.082.324-.16.551-.235.23-.074.494-.111.791-.111.402 0 .762.067 1.078.199.32.133.592.323.814.569.219.25.387.552.504.908.118.352.176.748.176 1.189 0 .391-.057.76-.17 1.108a2.437 2.437 0 0 1-.51.902 2.356 2.356 0 0 1-.861.61c-.348.148-.758.222-1.23.222-.36 0-.704-.051-1.032-.152a2.663 2.663 0 0 1-.873-.469 2.463 2.463 0 0 1-.627-.756 2.545 2.545 0 0 1-.275-1.049h1.365c.051.418.203.739.457.961.258.223.586.334.985.334.234 0 .437-.043.609-.129.172-.086.316-.207.434-.363a1.63 1.63 0 0 0 .246-.551c.054-.218.082-.455.082-.709 0-.246-.033-.47-.1-.673a1.49 1.49 0 0 0-.287-.54 1.283 1.283 0 0 0-.48-.351 1.621 1.621 0 0 0-.668-.129c-.168 0-.315.014-.44.041a1.46 1.46 0 0 0-.592.27 2.535 2.535 0 0 0-.228.193l-1.119-.275Z"
              className="145"
            />
            <path
              d="M670.889 473h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V473Zm8.021-3.041h1.072v1.137h-1.072V473h-1.4v-1.904h-3.692l-.035-.862 3.686-5.765h1.441v5.49Zm-3.697 0h2.297v-3.615l-.164.304-2.133 3.311Zm7.435 1.887c.485 0 .897-.055 1.237-.164.34-.11.619-.266.838-.469.234-.223.406-.477.515-.762.11-.289.18-.599.211-.931v-.03a1.989 1.989 0 0 1-.662.492c-.141.067-.297.12-.469.159a2.46 2.46 0 0 1-.556.058c-.414 0-.776-.078-1.084-.234a2.24 2.24 0 0 1-.762-.627 2.738 2.738 0 0 1-.463-.914 3.827 3.827 0 0 1-.152-1.084c0-.41.06-.795.181-1.154a2.91 2.91 0 0 1 .539-.956 2.53 2.53 0 0 1 .862-.638c.344-.16.734-.24 1.172-.24.441 0 .832.084 1.172.252.343.167.634.396.873.685.25.313.439.691.568 1.137.129.441.193.906.193 1.394v.492a7.72 7.72 0 0 1-.234 1.922 3.89 3.89 0 0 1-.826 1.6c-.321.375-.742.67-1.266.885-.519.215-1.146.322-1.881.322h-.117v-1.195h.111Zm1.413-2.754a1.4 1.4 0 0 0 .867-.293c.121-.09.226-.195.316-.317a1.79 1.79 0 0 0 .229-.404v-.486c0-.34-.039-.641-.118-.903a2.13 2.13 0 0 0-.298-.656 1.317 1.317 0 0 0-.452-.398 1.126 1.126 0 0 0-.55-.141c-.219 0-.414.049-.586.147a1.235 1.235 0 0 0-.422.386 1.87 1.87 0 0 0-.27.58 2.759 2.759 0 0 0-.006 1.366c.055.215.141.406.258.574.114.164.254.297.422.398.172.098.375.147.61.147Z"
              className="149"
            />
            <path
              d="M727.889 436h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V436Zm3.627-4.23.457-4.301h4.588v1.242h-3.422l-.223 2.045c.141-.082.324-.16.551-.235.23-.074.494-.111.791-.111.402 0 .762.067 1.078.199.32.133.592.323.814.569.219.25.387.552.504.908.117.352.176.748.176 1.189 0 .391-.057.76-.17 1.108a2.437 2.437 0 0 1-.51.902 2.356 2.356 0 0 1-.861.61c-.348.148-.758.222-1.23.222-.36 0-.704-.051-1.032-.152a2.663 2.663 0 0 1-.873-.469 2.463 2.463 0 0 1-.627-.756 2.545 2.545 0 0 1-.275-1.049h1.365c.051.418.203.739.457.961.258.223.586.334.985.334.234 0 .437-.043.609-.129.172-.086.316-.207.434-.363a1.63 1.63 0 0 0 .246-.551c.054-.218.082-.455.082-.709 0-.246-.034-.47-.1-.673a1.49 1.49 0 0 0-.287-.54 1.279 1.279 0 0 0-.481-.351 1.613 1.613 0 0 0-.667-.129c-.168 0-.315.014-.44.041a1.46 1.46 0 0 0-.592.27 2.535 2.535 0 0 0-.228.193l-1.119-.275Zm12.468.978c0 .547-.064 1.031-.193 1.453a2.875 2.875 0 0 1-.545 1.049 2.237 2.237 0 0 1-.867.656c-.34.145-.727.217-1.16.217-.43 0-.817-.072-1.16-.217a2.286 2.286 0 0 1-.873-.656 2.877 2.877 0 0 1-.557-1.049 5.121 5.121 0 0 1-.188-1.453v-2.021c0-.547.063-1.03.188-1.448.129-.422.312-.777.551-1.066.238-.285.527-.5.867-.645.344-.148.73-.222 1.16-.222.434 0 .82.074 1.16.222.344.145.637.36.879.645.234.289.416.644.545 1.066.129.418.193.901.193 1.448v2.021Zm-4.136-.498 2.713-2.057a3.226 3.226 0 0 0-.129-.791 1.433 1.433 0 0 0-.287-.545 1.034 1.034 0 0 0-.405-.281 1.435 1.435 0 0 0-.533-.094c-.215 0-.404.038-.568.112a1.04 1.04 0 0 0-.41.328 1.642 1.642 0 0 0-.288.639 3.94 3.94 0 0 0-.093.914v1.775Zm2.724.732v-1.711l-2.713 2.045c.02.27.061.508.123.715.067.207.155.379.264.516.109.148.244.26.404.334.164.074.354.111.569.111.211 0 .396-.035.556-.105a1.14 1.14 0 0 0 .411-.323c.128-.164.224-.378.287-.644.066-.266.099-.578.099-.938Z"
              className="150"
            />
            <path
              d="M727.889 580h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V580Zm8.021-3.041h1.072v1.137h-1.072V580h-1.4v-1.904h-3.692l-.035-.862 3.686-5.765h1.441v5.49Zm-3.697 0h2.297v-3.615l-.164.304-2.133 3.311Zm11.73 3.041h-5.724v-.973l2.777-3.023c.231-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.342 1.342 0 0 0-.527-.099c-.25 0-.467.035-.651.105a1.22 1.22 0 0 0-.457.299 1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.555-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.205.498-.358.744a6.528 6.528 0 0 1-.556.744c-.211.25-.442.508-.692.774l-1.898 2.027h3.972V580Z"
              className="142"
            />
            <path
              d="M674.889 595h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V595Zm4.898-4.898h.838c.25 0 .469-.034.656-.1a1.23 1.23 0 0 0 .463-.293c.113-.109.199-.244.258-.404.062-.164.094-.34.094-.528 0-.203-.03-.384-.088-.545a1.102 1.102 0 0 0-.246-.41 1.138 1.138 0 0 0-.416-.246 1.704 1.704 0 0 0-.569-.088c-.191 0-.369.03-.533.088a1.198 1.198 0 0 0-.703.621c-.066.149-.1.315-.1.498h-1.4c0-.34.068-.652.205-.937a2.3 2.3 0 0 1 .568-.744c.243-.207.528-.369.856-.487a3.258 3.258 0 0 1 1.09-.175c.402 0 .771.052 1.107.158.34.101.629.254.867.457a2.1 2.1 0 0 1 .563.762c.133.3.199.65.199 1.048 0 .176-.027.352-.082.528a1.96 1.96 0 0 1-.234.509 2.264 2.264 0 0 1-.961.809c.254.086.469.199.644.34.18.137.326.291.44.463.113.176.195.365.246.568.051.199.076.406.076.621 0 .399-.074.754-.223 1.067a2.222 2.222 0 0 1-.597.779 2.706 2.706 0 0 1-.914.492 3.766 3.766 0 0 1-1.131.164c-.367 0-.721-.051-1.061-.152a2.673 2.673 0 0 1-.896-.457 2.308 2.308 0 0 1-.621-.75 2.286 2.286 0 0 1-.229-1.049h1.401c0 .187.033.361.099.521.07.157.17.29.299.399.125.113.273.201.445.264.176.062.369.093.58.093.227 0 .43-.029.61-.088.183-.062.338-.154.463-.275a1.09 1.09 0 0 0 .275-.422c.066-.172.1-.367.1-.586a1.61 1.61 0 0 0-.112-.633 1.135 1.135 0 0 0-.322-.439 1.401 1.401 0 0 0-.51-.252 2.264 2.264 0 0 0-.656-.088h-.838v-1.101Zm10.33 1.857h1.072v1.137h-1.072V595h-1.4v-1.904h-3.692l-.035-.862 3.686-5.765h1.441v5.49Zm-3.697 0h2.297v-3.615l-.164.304-2.133 3.311Z"
              className="134"
            />
            <path
              d="M648.889 598h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V598Zm4.898-4.898h.838c.25 0 .469-.034.656-.1a1.23 1.23 0 0 0 .463-.293c.113-.109.199-.244.258-.404.062-.164.094-.34.094-.528 0-.203-.03-.384-.088-.545a1.102 1.102 0 0 0-.246-.41 1.138 1.138 0 0 0-.416-.246 1.704 1.704 0 0 0-.569-.088c-.191 0-.369.03-.533.088a1.198 1.198 0 0 0-.703.621c-.066.149-.1.315-.1.498h-1.4c0-.34.068-.652.205-.937a2.3 2.3 0 0 1 .568-.744c.243-.207.528-.369.856-.487a3.258 3.258 0 0 1 1.09-.175c.402 0 .771.052 1.107.158.34.101.629.254.867.457a2.1 2.1 0 0 1 .563.762c.133.3.199.65.199 1.048 0 .176-.027.352-.082.528a1.96 1.96 0 0 1-.234.509 2.264 2.264 0 0 1-.961.809c.254.086.469.199.644.34.18.137.326.291.44.463.113.176.195.365.246.568.051.199.076.406.076.621 0 .399-.074.754-.223 1.067a2.222 2.222 0 0 1-.597.779 2.706 2.706 0 0 1-.914.492 3.766 3.766 0 0 1-1.131.164c-.367 0-.721-.051-1.061-.152a2.673 2.673 0 0 1-.896-.457 2.308 2.308 0 0 1-.621-.75 2.286 2.286 0 0 1-.229-1.049h1.401c0 .187.033.361.099.521.07.157.17.29.299.399.125.113.273.201.445.264.176.062.369.093.58.093.227 0 .43-.029.61-.088.183-.062.338-.154.463-.275a1.09 1.09 0 0 0 .275-.422c.066-.172.1-.367.1-.586a1.61 1.61 0 0 0-.112-.633 1.135 1.135 0 0 0-.322-.439 1.401 1.401 0 0 0-.51-.252 2.264 2.264 0 0 0-.656-.088h-.838v-1.101ZM664.943 598h-5.724v-.973l2.777-3.023c.231-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.342 1.342 0 0 0-.527-.099c-.25 0-.467.035-.651.105a1.22 1.22 0 0 0-.457.299 1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.555-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.205.498-.358.744a6.528 6.528 0 0 1-.556.744c-.211.25-.442.508-.692.774l-1.898 2.027h3.972V598Z"
              className="132"
            />
            <path
              d="M661.889 566h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V566Zm4.898-4.898h.838c.25 0 .469-.034.656-.1a1.23 1.23 0 0 0 .463-.293c.113-.109.199-.244.258-.404.062-.164.094-.34.094-.528 0-.203-.03-.384-.088-.545a1.102 1.102 0 0 0-.246-.41 1.138 1.138 0 0 0-.416-.246 1.704 1.704 0 0 0-.569-.088c-.191 0-.369.03-.533.088a1.198 1.198 0 0 0-.703.621c-.066.149-.1.315-.1.498h-1.4c0-.34.068-.652.205-.937a2.3 2.3 0 0 1 .568-.744c.243-.207.528-.369.856-.487a3.258 3.258 0 0 1 1.09-.175c.402 0 .771.052 1.107.158.34.101.629.254.867.457a2.1 2.1 0 0 1 .563.762c.133.3.199.65.199 1.048 0 .176-.027.352-.082.528a1.96 1.96 0 0 1-.234.509 2.264 2.264 0 0 1-.961.809c.254.086.469.199.644.34.18.137.326.291.44.463.113.176.195.365.246.568.051.199.076.406.076.621 0 .399-.074.754-.223 1.067a2.222 2.222 0 0 1-.597.779 2.706 2.706 0 0 1-.914.492 3.766 3.766 0 0 1-1.131.164c-.367 0-.721-.051-1.061-.152a2.673 2.673 0 0 1-.896-.457 2.308 2.308 0 0 1-.621-.75 2.286 2.286 0 0 1-.229-1.049h1.401c0 .187.033.361.099.521.07.157.17.29.299.399.125.113.273.201.445.264.176.062.369.093.58.093.227 0 .43-.029.61-.088.183-.062.338-.154.463-.275a1.09 1.09 0 0 0 .275-.422c.066-.172.1-.367.1-.586a1.61 1.61 0 0 0-.112-.633 1.135 1.135 0 0 0-.322-.439 1.401 1.401 0 0 0-.51-.252 2.264 2.264 0 0 0-.656-.088h-.838v-1.101Zm5.936.668.457-4.301h4.588v1.242h-3.422l-.223 2.045c.141-.082.324-.16.551-.235.23-.074.494-.111.791-.111.402 0 .762.067 1.078.199.32.133.592.323.814.569.219.25.387.552.504.908.118.352.176.748.176 1.189 0 .391-.057.76-.17 1.108a2.437 2.437 0 0 1-.51.902 2.356 2.356 0 0 1-.861.61c-.348.148-.758.222-1.23.222-.36 0-.704-.051-1.032-.152a2.663 2.663 0 0 1-.873-.469 2.463 2.463 0 0 1-.627-.756 2.545 2.545 0 0 1-.275-1.049h1.365c.051.418.203.739.457.961.258.223.586.334.985.334.234 0 .437-.043.609-.129.172-.086.316-.207.434-.363a1.63 1.63 0 0 0 .246-.551c.054-.218.082-.455.082-.709 0-.246-.033-.47-.1-.673a1.49 1.49 0 0 0-.287-.54 1.283 1.283 0 0 0-.48-.351 1.621 1.621 0 0 0-.668-.129c-.168 0-.315.014-.44.041a1.46 1.46 0 0 0-.592.27 2.535 2.535 0 0 0-.228.193l-1.119-.275Z"
              className="135"
            />
            <path
              d="M660.889 515h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V515Zm8.724-6.281c0 .258-.043.498-.129.72a1.92 1.92 0 0 1-.351.598 2.302 2.302 0 0 1-.322.317 2.269 2.269 0 0 1-.405.257c.176.082.338.178.487.287.152.106.285.229.398.37a2.134 2.134 0 0 1 .51 1.412c0 .394-.072.744-.217 1.049a2.165 2.165 0 0 1-.592.761 2.621 2.621 0 0 1-.89.469 3.64 3.64 0 0 1-1.09.158c-.399 0-.77-.053-1.114-.158a2.556 2.556 0 0 1-.884-.469 2.144 2.144 0 0 1-.598-.756 2.482 2.482 0 0 1-.211-1.054c0-.235.031-.457.094-.668.066-.211.16-.407.281-.586.121-.172.266-.326.434-.463a2.68 2.68 0 0 1 .574-.358 2.293 2.293 0 0 1-.492-.328 2.093 2.093 0 0 1-.616-.955 2.064 2.064 0 0 1-.087-.603c0-.379.064-.715.193-1.008.133-.293.314-.541.545-.744.226-.203.498-.356.814-.457.321-.106.67-.158 1.049-.158.375 0 .721.052 1.037.158.321.101.6.254.838.457.231.199.412.447.545.744.133.293.199.629.199 1.008Zm-1.213 3.885c0-.211-.035-.403-.105-.575a1.365 1.365 0 0 0-.281-.457 1.307 1.307 0 0 0-.446-.281 1.572 1.572 0 0 0-.568-.1c-.215 0-.408.034-.58.1-.168.066-.313.16-.434.281a1.365 1.365 0 0 0-.281.457 1.704 1.704 0 0 0-.094.58c0 .219.034.416.1.592.066.172.162.317.287.434.121.113.266.201.434.263.172.059.365.088.58.088.203 0 .388-.031.556-.093.172-.063.321-.153.446-.27.117-.121.211-.266.281-.434.07-.171.105-.367.105-.585Zm-.181-3.833a1.38 1.38 0 0 0-.094-.521 1.291 1.291 0 0 0-.246-.41 1.188 1.188 0 0 0-.387-.258 1.294 1.294 0 0 0-.504-.094c-.183 0-.349.032-.498.094a1.097 1.097 0 0 0-.375.252 1.123 1.123 0 0 0-.234.404c-.055.16-.082.338-.082.533 0 .192.027.368.082.528.055.156.137.289.246.398.105.114.232.201.381.264.148.062.314.094.498.094.183 0 .349-.032.498-.094a1.154 1.154 0 0 0 .627-.662 1.54 1.54 0 0 0 .088-.528Zm4.775 1.331h.838c.25 0 .469-.034.656-.1a1.23 1.23 0 0 0 .463-.293c.113-.109.199-.244.258-.404.062-.164.094-.34.094-.528 0-.203-.03-.384-.088-.545a1.102 1.102 0 0 0-.246-.41 1.138 1.138 0 0 0-.416-.246 1.704 1.704 0 0 0-.569-.088c-.191 0-.369.03-.533.088a1.198 1.198 0 0 0-.703.621c-.066.149-.1.315-.1.498h-1.4c0-.34.068-.652.205-.937a2.3 2.3 0 0 1 .568-.744c.243-.207.528-.369.856-.487a3.258 3.258 0 0 1 1.09-.175c.402 0 .771.052 1.107.158.34.101.629.254.867.457a2.1 2.1 0 0 1 .563.762c.133.3.199.65.199 1.048 0 .176-.027.352-.082.528a1.96 1.96 0 0 1-.234.509 2.264 2.264 0 0 1-.961.809c.254.086.469.199.644.34.18.137.326.291.44.463.113.176.195.365.246.568.051.199.076.406.076.621 0 .399-.074.754-.223 1.067a2.222 2.222 0 0 1-.597.779 2.706 2.706 0 0 1-.914.492 3.766 3.766 0 0 1-1.131.164c-.367 0-.721-.051-1.061-.152a2.673 2.673 0 0 1-.896-.457 2.308 2.308 0 0 1-.621-.75 2.286 2.286 0 0 1-.229-1.049h1.401c0 .187.033.361.099.521.07.157.17.29.299.399.125.113.273.201.445.264.176.062.369.093.58.093.227 0 .43-.029.61-.088.183-.062.338-.154.463-.275.121-.113.213-.254.275-.422.066-.172.1-.367.1-.586a1.61 1.61 0 0 0-.112-.633 1.135 1.135 0 0 0-.322-.439 1.393 1.393 0 0 0-.51-.252 2.264 2.264 0 0 0-.656-.088h-.838v-1.101Z"
              className="183"
            />
            <path
              d="M736.889 673h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V673Zm4.898-4.898h.838c.25 0 .469-.034.656-.1a1.23 1.23 0 0 0 .463-.293c.113-.109.199-.244.258-.404.062-.164.094-.34.094-.528 0-.203-.03-.384-.088-.545a1.102 1.102 0 0 0-.246-.41 1.138 1.138 0 0 0-.416-.246 1.704 1.704 0 0 0-.569-.088c-.191 0-.369.03-.533.088a1.198 1.198 0 0 0-.703.621c-.066.149-.1.315-.1.498h-1.4c0-.34.068-.652.205-.937a2.3 2.3 0 0 1 .568-.744c.243-.207.528-.369.856-.487a3.258 3.258 0 0 1 1.09-.175c.402 0 .771.052 1.107.158.34.101.629.254.867.457a2.1 2.1 0 0 1 .563.762c.133.3.199.65.199 1.048 0 .176-.027.352-.082.528a1.96 1.96 0 0 1-.234.509 2.264 2.264 0 0 1-.961.809c.254.086.469.199.644.34.18.137.326.291.44.463.113.176.195.365.246.568.051.199.076.406.076.621 0 .399-.074.754-.223 1.067a2.222 2.222 0 0 1-.597.779 2.706 2.706 0 0 1-.914.492 3.766 3.766 0 0 1-1.131.164c-.367 0-.721-.051-1.061-.152a2.673 2.673 0 0 1-.896-.457 2.308 2.308 0 0 1-.621-.75 2.286 2.286 0 0 1-.229-1.049h1.401c0 .187.033.361.099.521.07.157.17.29.299.399.125.113.273.201.445.264.176.062.369.093.58.093.227 0 .43-.029.61-.088.183-.062.338-.154.463-.275a1.09 1.09 0 0 0 .275-.422c.066-.172.1-.367.1-.586a1.61 1.61 0 0 0-.112-.633 1.135 1.135 0 0 0-.322-.439 1.401 1.401 0 0 0-.51-.252 2.264 2.264 0 0 0-.656-.088h-.838v-1.101Zm11.033-1.383c0 .258-.043.498-.129.72a1.92 1.92 0 0 1-.351.598 2.302 2.302 0 0 1-.322.317 2.269 2.269 0 0 1-.405.257c.176.082.338.178.487.287.152.106.285.229.398.37a2.134 2.134 0 0 1 .51 1.412c0 .394-.072.744-.217 1.049a2.165 2.165 0 0 1-.592.761 2.621 2.621 0 0 1-.89.469 3.64 3.64 0 0 1-1.09.158c-.399 0-.77-.053-1.114-.158a2.556 2.556 0 0 1-.884-.469 2.144 2.144 0 0 1-.598-.756 2.482 2.482 0 0 1-.211-1.054c0-.235.031-.457.094-.668.066-.211.16-.407.281-.586.121-.172.266-.326.434-.463a2.68 2.68 0 0 1 .574-.358 2.293 2.293 0 0 1-.492-.328 2.093 2.093 0 0 1-.615-.955 2.031 2.031 0 0 1-.088-.603c0-.379.064-.715.193-1.008.133-.293.314-.541.545-.744.226-.203.498-.356.814-.457.321-.106.67-.158 1.049-.158.375 0 .721.052 1.037.158.321.101.6.254.838.457.231.199.412.447.545.744.133.293.199.629.199 1.008Zm-1.213 3.885c0-.211-.035-.403-.105-.575a1.365 1.365 0 0 0-.281-.457 1.307 1.307 0 0 0-.446-.281 1.568 1.568 0 0 0-.568-.1c-.215 0-.408.034-.58.1-.168.066-.313.16-.434.281a1.382 1.382 0 0 0-.281.457 1.704 1.704 0 0 0-.094.58c0 .219.034.416.1.592.066.172.162.317.287.434.121.113.266.201.434.263.172.059.365.088.58.088.203 0 .388-.031.556-.093.172-.063.321-.153.446-.27.117-.121.211-.266.281-.434.07-.171.105-.367.105-.585Zm-.181-3.833a1.38 1.38 0 0 0-.094-.521 1.291 1.291 0 0 0-.246-.41 1.188 1.188 0 0 0-.387-.258 1.294 1.294 0 0 0-.504-.094c-.183 0-.349.032-.498.094a1.097 1.097 0 0 0-.375.252 1.123 1.123 0 0 0-.234.404c-.055.16-.082.338-.082.533 0 .192.027.368.082.528.055.156.137.289.246.398.105.114.232.201.381.264.148.062.314.094.498.094.183 0 .349-.032.498-.094a1.154 1.154 0 0 0 .627-.662 1.54 1.54 0 0 0 .088-.528Z"
              className="138"
            />
            <path
              d="M610.529 690h-5.724v-.973l2.777-3.023c.23-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.554-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.424 6.424 0 0 1-.557.744c-.21.25-.441.508-.691.774l-1.898 2.027h3.972V690Zm7.207 0h-5.724v-.973l2.777-3.023c.231-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.555-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.528 6.528 0 0 1-.556.744c-.211.25-.442.508-.692.774l-1.898 2.027h3.972V690Zm5.567 0h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V690Z"
              className="221"
            />
            <path
              d="M567.529 717h-5.724v-.973l2.777-3.023c.23-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.554-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.424 6.424 0 0 1-.557.744c-.21.25-.441.508-.691.774l-1.898 2.027h3.972V717Zm7.207 0h-5.724v-.973l2.777-3.023c.231-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.555-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.528 6.528 0 0 1-.556.744c-.211.25-.442.508-.692.774l-1.898 2.027h3.972V717Zm7.207 0h-5.724v-.973l2.777-3.023c.231-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.342 1.342 0 0 0-.527-.099c-.25 0-.467.035-.651.105a1.22 1.22 0 0 0-.457.299 1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.555-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.205.498-.358.744a6.528 6.528 0 0 1-.556.744c-.211.25-.442.508-.692.774l-1.898 2.027h3.972V717Z"
              className="222"
            />
            <path
              d="M423.889 684h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V684Zm8.888-3.252c0 .547-.064 1.031-.193 1.453a2.875 2.875 0 0 1-.545 1.049 2.237 2.237 0 0 1-.867.656c-.34.145-.727.217-1.16.217-.43 0-.817-.072-1.16-.217a2.286 2.286 0 0 1-.873-.656 2.877 2.877 0 0 1-.557-1.049 5.121 5.121 0 0 1-.188-1.453v-2.021c0-.547.063-1.03.188-1.448.129-.422.312-.777.551-1.066.238-.285.527-.5.867-.645.344-.148.73-.222 1.16-.222.434 0 .82.074 1.16.222.344.145.637.36.879.645.234.289.416.644.545 1.066.129.418.193.901.193 1.448v2.021Zm-4.136-.498 2.713-2.057a3.226 3.226 0 0 0-.129-.791 1.447 1.447 0 0 0-.287-.545 1.034 1.034 0 0 0-.405-.281 1.435 1.435 0 0 0-.533-.094c-.215 0-.404.038-.568.112a1.05 1.05 0 0 0-.411.328 1.656 1.656 0 0 0-.287.639 3.94 3.94 0 0 0-.093.914v1.775Zm2.724.732v-1.711l-2.713 2.045c.02.27.061.508.123.715.067.207.155.379.264.516.109.148.244.26.404.334.164.074.354.111.569.111.211 0 .396-.035.556-.105a1.14 1.14 0 0 0 .411-.323c.128-.164.224-.378.287-.644.066-.266.099-.578.099-.938Zm7.752-.023h1.072v1.137h-1.072V684h-1.4v-1.904h-3.692l-.035-.862 3.686-5.765h1.441v5.49Zm-3.697 0h2.297v-3.615l-.164.304-2.133 3.311Z"
              className="104"
            />
            <path
              d="M448.889 694h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V694Zm8.888-3.252c0 .547-.064 1.031-.193 1.453a2.875 2.875 0 0 1-.545 1.049 2.237 2.237 0 0 1-.867.656c-.34.145-.727.217-1.16.217-.43 0-.817-.072-1.16-.217a2.286 2.286 0 0 1-.873-.656 2.877 2.877 0 0 1-.557-1.049 5.121 5.121 0 0 1-.188-1.453v-2.021c0-.547.063-1.03.188-1.448.129-.422.312-.777.551-1.066.238-.285.527-.5.867-.645.344-.148.73-.222 1.16-.222.434 0 .82.074 1.16.222.344.145.637.36.879.645.234.289.416.644.545 1.066.129.418.193.901.193 1.448v2.021Zm-4.136-.498 2.713-2.057a3.226 3.226 0 0 0-.129-.791 1.447 1.447 0 0 0-.287-.545 1.034 1.034 0 0 0-.405-.281 1.435 1.435 0 0 0-.533-.094c-.215 0-.404.038-.568.112a1.05 1.05 0 0 0-.411.328 1.656 1.656 0 0 0-.287.639 3.94 3.94 0 0 0-.093.914v1.775Zm2.724.732v-1.711l-2.713 2.045c.02.27.061.508.123.715.067.207.155.379.264.516.109.148.244.26.404.334.164.074.354.111.569.111.211 0 .396-.035.556-.105a1.14 1.14 0 0 0 .411-.323c.128-.164.224-.378.287-.644.066-.266.099-.578.099-.938Zm3.358-1.212.457-4.301h4.588v1.242h-3.422l-.223 2.045c.141-.082.324-.16.551-.235.23-.074.494-.111.791-.111.402 0 .762.067 1.078.199.32.133.592.323.814.569.219.25.387.552.504.908.118.352.176.748.176 1.189 0 .391-.057.76-.17 1.108a2.437 2.437 0 0 1-.51.902 2.356 2.356 0 0 1-.861.61c-.348.148-.758.222-1.23.222-.36 0-.704-.051-1.032-.152a2.663 2.663 0 0 1-.873-.469 2.463 2.463 0 0 1-.627-.756 2.545 2.545 0 0 1-.275-1.049h1.365c.051.418.203.739.457.961.258.223.586.334.985.334.234 0 .437-.043.609-.129.172-.086.316-.207.434-.363a1.63 1.63 0 0 0 .246-.551c.054-.218.082-.455.082-.709 0-.246-.033-.47-.1-.673a1.49 1.49 0 0 0-.287-.54 1.283 1.283 0 0 0-.48-.351 1.621 1.621 0 0 0-.668-.129c-.168 0-.315.014-.44.041a1.46 1.46 0 0 0-.592.27 2.535 2.535 0 0 0-.228.193l-1.119-.275Z"
              className="105"
            />
            <path
              d="M528.889 684h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V684Zm7.207 0h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V684Zm7.207 0h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V684Z"
              className="111"
            />
            <path
              d="M482.889 645h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V645Zm7.207 0h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V645Zm8.847 0h-5.724v-.973l2.777-3.023c.231-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.342 1.342 0 0 0-.527-.099c-.25 0-.467.035-.651.105a1.22 1.22 0 0 0-.457.299 1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.555-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.205.498-.358.744a6.528 6.528 0 0 1-.556.744c-.211.25-.442.508-.692.774l-1.898 2.027h3.972V645Z"
              className="112"
            />
            <path
              d="M448.889 622h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V622Zm7.207 0h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V622Zm4.898-4.898h.838c.25 0 .469-.034.656-.1a1.23 1.23 0 0 0 .463-.293c.113-.109.199-.244.258-.404.062-.164.094-.34.094-.528 0-.203-.03-.384-.088-.545a1.102 1.102 0 0 0-.246-.41 1.138 1.138 0 0 0-.416-.246 1.704 1.704 0 0 0-.569-.088c-.191 0-.369.03-.533.088a1.198 1.198 0 0 0-.703.621c-.066.149-.1.315-.1.498h-1.4c0-.34.068-.652.205-.937a2.3 2.3 0 0 1 .568-.744c.243-.207.528-.369.856-.487a3.258 3.258 0 0 1 1.09-.175c.402 0 .771.052 1.107.158.34.101.629.254.867.457a2.1 2.1 0 0 1 .563.762c.133.3.199.65.199 1.048 0 .176-.027.352-.082.528a1.96 1.96 0 0 1-.234.509 2.264 2.264 0 0 1-.961.809c.254.086.469.199.644.34.18.137.326.291.44.463.113.176.195.365.246.568.051.199.076.406.076.621 0 .399-.074.754-.223 1.067a2.222 2.222 0 0 1-.597.779 2.706 2.706 0 0 1-.914.492 3.766 3.766 0 0 1-1.131.164c-.367 0-.721-.051-1.061-.152a2.673 2.673 0 0 1-.896-.457 2.308 2.308 0 0 1-.621-.75 2.286 2.286 0 0 1-.229-1.049h1.401c0 .187.033.361.099.521.07.157.17.29.299.399.125.113.273.201.445.264.176.062.369.093.58.093.227 0 .43-.029.61-.088.183-.062.338-.154.463-.275.121-.113.213-.254.275-.422.066-.172.1-.367.1-.586a1.61 1.61 0 0 0-.112-.633 1.135 1.135 0 0 0-.322-.439 1.393 1.393 0 0 0-.51-.252 2.264 2.264 0 0 0-.656-.088h-.838v-1.101Z"
              className="113"
            />
            <path
              d="M477.889 724h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V724Zm8.888-3.252c0 .547-.064 1.031-.193 1.453a2.875 2.875 0 0 1-.545 1.049 2.237 2.237 0 0 1-.867.656c-.34.145-.727.217-1.16.217-.43 0-.817-.072-1.16-.217a2.286 2.286 0 0 1-.873-.656 2.877 2.877 0 0 1-.557-1.049 5.121 5.121 0 0 1-.188-1.453v-2.021c0-.547.063-1.03.188-1.448.129-.422.312-.777.551-1.066.238-.285.527-.5.867-.645.344-.148.73-.222 1.16-.222.434 0 .82.074 1.16.222.344.145.637.36.879.645.234.289.416.644.545 1.066.129.418.193.901.193 1.448v2.021Zm-4.136-.498 2.713-2.057a3.226 3.226 0 0 0-.129-.791 1.447 1.447 0 0 0-.287-.545 1.034 1.034 0 0 0-.405-.281 1.435 1.435 0 0 0-.533-.094c-.215 0-.404.038-.568.112a1.05 1.05 0 0 0-.411.328 1.656 1.656 0 0 0-.287.639 3.94 3.94 0 0 0-.093.914v1.775Zm2.724.732v-1.711l-2.713 2.045c.02.27.061.508.123.715.067.207.155.379.264.516.109.148.244.26.404.334.164.074.354.111.569.111.211 0 .396-.035.556-.105a1.14 1.14 0 0 0 .411-.323c.128-.164.224-.378.287-.644.066-.266.099-.578.099-.938Zm8.649-4.728-3.41 7.746h-1.477l3.41-7.359h-4.424v-1.172h5.901v.785Z"
              className="107"
            />
            <path
              d="M661.889 759h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V759Zm8.724-6.281c0 .258-.043.498-.129.72a1.92 1.92 0 0 1-.351.598 2.302 2.302 0 0 1-.322.317 2.269 2.269 0 0 1-.405.257c.176.082.338.178.487.287.152.106.285.229.398.37a2.134 2.134 0 0 1 .51 1.412c0 .394-.072.744-.217 1.049a2.165 2.165 0 0 1-.592.761 2.621 2.621 0 0 1-.89.469 3.64 3.64 0 0 1-1.09.158c-.399 0-.77-.053-1.114-.158a2.556 2.556 0 0 1-.884-.469 2.144 2.144 0 0 1-.598-.756 2.482 2.482 0 0 1-.211-1.054c0-.235.031-.457.094-.668.066-.211.16-.407.281-.586.121-.172.266-.326.434-.463a2.68 2.68 0 0 1 .574-.358 2.293 2.293 0 0 1-.492-.328 2.093 2.093 0 0 1-.616-.955 2.064 2.064 0 0 1-.087-.603c0-.379.064-.715.193-1.008.133-.293.314-.541.545-.744.226-.203.498-.356.814-.457.321-.106.67-.158 1.049-.158.375 0 .721.052 1.037.158.321.101.6.254.838.457.231.199.412.447.545.744.133.293.199.629.199 1.008Zm-1.213 3.885c0-.211-.035-.403-.105-.575a1.365 1.365 0 0 0-.281-.457 1.307 1.307 0 0 0-.446-.281 1.572 1.572 0 0 0-.568-.1c-.215 0-.408.034-.58.1-.168.066-.313.16-.434.281a1.365 1.365 0 0 0-.281.457 1.704 1.704 0 0 0-.094.58c0 .219.034.416.1.592.066.172.162.317.287.434.121.113.266.201.434.263.172.059.365.088.58.088.203 0 .388-.031.556-.093.172-.063.321-.153.446-.27.117-.121.211-.266.281-.434.07-.171.105-.367.105-.585Zm-.181-3.833a1.38 1.38 0 0 0-.094-.521 1.291 1.291 0 0 0-.246-.41 1.188 1.188 0 0 0-.387-.258 1.294 1.294 0 0 0-.504-.094c-.183 0-.349.032-.498.094a1.097 1.097 0 0 0-.375.252 1.123 1.123 0 0 0-.234.404c-.055.16-.082.338-.082.533 0 .192.027.368.082.528.055.156.137.289.246.398.105.114.232.201.381.264.148.062.314.094.498.094.183 0 .349-.032.498-.094a1.154 1.154 0 0 0 .627-.662 1.54 1.54 0 0 0 .088-.528Zm8.601-.052c0 .258-.043.498-.129.72a1.92 1.92 0 0 1-.351.598 2.302 2.302 0 0 1-.322.317 2.269 2.269 0 0 1-.405.257c.176.082.338.178.487.287.152.106.285.229.398.37a2.134 2.134 0 0 1 .51 1.412c0 .394-.072.744-.217 1.049a2.165 2.165 0 0 1-.592.761 2.621 2.621 0 0 1-.89.469 3.64 3.64 0 0 1-1.09.158c-.399 0-.77-.053-1.114-.158a2.556 2.556 0 0 1-.884-.469 2.144 2.144 0 0 1-.598-.756 2.482 2.482 0 0 1-.211-1.054c0-.235.031-.457.094-.668.066-.211.16-.407.281-.586.121-.172.266-.326.434-.463a2.68 2.68 0 0 1 .574-.358 2.293 2.293 0 0 1-.492-.328 2.093 2.093 0 0 1-.615-.955 2.031 2.031 0 0 1-.088-.603c0-.379.064-.715.193-1.008.133-.293.314-.541.545-.744.226-.203.498-.356.814-.457.321-.106.67-.158 1.049-.158.375 0 .721.052 1.037.158.321.101.6.254.838.457.231.199.412.447.545.744.133.293.199.629.199 1.008Zm-1.213 3.885c0-.211-.035-.403-.105-.575a1.365 1.365 0 0 0-.281-.457 1.307 1.307 0 0 0-.446-.281 1.568 1.568 0 0 0-.568-.1c-.215 0-.408.034-.58.1-.168.066-.313.16-.434.281a1.382 1.382 0 0 0-.281.457 1.704 1.704 0 0 0-.094.58c0 .219.034.416.1.592.066.172.162.317.287.434.121.113.266.201.434.263.172.059.365.088.58.088.203 0 .388-.031.556-.093.172-.063.321-.153.446-.27.117-.121.211-.266.281-.434.07-.171.105-.367.105-.585Zm-.181-3.833a1.38 1.38 0 0 0-.094-.521 1.291 1.291 0 0 0-.246-.41 1.188 1.188 0 0 0-.387-.258 1.294 1.294 0 0 0-.504-.094c-.183 0-.349.032-.498.094a1.097 1.097 0 0 0-.375.252 1.123 1.123 0 0 0-.234.404c-.055.16-.082.338-.082.533 0 .192.027.368.082.528.055.156.137.289.246.398.105.114.232.201.381.264.148.062.314.094.498.094.183 0 .349-.032.498-.094a1.154 1.154 0 0 0 .627-.662 1.54 1.54 0 0 0 .088-.528Z"
              className="188"
            />
            <path
              d="M740.889 834h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V834Zm4.552-1.154c.485 0 .897-.055 1.237-.164.34-.11.619-.266.838-.469.234-.223.406-.477.515-.762.11-.289.18-.599.211-.931v-.03a1.989 1.989 0 0 1-.662.492c-.141.067-.297.12-.469.159a2.46 2.46 0 0 1-.556.058c-.414 0-.776-.078-1.084-.234a2.24 2.24 0 0 1-.762-.627 2.738 2.738 0 0 1-.463-.914 3.827 3.827 0 0 1-.152-1.084c0-.41.06-.795.181-1.154a2.91 2.91 0 0 1 .539-.956 2.53 2.53 0 0 1 .862-.638c.344-.16.734-.24 1.172-.24.441 0 .832.084 1.172.252.343.167.634.396.873.685.25.313.439.691.568 1.137.129.441.193.906.193 1.394v.492a7.72 7.72 0 0 1-.234 1.922 3.89 3.89 0 0 1-.826 1.6c-.321.375-.742.67-1.266.885-.519.215-1.146.322-1.881.322h-.117v-1.195h.111Zm1.413-2.754a1.4 1.4 0 0 0 .867-.293c.121-.09.226-.195.316-.317a1.79 1.79 0 0 0 .229-.404v-.486c0-.34-.039-.641-.118-.903a2.13 2.13 0 0 0-.298-.656 1.317 1.317 0 0 0-.452-.398 1.126 1.126 0 0 0-.55-.141c-.219 0-.414.049-.586.147a1.235 1.235 0 0 0-.422.386 1.87 1.87 0 0 0-.27.58 2.759 2.759 0 0 0-.006 1.366c.055.215.141.406.258.574.114.164.254.297.422.398.172.098.375.147.61.147Zm6.14-.99h.838c.25 0 .469-.034.656-.1a1.23 1.23 0 0 0 .463-.293c.113-.109.199-.244.258-.404.062-.164.094-.34.094-.528 0-.203-.03-.384-.088-.545a1.102 1.102 0 0 0-.246-.41 1.138 1.138 0 0 0-.416-.246 1.704 1.704 0 0 0-.569-.088c-.191 0-.369.03-.533.088a1.198 1.198 0 0 0-.703.621c-.066.149-.1.315-.1.498h-1.4c0-.34.068-.652.205-.937a2.3 2.3 0 0 1 .568-.744c.243-.207.528-.369.856-.487a3.258 3.258 0 0 1 1.09-.175c.402 0 .771.052 1.107.158.34.101.629.254.867.457a2.1 2.1 0 0 1 .563.762c.133.3.199.65.199 1.048 0 .176-.027.352-.082.528a1.96 1.96 0 0 1-.234.509 2.264 2.264 0 0 1-.961.809c.254.086.469.199.644.34.18.137.326.291.44.463.113.176.195.365.246.568.051.199.076.406.076.621 0 .399-.074.754-.223 1.067a2.222 2.222 0 0 1-.597.779 2.706 2.706 0 0 1-.914.492 3.766 3.766 0 0 1-1.131.164c-.367 0-.721-.051-1.061-.152a2.673 2.673 0 0 1-.896-.457 2.308 2.308 0 0 1-.621-.75 2.286 2.286 0 0 1-.229-1.049h1.401c0 .187.033.361.099.521.07.157.17.29.299.399.125.113.273.201.445.264.176.062.369.093.58.093.227 0 .43-.029.61-.088.183-.062.338-.154.463-.275.121-.113.213-.254.275-.422.066-.172.1-.367.1-.586a1.61 1.61 0 0 0-.112-.633 1.135 1.135 0 0 0-.322-.439 1.393 1.393 0 0 0-.51-.252 2.264 2.264 0 0 0-.656-.088h-.838v-1.101Z"
              className="193"
            />
            <path
              d="M743.529 862h-5.724v-.973l2.777-3.023c.23-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.554-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.424 6.424 0 0 1-.557.744c-.21.25-.441.508-.691.774l-1.898 2.027h3.972V862Zm5.567 0h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V862Zm8.021-3.041h1.072v1.137h-1.072V862h-1.4v-1.904h-3.692l-.035-.862 3.686-5.765h1.441v5.49Zm-3.697 0h2.297v-3.615l-.164.304-2.133 3.311Z"
              className="214"
            />
            <path
              d="M732.529 873h-5.724v-.973l2.777-3.023c.23-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.554-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.424 6.424 0 0 1-.557.744c-.21.25-.441.508-.691.774l-1.898 2.027h3.972V873Zm5.567 0h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V873Zm3.627-4.23.457-4.301h4.588v1.242h-3.422l-.223 2.045c.141-.082.324-.16.551-.235.23-.074.494-.111.791-.111.402 0 .762.067 1.078.199.32.133.592.323.814.569.219.25.387.552.504.908.118.352.176.748.176 1.189 0 .391-.057.76-.17 1.108a2.437 2.437 0 0 1-.51.902 2.356 2.356 0 0 1-.861.61c-.348.148-.758.222-1.23.222-.36 0-.704-.051-1.032-.152a2.663 2.663 0 0 1-.873-.469 2.463 2.463 0 0 1-.627-.756 2.545 2.545 0 0 1-.275-1.049h1.365c.051.418.203.739.457.961.258.223.586.334.985.334.234 0 .437-.043.609-.129.172-.086.316-.207.434-.363a1.63 1.63 0 0 0 .246-.551c.054-.218.082-.455.082-.709 0-.246-.033-.47-.1-.673a1.49 1.49 0 0 0-.287-.54 1.283 1.283 0 0 0-.48-.351 1.621 1.621 0 0 0-.668-.129c-.168 0-.315.014-.44.041a1.46 1.46 0 0 0-.592.27 2.535 2.535 0 0 0-.228.193l-1.119-.275Z"
              className="215"
            />
            <path
              d="M696.529 881h-5.724v-.973l2.777-3.023c.23-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.554-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.424 6.424 0 0 1-.557.744c-.21.25-.441.508-.691.774l-1.898 2.027h3.972V881Zm5.567 0h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V881Zm7.599-8.572v1.189h-.093c-.465 0-.87.065-1.213.194a2.382 2.382 0 0 0-1.418 1.341 3.507 3.507 0 0 0-.241 1.02c.094-.106.204-.207.329-.305.125-.101.263-.191.416-.269.144-.075.304-.133.48-.176.176-.047.361-.07.557-.07.414 0 .773.078 1.078.234.308.156.562.367.762.633.203.265.351.57.445.914.098.344.146.701.146 1.072 0 .406-.062.787-.187 1.143a2.673 2.673 0 0 1-.533.92c-.239.265-.53.474-.873.627-.34.148-.729.222-1.166.222-.45 0-.85-.086-1.202-.258a2.64 2.64 0 0 1-.89-.697 3.137 3.137 0 0 1-.586-1.072 4.248 4.248 0 0 1-.199-1.307v-.58c0-.687.088-1.342.263-1.963a3.95 3.95 0 0 1 .891-1.611 3.473 3.473 0 0 1 1.301-.891c.515-.207 1.105-.31 1.769-.31h.164Zm-1.529 4.06c-.168 0-.328.026-.48.076a1.668 1.668 0 0 0-.422.211c-.118.09-.223.194-.317.311a1.71 1.71 0 0 0-.234.393v.433c0 .34.037.639.111.897.078.257.184.472.317.644.132.172.287.303.463.393.175.09.363.134.562.134.219 0 .414-.042.586-.128.172-.09.318-.211.439-.364.121-.156.213-.34.276-.55.062-.215.094-.448.094-.698 0-.238-.032-.463-.094-.674a1.716 1.716 0 0 0-.264-.562 1.24 1.24 0 0 0-.439-.375 1.226 1.226 0 0 0-.598-.141Z"
              className="216"
            />
            <path
              d="M630.889 873h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V873Zm4.552-1.154c.485 0 .897-.055 1.237-.164.34-.11.619-.266.838-.469.234-.223.406-.477.515-.762.11-.289.18-.599.211-.931v-.03a1.989 1.989 0 0 1-.662.492c-.141.067-.297.12-.469.159a2.46 2.46 0 0 1-.556.058c-.414 0-.776-.078-1.084-.234a2.24 2.24 0 0 1-.762-.627 2.738 2.738 0 0 1-.463-.914 3.827 3.827 0 0 1-.152-1.084c0-.41.06-.795.181-1.154a2.91 2.91 0 0 1 .539-.956 2.53 2.53 0 0 1 .862-.638c.344-.16.734-.24 1.172-.24.441 0 .832.084 1.172.252.343.167.634.396.873.685.25.313.439.691.568 1.137.129.441.193.906.193 1.394v.492a7.72 7.72 0 0 1-.234 1.922 3.89 3.89 0 0 1-.826 1.6c-.321.375-.742.67-1.266.885-.519.215-1.146.322-1.881.322h-.117v-1.195h.111Zm1.413-2.754a1.4 1.4 0 0 0 .867-.293c.121-.09.226-.195.316-.317a1.79 1.79 0 0 0 .229-.404v-.486c0-.34-.039-.641-.118-.903a2.13 2.13 0 0 0-.298-.656 1.317 1.317 0 0 0-.452-.398 1.126 1.126 0 0 0-.55-.141c-.219 0-.414.049-.586.147a1.235 1.235 0 0 0-.422.386 1.87 1.87 0 0 0-.27.58 2.759 2.759 0 0 0-.006 1.366c.055.215.141.406.258.574.114.164.254.297.422.398.172.098.375.147.61.147Zm5.794 2.754c.485 0 .897-.055 1.237-.164.34-.11.619-.266.838-.469.234-.223.406-.477.515-.762.11-.289.18-.599.211-.931v-.03a1.989 1.989 0 0 1-.662.492c-.141.067-.297.12-.469.159a2.46 2.46 0 0 1-.556.058c-.414 0-.776-.078-1.084-.234a2.24 2.24 0 0 1-.762-.627 2.738 2.738 0 0 1-.463-.914 3.827 3.827 0 0 1-.152-1.084c0-.41.06-.795.181-1.154a2.91 2.91 0 0 1 .539-.956 2.53 2.53 0 0 1 .862-.638c.344-.16.734-.24 1.172-.24.441 0 .832.084 1.172.252.343.167.634.396.873.685.25.313.439.691.568 1.137.129.441.193.906.193 1.394v.492a7.72 7.72 0 0 1-.234 1.922 3.89 3.89 0 0 1-.826 1.6c-.321.375-.742.67-1.266.885-.519.215-1.146.322-1.881.322h-.117v-1.195h.111Zm1.413-2.754a1.4 1.4 0 0 0 .867-.293c.121-.09.226-.195.316-.317a1.79 1.79 0 0 0 .229-.404v-.486c0-.34-.039-.641-.118-.903a2.13 2.13 0 0 0-.298-.656 1.317 1.317 0 0 0-.452-.398 1.126 1.126 0 0 0-.55-.141c-.219 0-.414.049-.586.147a1.235 1.235 0 0 0-.422.386 1.87 1.87 0 0 0-.27.58 2.759 2.759 0 0 0-.006 1.366c.055.215.141.406.258.574.114.164.254.297.422.398.172.098.375.147.61.147Z"
              className="199"
            />
            <path
              d="M600.889 850h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V850Zm4.552-1.154c.485 0 .897-.055 1.237-.164.34-.11.619-.266.838-.469.234-.223.406-.477.515-.762.11-.289.18-.599.211-.931v-.03a1.989 1.989 0 0 1-.662.492c-.141.067-.297.12-.469.159a2.46 2.46 0 0 1-.556.058c-.414 0-.776-.078-1.084-.234a2.24 2.24 0 0 1-.762-.627 2.738 2.738 0 0 1-.463-.914 3.827 3.827 0 0 1-.152-1.084c0-.41.06-.795.181-1.154a2.91 2.91 0 0 1 .539-.956 2.53 2.53 0 0 1 .862-.638c.344-.16.734-.24 1.172-.24.441 0 .832.084 1.172.252.343.167.634.396.873.685.25.313.439.691.568 1.137.129.441.193.906.193 1.394v.492a7.72 7.72 0 0 1-.234 1.922 3.89 3.89 0 0 1-.826 1.6c-.321.375-.742.67-1.266.885-.519.215-1.146.322-1.881.322h-.117v-1.195h.111Zm1.413-2.754a1.4 1.4 0 0 0 .867-.293c.121-.09.226-.195.316-.317a1.79 1.79 0 0 0 .229-.404v-.486c0-.34-.039-.641-.118-.903a2.13 2.13 0 0 0-.298-.656 1.317 1.317 0 0 0-.452-.398 1.126 1.126 0 0 0-.55-.141c-.219 0-.414.049-.586.147a1.235 1.235 0 0 0-.422.386 1.87 1.87 0 0 0-.27.58 2.759 2.759 0 0 0-.006 1.366c.055.215.141.406.258.574.114.164.254.297.422.398.172.098.375.147.61.147Zm9.966-2.373c0 .258-.043.498-.129.72a1.92 1.92 0 0 1-.351.598 2.302 2.302 0 0 1-.322.317 2.269 2.269 0 0 1-.405.257c.176.082.338.178.487.287.152.106.285.229.398.37a2.134 2.134 0 0 1 .51 1.412c0 .394-.072.744-.217 1.049a2.165 2.165 0 0 1-.592.761 2.621 2.621 0 0 1-.89.469 3.64 3.64 0 0 1-1.09.158c-.399 0-.77-.053-1.114-.158a2.556 2.556 0 0 1-.884-.469 2.144 2.144 0 0 1-.598-.756 2.482 2.482 0 0 1-.211-1.054c0-.235.031-.457.094-.668.066-.211.16-.407.281-.586.121-.172.266-.326.434-.463a2.68 2.68 0 0 1 .574-.358 2.293 2.293 0 0 1-.492-.328 2.093 2.093 0 0 1-.615-.955 2.031 2.031 0 0 1-.088-.603c0-.379.064-.715.193-1.008.133-.293.314-.541.545-.744.226-.203.498-.356.814-.457.321-.106.67-.158 1.049-.158.375 0 .721.052 1.037.158.321.101.6.254.838.457.231.199.412.447.545.744.133.293.199.629.199 1.008Zm-1.213 3.885c0-.211-.035-.403-.105-.575a1.365 1.365 0 0 0-.281-.457 1.307 1.307 0 0 0-.446-.281 1.568 1.568 0 0 0-.568-.1c-.215 0-.408.034-.58.1-.168.066-.313.16-.434.281a1.382 1.382 0 0 0-.281.457 1.704 1.704 0 0 0-.094.58c0 .219.034.416.1.592.066.172.162.317.287.434.121.113.266.201.434.263.172.059.365.088.58.088.203 0 .388-.031.556-.093.172-.063.321-.153.446-.27.117-.121.211-.266.281-.434.07-.171.105-.367.105-.585Zm-.181-3.833a1.38 1.38 0 0 0-.094-.521 1.291 1.291 0 0 0-.246-.41 1.188 1.188 0 0 0-.387-.258 1.294 1.294 0 0 0-.504-.094c-.183 0-.349.032-.498.094a1.097 1.097 0 0 0-.375.252 1.123 1.123 0 0 0-.234.404c-.055.16-.082.338-.082.533 0 .192.027.368.082.528.055.156.137.289.246.398.105.114.232.201.381.264.148.062.314.094.498.094.183 0 .349-.032.498-.094a1.154 1.154 0 0 0 .627-.662 1.54 1.54 0 0 0 .088-.528Z"
              className="198"
            />
            <path
              d="M648.889 846h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V846Zm4.552-1.154c.485 0 .897-.055 1.237-.164.34-.11.619-.266.838-.469.234-.223.406-.477.515-.762.11-.289.18-.599.211-.931v-.03a1.989 1.989 0 0 1-.662.492c-.141.067-.297.12-.469.159a2.46 2.46 0 0 1-.556.058c-.414 0-.776-.078-1.084-.234a2.24 2.24 0 0 1-.762-.627 2.738 2.738 0 0 1-.463-.914 3.827 3.827 0 0 1-.152-1.084c0-.41.06-.795.181-1.154a2.91 2.91 0 0 1 .539-.956 2.53 2.53 0 0 1 .862-.638c.344-.16.734-.24 1.172-.24.441 0 .832.084 1.172.252.343.167.634.396.873.685.25.313.439.691.568 1.137.129.441.193.906.193 1.394v.492a7.72 7.72 0 0 1-.234 1.922 3.89 3.89 0 0 1-.826 1.6c-.321.375-.742.67-1.266.885-.519.215-1.146.322-1.881.322h-.117v-1.195h.111Zm1.413-2.754a1.4 1.4 0 0 0 .867-.293c.121-.09.226-.195.316-.317a1.79 1.79 0 0 0 .229-.404v-.486c0-.34-.039-.641-.118-.903a2.13 2.13 0 0 0-.298-.656 1.317 1.317 0 0 0-.452-.398 1.126 1.126 0 0 0-.55-.141c-.219 0-.414.049-.586.147a1.235 1.235 0 0 0-.422.386 1.87 1.87 0 0 0-.27.58 2.759 2.759 0 0 0-.006 1.366c.055.215.141.406.258.574.114.164.254.297.422.398.172.098.375.147.61.147Zm10.16-3.838-3.41 7.746h-1.477l3.41-7.359h-4.424v-1.172h5.901v.785Z"
              className="197"
            />
            <path
              d="M683.889 837h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V837Zm4.552-1.154c.485 0 .897-.055 1.237-.164.34-.11.619-.266.838-.469.234-.223.406-.477.515-.762.11-.289.18-.599.211-.931v-.03a1.989 1.989 0 0 1-.662.492c-.141.067-.297.12-.469.159a2.46 2.46 0 0 1-.556.058c-.414 0-.776-.078-1.084-.234a2.24 2.24 0 0 1-.762-.627 2.738 2.738 0 0 1-.463-.914 3.827 3.827 0 0 1-.152-1.084c0-.41.06-.795.181-1.154a2.91 2.91 0 0 1 .539-.956 2.53 2.53 0 0 1 .862-.638c.344-.16.734-.24 1.172-.24.441 0 .832.084 1.172.252.343.167.634.396.873.685.25.313.439.691.568 1.137.129.441.193.906.193 1.394v.492a7.72 7.72 0 0 1-.234 1.922 3.89 3.89 0 0 1-.826 1.6c-.321.375-.742.67-1.266.885-.519.215-1.146.322-1.881.322h-.117v-1.195h.111Zm1.413-2.754a1.4 1.4 0 0 0 .867-.293c.121-.09.226-.195.316-.317a1.79 1.79 0 0 0 .229-.404v-.486c0-.34-.039-.641-.118-.903a2.13 2.13 0 0 0-.298-.656 1.317 1.317 0 0 0-.452-.398 1.126 1.126 0 0 0-.55-.141c-.219 0-.414.049-.586.147a1.235 1.235 0 0 0-.422.386 1.87 1.87 0 0 0-.27.58 2.759 2.759 0 0 0-.006 1.366c.055.215.141.406.258.574.114.164.254.297.422.398.172.098.375.147.61.147Zm8.841-4.664v1.189h-.093c-.465 0-.87.065-1.213.194a2.382 2.382 0 0 0-1.418 1.341 3.507 3.507 0 0 0-.241 1.02c.094-.106.204-.207.329-.305.125-.101.263-.191.416-.269.144-.075.304-.133.48-.176.176-.047.361-.07.557-.07.414 0 .773.078 1.078.234.308.156.562.367.762.633.203.265.351.57.445.914.098.344.146.701.146 1.072 0 .406-.062.787-.187 1.143a2.673 2.673 0 0 1-.533.92c-.239.265-.53.474-.873.627-.34.148-.729.222-1.166.222-.45 0-.85-.086-1.202-.258a2.64 2.64 0 0 1-.89-.697 3.137 3.137 0 0 1-.586-1.072 4.248 4.248 0 0 1-.199-1.307v-.58c0-.687.088-1.342.263-1.963a3.95 3.95 0 0 1 .891-1.611 3.473 3.473 0 0 1 1.301-.891c.515-.207 1.105-.31 1.769-.31h.164Zm-1.529 4.06c-.168 0-.328.026-.48.076a1.668 1.668 0 0 0-.422.211c-.118.09-.223.194-.317.311a1.71 1.71 0 0 0-.234.393v.433c0 .34.037.639.111.897.078.257.184.472.317.644.132.172.287.303.463.393.175.09.363.134.562.134.219 0 .414-.042.586-.128.172-.09.318-.211.439-.364.121-.156.213-.34.276-.55.062-.215.094-.448.094-.698 0-.238-.032-.463-.094-.674a1.716 1.716 0 0 0-.264-.562 1.24 1.24 0 0 0-.439-.375 1.226 1.226 0 0 0-.598-.141Z"
              className="196"
            />
            <path
              d="M642.889 805h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V805Zm4.552-1.154c.485 0 .897-.055 1.237-.164.34-.11.619-.266.838-.469.234-.223.406-.477.515-.762.11-.289.18-.599.211-.931v-.03a1.989 1.989 0 0 1-.662.492c-.141.067-.297.12-.469.159a2.46 2.46 0 0 1-.556.058c-.414 0-.776-.078-1.084-.234a2.24 2.24 0 0 1-.762-.627 2.738 2.738 0 0 1-.463-.914 3.827 3.827 0 0 1-.152-1.084c0-.41.06-.795.181-1.154a2.91 2.91 0 0 1 .539-.956 2.53 2.53 0 0 1 .862-.638c.344-.16.734-.24 1.172-.24.441 0 .832.084 1.172.252.343.167.634.396.873.685.25.313.439.691.568 1.137.129.441.193.906.193 1.394v.492a7.72 7.72 0 0 1-.234 1.922 3.89 3.89 0 0 1-.826 1.6c-.321.375-.742.67-1.266.885-.519.215-1.146.322-1.881.322h-.117v-1.195h.111Zm1.413-2.754a1.4 1.4 0 0 0 .867-.293c.121-.09.226-.195.316-.317a1.79 1.79 0 0 0 .229-.404v-.486c0-.34-.039-.641-.118-.903a2.13 2.13 0 0 0-.298-.656 1.317 1.317 0 0 0-.452-.398 1.126 1.126 0 0 0-.55-.141c-.219 0-.414.049-.586.147a1.235 1.235 0 0 0-.422.386 1.87 1.87 0 0 0-.27.58 2.759 2.759 0 0 0-.006 1.366c.055.215.141.406.258.574.114.164.254.297.422.398.172.098.375.147.61.147Zm4.869-.322.457-4.301h4.588v1.242h-3.422l-.223 2.045c.141-.082.324-.16.551-.235.23-.074.494-.111.791-.111.402 0 .762.067 1.078.199.32.133.592.323.814.569.219.25.387.552.504.908.118.352.176.748.176 1.189 0 .391-.057.76-.17 1.108a2.437 2.437 0 0 1-.51.902 2.356 2.356 0 0 1-.861.61c-.348.148-.758.222-1.23.222-.36 0-.704-.051-1.032-.152a2.663 2.663 0 0 1-.873-.469 2.463 2.463 0 0 1-.627-.756 2.545 2.545 0 0 1-.275-1.049h1.365c.051.418.203.739.457.961.258.223.586.334.985.334.234 0 .437-.043.609-.129.172-.086.316-.207.434-.363a1.63 1.63 0 0 0 .246-.551c.054-.218.082-.455.082-.709 0-.246-.033-.47-.1-.673a1.49 1.49 0 0 0-.287-.54 1.283 1.283 0 0 0-.48-.351 1.621 1.621 0 0 0-.668-.129c-.168 0-.315.014-.44.041a1.46 1.46 0 0 0-.592.27 2.535 2.535 0 0 0-.228.193l-1.119-.275Z"
              className="195"
            />
            <path
              d="M530.529 865h-5.724v-.973l2.777-3.023c.23-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.554-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.424 6.424 0 0 1-.557.744c-.21.25-.441.508-.691.774l-1.898 2.027h3.972V865Zm7.207 0h-5.724v-.973l2.777-3.023c.231-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.555-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.528 6.528 0 0 1-.556.744c-.211.25-.442.508-.692.774l-1.898 2.027h3.972V865Zm6.381-3.041h1.072v1.137h-1.072V865h-1.4v-1.904h-3.692l-.035-.862 3.686-5.765h1.441v5.49Zm-3.697 0h2.297v-3.615l-.164.304-2.133 3.311Z"
              className="224"
            />
            <path
              d="M589.529 879h-5.724v-.973l2.777-3.023c.23-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.554-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.424 6.424 0 0 1-.557.744c-.21.25-.441.508-.691.774l-1.898 2.027h3.972V879Zm7.248-3.252c0 .547-.064 1.031-.193 1.453a2.875 2.875 0 0 1-.545 1.049 2.237 2.237 0 0 1-.867.656c-.34.145-.727.217-1.16.217-.43 0-.817-.072-1.16-.217a2.286 2.286 0 0 1-.873-.656 2.877 2.877 0 0 1-.557-1.049 5.121 5.121 0 0 1-.188-1.453v-2.021c0-.547.063-1.03.188-1.448.129-.422.312-.777.551-1.066.238-.285.527-.5.867-.645.344-.148.73-.222 1.16-.222.434 0 .82.074 1.16.222.344.145.637.36.879.645.234.289.416.644.545 1.066.129.418.193.901.193 1.448v2.021Zm-4.136-.498 2.713-2.057a3.226 3.226 0 0 0-.129-.791 1.447 1.447 0 0 0-.287-.545 1.034 1.034 0 0 0-.405-.281 1.435 1.435 0 0 0-.533-.094c-.215 0-.404.038-.568.112a1.05 1.05 0 0 0-.411.328 1.656 1.656 0 0 0-.287.639 3.94 3.94 0 0 0-.093.914v1.775Zm2.724.732v-1.711l-2.713 2.045c.02.27.061.508.123.715.067.207.155.379.264.516.109.148.244.26.404.334.164.074.354.111.569.111.211 0 .396-.035.556-.105a1.14 1.14 0 0 0 .411-.323c.128-.164.224-.378.287-.644.066-.266.099-.578.099-.938Zm8.619-.234c0 .547-.064 1.031-.193 1.453a2.875 2.875 0 0 1-.545 1.049 2.237 2.237 0 0 1-.867.656c-.34.145-.727.217-1.16.217-.43 0-.817-.072-1.16-.217a2.286 2.286 0 0 1-.873-.656 2.877 2.877 0 0 1-.557-1.049 5.121 5.121 0 0 1-.188-1.453v-2.021c0-.547.063-1.03.188-1.448.129-.422.312-.777.551-1.066.238-.285.527-.5.867-.645.344-.148.73-.222 1.16-.222.434 0 .82.074 1.16.222.344.145.637.36.879.645.234.289.416.644.545 1.066.129.418.193.901.193 1.448v2.021Zm-4.136-.498 2.713-2.057a3.226 3.226 0 0 0-.129-.791 1.433 1.433 0 0 0-.287-.545 1.034 1.034 0 0 0-.405-.281 1.435 1.435 0 0 0-.533-.094c-.215 0-.404.038-.568.112a1.04 1.04 0 0 0-.41.328 1.642 1.642 0 0 0-.288.639 3.94 3.94 0 0 0-.093.914v1.775Zm2.724.732v-1.711l-2.713 2.045c.02.27.061.508.123.715.067.207.155.379.264.516.109.148.244.26.404.334.164.074.354.111.569.111.211 0 .396-.035.556-.105a1.14 1.14 0 0 0 .411-.323c.128-.164.224-.378.287-.644.066-.266.099-.578.099-.938Z"
              className="200"
            />
            <path
              d="M778.889 833h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V833Zm4.552-1.154c.485 0 .897-.055 1.237-.164.34-.11.619-.266.838-.469.234-.223.406-.477.515-.762.11-.289.18-.599.211-.931v-.03a1.989 1.989 0 0 1-.662.492c-.141.067-.297.12-.469.159a2.46 2.46 0 0 1-.556.058c-.414 0-.776-.078-1.084-.234a2.24 2.24 0 0 1-.762-.627 2.738 2.738 0 0 1-.463-.914 3.827 3.827 0 0 1-.152-1.084c0-.41.06-.795.181-1.154a2.91 2.91 0 0 1 .539-.956 2.53 2.53 0 0 1 .862-.638c.344-.16.734-.24 1.172-.24.441 0 .832.084 1.172.252.343.167.634.396.873.685.25.313.439.691.568 1.137.129.441.193.906.193 1.394v.492a7.72 7.72 0 0 1-.234 1.922 3.89 3.89 0 0 1-.826 1.6c-.321.375-.742.67-1.266.885-.519.215-1.146.322-1.881.322h-.117v-1.195h.111Zm1.413-2.754a1.4 1.4 0 0 0 .867-.293c.121-.09.226-.195.316-.317a1.79 1.79 0 0 0 .229-.404v-.486c0-.34-.039-.641-.118-.903a2.13 2.13 0 0 0-.298-.656 1.317 1.317 0 0 0-.452-.398 1.126 1.126 0 0 0-.55-.141c-.219 0-.414.049-.586.147a1.235 1.235 0 0 0-.422.386 1.87 1.87 0 0 0-.27.58 2.759 2.759 0 0 0-.006 1.366c.055.215.141.406.258.574.114.164.254.297.422.398.172.098.375.147.61.147ZM794.943 833h-5.724v-.973l2.777-3.023c.231-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.342 1.342 0 0 0-.527-.099c-.25 0-.467.035-.651.105a1.22 1.22 0 0 0-.457.299 1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.555-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.205.498-.358.744a6.528 6.528 0 0 1-.556.744c-.211.25-.442.508-.692.774l-1.898 2.027h3.972V833Z"
              className="192"
            />
            <path
              d="M822.889 853h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V853Zm4.552-1.154c.485 0 .897-.055 1.237-.164.34-.11.619-.266.838-.469.234-.223.406-.477.515-.762.11-.289.18-.599.211-.931v-.03a1.989 1.989 0 0 1-.662.492c-.141.067-.297.12-.469.159a2.46 2.46 0 0 1-.556.058c-.414 0-.776-.078-1.084-.234a2.24 2.24 0 0 1-.762-.627 2.738 2.738 0 0 1-.463-.914 3.827 3.827 0 0 1-.152-1.084c0-.41.06-.795.181-1.154a2.91 2.91 0 0 1 .539-.956 2.53 2.53 0 0 1 .862-.638c.344-.16.734-.24 1.172-.24.441 0 .832.084 1.172.252.343.167.634.396.873.685.25.313.439.691.568 1.137.129.441.193.906.193 1.394v.492a7.72 7.72 0 0 1-.234 1.922 3.89 3.89 0 0 1-.826 1.6c-.321.375-.742.67-1.266.885-.519.215-1.146.322-1.881.322h-.117v-1.195h.111Zm1.413-2.754a1.4 1.4 0 0 0 .867-.293c.121-.09.226-.195.316-.317a1.79 1.79 0 0 0 .229-.404v-.486c0-.34-.039-.641-.118-.903a2.13 2.13 0 0 0-.298-.656 1.317 1.317 0 0 0-.452-.398 1.126 1.126 0 0 0-.55-.141c-.219 0-.414.049-.586.147a1.235 1.235 0 0 0-.422.386 1.87 1.87 0 0 0-.27.58 2.759 2.759 0 0 0-.006 1.366c.055.215.141.406.258.574.114.164.254.297.422.398.172.098.375.147.61.147Zm8.449 3.908h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V853Z"
              className="191"
            />
            <path
              d="M747.889 793h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V793Zm4.552-1.154c.485 0 .897-.055 1.237-.164.34-.11.619-.266.838-.469.234-.223.406-.477.515-.762.11-.289.18-.599.211-.931v-.03a1.989 1.989 0 0 1-.662.492c-.141.067-.297.12-.469.159a2.46 2.46 0 0 1-.556.058c-.414 0-.776-.078-1.084-.234a2.24 2.24 0 0 1-.762-.627 2.738 2.738 0 0 1-.463-.914 3.827 3.827 0 0 1-.152-1.084c0-.41.06-.795.181-1.154a2.91 2.91 0 0 1 .539-.956 2.53 2.53 0 0 1 .862-.638c.344-.16.734-.24 1.172-.24.441 0 .832.084 1.172.252.343.167.634.396.873.685.25.313.439.691.568 1.137.129.441.193.906.193 1.394v.492a7.72 7.72 0 0 1-.234 1.922 3.89 3.89 0 0 1-.826 1.6c-.321.375-.742.67-1.266.885-.519.215-1.146.322-1.881.322h-.117v-1.195h.111Zm1.413-2.754a1.4 1.4 0 0 0 .867-.293c.121-.09.226-.195.316-.317a1.79 1.79 0 0 0 .229-.404v-.486c0-.34-.039-.641-.118-.903a2.13 2.13 0 0 0-.298-.656 1.317 1.317 0 0 0-.452-.398 1.126 1.126 0 0 0-.55-.141c-.219 0-.414.049-.586.147a1.235 1.235 0 0 0-.422.386 1.87 1.87 0 0 0-.27.58 2.759 2.759 0 0 0-.006 1.366c.055.215.141.406.258.574.114.164.254.297.422.398.172.098.375.147.61.147Zm10.13.656c0 .547-.064 1.031-.193 1.453a2.875 2.875 0 0 1-.545 1.049 2.237 2.237 0 0 1-.867.656c-.34.145-.727.217-1.16.217-.43 0-.817-.072-1.16-.217a2.286 2.286 0 0 1-.873-.656 2.877 2.877 0 0 1-.557-1.049 5.121 5.121 0 0 1-.188-1.453v-2.021c0-.547.063-1.03.188-1.448.129-.422.312-.777.551-1.066.238-.285.527-.5.867-.645.344-.148.73-.222 1.16-.222.434 0 .82.074 1.16.222.344.145.637.36.879.645.234.289.416.644.545 1.066.129.418.193.901.193 1.448v2.021Zm-4.136-.498 2.713-2.057a3.226 3.226 0 0 0-.129-.791 1.433 1.433 0 0 0-.287-.545 1.034 1.034 0 0 0-.405-.281 1.435 1.435 0 0 0-.533-.094c-.215 0-.404.038-.568.112a1.04 1.04 0 0 0-.41.328 1.642 1.642 0 0 0-.288.639 3.94 3.94 0 0 0-.093.914v1.775Zm2.724.732v-1.711l-2.713 2.045c.02.27.061.508.123.715.067.207.155.379.264.516.109.148.244.26.404.334.164.074.354.111.569.111.211 0 .396-.035.556-.105a1.14 1.14 0 0 0 .411-.323c.128-.164.224-.378.287-.644.066-.266.099-.578.099-.938Z"
              className="190"
            />
            <path
              d="M710.889 785h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V785Zm8.724-6.281c0 .258-.043.498-.129.72a1.92 1.92 0 0 1-.351.598 2.302 2.302 0 0 1-.322.317 2.269 2.269 0 0 1-.405.257c.176.082.338.178.487.287.152.106.285.229.398.37a2.134 2.134 0 0 1 .51 1.412c0 .394-.072.744-.217 1.049a2.165 2.165 0 0 1-.592.761 2.621 2.621 0 0 1-.89.469 3.64 3.64 0 0 1-1.09.158c-.399 0-.77-.053-1.114-.158a2.556 2.556 0 0 1-.884-.469 2.144 2.144 0 0 1-.598-.756 2.482 2.482 0 0 1-.211-1.054c0-.235.031-.457.094-.668.066-.211.16-.407.281-.586.121-.172.266-.326.434-.463a2.68 2.68 0 0 1 .574-.358 2.293 2.293 0 0 1-.492-.328 2.093 2.093 0 0 1-.616-.955 2.064 2.064 0 0 1-.087-.603c0-.379.064-.715.193-1.008.133-.293.314-.541.545-.744.226-.203.498-.356.814-.457.321-.106.67-.158 1.049-.158.375 0 .721.052 1.037.158.321.101.6.254.838.457.231.199.412.447.545.744.133.293.199.629.199 1.008Zm-1.213 3.885c0-.211-.035-.403-.105-.575a1.365 1.365 0 0 0-.281-.457 1.307 1.307 0 0 0-.446-.281 1.572 1.572 0 0 0-.568-.1c-.215 0-.408.034-.58.1-.168.066-.313.16-.434.281a1.365 1.365 0 0 0-.281.457 1.704 1.704 0 0 0-.094.58c0 .219.034.416.1.592.066.172.162.317.287.434.121.113.266.201.434.263.172.059.365.088.58.088.203 0 .388-.031.556-.093.172-.063.321-.153.446-.27.117-.121.211-.266.281-.434.07-.171.105-.367.105-.585Zm-.181-3.833a1.38 1.38 0 0 0-.094-.521 1.291 1.291 0 0 0-.246-.41 1.188 1.188 0 0 0-.387-.258 1.294 1.294 0 0 0-.504-.094c-.183 0-.349.032-.498.094a1.097 1.097 0 0 0-.375.252 1.123 1.123 0 0 0-.234.404c-.055.16-.082.338-.082.533 0 .192.027.368.082.528.055.156.137.289.246.398.105.114.232.201.381.264.148.062.314.094.498.094.183 0 .349-.032.498-.094a1.154 1.154 0 0 0 .627-.662 1.54 1.54 0 0 0 .088-.528Zm4.429 5.075c.485 0 .897-.055 1.237-.164.34-.11.619-.266.838-.469.234-.223.406-.477.515-.762.11-.289.18-.599.211-.931v-.03a1.989 1.989 0 0 1-.662.492c-.141.067-.297.12-.469.159a2.46 2.46 0 0 1-.556.058c-.414 0-.776-.078-1.084-.234a2.24 2.24 0 0 1-.762-.627 2.738 2.738 0 0 1-.463-.914 3.827 3.827 0 0 1-.152-1.084c0-.41.06-.795.181-1.154a2.91 2.91 0 0 1 .539-.956 2.53 2.53 0 0 1 .862-.638c.344-.16.734-.24 1.172-.24.441 0 .832.084 1.172.252.343.167.634.396.873.685.25.313.439.691.568 1.137.129.441.193.906.193 1.394v.492a7.72 7.72 0 0 1-.234 1.922 3.89 3.89 0 0 1-.826 1.6c-.321.375-.742.67-1.266.885-.519.215-1.146.322-1.881.322h-.117v-1.195h.111Zm1.413-2.754a1.4 1.4 0 0 0 .867-.293c.121-.09.226-.195.316-.317a1.79 1.79 0 0 0 .229-.404v-.486c0-.34-.039-.641-.118-.903a2.13 2.13 0 0 0-.298-.656 1.317 1.317 0 0 0-.452-.398 1.126 1.126 0 0 0-.55-.141c-.219 0-.414.049-.586.147a1.235 1.235 0 0 0-.422.386 1.87 1.87 0 0 0-.27.58 2.759 2.759 0 0 0-.006 1.366c.055.215.141.406.258.574.114.164.254.297.422.398.172.098.375.147.61.147Z"
              className="189"
            />
            <path
              d="M425.529 874h-5.724v-.973l2.777-3.023c.23-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.554-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.424 6.424 0 0 1-.557.744c-.21.25-.441.508-.691.774l-1.898 2.027h3.972V874Zm7.207 0h-5.724v-.973l2.777-3.023c.231-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.555-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.528 6.528 0 0 1-.556.744c-.211.25-.442.508-.692.774l-1.898 2.027h3.972V874Zm7.278-7.746-3.41 7.746h-1.477l3.41-7.359h-4.424v-1.172h5.901v.785Z"
              className="227"
            />
            <path
              d="M404.529 817h-5.724v-.973l2.777-3.023c.23-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.554-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.424 6.424 0 0 1-.557.744c-.21.25-.441.508-.691.774l-1.898 2.027h3.972V817Zm7.207 0h-5.724v-.973l2.777-3.023c.231-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.555-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.528 6.528 0 0 1-.556.744c-.211.25-.442.508-.692.774l-1.898 2.027h3.972V817Zm5.959-8.572v1.189h-.093c-.465 0-.87.065-1.213.194a2.382 2.382 0 0 0-1.418 1.341 3.507 3.507 0 0 0-.241 1.02c.094-.106.204-.207.329-.305.125-.101.263-.191.416-.269.144-.075.304-.133.48-.176.176-.047.361-.07.557-.07.414 0 .773.078 1.078.234.308.156.562.367.762.633.203.265.351.57.445.914.098.344.146.701.146 1.072 0 .406-.062.787-.187 1.143a2.673 2.673 0 0 1-.533.92c-.239.265-.53.474-.873.627-.34.148-.729.222-1.166.222-.45 0-.85-.086-1.202-.258a2.64 2.64 0 0 1-.89-.697 3.137 3.137 0 0 1-.586-1.072 4.248 4.248 0 0 1-.199-1.307v-.58c0-.687.088-1.342.263-1.963a3.95 3.95 0 0 1 .891-1.611 3.473 3.473 0 0 1 1.301-.891c.515-.207 1.105-.31 1.769-.31h.164Zm-1.529 4.06c-.168 0-.328.026-.48.076a1.668 1.668 0 0 0-.422.211c-.118.09-.223.194-.317.311a1.71 1.71 0 0 0-.234.393v.433c0 .34.037.639.111.897.078.257.184.472.317.644.132.172.287.303.463.393.175.09.363.134.562.134.219 0 .414-.042.586-.128.172-.09.318-.211.439-.364.121-.156.213-.34.276-.55.062-.215.094-.448.094-.698 0-.238-.032-.463-.094-.674a1.716 1.716 0 0 0-.264-.562 1.24 1.24 0 0 0-.439-.375 1.226 1.226 0 0 0-.598-.141Z"
              className="226"
            />
            <path
              d="M314.529 882h-5.724v-.973l2.777-3.023c.23-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.554-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.424 6.424 0 0 1-.557.744c-.21.25-.441.508-.691.774l-1.898 2.027h3.972V882Zm3.258-4.898h.838c.25 0 .469-.034.656-.1a1.23 1.23 0 0 0 .463-.293c.113-.109.199-.244.258-.404.062-.164.094-.34.094-.528 0-.203-.03-.384-.088-.545a1.102 1.102 0 0 0-.246-.41 1.138 1.138 0 0 0-.416-.246 1.704 1.704 0 0 0-.569-.088c-.191 0-.369.03-.533.088a1.198 1.198 0 0 0-.703.621c-.066.149-.1.315-.1.498h-1.4c0-.34.068-.652.205-.937a2.3 2.3 0 0 1 .568-.744c.243-.207.528-.369.856-.487a3.258 3.258 0 0 1 1.09-.175c.402 0 .771.052 1.107.158.34.101.629.254.867.457a2.1 2.1 0 0 1 .563.762c.133.3.199.65.199 1.048 0 .176-.027.352-.082.528a1.96 1.96 0 0 1-.234.509 2.264 2.264 0 0 1-.961.809c.254.086.469.199.644.34.18.137.326.291.44.463.113.176.195.365.246.568.051.199.076.406.076.621 0 .399-.074.754-.223 1.067a2.222 2.222 0 0 1-.597.779 2.706 2.706 0 0 1-.914.492 3.766 3.766 0 0 1-1.131.164c-.367 0-.721-.051-1.061-.152a2.673 2.673 0 0 1-.896-.457 2.308 2.308 0 0 1-.621-.75 2.286 2.286 0 0 1-.229-1.049h1.401c0 .187.033.361.099.521.07.157.17.29.299.399.125.113.273.201.445.264.176.062.369.093.58.093.227 0 .43-.029.61-.088.183-.062.338-.154.463-.275a1.09 1.09 0 0 0 .275-.422c.066-.172.1-.367.1-.586a1.61 1.61 0 0 0-.112-.633 1.135 1.135 0 0 0-.322-.439 1.401 1.401 0 0 0-.51-.252 2.264 2.264 0 0 0-.656-.088h-.838v-1.101Zm11.197 1.646c0 .547-.064 1.031-.193 1.453a2.875 2.875 0 0 1-.545 1.049 2.237 2.237 0 0 1-.867.656c-.34.145-.727.217-1.16.217-.43 0-.817-.072-1.16-.217a2.286 2.286 0 0 1-.873-.656 2.877 2.877 0 0 1-.557-1.049 5.121 5.121 0 0 1-.188-1.453v-2.021c0-.547.063-1.03.188-1.448.129-.422.312-.777.551-1.066.238-.285.527-.5.867-.645.344-.148.73-.222 1.16-.222.434 0 .82.074 1.16.222.344.145.637.36.879.645.234.289.416.644.545 1.066.129.418.193.901.193 1.448v2.021Zm-4.136-.498 2.713-2.057a3.226 3.226 0 0 0-.129-.791 1.433 1.433 0 0 0-.287-.545 1.034 1.034 0 0 0-.405-.281 1.435 1.435 0 0 0-.533-.094c-.215 0-.404.038-.568.112a1.04 1.04 0 0 0-.41.328 1.642 1.642 0 0 0-.288.639 3.94 3.94 0 0 0-.093.914v1.775Zm2.724.732v-1.711l-2.713 2.045c.02.27.061.508.123.715.067.207.155.379.264.516.109.148.244.26.404.334.164.074.354.111.569.111.211 0 .396-.035.556-.105a1.14 1.14 0 0 0 .411-.323c.128-.164.224-.378.287-.644.066-.266.099-.578.099-.938Z"
              className="230"
            />
            <path
              d="M131.633 815h-5.725v-.973l2.778-3.023c.23-.254.423-.481.58-.68a5.2 5.2 0 0 0 .38-.556c.094-.168.161-.325.2-.469.043-.149.064-.297.064-.445 0-.2-.029-.381-.088-.545a1.141 1.141 0 0 0-.258-.422 1.215 1.215 0 0 0-.41-.276 1.342 1.342 0 0 0-.527-.099c-.25 0-.467.035-.65.105-.184.071-.336.17-.457.299a1.337 1.337 0 0 0-.282.498c-.062.191-.093.41-.093.656h-1.407c0-.371.069-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.555-.441.914-.586a3.27 3.27 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.612.289.838.504.223.215.393.473.51.774.117.296.176.625.176.984 0 .269-.045.531-.135.785-.086.25-.205.498-.357.744a6.541 6.541 0 0 1-.557.744c-.211.25-.441.508-.691.774l-1.899 2.027h3.973V815Zm7.084-6.281c0 .258-.043.498-.129.72a1.904 1.904 0 0 1-.352.598 2.249 2.249 0 0 1-.726.574c.176.082.338.178.486.287.152.106.285.229.399.37a2.134 2.134 0 0 1 .509 1.412c0 .394-.072.744-.216 1.049a2.165 2.165 0 0 1-.592.761 2.617 2.617 0 0 1-.891.469 3.635 3.635 0 0 1-1.09.158c-.398 0-.769-.053-1.113-.158a2.552 2.552 0 0 1-.885-.469 2.13 2.13 0 0 1-.597-.756 2.482 2.482 0 0 1-.211-1.054c0-.235.031-.457.093-.668.067-.211.16-.407.282-.586.121-.172.265-.326.433-.463a2.68 2.68 0 0 1 .574-.358 2.157 2.157 0 0 1-.861-.755 2.074 2.074 0 0 1-.334-1.131c0-.379.065-.715.193-1.008a2.181 2.181 0 0 1 1.36-1.201 3.32 3.32 0 0 1 1.049-.158c.375 0 .72.052 1.037.158.32.101.599.254.838.457.23.199.412.447.545.744.132.293.199.629.199 1.008Zm-1.213 3.885c0-.211-.035-.403-.106-.575a1.365 1.365 0 0 0-.281-.457 1.303 1.303 0 0 0-.445-.281 1.572 1.572 0 0 0-.568-.1c-.215 0-.409.034-.581.1-.168.066-.312.16-.433.281a1.365 1.365 0 0 0-.281.457 1.68 1.68 0 0 0-.094.58c0 .219.033.416.099.592.067.172.163.317.288.434.121.113.265.201.433.263.172.059.365.088.58.088a1.6 1.6 0 0 0 .557-.093c.172-.063.32-.153.445-.27.117-.121.211-.266.281-.434.071-.171.106-.367.106-.585Zm-.182-3.833a1.4 1.4 0 0 0-.34-.931 1.194 1.194 0 0 0-.386-.258 1.301 1.301 0 0 0-.504-.094c-.184 0-.35.032-.498.094-.145.059-.27.143-.375.252a1.11 1.11 0 0 0-.235.404 1.66 1.66 0 0 0-.082.533c0 .192.028.368.082.528.055.156.137.289.246.398a1.1 1.1 0 0 0 .381.264c.149.062.315.094.498.094.184 0 .35-.032.498-.094.149-.063.276-.15.381-.264.106-.109.188-.242.246-.398.059-.16.088-.336.088-.528Z"
              className="28"
            />
            <path
              d="M288.385 715.428v1.189h-.094c-.465 0-.869.065-1.213.194a2.384 2.384 0 0 0-1.418 1.341 3.474 3.474 0 0 0-.24 1.02c.094-.106.203-.207.328-.305.125-.101.264-.191.416-.269.145-.075.305-.133.481-.176a2.14 2.14 0 0 1 .556-.07c.414 0 .774.078 1.078.234.309.156.563.367.762.633.203.265.352.57.445.914.098.344.147.701.147 1.072 0 .406-.063.787-.188 1.143a2.673 2.673 0 0 1-.533.92 2.548 2.548 0 0 1-.873.627c-.34.148-.728.222-1.166.222-.449 0-.85-.086-1.201-.258a2.634 2.634 0 0 1-.891-.697 3.137 3.137 0 0 1-.586-1.072 4.248 4.248 0 0 1-.199-1.307v-.58c0-.687.088-1.342.264-1.963a3.936 3.936 0 0 1 .89-1.611 3.489 3.489 0 0 1 1.301-.891c.516-.207 1.106-.31 1.77-.31h.164Zm-1.53 4.06c-.167 0-.328.026-.48.076a1.684 1.684 0 0 0-.422.211c-.117.09-.223.194-.316.311a1.713 1.713 0 0 0-.235.393v.433c0 .34.037.639.112.897.078.257.183.472.316.644.133.172.287.303.463.393.176.09.363.134.562.134.219 0 .415-.042.586-.128.172-.09.319-.211.44-.364.121-.156.213-.34.275-.55.063-.215.094-.448.094-.698 0-.238-.031-.463-.094-.674a1.694 1.694 0 0 0-.263-.562 1.243 1.243 0 0 0-.44-.375 1.226 1.226 0 0 0-.598-.141Zm9.862-1.769c0 .258-.043.498-.129.72a1.904 1.904 0 0 1-.352.598 2.249 2.249 0 0 1-.726.574c.176.082.338.178.486.287.152.106.285.229.399.37a2.134 2.134 0 0 1 .509 1.412c0 .394-.072.744-.216 1.049a2.165 2.165 0 0 1-.592.761 2.617 2.617 0 0 1-.891.469 3.635 3.635 0 0 1-1.09.158c-.398 0-.769-.053-1.113-.158a2.552 2.552 0 0 1-.885-.469 2.13 2.13 0 0 1-.597-.756 2.482 2.482 0 0 1-.211-1.054c0-.235.031-.457.093-.668.067-.211.16-.407.282-.586.121-.172.265-.326.433-.463a2.68 2.68 0 0 1 .574-.358 2.157 2.157 0 0 1-.861-.755 2.074 2.074 0 0 1-.334-1.131c0-.379.065-.715.193-1.008a2.181 2.181 0 0 1 1.36-1.201 3.32 3.32 0 0 1 1.049-.158c.375 0 .72.052 1.037.158.32.101.599.254.838.457.23.199.412.447.545.744.132.293.199.629.199 1.008Zm-1.213 3.885c0-.211-.035-.403-.106-.575a1.365 1.365 0 0 0-.281-.457 1.303 1.303 0 0 0-.445-.281 1.572 1.572 0 0 0-.568-.1c-.215 0-.409.034-.581.1-.168.066-.312.16-.433.281a1.365 1.365 0 0 0-.281.457 1.68 1.68 0 0 0-.094.58c0 .219.033.416.099.592.067.172.163.317.288.434.121.113.265.201.433.263.172.059.365.088.58.088a1.6 1.6 0 0 0 .557-.093c.172-.063.32-.153.445-.27.117-.121.211-.266.281-.434.071-.171.106-.367.106-.585Zm-.182-3.833a1.4 1.4 0 0 0-.34-.931 1.194 1.194 0 0 0-.386-.258 1.301 1.301 0 0 0-.504-.094c-.184 0-.35.032-.498.094-.145.059-.27.143-.375.252a1.11 1.11 0 0 0-.235.404 1.66 1.66 0 0 0-.082.533c0 .192.028.368.082.528.055.156.137.289.246.398a1.1 1.1 0 0 0 .381.264c.149.062.315.094.498.094.184 0 .35-.032.498-.094.149-.063.276-.15.381-.264.106-.109.188-.242.246-.398.059-.16.088-.336.088-.528Z"
              className="68"
            />
            <path
              d="M192.684 539.102h.837c.25 0 .469-.034.657-.1.187-.07.342-.168.463-.293a1.05 1.05 0 0 0 .257-.404 1.46 1.46 0 0 0 .094-.528c0-.203-.029-.384-.088-.545a1.076 1.076 0 0 0-.246-.41 1.13 1.13 0 0 0-.416-.246 1.698 1.698 0 0 0-.568-.088c-.192 0-.369.03-.533.088a1.19 1.19 0 0 0-.703.621 1.2 1.2 0 0 0-.1.498h-1.4c0-.34.068-.652.205-.937.136-.285.326-.533.568-.744.242-.207.527-.369.855-.487a3.262 3.262 0 0 1 1.09-.175c.403 0 .772.052 1.108.158.34.101.629.254.867.457.242.207.43.461.562.762.133.3.2.65.2 1.048 0 .176-.028.352-.082.528a1.93 1.93 0 0 1-.235.509 2.227 2.227 0 0 1-.961.809c.254.086.469.199.645.34.179.137.326.291.439.463.113.176.196.365.246.568.051.199.076.406.076.621 0 .399-.074.754-.222 1.067a2.236 2.236 0 0 1-.598.779 2.696 2.696 0 0 1-.914.492 3.766 3.766 0 0 1-1.131.164c-.367 0-.72-.051-1.06-.152a2.678 2.678 0 0 1-.897-.457 2.308 2.308 0 0 1-.621-.75 2.299 2.299 0 0 1-.228-1.049h1.4c0 .187.033.361.1.521.07.157.17.29.298.399.125.113.274.201.446.264.176.062.369.093.58.093.226 0 .43-.029.609-.088a1.21 1.21 0 0 0 .463-.275c.121-.113.213-.254.275-.422.067-.172.1-.367.1-.586a1.63 1.63 0 0 0-.111-.633 1.145 1.145 0 0 0-.322-.439 1.401 1.401 0 0 0-.51-.252 2.271 2.271 0 0 0-.657-.088h-.837v-1.101Zm9.515 4.898h-1.412v-6.797l-2.185.803v-1.236l3.509-1.301h.088V544Z"
              className="31"
            />
            <path
              d="M161.633 532h-5.725v-.973l2.778-3.023c.23-.254.423-.481.58-.68a5.2 5.2 0 0 0 .38-.556c.094-.168.161-.325.2-.469.043-.149.064-.297.064-.445 0-.2-.029-.381-.088-.545a1.141 1.141 0 0 0-.258-.422 1.215 1.215 0 0 0-.41-.276 1.342 1.342 0 0 0-.527-.099c-.25 0-.467.035-.65.105-.184.071-.336.17-.457.299a1.337 1.337 0 0 0-.282.498c-.062.191-.093.41-.093.656h-1.407c0-.371.069-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.555-.441.914-.586a3.27 3.27 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.612.289.838.504.223.215.393.473.51.774.117.296.176.625.176.984 0 .269-.045.531-.135.785-.086.25-.205.498-.357.744a6.541 6.541 0 0 1-.557.744c-.211.25-.441.508-.691.774l-1.899 2.027h3.973V532Zm7.207 0h-5.725v-.973l2.778-3.023c.23-.254.423-.481.58-.68.156-.203.283-.388.381-.556.093-.168.16-.325.199-.469.043-.149.064-.297.064-.445 0-.2-.029-.381-.088-.545a1.141 1.141 0 0 0-.258-.422 1.215 1.215 0 0 0-.41-.276 1.342 1.342 0 0 0-.527-.099c-.25 0-.467.035-.65.105-.184.071-.336.17-.457.299a1.337 1.337 0 0 0-.282.498c-.062.191-.093.41-.093.656h-1.407c0-.371.069-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.555-.441.914-.586a3.27 3.27 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.612.289.838.504.223.215.393.473.51.774.117.296.176.625.176.984 0 .269-.045.531-.135.785-.086.25-.205.498-.357.744a6.541 6.541 0 0 1-.557.744c-.211.25-.441.508-.691.774l-1.899 2.027h3.973V532Z"
              className="22"
            />
            <path
              d="M144.633 587h-5.725v-.973l2.778-3.023c.23-.254.423-.481.58-.68a5.2 5.2 0 0 0 .38-.556c.094-.168.161-.325.2-.469.043-.149.064-.297.064-.445 0-.2-.029-.381-.088-.545a1.141 1.141 0 0 0-.258-.422 1.215 1.215 0 0 0-.41-.276 1.342 1.342 0 0 0-.527-.099c-.25 0-.467.035-.65.105-.184.071-.336.17-.457.299a1.337 1.337 0 0 0-.282.498c-.062.191-.093.41-.093.656h-1.407c0-.371.069-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.555-.441.914-.586a3.27 3.27 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.612.289.838.504.223.215.393.473.51.774.117.296.176.625.176.984 0 .269-.045.531-.135.785-.086.25-.205.498-.357.744a6.541 6.541 0 0 1-.557.744c-.211.25-.441.508-.691.774l-1.899 2.027h3.973V587Zm3.258-4.898h.838c.25 0 .468-.034.656-.1.187-.07.342-.168.463-.293a1.05 1.05 0 0 0 .257-.404 1.46 1.46 0 0 0 .094-.528c0-.203-.029-.384-.088-.545a1.076 1.076 0 0 0-.246-.41 1.13 1.13 0 0 0-.416-.246 1.698 1.698 0 0 0-.568-.088c-.192 0-.369.03-.533.088a1.198 1.198 0 0 0-.703.621 1.2 1.2 0 0 0-.1.498h-1.4c0-.34.068-.652.205-.937.136-.285.326-.533.568-.744.242-.207.527-.369.855-.487a3.262 3.262 0 0 1 1.09-.175c.403 0 .772.052 1.108.158.34.101.629.254.867.457.242.207.43.461.562.762.133.3.2.65.2 1.048 0 .176-.028.352-.082.528a1.93 1.93 0 0 1-.235.509 2.227 2.227 0 0 1-.961.809c.254.086.469.199.645.34.179.137.326.291.439.463.114.176.196.365.246.568.051.199.077.406.077.621 0 .399-.075.754-.223 1.067a2.236 2.236 0 0 1-.598.779 2.696 2.696 0 0 1-.914.492 3.761 3.761 0 0 1-1.131.164c-.367 0-.72-.051-1.06-.152a2.678 2.678 0 0 1-.897-.457 2.308 2.308 0 0 1-.621-.75 2.299 2.299 0 0 1-.228-1.049h1.4c0 .187.033.361.1.521.07.157.17.29.298.399.125.113.274.201.446.264.176.062.369.093.58.093.226 0 .43-.029.609-.088a1.21 1.21 0 0 0 .463-.275c.121-.113.213-.254.276-.422.066-.172.099-.367.099-.586a1.63 1.63 0 0 0-.111-.633 1.145 1.145 0 0 0-.322-.439 1.401 1.401 0 0 0-.51-.252 2.269 2.269 0 0 0-.656-.088h-.838v-1.101Z"
              className="23"
            />
            <path
              d="M176.633 611h-5.725v-.973l2.778-3.023c.23-.254.423-.481.58-.68a5.2 5.2 0 0 0 .38-.556c.094-.168.161-.325.2-.469.043-.149.064-.297.064-.445 0-.2-.029-.381-.088-.545a1.141 1.141 0 0 0-.258-.422 1.215 1.215 0 0 0-.41-.276 1.342 1.342 0 0 0-.527-.099c-.25 0-.467.035-.65.105-.184.071-.336.17-.457.299a1.337 1.337 0 0 0-.282.498c-.062.191-.093.41-.093.656h-1.407c0-.371.069-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.555-.441.914-.586a3.27 3.27 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.612.289.838.504.223.215.393.473.51.774.117.296.176.625.176.984 0 .269-.045.531-.135.785-.086.25-.205.498-.357.744a6.541 6.541 0 0 1-.557.744c-.211.25-.441.508-.691.774l-1.899 2.027h3.973V611Zm6.381-3.041h1.072v1.137h-1.072V611h-1.401v-1.904h-3.691l-.035-.862 3.685-5.765h1.442v5.49Zm-3.698 0h2.297v-3.615l-.164.304-2.133 3.311Z"
              className="24"
            />
            <path
              d="M148.633 636h-5.725v-.973l2.778-3.023c.23-.254.423-.481.58-.68a5.2 5.2 0 0 0 .38-.556c.094-.168.161-.325.2-.469.043-.149.064-.297.064-.445 0-.2-.029-.381-.088-.545a1.141 1.141 0 0 0-.258-.422 1.215 1.215 0 0 0-.41-.276 1.342 1.342 0 0 0-.527-.099c-.25 0-.467.035-.65.105-.184.071-.336.17-.457.299a1.337 1.337 0 0 0-.282.498c-.062.191-.093.41-.093.656h-1.407c0-.371.069-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.555-.441.914-.586a3.27 3.27 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.612.289.838.504.223.215.393.473.51.774.117.296.176.625.176.984 0 .269-.045.531-.135.785-.086.25-.205.498-.357.744a6.541 6.541 0 0 1-.557.744c-.211.25-.441.508-.691.774l-1.899 2.027h3.973V636Zm1.986-4.23.457-4.301h4.588v1.242h-3.422l-.222 2.045c.14-.082.324-.16.55-.235.231-.074.494-.111.791-.111.403 0 .762.067 1.078.199.321.133.592.323.815.569.219.25.387.552.504.908.117.352.176.748.176 1.189 0 .391-.057.76-.17 1.108-.11.344-.28.644-.51.902a2.373 2.373 0 0 1-.861.61c-.348.148-.758.222-1.231.222-.359 0-.703-.051-1.031-.152a2.663 2.663 0 0 1-.873-.469 2.463 2.463 0 0 1-.627-.756 2.561 2.561 0 0 1-.276-1.049h1.366c.05.418.203.739.457.961.258.223.586.334.984.334.234 0 .438-.043.609-.129.172-.086.317-.207.434-.363a1.63 1.63 0 0 0 .246-.551c.055-.218.082-.455.082-.709 0-.246-.033-.47-.099-.673a1.508 1.508 0 0 0-.288-.54 1.275 1.275 0 0 0-.48-.351 1.615 1.615 0 0 0-.668-.129c-.168 0-.314.014-.439.041a1.632 1.632 0 0 0-.323.106 1.486 1.486 0 0 0-.269.164 2.545 2.545 0 0 0-.229.193l-1.119-.275Z"
              className="25"
            />
            <path
              d="M189.633 631h-5.725v-.973l2.778-3.023c.23-.254.423-.481.58-.68a5.2 5.2 0 0 0 .38-.556c.094-.168.161-.325.2-.469.043-.149.064-.297.064-.445 0-.2-.029-.381-.088-.545a1.141 1.141 0 0 0-.258-.422 1.215 1.215 0 0 0-.41-.276 1.342 1.342 0 0 0-.527-.099c-.25 0-.467.035-.65.105-.184.071-.336.17-.457.299a1.337 1.337 0 0 0-.282.498c-.062.191-.093.41-.093.656h-1.407c0-.371.069-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.555-.441.914-.586a3.27 3.27 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.612.289.838.504.223.215.393.473.51.774.117.296.176.625.176.984 0 .269-.045.531-.135.785-.086.25-.205.498-.357.744a6.541 6.541 0 0 1-.557.744c-.211.25-.441.508-.691.774l-1.899 2.027h3.973V631Zm5.959-8.572v1.189h-.094c-.465 0-.869.065-1.213.194a2.384 2.384 0 0 0-1.418 1.341 3.474 3.474 0 0 0-.24 1.02c.094-.106.203-.207.328-.305.125-.101.264-.191.416-.269.145-.075.305-.133.481-.176a2.14 2.14 0 0 1 .556-.07c.414 0 .774.078 1.078.234.309.156.563.367.762.633.203.265.352.57.445.914.098.344.147.701.147 1.072 0 .406-.063.787-.188 1.143a2.657 2.657 0 0 1-.533.92 2.548 2.548 0 0 1-.873.627c-.34.148-.728.222-1.166.222-.449 0-.85-.086-1.201-.258a2.634 2.634 0 0 1-.891-.697 3.137 3.137 0 0 1-.586-1.072 4.279 4.279 0 0 1-.199-1.307v-.58c0-.687.088-1.342.264-1.963a3.936 3.936 0 0 1 .89-1.611 3.489 3.489 0 0 1 1.301-.891c.516-.207 1.106-.31 1.77-.31h.164Zm-1.53 4.06c-.167 0-.328.026-.48.076a1.684 1.684 0 0 0-.422.211c-.117.09-.222.194-.316.311a1.713 1.713 0 0 0-.235.393v.433c0 .34.037.639.112.897.078.257.183.472.316.644.133.172.287.303.463.393.176.09.363.134.562.134.219 0 .415-.042.586-.128.172-.09.319-.211.44-.364.121-.156.213-.34.275-.55.063-.215.094-.448.094-.698 0-.238-.031-.463-.094-.674a1.694 1.694 0 0 0-.263-.562 1.243 1.243 0 0 0-.44-.375 1.226 1.226 0 0 0-.598-.141Z"
              className="26"
            />
            <path
              d="m232.703 650.254-3.41 7.746h-1.477l3.411-7.359h-4.424v-1.172h5.9v.785Zm7.178 4.494c0 .547-.065 1.031-.193 1.453a2.89 2.89 0 0 1-.545 1.049 2.248 2.248 0 0 1-.868.656 2.926 2.926 0 0 1-1.16.217c-.429 0-.816-.072-1.16-.217a2.286 2.286 0 0 1-.873-.656 2.892 2.892 0 0 1-.557-1.049 5.123 5.123 0 0 1-.187-1.453v-2.021c0-.547.062-1.03.187-1.448.129-.422.313-.777.551-1.066.238-.285.528-.5.867-.645a2.91 2.91 0 0 1 1.161-.222c.433 0 .82.074 1.16.222.343.145.636.36.879.645.234.289.416.644.545 1.066.128.418.193.901.193 1.448v2.021Zm-4.137-.498 2.713-2.057a3.226 3.226 0 0 0-.129-.791 1.419 1.419 0 0 0-.287-.545 1.024 1.024 0 0 0-.404-.281 1.439 1.439 0 0 0-.533-.094c-.215 0-.405.038-.569.112a1.04 1.04 0 0 0-.41.328 1.627 1.627 0 0 0-.287.639 3.881 3.881 0 0 0-.094.914v1.775Zm2.725.732v-1.711l-2.713 2.045c.019.27.06.508.123.715.066.207.154.379.264.516.109.148.244.26.404.334.164.074.353.111.568.111.211 0 .397-.035.557-.105.16-.075.297-.182.41-.323.129-.164.225-.378.287-.644.067-.266.1-.578.1-.938Z"
              className="70"
            />
            <path
              d="M187.633 500h-5.725v-.973l2.778-3.023c.23-.254.423-.481.58-.68a5.2 5.2 0 0 0 .38-.556c.094-.168.161-.325.2-.469.043-.149.064-.297.064-.445 0-.2-.029-.381-.088-.545a1.141 1.141 0 0 0-.258-.422 1.215 1.215 0 0 0-.41-.276 1.342 1.342 0 0 0-.527-.099c-.25 0-.467.035-.65.105-.184.071-.336.17-.457.299a1.337 1.337 0 0 0-.282.498c-.062.191-.093.41-.093.656h-1.407c0-.371.069-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.555-.441.914-.586a3.27 3.27 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.612.289.838.504.223.215.393.473.51.774.117.296.176.625.176.984 0 .269-.045.531-.135.785-.086.25-.205.498-.357.744a6.541 6.541 0 0 1-.557.744c-.211.25-.441.508-.691.774l-1.899 2.027h3.973V500Zm5.566 0h-1.412v-6.797l-2.185.803v-1.236l3.509-1.301h.088V500Z"
              className="21"
            />
            <path
              d="M296.807 449.959h1.072v1.137h-1.072V453h-1.401v-1.904h-3.691l-.035-.862 3.685-5.765h1.442v5.49Zm-3.698 0h2.297v-3.615l-.164.304-2.133 3.311Zm11.608-3.24c0 .258-.043.498-.129.72a1.904 1.904 0 0 1-.352.598 2.249 2.249 0 0 1-.726.574c.176.082.338.178.486.287.152.106.285.229.399.37a2.134 2.134 0 0 1 .509 1.412c0 .394-.072.744-.216 1.049a2.165 2.165 0 0 1-.592.761 2.617 2.617 0 0 1-.891.469 3.635 3.635 0 0 1-1.09.158c-.398 0-.769-.053-1.113-.158a2.552 2.552 0 0 1-.885-.469 2.13 2.13 0 0 1-.597-.756 2.482 2.482 0 0 1-.211-1.054c0-.235.031-.457.093-.668.067-.211.16-.407.282-.586.121-.172.265-.326.433-.463a2.68 2.68 0 0 1 .574-.358 2.157 2.157 0 0 1-.861-.755 2.074 2.074 0 0 1-.334-1.131c0-.379.065-.715.193-1.008a2.181 2.181 0 0 1 1.36-1.201 3.32 3.32 0 0 1 1.049-.158c.375 0 .72.052 1.037.158.32.101.599.254.838.457.23.199.412.447.545.744.132.293.199.629.199 1.008Zm-1.213 3.885c0-.211-.035-.403-.106-.575a1.365 1.365 0 0 0-.281-.457 1.303 1.303 0 0 0-.445-.281 1.572 1.572 0 0 0-.568-.1c-.215 0-.409.034-.581.1-.168.066-.312.16-.433.281a1.365 1.365 0 0 0-.281.457 1.68 1.68 0 0 0-.094.58c0 .219.033.416.099.592.067.172.163.317.288.434.121.113.265.201.433.263.172.059.365.088.58.088a1.6 1.6 0 0 0 .557-.093c.172-.063.32-.153.445-.27.117-.121.211-.266.281-.434.071-.171.106-.367.106-.585Zm-.182-3.833a1.4 1.4 0 0 0-.34-.931 1.194 1.194 0 0 0-.386-.258 1.301 1.301 0 0 0-.504-.094c-.184 0-.35.032-.498.094-.145.059-.27.143-.375.252a1.11 1.11 0 0 0-.235.404 1.66 1.66 0 0 0-.082.533c0 .192.028.368.082.528.055.156.137.289.246.398a1.1 1.1 0 0 0 .381.264c.149.062.315.094.498.094.184 0 .35-.032.498-.094.149-.063.276-.15.381-.264.106-.109.188-.242.246-.398.059-.16.088-.336.088-.528Z"
              className="48"
            />
            <path
              d="M222.684 382.102h.837c.25 0 .469-.034.657-.1.187-.07.342-.168.463-.293a1.05 1.05 0 0 0 .257-.404 1.46 1.46 0 0 0 .094-.528c0-.203-.029-.384-.088-.545a1.076 1.076 0 0 0-.246-.41 1.13 1.13 0 0 0-.416-.246 1.698 1.698 0 0 0-.568-.088c-.192 0-.369.03-.533.088a1.19 1.19 0 0 0-.703.621 1.2 1.2 0 0 0-.1.498h-1.4c0-.34.068-.652.205-.937.136-.285.326-.533.568-.744.242-.207.527-.369.855-.487a3.262 3.262 0 0 1 1.09-.175c.403 0 .772.052 1.108.158.34.101.629.254.867.457.242.207.43.461.562.762.133.3.2.65.2 1.048 0 .176-.028.352-.082.528a1.93 1.93 0 0 1-.235.509 2.227 2.227 0 0 1-.961.809c.254.086.469.199.645.34.179.137.326.291.439.463.113.176.196.365.246.568.051.199.076.406.076.621 0 .399-.074.754-.222 1.067a2.236 2.236 0 0 1-.598.779 2.696 2.696 0 0 1-.914.492 3.766 3.766 0 0 1-1.131.164c-.367 0-.72-.051-1.06-.152a2.678 2.678 0 0 1-.897-.457 2.308 2.308 0 0 1-.621-.75 2.299 2.299 0 0 1-.228-1.049h1.4c0 .187.033.361.1.521.07.157.17.29.298.399.125.113.274.201.446.264.176.062.369.093.58.093.226 0 .43-.029.609-.088a1.21 1.21 0 0 0 .463-.275c.121-.113.213-.254.275-.422.067-.172.1-.367.1-.586a1.63 1.63 0 0 0-.111-.633 1.145 1.145 0 0 0-.322-.439 1.401 1.401 0 0 0-.51-.252 2.271 2.271 0 0 0-.657-.088h-.837v-1.101Zm11.226-2.848L230.5 387h-1.477l3.411-7.359h-4.424v-1.172h5.9v.785Z"
              className="37"
            />
            <path
              d="M221.684 426.102h.837c.25 0 .469-.034.657-.1.187-.07.342-.168.463-.293a1.05 1.05 0 0 0 .257-.404 1.46 1.46 0 0 0 .094-.528c0-.203-.029-.384-.088-.545a1.076 1.076 0 0 0-.246-.41 1.13 1.13 0 0 0-.416-.246 1.698 1.698 0 0 0-.568-.088c-.192 0-.369.03-.533.088a1.19 1.19 0 0 0-.703.621 1.2 1.2 0 0 0-.1.498h-1.4c0-.34.068-.652.205-.937.136-.285.326-.533.568-.744.242-.207.527-.369.855-.487a3.262 3.262 0 0 1 1.09-.175c.403 0 .772.052 1.108.158.34.101.629.254.867.457.242.207.43.461.562.762.133.3.2.65.2 1.048 0 .176-.028.352-.082.528a1.93 1.93 0 0 1-.235.509 2.227 2.227 0 0 1-.961.809c.254.086.469.199.645.34.179.137.326.291.439.463.113.176.196.365.246.568.051.199.076.406.076.621 0 .399-.074.754-.222 1.067a2.236 2.236 0 0 1-.598.779 2.696 2.696 0 0 1-.914.492 3.766 3.766 0 0 1-1.131.164c-.367 0-.72-.051-1.06-.152a2.678 2.678 0 0 1-.897-.457 2.308 2.308 0 0 1-.621-.75 2.299 2.299 0 0 1-.228-1.049h1.4c0 .187.033.361.1.521.07.157.17.29.298.399.125.113.274.201.446.264.176.062.369.093.58.093.226 0 .43-.029.609-.088a1.21 1.21 0 0 0 .463-.275c.121-.113.213-.254.275-.422.067-.172.1-.367.1-.586a1.63 1.63 0 0 0-.111-.633 1.145 1.145 0 0 0-.322-.439 1.401 1.401 0 0 0-.51-.252 2.271 2.271 0 0 0-.657-.088h-.837v-1.101Zm9.908-3.674v1.189h-.094c-.465 0-.869.065-1.213.194a2.384 2.384 0 0 0-1.418 1.341 3.474 3.474 0 0 0-.24 1.02c.094-.106.203-.207.328-.305.125-.101.264-.191.416-.269.145-.075.305-.133.481-.176a2.14 2.14 0 0 1 .556-.07c.414 0 .774.078 1.078.234.309.156.563.367.762.633.203.265.352.57.445.914.098.344.147.701.147 1.072 0 .406-.063.787-.188 1.143a2.657 2.657 0 0 1-.533.92 2.548 2.548 0 0 1-.873.627c-.34.148-.728.222-1.166.222-.449 0-.85-.086-1.201-.258a2.634 2.634 0 0 1-.891-.697 3.137 3.137 0 0 1-.586-1.072 4.279 4.279 0 0 1-.199-1.307v-.58c0-.687.088-1.342.264-1.963a3.936 3.936 0 0 1 .89-1.611 3.489 3.489 0 0 1 1.301-.891c.516-.207 1.106-.31 1.77-.31h.164Zm-1.53 4.06c-.167 0-.328.026-.48.076a1.684 1.684 0 0 0-.422.211c-.117.09-.222.194-.316.311a1.713 1.713 0 0 0-.235.393v.433c0 .34.037.639.112.897.078.257.183.472.316.644.133.172.287.303.463.393.176.09.363.134.562.134.219 0 .415-.042.586-.128.172-.09.319-.211.44-.364.121-.156.213-.34.275-.55.063-.215.094-.448.094-.698 0-.238-.031-.463-.094-.674a1.694 1.694 0 0 0-.263-.562 1.243 1.243 0 0 0-.44-.375 1.226 1.226 0 0 0-.598-.141Z"
              className="36"
            />
            <path
              d="M258.807 406.959h1.072v1.137h-1.072V410h-1.401v-1.904h-3.691l-.035-.862 3.685-5.765h1.442v5.49Zm-3.698 0h2.297v-3.615l-.164.304-2.133 3.311Zm7.782-1.857h.838c.25 0 .468-.034.656-.1.187-.07.342-.168.463-.293a1.05 1.05 0 0 0 .257-.404 1.46 1.46 0 0 0 .094-.528c0-.203-.029-.384-.088-.545a1.076 1.076 0 0 0-.246-.41 1.13 1.13 0 0 0-.416-.246 1.698 1.698 0 0 0-.568-.088c-.192 0-.369.03-.533.088a1.198 1.198 0 0 0-.703.621 1.2 1.2 0 0 0-.1.498h-1.4c0-.34.068-.652.205-.937.136-.285.326-.533.568-.744.242-.207.527-.369.855-.487a3.262 3.262 0 0 1 1.09-.175c.403 0 .772.052 1.108.158.34.101.629.254.867.457.242.207.43.461.562.762.133.3.2.65.2 1.048 0 .176-.028.352-.082.528a1.93 1.93 0 0 1-.235.509 2.227 2.227 0 0 1-.961.809c.254.086.469.199.645.34.179.137.326.291.439.463.114.176.196.365.246.568.051.199.077.406.077.621 0 .399-.075.754-.223 1.067a2.236 2.236 0 0 1-.598.779 2.696 2.696 0 0 1-.914.492 3.761 3.761 0 0 1-1.131.164c-.367 0-.72-.051-1.06-.152a2.678 2.678 0 0 1-.897-.457 2.308 2.308 0 0 1-.621-.75 2.299 2.299 0 0 1-.228-1.049h1.4c0 .187.033.361.1.521.07.157.17.29.298.399.125.113.274.201.446.264.176.062.369.093.58.093.226 0 .43-.029.609-.088a1.21 1.21 0 0 0 .463-.275c.121-.113.213-.254.276-.422.066-.172.099-.367.099-.586a1.63 1.63 0 0 0-.111-.633 1.145 1.145 0 0 0-.322-.439 1.401 1.401 0 0 0-.51-.252 2.269 2.269 0 0 0-.656-.088h-.838v-1.101Z"
              className="43"
            />
            <path
              d="M175.992 242h-1.412v-6.797l-2.185.803v-1.236l3.509-1.301h.088V242Zm8.022-3.041h1.072v1.137h-1.072V242h-1.401v-1.904h-3.691l-.035-.862 3.685-5.765h1.442v5.49Zm-3.698 0h2.297v-3.615l-.164.304-2.133 3.311Z"
              className="14"
            />
            <path
              d="M215.992 243h-1.412v-6.797l-2.185.803v-1.236l3.509-1.301h.088V243Zm3.627-4.23.457-4.301h4.588v1.242h-3.422l-.222 2.045c.14-.082.324-.16.55-.235.231-.074.494-.111.791-.111.403 0 .762.067 1.078.199.321.133.592.323.815.569.219.25.387.552.504.908.117.352.176.748.176 1.189 0 .391-.057.76-.17 1.108-.11.344-.28.644-.51.902a2.373 2.373 0 0 1-.861.61c-.348.148-.758.222-1.231.222-.359 0-.703-.051-1.031-.152a2.663 2.663 0 0 1-.873-.469 2.463 2.463 0 0 1-.627-.756 2.561 2.561 0 0 1-.276-1.049h1.366c.05.418.203.739.457.961.258.223.586.334.984.334.234 0 .438-.043.609-.129.172-.086.317-.207.434-.363a1.63 1.63 0 0 0 .246-.551c.055-.218.082-.455.082-.709 0-.246-.033-.47-.099-.673a1.508 1.508 0 0 0-.288-.54 1.275 1.275 0 0 0-.48-.351 1.615 1.615 0 0 0-.668-.129c-.168 0-.314.014-.439.041a1.632 1.632 0 0 0-.323.106 1.486 1.486 0 0 0-.269.164 2.545 2.545 0 0 0-.229.193l-1.119-.275Z"
              className="15"
            />
            <path
              d="m259.412 267.77.457-4.301h4.588v1.242h-3.422l-.223 2.045c.141-.082.325-.16.551-.235.231-.074.494-.111.791-.111.403 0 .762.067 1.078.199.321.133.592.323.815.569.219.25.387.552.504.908.117.352.176.748.176 1.189 0 .391-.057.76-.17 1.108-.11.344-.28.644-.51.902a2.373 2.373 0 0 1-.861.61c-.348.148-.758.222-1.231.222-.359 0-.703-.051-1.031-.152a2.663 2.663 0 0 1-.873-.469 2.463 2.463 0 0 1-.627-.756 2.561 2.561 0 0 1-.276-1.049h1.366c.05.418.203.739.457.961.258.223.586.334.984.334.234 0 .438-.043.609-.129.172-.086.317-.207.434-.363a1.63 1.63 0 0 0 .246-.551c.055-.218.082-.455.082-.709 0-.246-.033-.47-.099-.673a1.508 1.508 0 0 0-.288-.54 1.275 1.275 0 0 0-.48-.351 1.615 1.615 0 0 0-.668-.129c-.168 0-.314.014-.439.041a1.61 1.61 0 0 0-.323.106 1.486 1.486 0 0 0-.269.164 2.545 2.545 0 0 0-.229.193l-1.119-.275Zm8.479-.668h.838c.25 0 .468-.034.656-.1.187-.07.342-.168.463-.293a1.05 1.05 0 0 0 .257-.404 1.46 1.46 0 0 0 .094-.528c0-.203-.029-.384-.088-.545a1.076 1.076 0 0 0-.246-.41 1.13 1.13 0 0 0-.416-.246 1.698 1.698 0 0 0-.568-.088c-.192 0-.369.03-.533.088a1.198 1.198 0 0 0-.703.621 1.2 1.2 0 0 0-.1.498h-1.4c0-.34.068-.652.205-.937.136-.285.326-.533.568-.744.242-.207.527-.369.855-.487a3.262 3.262 0 0 1 1.09-.175c.403 0 .772.052 1.108.158.34.101.629.254.867.457.242.207.43.461.562.762.133.3.2.65.2 1.048 0 .176-.028.352-.082.528a1.93 1.93 0 0 1-.235.509 2.227 2.227 0 0 1-.961.809c.254.086.469.199.645.34.179.137.326.291.439.463.114.176.196.365.246.568.051.199.077.406.077.621 0 .399-.075.754-.223 1.067a2.236 2.236 0 0 1-.598.779 2.696 2.696 0 0 1-.914.492 3.761 3.761 0 0 1-1.131.164c-.367 0-.72-.051-1.06-.152a2.678 2.678 0 0 1-.897-.457 2.308 2.308 0 0 1-.621-.75 2.299 2.299 0 0 1-.228-1.049h1.4c0 .187.033.361.1.521.07.157.17.29.298.399.125.113.274.201.446.264.176.062.369.093.58.093.226 0 .43-.029.609-.088a1.21 1.21 0 0 0 .463-.275c.121-.113.213-.254.276-.422.066-.172.099-.367.099-.586a1.63 1.63 0 0 0-.111-.633 1.145 1.145 0 0 0-.322-.439 1.401 1.401 0 0 0-.51-.252 2.269 2.269 0 0 0-.656-.088h-.838v-1.101Z"
              className="53"
            />
            <path
              d="M239.684 311.102h.837c.25 0 .469-.034.657-.1.187-.07.342-.168.463-.293a1.05 1.05 0 0 0 .257-.404 1.46 1.46 0 0 0 .094-.528c0-.203-.029-.384-.088-.545a1.076 1.076 0 0 0-.246-.41 1.13 1.13 0 0 0-.416-.246 1.698 1.698 0 0 0-.568-.088c-.192 0-.369.03-.533.088a1.19 1.19 0 0 0-.703.621 1.2 1.2 0 0 0-.1.498h-1.4c0-.34.068-.652.205-.937.136-.285.326-.533.568-.744.242-.207.527-.369.855-.487a3.262 3.262 0 0 1 1.09-.175c.403 0 .772.052 1.108.158.34.101.629.254.867.457.242.207.43.461.562.762.133.3.2.65.2 1.048 0 .176-.028.352-.082.528a1.93 1.93 0 0 1-.235.509 2.227 2.227 0 0 1-.961.809c.254.086.469.199.645.34.179.137.326.291.439.463.113.176.196.365.246.568.051.199.076.406.076.621 0 .399-.074.754-.222 1.067a2.236 2.236 0 0 1-.598.779 2.696 2.696 0 0 1-.914.492 3.766 3.766 0 0 1-1.131.164c-.367 0-.72-.051-1.06-.152a2.678 2.678 0 0 1-.897-.457 2.308 2.308 0 0 1-.621-.75 2.299 2.299 0 0 1-.228-1.049h1.4c0 .187.033.361.1.521.07.157.17.29.298.399.125.113.274.201.446.264.176.062.369.093.58.093.226 0 .43-.029.609-.088a1.21 1.21 0 0 0 .463-.275c.121-.113.213-.254.275-.422.067-.172.1-.367.1-.586a1.63 1.63 0 0 0-.111-.633 1.145 1.145 0 0 0-.322-.439 1.401 1.401 0 0 0-.51-.252 2.271 2.271 0 0 0-.657-.088h-.837v-1.101Zm11.033-1.383c0 .258-.043.498-.129.72a1.904 1.904 0 0 1-.352.598 2.249 2.249 0 0 1-.726.574c.176.082.338.178.486.287.152.106.285.229.399.37a2.134 2.134 0 0 1 .509 1.412c0 .394-.072.744-.216 1.049a2.165 2.165 0 0 1-.592.761 2.617 2.617 0 0 1-.891.469 3.635 3.635 0 0 1-1.09.158c-.398 0-.769-.053-1.113-.158a2.552 2.552 0 0 1-.885-.469 2.13 2.13 0 0 1-.597-.756 2.482 2.482 0 0 1-.211-1.054c0-.235.031-.457.093-.668.067-.211.16-.407.282-.586.121-.172.265-.326.433-.463a2.68 2.68 0 0 1 .574-.358 2.157 2.157 0 0 1-.861-.755 2.074 2.074 0 0 1-.334-1.131c0-.379.065-.715.193-1.008a2.181 2.181 0 0 1 1.36-1.201 3.32 3.32 0 0 1 1.049-.158c.375 0 .72.052 1.037.158.32.101.599.254.838.457.23.199.412.447.545.744.132.293.199.629.199 1.008Zm-1.213 3.885c0-.211-.035-.403-.106-.575a1.365 1.365 0 0 0-.281-.457 1.303 1.303 0 0 0-.445-.281 1.572 1.572 0 0 0-.568-.1c-.215 0-.409.034-.581.1-.168.066-.312.16-.433.281a1.365 1.365 0 0 0-.281.457 1.68 1.68 0 0 0-.094.58c0 .219.033.416.099.592.067.172.163.317.288.434.121.113.265.201.433.263.172.059.365.088.58.088a1.6 1.6 0 0 0 .557-.093c.172-.063.32-.153.445-.27.117-.121.211-.266.281-.434.071-.171.106-.367.106-.585Zm-.182-3.833a1.4 1.4 0 0 0-.34-.931 1.194 1.194 0 0 0-.386-.258 1.301 1.301 0 0 0-.504-.094c-.184 0-.35.032-.498.094-.145.059-.27.143-.375.252a1.11 1.11 0 0 0-.235.404 1.66 1.66 0 0 0-.082.533c0 .192.028.368.082.528.055.156.137.289.246.398a1.1 1.1 0 0 0 .381.264c.149.062.315.094.498.094.184 0 .35-.032.498-.094.149-.063.276-.15.381-.264.106-.109.188-.242.246-.398.059-.16.088-.336.088-.528Z"
              className="38"
            />
            <path
              d="m282.412 331.77.457-4.301h4.588v1.242h-3.422l-.223 2.045c.141-.082.325-.16.551-.235.231-.074.494-.111.791-.111.403 0 .762.067 1.078.199.321.133.592.323.815.569.219.25.387.552.504.908.117.352.176.748.176 1.189 0 .391-.057.76-.17 1.108-.11.344-.28.644-.51.902a2.373 2.373 0 0 1-.861.61c-.348.148-.758.222-1.231.222-.359 0-.703-.051-1.031-.152a2.663 2.663 0 0 1-.873-.469 2.463 2.463 0 0 1-.627-.756 2.561 2.561 0 0 1-.276-1.049h1.366c.05.418.203.739.457.961.258.223.586.334.984.334.234 0 .438-.043.609-.129.172-.086.317-.207.434-.363a1.63 1.63 0 0 0 .246-.551c.055-.218.082-.455.082-.709 0-.246-.033-.47-.099-.673a1.508 1.508 0 0 0-.288-.54 1.275 1.275 0 0 0-.48-.351 1.615 1.615 0 0 0-.668-.129c-.168 0-.314.014-.439.041a1.61 1.61 0 0 0-.323.106 1.486 1.486 0 0 0-.269.164 2.545 2.545 0 0 0-.229.193l-1.119-.275Zm10.787 4.23h-1.412v-6.797l-2.185.803v-1.236l3.509-1.301h.088V336Z"
              className="51"
            />
            <path
              d="M260.807 364.959h1.072v1.137h-1.072V368h-1.401v-1.904h-3.691l-.035-.862 3.685-5.765h1.442v5.49Zm-3.698 0h2.297v-3.615l-.164.304-2.133 3.311Zm11.772-.211c0 .547-.065 1.031-.193 1.453a2.89 2.89 0 0 1-.545 1.049 2.248 2.248 0 0 1-.868.656 2.926 2.926 0 0 1-1.16.217c-.429 0-.816-.072-1.16-.217a2.286 2.286 0 0 1-.873-.656 2.892 2.892 0 0 1-.557-1.049 5.123 5.123 0 0 1-.187-1.453v-2.021c0-.547.062-1.03.187-1.448.129-.422.313-.777.551-1.066.238-.285.528-.5.867-.645a2.91 2.91 0 0 1 1.161-.222c.433 0 .82.074 1.16.222.343.145.636.36.879.645.234.289.416.644.545 1.066.128.418.193.901.193 1.448v2.021Zm-4.137-.498 2.713-2.057a3.226 3.226 0 0 0-.129-.791 1.419 1.419 0 0 0-.287-.545 1.024 1.024 0 0 0-.404-.281 1.439 1.439 0 0 0-.533-.094c-.215 0-.405.038-.569.112a1.04 1.04 0 0 0-.41.328 1.627 1.627 0 0 0-.287.639 3.881 3.881 0 0 0-.094.914v1.775Zm2.725.732v-1.711l-2.713 2.045c.019.27.06.508.123.715.066.207.154.379.264.516.109.148.244.26.404.334.164.074.353.111.568.111.211 0 .397-.035.557-.105.16-.075.297-.182.41-.323.129-.164.225-.378.287-.644.067-.266.1-.578.1-.938Z"
              className="40"
            />
            <path
              d="m289.412 371.77.457-4.301h4.588v1.242h-3.422l-.223 2.045c.141-.082.325-.16.551-.235.231-.074.494-.111.791-.111.403 0 .762.067 1.078.199.321.133.592.323.815.569.219.25.387.552.504.908.117.352.176.748.176 1.189 0 .391-.057.76-.17 1.108-.11.344-.28.644-.51.902a2.373 2.373 0 0 1-.861.61c-.348.148-.758.222-1.231.222-.359 0-.703-.051-1.031-.152a2.663 2.663 0 0 1-.873-.469 2.463 2.463 0 0 1-.627-.756 2.561 2.561 0 0 1-.276-1.049h1.366c.05.418.203.739.457.961.258.223.586.334.984.334.234 0 .438-.043.609-.129.172-.086.317-.207.434-.363a1.63 1.63 0 0 0 .246-.551c.055-.218.082-.455.082-.709 0-.246-.033-.47-.099-.673a1.508 1.508 0 0 0-.288-.54 1.275 1.275 0 0 0-.48-.351 1.615 1.615 0 0 0-.668-.129c-.168 0-.314.014-.439.041a1.61 1.61 0 0 0-.323.106 1.486 1.486 0 0 0-.269.164 2.545 2.545 0 0 0-.229.193l-1.119-.275Zm12.469.978c0 .547-.065 1.031-.193 1.453a2.89 2.89 0 0 1-.545 1.049 2.248 2.248 0 0 1-.868.656 2.926 2.926 0 0 1-1.16.217c-.429 0-.816-.072-1.16-.217a2.286 2.286 0 0 1-.873-.656 2.892 2.892 0 0 1-.557-1.049 5.123 5.123 0 0 1-.187-1.453v-2.021c0-.547.062-1.03.187-1.448.129-.422.313-.777.551-1.066.238-.285.528-.5.867-.645a2.91 2.91 0 0 1 1.161-.222c.433 0 .82.074 1.16.222.343.145.636.36.879.645.234.289.416.644.545 1.066.128.418.193.901.193 1.448v2.021Zm-4.137-.498 2.713-2.057a3.226 3.226 0 0 0-.129-.791 1.419 1.419 0 0 0-.287-.545 1.024 1.024 0 0 0-.404-.281 1.439 1.439 0 0 0-.533-.094c-.215 0-.405.038-.569.112a1.04 1.04 0 0 0-.41.328 1.627 1.627 0 0 0-.287.639 3.881 3.881 0 0 0-.094.914v1.775Zm2.725.732v-1.711l-2.713 2.045c.019.27.06.508.123.715.066.207.154.379.264.516.109.148.244.26.404.334.164.074.353.111.568.111.211 0 .397-.035.557-.105.16-.075.297-.182.41-.323.129-.164.225-.378.287-.644.067-.266.1-.578.1-.938Z"
              className="50"
            />
            <path
              d="M317.529 396h-5.724v-.973l2.777-3.023c.23-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.554-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.424 6.424 0 0 1-.557.744c-.21.25-.441.508-.691.774l-1.898 2.027h3.972V396Zm7.248-3.252c0 .547-.064 1.031-.193 1.453a2.875 2.875 0 0 1-.545 1.049 2.237 2.237 0 0 1-.867.656c-.34.145-.727.217-1.16.217-.43 0-.817-.072-1.16-.217a2.286 2.286 0 0 1-.873-.656 2.877 2.877 0 0 1-.557-1.049 5.121 5.121 0 0 1-.188-1.453v-2.021c0-.547.063-1.03.188-1.448.129-.422.312-.777.551-1.066.238-.285.527-.5.867-.645.344-.148.73-.222 1.16-.222.434 0 .82.074 1.16.222.344.145.637.36.879.645.234.289.416.644.545 1.066.129.418.193.901.193 1.448v2.021Zm-4.136-.498 2.713-2.057a3.226 3.226 0 0 0-.129-.791 1.447 1.447 0 0 0-.287-.545 1.034 1.034 0 0 0-.405-.281 1.435 1.435 0 0 0-.533-.094c-.215 0-.404.038-.568.112a1.05 1.05 0 0 0-.411.328 1.656 1.656 0 0 0-.287.639 3.94 3.94 0 0 0-.093.914v1.775Zm2.724.732v-1.711l-2.713 2.045c.02.27.061.508.123.715.067.207.155.379.264.516.109.148.244.26.404.334.164.074.354.111.569.111.211 0 .396-.035.556-.105a1.14 1.14 0 0 0 .411-.323c.128-.164.224-.378.287-.644.066-.266.099-.578.099-.938Zm6.938 3.018h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V396Z"
              className="201"
            />
            <path
              d="m301.412 294.77.457-4.301h4.588v1.242h-3.422l-.223 2.045c.141-.082.325-.16.551-.235.231-.074.494-.111.791-.111.403 0 .762.067 1.078.199.321.133.592.323.815.569.219.25.387.552.504.908.117.352.176.748.176 1.189 0 .391-.057.76-.17 1.108-.11.344-.28.644-.51.902a2.373 2.373 0 0 1-.861.61c-.348.148-.758.222-1.231.222-.359 0-.703-.051-1.031-.152a2.663 2.663 0 0 1-.873-.469 2.463 2.463 0 0 1-.627-.756 2.561 2.561 0 0 1-.276-1.049h1.366c.05.418.203.739.457.961.258.223.586.334.984.334.234 0 .438-.043.609-.129.172-.086.317-.207.434-.363a1.63 1.63 0 0 0 .246-.551c.055-.218.082-.455.082-.709 0-.246-.033-.47-.099-.673a1.508 1.508 0 0 0-.288-.54 1.275 1.275 0 0 0-.48-.351 1.615 1.615 0 0 0-.668-.129c-.168 0-.314.014-.439.041a1.61 1.61 0 0 0-.323.106 1.486 1.486 0 0 0-.269.164 2.545 2.545 0 0 0-.229.193l-1.119-.275ZM313.84 299h-5.725v-.973l2.778-3.023c.23-.254.423-.481.58-.68.156-.203.283-.388.381-.556.093-.168.16-.325.199-.469.043-.149.064-.297.064-.445 0-.2-.029-.381-.088-.545a1.141 1.141 0 0 0-.258-.422 1.215 1.215 0 0 0-.41-.276 1.342 1.342 0 0 0-.527-.099c-.25 0-.467.035-.65.105-.184.071-.336.17-.457.299a1.337 1.337 0 0 0-.282.498c-.062.191-.093.41-.093.656h-1.407c0-.371.069-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.555-.441.914-.586a3.27 3.27 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.612.289.838.504.223.215.393.473.51.774.117.296.176.625.176.984 0 .269-.045.531-.135.785-.086.25-.205.498-.357.744a6.541 6.541 0 0 1-.557.744c-.211.25-.441.508-.691.774l-1.899 2.027h3.973V299Z"
              className="52"
            />
            <path
              d="m309.412 257.77.457-4.301h4.588v1.242h-3.422l-.223 2.045c.141-.082.325-.16.551-.235.231-.074.494-.111.791-.111.403 0 .762.067 1.078.199.321.133.592.323.815.569.219.25.387.552.504.908.117.352.176.748.176 1.189 0 .391-.057.76-.17 1.108-.11.344-.28.644-.51.902a2.373 2.373 0 0 1-.861.61c-.348.148-.758.222-1.231.222-.359 0-.703-.051-1.031-.152a2.663 2.663 0 0 1-.873-.469 2.463 2.463 0 0 1-.627-.756 2.561 2.561 0 0 1-.276-1.049h1.366c.05.418.203.739.457.961.258.223.586.334.984.334.234 0 .438-.043.609-.129.172-.086.317-.207.434-.363a1.63 1.63 0 0 0 .246-.551c.055-.218.082-.455.082-.709 0-.246-.033-.47-.099-.673a1.508 1.508 0 0 0-.288-.54 1.275 1.275 0 0 0-.48-.351 1.615 1.615 0 0 0-.668-.129c-.168 0-.314.014-.439.041a1.61 1.61 0 0 0-.323.106 1.486 1.486 0 0 0-.269.164 2.545 2.545 0 0 0-.229.193l-1.119-.275Zm11.602 1.189h1.072v1.137h-1.072V262h-1.401v-1.904h-3.691l-.035-.862 3.685-5.765h1.442v5.49Zm-3.698 0h2.297v-3.615l-.164.304-2.133 3.311Z"
              className="54"
            />
            <path
              d="M345.58 273.102h.838c.25 0 .469-.034.656-.1a1.23 1.23 0 0 0 .463-.293c.113-.109.199-.244.258-.404.062-.164.094-.34.094-.528 0-.203-.03-.384-.088-.545a1.102 1.102 0 0 0-.246-.41 1.138 1.138 0 0 0-.416-.246 1.704 1.704 0 0 0-.569-.088c-.191 0-.369.03-.533.088a1.198 1.198 0 0 0-.703.621c-.066.149-.1.315-.1.498h-1.4c0-.34.068-.652.205-.937a2.3 2.3 0 0 1 .568-.744c.243-.207.528-.369.856-.487a3.258 3.258 0 0 1 1.09-.175c.402 0 .771.052 1.107.158.34.101.629.254.867.457a2.1 2.1 0 0 1 .563.762c.133.3.199.65.199 1.048 0 .176-.027.352-.082.528a1.96 1.96 0 0 1-.234.509 2.264 2.264 0 0 1-.961.809c.254.086.468.199.644.34.18.137.326.291.44.463.113.176.195.365.246.568.051.199.076.406.076.621 0 .399-.074.754-.223 1.067a2.222 2.222 0 0 1-.597.779 2.706 2.706 0 0 1-.914.492 3.766 3.766 0 0 1-1.131.164c-.367 0-.721-.051-1.061-.152a2.673 2.673 0 0 1-.896-.457 2.308 2.308 0 0 1-.621-.75 2.286 2.286 0 0 1-.229-1.049h1.4c0 .187.034.361.1.521.07.157.17.29.299.399.125.113.273.201.445.264.176.062.369.093.58.093.227 0 .43-.029.61-.088.183-.062.338-.154.463-.275a1.09 1.09 0 0 0 .275-.422c.066-.172.1-.367.1-.586 0-.246-.038-.457-.112-.633a1.135 1.135 0 0 0-.322-.439 1.401 1.401 0 0 0-.51-.252 2.264 2.264 0 0 0-.656-.088h-.838v-1.101Zm11.197 1.646c0 .547-.064 1.031-.193 1.453a2.875 2.875 0 0 1-.545 1.049 2.237 2.237 0 0 1-.867.656c-.34.145-.727.217-1.16.217-.43 0-.817-.072-1.16-.217a2.286 2.286 0 0 1-.873-.656 2.877 2.877 0 0 1-.557-1.049 5.121 5.121 0 0 1-.188-1.453v-2.021c0-.547.063-1.03.188-1.448.129-.422.312-.777.551-1.066.238-.285.527-.5.867-.645.344-.148.73-.222 1.16-.222.434 0 .82.074 1.16.222.344.145.637.36.879.645.234.289.416.644.545 1.066.129.418.193.901.193 1.448v2.021Zm-4.136-.498 2.713-2.057a3.226 3.226 0 0 0-.129-.791 1.447 1.447 0 0 0-.287-.545 1.034 1.034 0 0 0-.405-.281 1.435 1.435 0 0 0-.533-.094c-.215 0-.404.038-.568.112a1.05 1.05 0 0 0-.411.328 1.656 1.656 0 0 0-.287.639 3.94 3.94 0 0 0-.093.914v1.775Zm2.724.732v-1.711l-2.713 2.045c.02.27.061.508.123.715.067.207.155.379.264.516.109.148.244.26.404.334.164.074.354.111.569.111.211 0 .396-.035.556-.105a1.14 1.14 0 0 0 .411-.323c.128-.164.224-.378.287-.644.066-.266.099-.578.099-.938Zm4.283 1.864c.485 0 .897-.055 1.237-.164.34-.11.619-.266.838-.469.234-.223.406-.477.515-.762.11-.289.18-.599.211-.931v-.03a1.989 1.989 0 0 1-.662.492c-.141.067-.297.12-.469.159a2.46 2.46 0 0 1-.556.058c-.414 0-.776-.078-1.084-.234a2.24 2.24 0 0 1-.762-.627 2.738 2.738 0 0 1-.463-.914 3.827 3.827 0 0 1-.152-1.084c0-.41.06-.795.181-1.154a2.91 2.91 0 0 1 .539-.956 2.53 2.53 0 0 1 .862-.638c.344-.16.734-.24 1.172-.24.441 0 .832.084 1.172.252.343.167.634.396.873.685.25.313.439.691.568 1.137.129.441.193.906.193 1.394v.492a7.72 7.72 0 0 1-.234 1.922 3.89 3.89 0 0 1-.826 1.6c-.321.375-.742.67-1.266.885-.519.215-1.146.322-1.881.322h-.117v-1.195h.111Zm1.413-2.754a1.4 1.4 0 0 0 .867-.293c.121-.09.226-.195.316-.317a1.79 1.79 0 0 0 .229-.404v-.486c0-.34-.039-.641-.118-.903a2.13 2.13 0 0 0-.298-.656 1.317 1.317 0 0 0-.452-.398 1.126 1.126 0 0 0-.55-.141c-.219 0-.414.049-.586.147a1.235 1.235 0 0 0-.422.386 1.87 1.87 0 0 0-.27.58 2.759 2.759 0 0 0-.006 1.366c.055.215.141.406.258.574.114.164.254.297.422.398.172.098.375.147.61.147Z"
              className="309"
            />
            <path
              d="M379.58 280.102h.838c.25 0 .469-.034.656-.1a1.23 1.23 0 0 0 .463-.293c.113-.109.199-.244.258-.404.062-.164.094-.34.094-.528 0-.203-.03-.384-.088-.545a1.102 1.102 0 0 0-.246-.41 1.138 1.138 0 0 0-.416-.246 1.704 1.704 0 0 0-.569-.088c-.191 0-.369.03-.533.088a1.198 1.198 0 0 0-.703.621c-.066.149-.1.315-.1.498h-1.4c0-.34.068-.652.205-.937a2.3 2.3 0 0 1 .568-.744c.243-.207.528-.369.856-.487a3.258 3.258 0 0 1 1.09-.175c.402 0 .771.052 1.107.158.34.101.629.254.867.457a2.1 2.1 0 0 1 .563.762c.133.3.199.65.199 1.048 0 .176-.027.352-.082.528a1.96 1.96 0 0 1-.234.509 2.264 2.264 0 0 1-.961.809c.254.086.468.199.644.34.18.137.326.291.44.463.113.176.195.365.246.568.051.199.076.406.076.621 0 .399-.074.754-.223 1.067a2.222 2.222 0 0 1-.597.779 2.706 2.706 0 0 1-.914.492 3.766 3.766 0 0 1-1.131.164c-.367 0-.721-.051-1.061-.152a2.673 2.673 0 0 1-.896-.457 2.308 2.308 0 0 1-.621-.75 2.286 2.286 0 0 1-.229-1.049h1.4c0 .187.034.361.1.521.07.157.17.29.299.399.125.113.273.201.445.264.176.062.369.093.58.093.227 0 .43-.029.61-.088.183-.062.338-.154.463-.275a1.09 1.09 0 0 0 .275-.422c.066-.172.1-.367.1-.586 0-.246-.038-.457-.112-.633a1.135 1.135 0 0 0-.322-.439 1.401 1.401 0 0 0-.51-.252 2.264 2.264 0 0 0-.656-.088h-.838v-1.101Zm9.516 4.898h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V285Zm8.888-3.252c0 .547-.064 1.031-.193 1.453a2.875 2.875 0 0 1-.545 1.049 2.237 2.237 0 0 1-.867.656c-.34.145-.727.217-1.16.217-.43 0-.817-.072-1.16-.217a2.286 2.286 0 0 1-.873-.656 2.877 2.877 0 0 1-.557-1.049 5.121 5.121 0 0 1-.188-1.453v-2.021c0-.547.063-1.03.188-1.448.129-.422.312-.777.551-1.066.238-.285.527-.5.867-.645.344-.148.73-.222 1.16-.222.434 0 .82.074 1.16.222.344.145.637.36.879.645.234.289.416.644.545 1.066.129.418.193.901.193 1.448v2.021Zm-4.136-.498 2.713-2.057a3.226 3.226 0 0 0-.129-.791 1.433 1.433 0 0 0-.287-.545 1.034 1.034 0 0 0-.405-.281 1.435 1.435 0 0 0-.533-.094c-.215 0-.404.038-.568.112a1.04 1.04 0 0 0-.41.328 1.642 1.642 0 0 0-.288.639 3.94 3.94 0 0 0-.093.914v1.775Zm2.724.732v-1.711l-2.713 2.045c.02.27.061.508.123.715.067.207.155.379.264.516.109.148.244.26.404.334.164.074.354.111.569.111.211 0 .396-.035.556-.105a1.14 1.14 0 0 0 .411-.323c.128-.164.224-.378.287-.644.066-.266.099-.578.099-.938Z"
              className="310"
            />
            <path
              d="M416.529 256h-5.724v-.973l2.777-3.023c.23-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.554-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.424 6.424 0 0 1-.557.744c-.21.25-.441.508-.691.774l-1.898 2.027h3.972V256Zm3.258-4.898h.838c.25 0 .469-.034.656-.1a1.23 1.23 0 0 0 .463-.293c.113-.109.199-.244.258-.404.062-.164.094-.34.094-.528 0-.203-.03-.384-.088-.545a1.102 1.102 0 0 0-.246-.41 1.138 1.138 0 0 0-.416-.246 1.704 1.704 0 0 0-.569-.088c-.191 0-.369.03-.533.088a1.198 1.198 0 0 0-.703.621c-.066.149-.1.315-.1.498h-1.4c0-.34.068-.652.205-.937a2.3 2.3 0 0 1 .568-.744c.243-.207.528-.369.856-.487a3.258 3.258 0 0 1 1.09-.175c.402 0 .771.052 1.107.158.34.101.629.254.867.457a2.1 2.1 0 0 1 .563.762c.133.3.199.65.199 1.048 0 .176-.027.352-.082.528a1.96 1.96 0 0 1-.234.509 2.264 2.264 0 0 1-.961.809c.254.086.469.199.644.34.18.137.326.291.44.463.113.176.195.365.246.568.051.199.076.406.076.621 0 .399-.074.754-.223 1.067a2.222 2.222 0 0 1-.597.779 2.706 2.706 0 0 1-.914.492 3.766 3.766 0 0 1-1.131.164c-.367 0-.721-.051-1.061-.152a2.673 2.673 0 0 1-.896-.457 2.308 2.308 0 0 1-.621-.75 2.286 2.286 0 0 1-.229-1.049h1.401c0 .187.033.361.099.521.07.157.17.29.299.399.125.113.273.201.445.264.176.062.369.093.58.093.227 0 .43-.029.61-.088.183-.062.338-.154.463-.275a1.09 1.09 0 0 0 .275-.422c.066-.172.1-.367.1-.586a1.61 1.61 0 0 0-.112-.633 1.135 1.135 0 0 0-.322-.439 1.401 1.401 0 0 0-.51-.252 2.264 2.264 0 0 0-.656-.088h-.838v-1.101Zm9.516 4.898h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V256Z"
              className="231"
            />
            <path
              d="M413.529 312h-5.724v-.973l2.777-3.023c.23-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.554-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.424 6.424 0 0 1-.557.744c-.21.25-.441.508-.691.774l-1.898 2.027h3.972V312Zm7.248-3.252c0 .547-.064 1.031-.193 1.453a2.875 2.875 0 0 1-.545 1.049 2.237 2.237 0 0 1-.867.656c-.34.145-.727.217-1.16.217-.43 0-.817-.072-1.16-.217a2.286 2.286 0 0 1-.873-.656 2.877 2.877 0 0 1-.557-1.049 5.121 5.121 0 0 1-.188-1.453v-2.021c0-.547.063-1.03.188-1.448.129-.422.312-.777.551-1.066.238-.285.527-.5.867-.645.344-.148.73-.222 1.16-.222.434 0 .82.074 1.16.222.344.145.637.36.879.645.234.289.416.644.545 1.066.129.418.193.901.193 1.448v2.021Zm-4.136-.498 2.713-2.057a3.226 3.226 0 0 0-.129-.791 1.447 1.447 0 0 0-.287-.545 1.034 1.034 0 0 0-.405-.281 1.435 1.435 0 0 0-.533-.094c-.215 0-.404.038-.568.112a1.05 1.05 0 0 0-.411.328 1.656 1.656 0 0 0-.287.639 3.94 3.94 0 0 0-.093.914v1.775Zm2.724.732v-1.711l-2.713 2.045c.02.27.061.508.123.715.067.207.155.379.264.516.109.148.244.26.404.334.164.074.354.111.569.111.211 0 .396-.035.556-.105a1.14 1.14 0 0 0 .411-.323c.128-.164.224-.378.287-.644.066-.266.099-.578.099-.938Zm7.33-5.554v1.189h-.093c-.465 0-.87.065-1.213.194a2.382 2.382 0 0 0-1.418 1.341 3.507 3.507 0 0 0-.241 1.02c.094-.106.204-.207.329-.305.125-.101.263-.191.416-.269.144-.075.304-.133.48-.176.176-.047.361-.07.557-.07.414 0 .773.078 1.078.234.308.156.562.367.762.633.203.265.351.57.445.914.098.344.146.701.146 1.072 0 .406-.062.787-.187 1.143a2.673 2.673 0 0 1-.533.92c-.239.265-.53.474-.873.627-.34.148-.729.222-1.166.222-.45 0-.85-.086-1.202-.258a2.64 2.64 0 0 1-.89-.697 3.137 3.137 0 0 1-.586-1.072 4.248 4.248 0 0 1-.199-1.307v-.58c0-.687.088-1.342.263-1.963a3.95 3.95 0 0 1 .891-1.611 3.473 3.473 0 0 1 1.301-.891c.515-.207 1.105-.31 1.769-.31h.164Zm-1.529 4.06c-.168 0-.328.026-.48.076a1.668 1.668 0 0 0-.422.211c-.118.09-.223.194-.317.311a1.71 1.71 0 0 0-.234.393v.433c0 .34.037.639.111.897.078.257.184.472.317.644.132.172.287.303.463.393.175.09.363.134.562.134.219 0 .414-.042.586-.128.172-.09.318-.211.439-.364.121-.156.213-.34.276-.55.062-.215.094-.448.094-.698 0-.238-.032-.463-.094-.674a1.716 1.716 0 0 0-.264-.562 1.24 1.24 0 0 0-.439-.375 1.226 1.226 0 0 0-.598-.141Z"
              className="206"
            />
            <path
              d="M447.529 287h-5.724v-.973l2.777-3.023c.23-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.554-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.424 6.424 0 0 1-.557.744c-.21.25-.441.508-.691.774l-1.898 2.027h3.972V287Zm3.258-4.898h.838c.25 0 .469-.034.656-.1a1.23 1.23 0 0 0 .463-.293c.113-.109.199-.244.258-.404.062-.164.094-.34.094-.528 0-.203-.03-.384-.088-.545a1.102 1.102 0 0 0-.246-.41 1.138 1.138 0 0 0-.416-.246 1.704 1.704 0 0 0-.569-.088c-.191 0-.369.03-.533.088a1.198 1.198 0 0 0-.703.621c-.066.149-.1.315-.1.498h-1.4c0-.34.068-.652.205-.937a2.3 2.3 0 0 1 .568-.744c.243-.207.528-.369.856-.487a3.258 3.258 0 0 1 1.09-.175c.402 0 .771.052 1.107.158.34.101.629.254.867.457a2.1 2.1 0 0 1 .563.762c.133.3.199.65.199 1.048 0 .176-.027.352-.082.528a1.96 1.96 0 0 1-.234.509 2.264 2.264 0 0 1-.961.809c.254.086.469.199.644.34.18.137.326.291.44.463.113.176.195.365.246.568.051.199.076.406.076.621 0 .399-.074.754-.223 1.067a2.222 2.222 0 0 1-.597.779 2.706 2.706 0 0 1-.914.492 3.766 3.766 0 0 1-1.131.164c-.367 0-.721-.051-1.061-.152a2.673 2.673 0 0 1-.896-.457 2.308 2.308 0 0 1-.621-.75 2.286 2.286 0 0 1-.229-1.049h1.401c0 .187.033.361.099.521.07.157.17.29.299.399.125.113.273.201.445.264.176.062.369.093.58.093.227 0 .43-.029.61-.088.183-.062.338-.154.463-.275a1.09 1.09 0 0 0 .275-.422c.066-.172.1-.367.1-.586a1.61 1.61 0 0 0-.112-.633 1.135 1.135 0 0 0-.322-.439 1.401 1.401 0 0 0-.51-.252 2.264 2.264 0 0 0-.656-.088h-.838v-1.101ZM461.943 287h-5.724v-.973l2.777-3.023c.231-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.342 1.342 0 0 0-.527-.099c-.25 0-.467.035-.651.105a1.22 1.22 0 0 0-.457.299 1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.555-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.205.498-.358.744a6.528 6.528 0 0 1-.556.744c-.211.25-.442.508-.692.774l-1.898 2.027h3.972V287Z"
              className="232"
            />
            <path
              d="M383.338 315.846c.484 0 .896-.055 1.236-.164.34-.11.619-.266.838-.469a2.08 2.08 0 0 0 .516-.762c.109-.289.179-.599.211-.931v-.03a2.038 2.038 0 0 1-.662.492c-.141.067-.297.12-.469.159a2.468 2.468 0 0 1-.557.058c-.414 0-.775-.078-1.084-.234a2.25 2.25 0 0 1-.762-.627 2.717 2.717 0 0 1-.462-.914 3.792 3.792 0 0 1-.153-1.084c0-.41.061-.795.182-1.154a2.91 2.91 0 0 1 .539-.956c.234-.269.521-.482.861-.638.344-.16.735-.24 1.172-.24.442 0 .832.084 1.172.252.344.167.635.396.873.685.25.313.44.691.568 1.137.129.441.194.906.194 1.394v.492c0 .672-.078 1.313-.235 1.922a3.877 3.877 0 0 1-.826 1.6c-.32.375-.742.67-1.265.885-.52.215-1.147.322-1.881.322h-.117v-1.195h.111Zm1.412-2.754a1.41 1.41 0 0 0 .867-.293c.121-.09.227-.195.317-.317.093-.125.17-.259.228-.404v-.486c0-.34-.039-.641-.117-.903a2.13 2.13 0 0 0-.299-.656 1.314 1.314 0 0 0-.451-.398 1.132 1.132 0 0 0-.551-.141c-.219 0-.414.049-.586.147a1.244 1.244 0 0 0-.422.386 1.846 1.846 0 0 0-.269.58c-.059.219-.088.45-.088.692 0 .234.027.459.082.674.055.215.141.406.258.574.113.164.254.297.422.398.171.098.375.147.609.147Zm10.131.656c0 .547-.065 1.031-.193 1.453a2.89 2.89 0 0 1-.545 1.049 2.248 2.248 0 0 1-.868.656 2.926 2.926 0 0 1-1.16.217c-.429 0-.816-.072-1.16-.217a2.286 2.286 0 0 1-.873-.656 2.892 2.892 0 0 1-.557-1.049 5.123 5.123 0 0 1-.187-1.453v-2.021c0-.547.062-1.03.187-1.448.129-.422.313-.777.551-1.066.238-.285.528-.5.867-.645a2.91 2.91 0 0 1 1.161-.222c.433 0 .82.074 1.16.222.343.145.636.36.879.645.234.289.416.644.545 1.066.128.418.193.901.193 1.448v2.021Zm-4.137-.498 2.713-2.057a3.226 3.226 0 0 0-.129-.791 1.419 1.419 0 0 0-.287-.545 1.024 1.024 0 0 0-.404-.281 1.439 1.439 0 0 0-.533-.094c-.215 0-.405.038-.569.112a1.04 1.04 0 0 0-.41.328 1.627 1.627 0 0 0-.287.639 3.881 3.881 0 0 0-.094.914v1.775Zm2.725.732v-1.711l-2.713 2.045c.019.27.06.508.123.715.066.207.154.379.264.516.109.148.244.26.404.334.164.074.353.111.568.111.211 0 .397-.035.557-.105.16-.075.297-.182.41-.323.129-.164.225-.378.287-.644.067-.266.1-.578.1-.938Z"
              className="90"
            />
            <path
              d="M340.529 324h-5.724v-.973l2.777-3.023c.23-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.554-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.424 6.424 0 0 1-.557.744c-.21.25-.441.508-.691.774l-1.898 2.027h3.972V324Zm7.248-3.252c0 .547-.064 1.031-.193 1.453a2.875 2.875 0 0 1-.545 1.049 2.237 2.237 0 0 1-.867.656c-.34.145-.727.217-1.16.217-.43 0-.817-.072-1.16-.217a2.286 2.286 0 0 1-.873-.656 2.877 2.877 0 0 1-.557-1.049 5.121 5.121 0 0 1-.188-1.453v-2.021c0-.547.063-1.03.188-1.448.129-.422.312-.777.551-1.066.238-.285.527-.5.867-.645.344-.148.73-.222 1.16-.222.434 0 .82.074 1.16.222.344.145.637.36.879.645.234.289.416.644.545 1.066.129.418.193.901.193 1.448v2.021Zm-4.136-.498 2.713-2.057a3.226 3.226 0 0 0-.129-.791 1.447 1.447 0 0 0-.287-.545 1.034 1.034 0 0 0-.405-.281 1.435 1.435 0 0 0-.533-.094c-.215 0-.404.038-.568.112a1.05 1.05 0 0 0-.411.328 1.656 1.656 0 0 0-.287.639 3.94 3.94 0 0 0-.093.914v1.775Zm2.724.732v-1.711l-2.713 2.045c.02.27.061.508.123.715.067.207.155.379.264.516.109.148.244.26.404.334.164.074.354.111.569.111.211 0 .396-.035.556-.105a1.14 1.14 0 0 0 .411-.323c.128-.164.224-.378.287-.644.066-.266.099-.578.099-.938Zm3.358-1.212.457-4.301h4.588v1.242h-3.422l-.223 2.045c.141-.082.324-.16.551-.235.23-.074.494-.111.791-.111.402 0 .762.067 1.078.199.32.133.592.323.814.569.219.25.387.552.504.908.118.352.176.748.176 1.189 0 .391-.057.76-.17 1.108a2.437 2.437 0 0 1-.51.902 2.356 2.356 0 0 1-.861.61c-.348.148-.758.222-1.23.222-.36 0-.704-.051-1.032-.152a2.663 2.663 0 0 1-.873-.469 2.463 2.463 0 0 1-.627-.756 2.545 2.545 0 0 1-.275-1.049h1.365c.051.418.203.739.457.961.258.223.586.334.985.334.234 0 .437-.043.609-.129.172-.086.316-.207.434-.363a1.63 1.63 0 0 0 .246-.551c.054-.218.082-.455.082-.709 0-.246-.033-.47-.1-.673a1.49 1.49 0 0 0-.287-.54 1.283 1.283 0 0 0-.48-.351 1.621 1.621 0 0 0-.668-.129c-.168 0-.315.014-.44.041a1.46 1.46 0 0 0-.592.27 2.535 2.535 0 0 0-.228.193l-1.119-.275Z"
              className="205"
            />
            <path
              d="M369.51 359.719c0 .258-.043.498-.129.72a1.904 1.904 0 0 1-.352.598 2.249 2.249 0 0 1-.726.574c.176.082.338.178.486.287.152.106.285.229.399.37.16.187.285.4.374.638.09.239.135.496.135.774 0 .394-.072.744-.217 1.049a2.152 2.152 0 0 1-.591.761 2.617 2.617 0 0 1-.891.469 3.635 3.635 0 0 1-1.09.158c-.398 0-.769-.053-1.113-.158a2.552 2.552 0 0 1-.885-.469 2.144 2.144 0 0 1-.598-.756 2.497 2.497 0 0 1-.21-1.054c0-.235.031-.457.093-.668.067-.211.16-.407.282-.586.121-.172.265-.326.433-.463a2.68 2.68 0 0 1 .574-.358 2.157 2.157 0 0 1-.861-.755 2.074 2.074 0 0 1-.334-1.131c0-.379.065-.715.193-1.008a2.181 2.181 0 0 1 1.36-1.201 3.32 3.32 0 0 1 1.049-.158c.375 0 .72.052 1.037.158.32.101.599.254.838.457.23.199.412.447.545.744.132.293.199.629.199 1.008Zm-1.213 3.885c0-.211-.035-.403-.106-.575a1.365 1.365 0 0 0-.281-.457 1.303 1.303 0 0 0-.445-.281 1.574 1.574 0 0 0-.569-.1c-.214 0-.408.034-.58.1-.168.066-.312.16-.433.281a1.365 1.365 0 0 0-.281.457 1.68 1.68 0 0 0-.094.58c0 .219.033.416.099.592.067.172.163.317.288.434.121.113.265.201.433.263.172.059.365.088.58.088a1.6 1.6 0 0 0 .557-.093c.172-.063.32-.153.445-.27.117-.121.211-.266.281-.434.071-.171.106-.367.106-.585Zm-.182-3.833a1.38 1.38 0 0 0-.094-.521 1.256 1.256 0 0 0-.246-.41 1.194 1.194 0 0 0-.386-.258 1.301 1.301 0 0 0-.504-.094c-.184 0-.35.032-.498.094-.145.059-.27.143-.375.252a1.11 1.11 0 0 0-.235.404 1.66 1.66 0 0 0-.082.533c0 .192.028.368.082.528.055.156.137.289.246.398a1.1 1.1 0 0 0 .381.264c.149.062.315.094.498.094.184 0 .35-.032.498-.094.149-.063.276-.15.381-.264.106-.109.188-.242.246-.398.059-.16.088-.336.088-.528Zm4.43 5.075c.484 0 .896-.055 1.236-.164.34-.11.619-.266.838-.469.235-.223.406-.477.516-.762.109-.289.179-.599.211-.931v-.03a2.038 2.038 0 0 1-.662.492c-.141.067-.297.12-.469.159a2.468 2.468 0 0 1-.557.058c-.414 0-.775-.078-1.084-.234a2.26 2.26 0 0 1-.762-.627 2.717 2.717 0 0 1-.462-.914 3.792 3.792 0 0 1-.153-1.084c0-.41.061-.795.182-1.154a2.91 2.91 0 0 1 .539-.956c.234-.269.521-.482.861-.638.344-.16.735-.24 1.172-.24.442 0 .832.084 1.172.252.344.167.635.396.873.685.25.313.44.691.568 1.137.129.441.194.906.194 1.394v.492c0 .672-.078 1.313-.235 1.922a3.877 3.877 0 0 1-.826 1.6c-.32.375-.742.67-1.265.885-.52.215-1.147.322-1.881.322h-.117v-1.195h.111Zm1.412-2.754a1.41 1.41 0 0 0 .867-.293c.121-.09.227-.195.317-.317.093-.125.17-.259.228-.404v-.486c0-.34-.039-.641-.117-.903a2.13 2.13 0 0 0-.299-.656 1.314 1.314 0 0 0-.451-.398 1.132 1.132 0 0 0-.551-.141c-.219 0-.414.049-.586.147a1.244 1.244 0 0 0-.422.386 1.846 1.846 0 0 0-.269.58c-.059.219-.088.45-.088.692 0 .234.027.459.082.674.055.215.141.406.258.574.113.164.254.297.422.398.172.098.375.147.609.147Z"
              className="89"
            />
            <path
              d="M383.338 395.846c.484 0 .896-.055 1.236-.164.34-.11.619-.266.838-.469a2.08 2.08 0 0 0 .516-.762c.109-.289.179-.599.211-.931v-.03a2.038 2.038 0 0 1-.662.492c-.141.067-.297.12-.469.159a2.468 2.468 0 0 1-.557.058c-.414 0-.775-.078-1.084-.234a2.25 2.25 0 0 1-.762-.627 2.717 2.717 0 0 1-.462-.914 3.792 3.792 0 0 1-.153-1.084c0-.41.061-.795.182-1.154a2.91 2.91 0 0 1 .539-.956c.234-.269.521-.482.861-.638.344-.16.735-.24 1.172-.24.442 0 .832.084 1.172.252.344.167.635.396.873.685.25.313.44.691.568 1.137.129.441.194.906.194 1.394v.492c0 .672-.078 1.313-.235 1.922a3.877 3.877 0 0 1-.826 1.6c-.32.375-.742.67-1.265.885-.52.215-1.147.322-1.881.322h-.117v-1.195h.111Zm1.412-2.754a1.41 1.41 0 0 0 .867-.293c.121-.09.227-.195.317-.317.093-.125.17-.259.228-.404v-.486c0-.34-.039-.641-.117-.903a2.13 2.13 0 0 0-.299-.656 1.314 1.314 0 0 0-.451-.398 1.132 1.132 0 0 0-.551-.141c-.219 0-.414.049-.586.147a1.244 1.244 0 0 0-.422.386 1.846 1.846 0 0 0-.269.58c-.059.219-.088.45-.088.692 0 .234.027.459.082.674.055.215.141.406.258.574.113.164.254.297.422.398.171.098.375.147.609.147Zm9.264.867h1.072v1.137h-1.072V397h-1.401v-1.904h-3.691l-.035-.862 3.685-5.765h1.442v5.49Zm-3.698 0h2.297v-3.615l-.164.304-2.133 3.311Z"
              className="94"
            />
            <path
              d="M420.529 374h-5.724v-.973l2.777-3.023c.23-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.554-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.424 6.424 0 0 1-.557.744c-.21.25-.441.508-.691.774l-1.898 2.027h3.972V374Zm7.248-3.252c0 .547-.064 1.031-.193 1.453a2.875 2.875 0 0 1-.545 1.049 2.237 2.237 0 0 1-.867.656c-.34.145-.727.217-1.16.217-.43 0-.817-.072-1.16-.217a2.286 2.286 0 0 1-.873-.656 2.877 2.877 0 0 1-.557-1.049 5.121 5.121 0 0 1-.188-1.453v-2.021c0-.547.063-1.03.188-1.448.129-.422.312-.777.551-1.066.238-.285.527-.5.867-.645.344-.148.73-.222 1.16-.222.434 0 .82.074 1.16.222.344.145.637.36.879.645.234.289.416.644.545 1.066.129.418.193.901.193 1.448v2.021Zm-4.136-.498 2.713-2.057a3.226 3.226 0 0 0-.129-.791 1.447 1.447 0 0 0-.287-.545 1.034 1.034 0 0 0-.405-.281 1.435 1.435 0 0 0-.533-.094c-.215 0-.404.038-.568.112a1.05 1.05 0 0 0-.411.328 1.656 1.656 0 0 0-.287.639 3.94 3.94 0 0 0-.093.914v1.775Zm2.724.732v-1.711l-2.713 2.045c.02.27.061.508.123.715.067.207.155.379.264.516.109.148.244.26.404.334.164.074.354.111.569.111.211 0 .396-.035.556-.105a1.14 1.14 0 0 0 .411-.323c.128-.164.224-.378.287-.644.066-.266.099-.578.099-.938Zm8.649-4.728-3.41 7.746h-1.477l3.41-7.359h-4.424v-1.172h5.901v.785Z"
              className="207"
            />
            <path
              d="M454.58 352.102h.838c.25 0 .469-.034.656-.1a1.23 1.23 0 0 0 .463-.293c.113-.109.199-.244.258-.404.062-.164.094-.34.094-.528 0-.203-.03-.384-.088-.545a1.102 1.102 0 0 0-.246-.41 1.138 1.138 0 0 0-.416-.246 1.704 1.704 0 0 0-.569-.088c-.191 0-.369.03-.533.088a1.198 1.198 0 0 0-.703.621c-.066.149-.1.315-.1.498h-1.4c0-.34.068-.652.205-.937a2.3 2.3 0 0 1 .568-.744c.243-.207.528-.369.856-.487a3.258 3.258 0 0 1 1.09-.175c.402 0 .771.052 1.107.158.34.101.629.254.867.457a2.1 2.1 0 0 1 .563.762c.133.3.199.65.199 1.048 0 .176-.027.352-.082.528a1.96 1.96 0 0 1-.234.509 2.264 2.264 0 0 1-.961.809c.254.086.468.199.644.34.18.137.326.291.44.463.113.176.195.365.246.568.051.199.076.406.076.621 0 .399-.074.754-.223 1.067a2.222 2.222 0 0 1-.597.779 2.706 2.706 0 0 1-.914.492 3.766 3.766 0 0 1-1.131.164c-.367 0-.721-.051-1.061-.152a2.673 2.673 0 0 1-.896-.457 2.308 2.308 0 0 1-.621-.75 2.286 2.286 0 0 1-.229-1.049h1.4c0 .187.034.361.1.521.07.157.17.29.299.399.125.113.273.201.445.264.176.062.369.093.58.093.227 0 .43-.029.61-.088.183-.062.338-.154.463-.275a1.09 1.09 0 0 0 .275-.422c.066-.172.1-.367.1-.586 0-.246-.038-.457-.112-.633a1.135 1.135 0 0 0-.322-.439 1.401 1.401 0 0 0-.51-.252 2.264 2.264 0 0 0-.656-.088h-.838v-1.101Zm11.197 1.646c0 .547-.064 1.031-.193 1.453a2.875 2.875 0 0 1-.545 1.049 2.237 2.237 0 0 1-.867.656c-.34.145-.727.217-1.16.217-.43 0-.817-.072-1.16-.217a2.286 2.286 0 0 1-.873-.656 2.877 2.877 0 0 1-.557-1.049 5.121 5.121 0 0 1-.188-1.453v-2.021c0-.547.063-1.03.188-1.448.129-.422.312-.777.551-1.066.238-.285.527-.5.867-.645.344-.148.73-.222 1.16-.222.434 0 .82.074 1.16.222.344.145.637.36.879.645.234.289.416.644.545 1.066.129.418.193.901.193 1.448v2.021Zm-4.136-.498 2.713-2.057a3.226 3.226 0 0 0-.129-.791 1.447 1.447 0 0 0-.287-.545 1.034 1.034 0 0 0-.405-.281 1.435 1.435 0 0 0-.533-.094c-.215 0-.404.038-.568.112a1.05 1.05 0 0 0-.411.328 1.656 1.656 0 0 0-.287.639 3.94 3.94 0 0 0-.093.914v1.775Zm2.724.732v-1.711l-2.713 2.045c.02.27.061.508.123.715.067.207.155.379.264.516.109.148.244.26.404.334.164.074.354.111.569.111.211 0 .396-.035.556-.105a1.14 1.14 0 0 0 .411-.323c.128-.164.224-.378.287-.644.066-.266.099-.578.099-.938Zm8.619-.234c0 .547-.064 1.031-.193 1.453a2.875 2.875 0 0 1-.545 1.049 2.237 2.237 0 0 1-.867.656c-.34.145-.727.217-1.16.217-.43 0-.817-.072-1.16-.217a2.286 2.286 0 0 1-.873-.656 2.877 2.877 0 0 1-.557-1.049 5.121 5.121 0 0 1-.188-1.453v-2.021c0-.547.063-1.03.188-1.448.129-.422.312-.777.551-1.066.238-.285.527-.5.867-.645.344-.148.73-.222 1.16-.222.434 0 .82.074 1.16.222.344.145.637.36.879.645.234.289.416.644.545 1.066.129.418.193.901.193 1.448v2.021Zm-4.136-.498 2.713-2.057a3.226 3.226 0 0 0-.129-.791 1.433 1.433 0 0 0-.287-.545 1.034 1.034 0 0 0-.405-.281 1.435 1.435 0 0 0-.533-.094c-.215 0-.404.038-.568.112a1.04 1.04 0 0 0-.41.328 1.642 1.642 0 0 0-.288.639 3.94 3.94 0 0 0-.093.914v1.775Zm2.724.732v-1.711l-2.713 2.045c.02.27.061.508.123.715.067.207.155.379.264.516.109.148.244.26.404.334.164.074.354.111.569.111.211 0 .396-.035.556-.105a1.14 1.14 0 0 0 .411-.323c.128-.164.224-.378.287-.644.066-.266.099-.578.099-.938Z"
              className="300"
            />
            <path
              d="M448.529 326h-5.724v-.973l2.777-3.023c.23-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.554-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.424 6.424 0 0 1-.557.744c-.21.25-.441.508-.691.774l-1.898 2.027h3.972V326Zm3.258-4.898h.838c.25 0 .469-.034.656-.1a1.23 1.23 0 0 0 .463-.293c.113-.109.199-.244.258-.404.062-.164.094-.34.094-.528 0-.203-.03-.384-.088-.545a1.102 1.102 0 0 0-.246-.41 1.138 1.138 0 0 0-.416-.246 1.704 1.704 0 0 0-.569-.088c-.191 0-.369.03-.533.088a1.198 1.198 0 0 0-.703.621c-.066.149-.1.315-.1.498h-1.4c0-.34.068-.652.205-.937a2.3 2.3 0 0 1 .568-.744c.243-.207.528-.369.856-.487a3.258 3.258 0 0 1 1.09-.175c.402 0 .771.052 1.107.158.34.101.629.254.867.457a2.1 2.1 0 0 1 .563.762c.133.3.199.65.199 1.048 0 .176-.027.352-.082.528a1.96 1.96 0 0 1-.234.509 2.264 2.264 0 0 1-.961.809c.254.086.469.199.644.34.18.137.326.291.44.463.113.176.195.365.246.568.051.199.076.406.076.621 0 .399-.074.754-.223 1.067a2.222 2.222 0 0 1-.597.779 2.706 2.706 0 0 1-.914.492 3.766 3.766 0 0 1-1.131.164c-.367 0-.721-.051-1.061-.152a2.673 2.673 0 0 1-.896-.457 2.308 2.308 0 0 1-.621-.75 2.286 2.286 0 0 1-.229-1.049h1.401c0 .187.033.361.099.521.07.157.17.29.299.399.125.113.273.201.445.264.176.062.369.093.58.093.227 0 .43-.029.61-.088.183-.062.338-.154.463-.275a1.09 1.09 0 0 0 .275-.422c.066-.172.1-.367.1-.586a1.61 1.61 0 0 0-.112-.633 1.135 1.135 0 0 0-.322-.439 1.401 1.401 0 0 0-.51-.252 2.264 2.264 0 0 0-.656-.088h-.838v-1.101Zm7.207 0h.838c.25 0 .469-.034.656-.1a1.23 1.23 0 0 0 .463-.293c.113-.109.199-.244.258-.404.062-.164.094-.34.094-.528 0-.203-.03-.384-.088-.545a1.102 1.102 0 0 0-.246-.41 1.138 1.138 0 0 0-.416-.246 1.704 1.704 0 0 0-.569-.088c-.191 0-.369.03-.533.088a1.198 1.198 0 0 0-.703.621c-.066.149-.1.315-.1.498h-1.4c0-.34.068-.652.205-.937a2.3 2.3 0 0 1 .568-.744c.243-.207.528-.369.856-.487a3.258 3.258 0 0 1 1.09-.175c.402 0 .771.052 1.107.158.34.101.629.254.867.457a2.1 2.1 0 0 1 .563.762c.133.3.199.65.199 1.048 0 .176-.027.352-.082.528a1.96 1.96 0 0 1-.234.509 2.264 2.264 0 0 1-.961.809c.254.086.469.199.644.34.18.137.326.291.44.463.113.176.195.365.246.568.051.199.076.406.076.621 0 .399-.074.754-.223 1.067a2.222 2.222 0 0 1-.597.779 2.706 2.706 0 0 1-.914.492 3.766 3.766 0 0 1-1.131.164c-.367 0-.721-.051-1.061-.152a2.673 2.673 0 0 1-.896-.457 2.308 2.308 0 0 1-.621-.75 2.286 2.286 0 0 1-.229-1.049h1.401c0 .187.033.361.099.521.07.157.17.29.299.399.125.113.273.201.445.264.176.062.369.093.58.093.227 0 .43-.029.61-.088.183-.062.338-.154.463-.275.121-.113.213-.254.275-.422.066-.172.1-.367.1-.586a1.61 1.61 0 0 0-.112-.633 1.135 1.135 0 0 0-.322-.439 1.393 1.393 0 0 0-.51-.252 2.264 2.264 0 0 0-.656-.088h-.838v-1.101Z"
              className="233"
            />
            <path
              d="M473.529 308h-5.724v-.973l2.777-3.023c.23-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.554-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.424 6.424 0 0 1-.557.744c-.21.25-.441.508-.691.774l-1.898 2.027h3.972V308Zm3.258-4.898h.838c.25 0 .469-.034.656-.1a1.23 1.23 0 0 0 .463-.293c.113-.109.199-.244.258-.404.062-.164.094-.34.094-.528 0-.203-.03-.384-.088-.545a1.102 1.102 0 0 0-.246-.41 1.138 1.138 0 0 0-.416-.246 1.704 1.704 0 0 0-.569-.088c-.191 0-.369.03-.533.088a1.198 1.198 0 0 0-.703.621c-.066.149-.1.315-.1.498h-1.4c0-.34.068-.652.205-.937a2.3 2.3 0 0 1 .568-.744c.243-.207.528-.369.856-.487a3.258 3.258 0 0 1 1.09-.175c.402 0 .771.052 1.107.158.34.101.629.254.867.457a2.1 2.1 0 0 1 .563.762c.133.3.199.65.199 1.048 0 .176-.027.352-.082.528a1.96 1.96 0 0 1-.234.509 2.264 2.264 0 0 1-.961.809c.254.086.469.199.644.34.18.137.326.291.44.463.113.176.195.365.246.568.051.199.076.406.076.621 0 .399-.074.754-.223 1.067a2.222 2.222 0 0 1-.597.779 2.706 2.706 0 0 1-.914.492 3.766 3.766 0 0 1-1.131.164c-.367 0-.721-.051-1.061-.152a2.673 2.673 0 0 1-.896-.457 2.308 2.308 0 0 1-.621-.75 2.286 2.286 0 0 1-.229-1.049h1.401c0 .187.033.361.099.521.07.157.17.29.299.399.125.113.273.201.445.264.176.062.369.093.58.093.227 0 .43-.029.61-.088.183-.062.338-.154.463-.275a1.09 1.09 0 0 0 .275-.422c.066-.172.1-.367.1-.586a1.61 1.61 0 0 0-.112-.633 1.135 1.135 0 0 0-.322-.439 1.401 1.401 0 0 0-.51-.252 2.264 2.264 0 0 0-.656-.088h-.838v-1.101Zm10.33 1.857h1.072v1.137h-1.072V308h-1.4v-1.904h-3.692l-.035-.862 3.686-5.765h1.441v5.49Zm-3.697 0h2.297v-3.615l-.164.304-2.133 3.311Z"
              className="234"
            />
            <path
              d="M507.529 330h-5.724v-.973l2.777-3.023c.23-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.554-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.424 6.424 0 0 1-.557.744c-.21.25-.441.508-.691.774l-1.898 2.027h3.972V330Zm2.912-1.154c.485 0 .897-.055 1.237-.164.34-.11.619-.266.838-.469.234-.223.406-.477.515-.762.11-.289.18-.599.211-.931v-.03a1.989 1.989 0 0 1-.662.492c-.141.067-.297.12-.469.159a2.46 2.46 0 0 1-.556.058c-.414 0-.776-.078-1.084-.234a2.24 2.24 0 0 1-.762-.627 2.738 2.738 0 0 1-.463-.914 3.827 3.827 0 0 1-.152-1.084c0-.41.06-.795.181-1.154a2.91 2.91 0 0 1 .539-.956 2.53 2.53 0 0 1 .862-.638c.344-.16.734-.24 1.172-.24.441 0 .832.084 1.172.252.343.167.634.396.873.685.25.313.439.691.568 1.137.129.441.193.906.193 1.394v.492a7.72 7.72 0 0 1-.234 1.922 3.89 3.89 0 0 1-.826 1.6c-.321.375-.742.67-1.266.885-.519.215-1.146.322-1.881.322h-.117v-1.195h.111Zm1.413-2.754a1.4 1.4 0 0 0 .867-.293c.121-.09.226-.195.316-.317a1.79 1.79 0 0 0 .229-.404v-.486c0-.34-.039-.641-.118-.903a2.13 2.13 0 0 0-.298-.656 1.317 1.317 0 0 0-.452-.398 1.126 1.126 0 0 0-.55-.141c-.219 0-.414.049-.586.147a1.235 1.235 0 0 0-.422.386 1.87 1.87 0 0 0-.27.58 2.759 2.759 0 0 0-.006 1.366c.055.215.141.406.258.574.114.164.254.297.422.398.172.098.375.147.61.147Zm5.794 2.754c.485 0 .897-.055 1.237-.164.34-.11.619-.266.838-.469.234-.223.406-.477.515-.762.11-.289.18-.599.211-.931v-.03a1.989 1.989 0 0 1-.662.492c-.141.067-.297.12-.469.159a2.46 2.46 0 0 1-.556.058c-.414 0-.776-.078-1.084-.234a2.24 2.24 0 0 1-.762-.627 2.738 2.738 0 0 1-.463-.914 3.827 3.827 0 0 1-.152-1.084c0-.41.06-.795.181-1.154a2.91 2.91 0 0 1 .539-.956 2.53 2.53 0 0 1 .862-.638c.344-.16.734-.24 1.172-.24.441 0 .832.084 1.172.252.343.167.634.396.873.685.25.313.439.691.568 1.137.129.441.193.906.193 1.394v.492a7.72 7.72 0 0 1-.234 1.922 3.89 3.89 0 0 1-.826 1.6c-.321.375-.742.67-1.266.885-.519.215-1.146.322-1.881.322h-.117v-1.195h.111Zm1.413-2.754a1.4 1.4 0 0 0 .867-.293c.121-.09.226-.195.316-.317a1.79 1.79 0 0 0 .229-.404v-.486c0-.34-.039-.641-.118-.903a2.13 2.13 0 0 0-.298-.656 1.317 1.317 0 0 0-.452-.398 1.126 1.126 0 0 0-.55-.141c-.219 0-.414.049-.586.147a1.235 1.235 0 0 0-.422.386 1.87 1.87 0 0 0-.27.58 2.759 2.759 0 0 0-.006 1.366c.055.215.141.406.258.574.114.164.254.297.422.398.172.098.375.147.61.147Z"
              className="299"
            />
            <path
              d="M499.58 288.102h.838c.25 0 .469-.034.656-.1a1.23 1.23 0 0 0 .463-.293c.113-.109.199-.244.258-.404.062-.164.094-.34.094-.528 0-.203-.03-.384-.088-.545a1.102 1.102 0 0 0-.246-.41 1.138 1.138 0 0 0-.416-.246 1.704 1.704 0 0 0-.569-.088c-.191 0-.369.03-.533.088a1.198 1.198 0 0 0-.703.621c-.066.149-.1.315-.1.498h-1.4c0-.34.068-.652.205-.937a2.3 2.3 0 0 1 .568-.744c.243-.207.528-.369.856-.487a3.258 3.258 0 0 1 1.09-.175c.402 0 .771.052 1.107.158.34.101.629.254.867.457a2.1 2.1 0 0 1 .563.762c.133.3.199.65.199 1.048 0 .176-.027.352-.082.528a1.96 1.96 0 0 1-.234.509 2.264 2.264 0 0 1-.961.809c.254.086.468.199.644.34.18.137.326.291.44.463.113.176.195.365.246.568.051.199.076.406.076.621 0 .399-.074.754-.223 1.067a2.222 2.222 0 0 1-.597.779 2.706 2.706 0 0 1-.914.492 3.766 3.766 0 0 1-1.131.164c-.367 0-.721-.051-1.061-.152a2.673 2.673 0 0 1-.896-.457 2.308 2.308 0 0 1-.621-.75 2.286 2.286 0 0 1-.229-1.049h1.4c0 .187.034.361.1.521.07.157.17.29.299.399.125.113.273.201.445.264.176.062.369.093.58.093.227 0 .43-.029.61-.088.183-.062.338-.154.463-.275a1.09 1.09 0 0 0 .275-.422c.066-.172.1-.367.1-.586 0-.246-.038-.457-.112-.633a1.135 1.135 0 0 0-.322-.439 1.401 1.401 0 0 0-.51-.252 2.264 2.264 0 0 0-.656-.088h-.838v-1.101Zm11.197 1.646c0 .547-.064 1.031-.193 1.453a2.875 2.875 0 0 1-.545 1.049 2.237 2.237 0 0 1-.867.656c-.34.145-.727.217-1.16.217-.43 0-.817-.072-1.16-.217a2.286 2.286 0 0 1-.873-.656 2.877 2.877 0 0 1-.557-1.049 5.121 5.121 0 0 1-.188-1.453v-2.021c0-.547.063-1.03.188-1.448.129-.422.312-.777.551-1.066.238-.285.527-.5.867-.645.344-.148.73-.222 1.16-.222.434 0 .82.074 1.16.222.344.145.637.36.879.645.234.289.416.644.545 1.066.129.418.193.901.193 1.448v2.021Zm-4.136-.498 2.713-2.057a3.226 3.226 0 0 0-.129-.791 1.447 1.447 0 0 0-.287-.545 1.034 1.034 0 0 0-.405-.281 1.435 1.435 0 0 0-.533-.094c-.215 0-.404.038-.568.112a1.05 1.05 0 0 0-.411.328 1.656 1.656 0 0 0-.287.639 3.94 3.94 0 0 0-.093.914v1.775Zm2.724.732v-1.711l-2.713 2.045c.02.27.061.508.123.715.067.207.155.379.264.516.109.148.244.26.404.334.164.074.354.111.569.111.211 0 .396-.035.556-.105a1.14 1.14 0 0 0 .411-.323c.128-.164.224-.378.287-.644.066-.266.099-.578.099-.938Zm7.33-5.554v1.189h-.093c-.465 0-.87.065-1.213.194a2.382 2.382 0 0 0-1.418 1.341 3.507 3.507 0 0 0-.241 1.02c.094-.106.204-.207.329-.305.125-.101.263-.191.416-.269.144-.075.304-.133.48-.176.176-.047.361-.07.557-.07.414 0 .773.078 1.078.234.308.156.562.367.762.633.203.265.351.57.445.914.098.344.146.701.146 1.072 0 .406-.062.787-.187 1.143a2.673 2.673 0 0 1-.533.92c-.239.265-.53.474-.873.627-.34.148-.729.222-1.166.222-.45 0-.85-.086-1.202-.258a2.64 2.64 0 0 1-.89-.697 3.137 3.137 0 0 1-.586-1.072 4.248 4.248 0 0 1-.199-1.307v-.58c0-.687.088-1.342.263-1.963a3.95 3.95 0 0 1 .891-1.611 3.473 3.473 0 0 1 1.301-.891c.515-.207 1.105-.31 1.769-.31h.164Zm-1.529 4.06c-.168 0-.328.026-.48.076a1.668 1.668 0 0 0-.422.211c-.118.09-.223.194-.317.311a1.71 1.71 0 0 0-.234.393v.433c0 .34.037.639.111.897.078.257.184.472.317.644.132.172.287.303.463.393.175.09.363.134.562.134.219 0 .414-.042.586-.128.172-.09.318-.211.439-.364.121-.156.213-.34.276-.55.062-.215.094-.448.094-.698 0-.238-.032-.463-.094-.674a1.716 1.716 0 0 0-.264-.562 1.24 1.24 0 0 0-.439-.375 1.226 1.226 0 0 0-.598-.141Z"
              className="306"
            />
            <path
              d="M520.58 278.102h.838c.25 0 .469-.034.656-.1a1.23 1.23 0 0 0 .463-.293c.113-.109.199-.244.258-.404.062-.164.094-.34.094-.528 0-.203-.03-.384-.088-.545a1.102 1.102 0 0 0-.246-.41 1.138 1.138 0 0 0-.416-.246 1.704 1.704 0 0 0-.569-.088c-.191 0-.369.03-.533.088a1.198 1.198 0 0 0-.703.621c-.066.149-.1.315-.1.498h-1.4c0-.34.068-.652.205-.937a2.3 2.3 0 0 1 .568-.744c.243-.207.528-.369.856-.487a3.258 3.258 0 0 1 1.09-.175c.402 0 .771.052 1.107.158.34.101.629.254.867.457a2.1 2.1 0 0 1 .563.762c.133.3.199.65.199 1.048 0 .176-.027.352-.082.528a1.96 1.96 0 0 1-.234.509 2.264 2.264 0 0 1-.961.809c.254.086.468.199.644.34.18.137.326.291.44.463.113.176.195.365.246.568.051.199.076.406.076.621 0 .399-.074.754-.223 1.067a2.222 2.222 0 0 1-.597.779 2.706 2.706 0 0 1-.914.492 3.766 3.766 0 0 1-1.131.164c-.367 0-.721-.051-1.061-.152a2.673 2.673 0 0 1-.896-.457 2.308 2.308 0 0 1-.621-.75 2.286 2.286 0 0 1-.229-1.049h1.4c0 .187.034.361.1.521.07.157.17.29.299.399.125.113.273.201.445.264.176.062.369.093.58.093.227 0 .43-.029.61-.088.183-.062.338-.154.463-.275a1.09 1.09 0 0 0 .275-.422c.066-.172.1-.367.1-.586 0-.246-.038-.457-.112-.633a1.135 1.135 0 0 0-.322-.439 1.401 1.401 0 0 0-.51-.252 2.264 2.264 0 0 0-.656-.088h-.838v-1.101Zm11.197 1.646c0 .547-.064 1.031-.193 1.453a2.875 2.875 0 0 1-.545 1.049 2.237 2.237 0 0 1-.867.656c-.34.145-.727.217-1.16.217-.43 0-.817-.072-1.16-.217a2.286 2.286 0 0 1-.873-.656 2.877 2.877 0 0 1-.557-1.049 5.121 5.121 0 0 1-.188-1.453v-2.021c0-.547.063-1.03.188-1.448.129-.422.312-.777.551-1.066.238-.285.527-.5.867-.645.344-.148.73-.222 1.16-.222.434 0 .82.074 1.16.222.344.145.637.36.879.645.234.289.416.644.545 1.066.129.418.193.901.193 1.448v2.021Zm-4.136-.498 2.713-2.057a3.226 3.226 0 0 0-.129-.791 1.447 1.447 0 0 0-.287-.545 1.034 1.034 0 0 0-.405-.281 1.435 1.435 0 0 0-.533-.094c-.215 0-.404.038-.568.112a1.05 1.05 0 0 0-.411.328 1.656 1.656 0 0 0-.287.639 3.94 3.94 0 0 0-.093.914v1.775Zm2.724.732v-1.711l-2.713 2.045c.02.27.061.508.123.715.067.207.155.379.264.516.109.148.244.26.404.334.164.074.354.111.569.111.211 0 .396-.035.556-.105a1.14 1.14 0 0 0 .411-.323c.128-.164.224-.378.287-.644.066-.266.099-.578.099-.938Zm8.649-4.728-3.41 7.746h-1.477l3.41-7.359h-4.424v-1.172h5.901v.785Z"
              className="307"
            />
            <path
              d="M540.529 307h-5.724v-.973l2.777-3.023c.23-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.554-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.424 6.424 0 0 1-.557.744c-.21.25-.441.508-.691.774l-1.898 2.027h3.972V307Zm7.084-6.281c0 .258-.043.498-.129.72a1.92 1.92 0 0 1-.351.598 2.302 2.302 0 0 1-.322.317 2.269 2.269 0 0 1-.405.257c.176.082.338.178.487.287.152.106.285.229.398.37a2.134 2.134 0 0 1 .51 1.412c0 .394-.072.744-.217 1.049a2.165 2.165 0 0 1-.592.761 2.621 2.621 0 0 1-.89.469 3.64 3.64 0 0 1-1.09.158c-.399 0-.77-.053-1.114-.158a2.556 2.556 0 0 1-.884-.469 2.144 2.144 0 0 1-.598-.756 2.482 2.482 0 0 1-.211-1.054c0-.235.031-.457.094-.668.066-.211.16-.407.281-.586.121-.172.266-.326.434-.463a2.68 2.68 0 0 1 .574-.358 2.293 2.293 0 0 1-.492-.328 2.093 2.093 0 0 1-.616-.955 2.064 2.064 0 0 1-.087-.603c0-.379.064-.715.193-1.008.133-.293.314-.541.545-.744.226-.203.498-.356.814-.457.321-.106.67-.158 1.049-.158.375 0 .721.052 1.037.158.321.101.6.254.838.457.231.199.412.447.545.744.133.293.199.629.199 1.008Zm-1.213 3.885c0-.211-.035-.403-.105-.575a1.365 1.365 0 0 0-.281-.457 1.307 1.307 0 0 0-.446-.281 1.572 1.572 0 0 0-.568-.1c-.215 0-.408.034-.58.1-.168.066-.313.16-.434.281a1.365 1.365 0 0 0-.281.457 1.704 1.704 0 0 0-.094.58c0 .219.034.416.1.592.066.172.162.317.287.434.121.113.266.201.434.263.172.059.365.088.58.088.203 0 .388-.031.556-.093.172-.063.321-.153.446-.27.117-.121.211-.266.281-.434.07-.171.105-.367.105-.585Zm-.181-3.833a1.38 1.38 0 0 0-.094-.521 1.291 1.291 0 0 0-.246-.41 1.188 1.188 0 0 0-.387-.258 1.294 1.294 0 0 0-.504-.094c-.183 0-.349.032-.498.094a1.097 1.097 0 0 0-.375.252 1.123 1.123 0 0 0-.234.404c-.055.16-.082.338-.082.533 0 .192.027.368.082.528.055.156.137.289.246.398.105.114.232.201.381.264.148.062.314.094.498.094.183 0 .349-.032.498-.094a1.154 1.154 0 0 0 .627-.662 1.54 1.54 0 0 0 .088-.528Zm7.898 3.188h1.072v1.137h-1.072V307h-1.4v-1.904h-3.692l-.035-.862 3.686-5.765h1.441v5.49Zm-3.697 0h2.297v-3.615l-.164.304-2.133 3.311Z"
              className="284"
            />
            <path
              d="M542.529 330h-5.724v-.973l2.777-3.023c.23-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.554-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.424 6.424 0 0 1-.557.744c-.21.25-.441.508-.691.774l-1.898 2.027h3.972V330Zm7.084-6.281c0 .258-.043.498-.129.72a1.92 1.92 0 0 1-.351.598 2.302 2.302 0 0 1-.322.317 2.269 2.269 0 0 1-.405.257c.176.082.338.178.487.287.152.106.285.229.398.37a2.134 2.134 0 0 1 .51 1.412c0 .394-.072.744-.217 1.049a2.165 2.165 0 0 1-.592.761 2.621 2.621 0 0 1-.89.469 3.64 3.64 0 0 1-1.09.158c-.399 0-.77-.053-1.114-.158a2.556 2.556 0 0 1-.884-.469 2.144 2.144 0 0 1-.598-.756 2.482 2.482 0 0 1-.211-1.054c0-.235.031-.457.094-.668.066-.211.16-.407.281-.586.121-.172.266-.326.434-.463a2.68 2.68 0 0 1 .574-.358 2.293 2.293 0 0 1-.492-.328 2.093 2.093 0 0 1-.616-.955 2.064 2.064 0 0 1-.087-.603c0-.379.064-.715.193-1.008.133-.293.314-.541.545-.744.226-.203.498-.356.814-.457.321-.106.67-.158 1.049-.158.375 0 .721.052 1.037.158.321.101.6.254.838.457.231.199.412.447.545.744.133.293.199.629.199 1.008Zm-1.213 3.885c0-.211-.035-.403-.105-.575a1.365 1.365 0 0 0-.281-.457 1.307 1.307 0 0 0-.446-.281 1.572 1.572 0 0 0-.568-.1c-.215 0-.408.034-.58.1-.168.066-.313.16-.434.281a1.365 1.365 0 0 0-.281.457 1.704 1.704 0 0 0-.094.58c0 .219.034.416.1.592.066.172.162.317.287.434.121.113.266.201.434.263.172.059.365.088.58.088.203 0 .388-.031.556-.093.172-.063.321-.153.446-.27.117-.121.211-.266.281-.434.07-.171.105-.367.105-.585Zm-.181-3.833a1.38 1.38 0 0 0-.094-.521 1.291 1.291 0 0 0-.246-.41 1.188 1.188 0 0 0-.387-.258 1.294 1.294 0 0 0-.504-.094c-.183 0-.349.032-.498.094a1.097 1.097 0 0 0-.375.252 1.123 1.123 0 0 0-.234.404c-.055.16-.082.338-.082.533 0 .192.027.368.082.528.055.156.137.289.246.398.105.114.232.201.381.264.148.062.314.094.498.094.183 0 .349-.032.498-.094a1.154 1.154 0 0 0 .627-.662 1.54 1.54 0 0 0 .088-.528Zm8.724 6.229h-5.724v-.973l2.777-3.023c.231-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.342 1.342 0 0 0-.527-.099c-.25 0-.467.035-.651.105a1.22 1.22 0 0 0-.457.299 1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.555-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.205.498-.358.744a6.528 6.528 0 0 1-.556.744c-.211.25-.442.508-.692.774l-1.898 2.027h3.972V330Z"
              className="282"
            />
            <path
              d="M565.529 325h-5.724v-.973l2.777-3.023c.23-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.554-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.424 6.424 0 0 1-.557.744c-.21.25-.441.508-.691.774l-1.898 2.027h3.972V325Zm7.084-6.281c0 .258-.043.498-.129.72a1.92 1.92 0 0 1-.351.598 2.302 2.302 0 0 1-.322.317 2.269 2.269 0 0 1-.405.257c.176.082.338.178.487.287.152.106.285.229.398.37a2.134 2.134 0 0 1 .51 1.412c0 .394-.072.744-.217 1.049a2.165 2.165 0 0 1-.592.761 2.621 2.621 0 0 1-.89.469 3.64 3.64 0 0 1-1.09.158c-.399 0-.77-.053-1.114-.158a2.556 2.556 0 0 1-.884-.469 2.144 2.144 0 0 1-.598-.756 2.482 2.482 0 0 1-.211-1.054c0-.235.031-.457.094-.668.066-.211.16-.407.281-.586.121-.172.266-.326.434-.463a2.68 2.68 0 0 1 .574-.358 2.293 2.293 0 0 1-.492-.328 2.093 2.093 0 0 1-.616-.955 2.064 2.064 0 0 1-.087-.603c0-.379.064-.715.193-1.008.133-.293.314-.541.545-.744.226-.203.498-.356.814-.457.321-.106.67-.158 1.049-.158.375 0 .721.052 1.037.158.321.101.6.254.838.457.231.199.412.447.545.744.133.293.199.629.199 1.008Zm-1.213 3.885c0-.211-.035-.403-.105-.575a1.365 1.365 0 0 0-.281-.457 1.307 1.307 0 0 0-.446-.281 1.572 1.572 0 0 0-.568-.1c-.215 0-.408.034-.58.1-.168.066-.313.16-.434.281a1.365 1.365 0 0 0-.281.457 1.704 1.704 0 0 0-.094.58c0 .219.034.416.1.592.066.172.162.317.287.434.121.113.266.201.434.263.172.059.365.088.58.088.203 0 .388-.031.556-.093.172-.063.321-.153.446-.27.117-.121.211-.266.281-.434.07-.171.105-.367.105-.585Zm-.181-3.833a1.38 1.38 0 0 0-.094-.521 1.291 1.291 0 0 0-.246-.41 1.188 1.188 0 0 0-.387-.258 1.294 1.294 0 0 0-.504-.094c-.183 0-.349.032-.498.094a1.097 1.097 0 0 0-.375.252 1.123 1.123 0 0 0-.234.404c-.055.16-.082.338-.082.533 0 .192.027.368.082.528.055.156.137.289.246.398.105.114.232.201.381.264.148.062.314.094.498.094.183 0 .349-.032.498-.094a1.154 1.154 0 0 0 .627-.662 1.54 1.54 0 0 0 .088-.528Zm4.775 1.331h.838c.25 0 .469-.034.656-.1a1.23 1.23 0 0 0 .463-.293c.113-.109.199-.244.258-.404.062-.164.094-.34.094-.528 0-.203-.03-.384-.088-.545a1.102 1.102 0 0 0-.246-.41 1.138 1.138 0 0 0-.416-.246 1.704 1.704 0 0 0-.569-.088c-.191 0-.369.03-.533.088a1.198 1.198 0 0 0-.703.621c-.066.149-.1.315-.1.498h-1.4c0-.34.068-.652.205-.937a2.3 2.3 0 0 1 .568-.744c.243-.207.528-.369.856-.487a3.258 3.258 0 0 1 1.09-.175c.402 0 .771.052 1.107.158.34.101.629.254.867.457a2.1 2.1 0 0 1 .563.762c.133.3.199.65.199 1.048 0 .176-.027.352-.082.528a1.96 1.96 0 0 1-.234.509 2.264 2.264 0 0 1-.961.809c.254.086.469.199.644.34.18.137.326.291.44.463.113.176.195.365.246.568.051.199.076.406.076.621 0 .399-.074.754-.223 1.067a2.222 2.222 0 0 1-.597.779 2.706 2.706 0 0 1-.914.492 3.766 3.766 0 0 1-1.131.164c-.367 0-.721-.051-1.061-.152a2.673 2.673 0 0 1-.896-.457 2.308 2.308 0 0 1-.621-.75 2.286 2.286 0 0 1-.229-1.049h1.401c0 .187.033.361.099.521.07.157.17.29.299.399.125.113.273.201.445.264.176.062.369.093.58.093.227 0 .43-.029.61-.088.183-.062.338-.154.463-.275.121-.113.213-.254.275-.422.066-.172.1-.367.1-.586a1.61 1.61 0 0 0-.112-.633 1.135 1.135 0 0 0-.322-.439 1.393 1.393 0 0 0-.51-.252 2.264 2.264 0 0 0-.656-.088h-.838v-1.101Z"
              className="283"
            />
            <path
              d="M557.529 347h-5.724v-.973l2.777-3.023c.23-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.554-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.424 6.424 0 0 1-.557.744c-.21.25-.441.508-.691.774l-1.898 2.027h3.972V347Zm7.084-6.281c0 .258-.043.498-.129.72a1.92 1.92 0 0 1-.351.598 2.302 2.302 0 0 1-.322.317 2.269 2.269 0 0 1-.405.257c.176.082.338.178.487.287.152.106.285.229.398.37a2.134 2.134 0 0 1 .51 1.412c0 .394-.072.744-.217 1.049a2.165 2.165 0 0 1-.592.761 2.621 2.621 0 0 1-.89.469 3.64 3.64 0 0 1-1.09.158c-.399 0-.77-.053-1.114-.158a2.556 2.556 0 0 1-.884-.469 2.144 2.144 0 0 1-.598-.756 2.482 2.482 0 0 1-.211-1.054c0-.235.031-.457.094-.668.066-.211.16-.407.281-.586.121-.172.266-.326.434-.463a2.68 2.68 0 0 1 .574-.358 2.293 2.293 0 0 1-.492-.328 2.093 2.093 0 0 1-.616-.955 2.064 2.064 0 0 1-.087-.603c0-.379.064-.715.193-1.008.133-.293.314-.541.545-.744.226-.203.498-.356.814-.457.321-.106.67-.158 1.049-.158.375 0 .721.052 1.037.158.321.101.6.254.838.457.231.199.412.447.545.744.133.293.199.629.199 1.008Zm-1.213 3.885c0-.211-.035-.403-.105-.575a1.365 1.365 0 0 0-.281-.457 1.307 1.307 0 0 0-.446-.281 1.572 1.572 0 0 0-.568-.1c-.215 0-.408.034-.58.1-.168.066-.313.16-.434.281a1.365 1.365 0 0 0-.281.457 1.704 1.704 0 0 0-.094.58c0 .219.034.416.1.592.066.172.162.317.287.434.121.113.266.201.434.263.172.059.365.088.58.088.203 0 .388-.031.556-.093.172-.063.321-.153.446-.27.117-.121.211-.266.281-.434.07-.171.105-.367.105-.585Zm-.181-3.833a1.38 1.38 0 0 0-.094-.521 1.291 1.291 0 0 0-.246-.41 1.188 1.188 0 0 0-.387-.258 1.294 1.294 0 0 0-.504-.094c-.183 0-.349.032-.498.094a1.097 1.097 0 0 0-.375.252 1.123 1.123 0 0 0-.234.404c-.055.16-.082.338-.082.533 0 .192.027.368.082.528.055.156.137.289.246.398.105.114.232.201.381.264.148.062.314.094.498.094.183 0 .349-.032.498-.094a1.154 1.154 0 0 0 .627-.662 1.54 1.54 0 0 0 .088-.528Zm7.084 6.229h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V347Z"
              className="281"
            />
            <path
              d="M596.529 358h-5.724v-.973l2.777-3.023c.23-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.554-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.424 6.424 0 0 1-.557.744c-.21.25-.441.508-.691.774l-1.898 2.027h3.972V358Zm7.278-7.746L600.396 358h-1.476l3.41-7.359h-4.424v-1.172h5.901v.785Zm7.013 1.465c0 .258-.043.498-.129.72a1.92 1.92 0 0 1-.351.598 2.302 2.302 0 0 1-.322.317 2.269 2.269 0 0 1-.405.257c.176.082.338.178.487.287.152.106.285.229.398.37a2.134 2.134 0 0 1 .51 1.412c0 .394-.072.744-.217 1.049a2.165 2.165 0 0 1-.592.761 2.621 2.621 0 0 1-.89.469 3.64 3.64 0 0 1-1.09.158c-.399 0-.77-.053-1.114-.158a2.556 2.556 0 0 1-.884-.469 2.144 2.144 0 0 1-.598-.756 2.482 2.482 0 0 1-.211-1.054c0-.235.031-.457.094-.668.066-.211.16-.407.281-.586.121-.172.266-.326.434-.463a2.68 2.68 0 0 1 .574-.358 2.293 2.293 0 0 1-.492-.328 2.093 2.093 0 0 1-.615-.955 2.031 2.031 0 0 1-.088-.603c0-.379.064-.715.193-1.008.133-.293.314-.541.545-.744.226-.203.498-.356.814-.457.321-.106.67-.158 1.049-.158.375 0 .721.052 1.037.158.321.101.6.254.838.457.231.199.412.447.545.744.133.293.199.629.199 1.008Zm-1.213 3.885c0-.211-.035-.403-.105-.575a1.365 1.365 0 0 0-.281-.457 1.307 1.307 0 0 0-.446-.281 1.568 1.568 0 0 0-.568-.1c-.215 0-.408.034-.58.1-.168.066-.313.16-.434.281a1.382 1.382 0 0 0-.281.457 1.704 1.704 0 0 0-.094.58c0 .219.034.416.1.592.066.172.162.317.287.434.121.113.266.201.434.263.172.059.365.088.58.088.203 0 .388-.031.556-.093.172-.063.321-.153.446-.27.117-.121.211-.266.281-.434.07-.171.105-.367.105-.585Zm-.181-3.833a1.38 1.38 0 0 0-.094-.521 1.291 1.291 0 0 0-.246-.41 1.188 1.188 0 0 0-.387-.258 1.294 1.294 0 0 0-.504-.094c-.183 0-.349.032-.498.094a1.097 1.097 0 0 0-.375.252 1.123 1.123 0 0 0-.234.404c-.055.16-.082.338-.082.533 0 .192.027.368.082.528.055.156.137.289.246.398.105.114.232.201.381.264.148.062.314.094.498.094.183 0 .349-.032.498-.094a1.154 1.154 0 0 0 .627-.662 1.54 1.54 0 0 0 .088-.528Z"
              className="278"
            />
            <path
              d="M592.529 402h-5.724v-.973l2.777-3.023c.23-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.554-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.424 6.424 0 0 1-.557.744c-.21.25-.441.508-.691.774l-1.898 2.027h3.972V402Zm2.912-1.154c.485 0 .897-.055 1.237-.164.34-.11.619-.266.838-.469.234-.223.406-.477.515-.762.11-.289.18-.599.211-.931v-.03a1.989 1.989 0 0 1-.662.492c-.141.067-.297.12-.469.159a2.46 2.46 0 0 1-.556.058c-.414 0-.776-.078-1.084-.234a2.24 2.24 0 0 1-.762-.627 2.738 2.738 0 0 1-.463-.914 3.827 3.827 0 0 1-.152-1.084c0-.41.06-.795.181-1.154a2.91 2.91 0 0 1 .539-.956 2.53 2.53 0 0 1 .862-.638c.344-.16.734-.24 1.172-.24.441 0 .832.084 1.172.252.343.167.634.396.873.685.25.313.439.691.568 1.137.129.441.193.906.193 1.394v.492a7.72 7.72 0 0 1-.234 1.922 3.89 3.89 0 0 1-.826 1.6c-.321.375-.742.67-1.266.885-.519.215-1.146.322-1.881.322h-.117v-1.195h.111Zm1.413-2.754a1.4 1.4 0 0 0 .867-.293c.121-.09.226-.195.316-.317a1.79 1.79 0 0 0 .229-.404v-.486c0-.34-.039-.641-.118-.903a2.13 2.13 0 0 0-.298-.656 1.317 1.317 0 0 0-.452-.398 1.126 1.126 0 0 0-.55-.141c-.219 0-.414.049-.586.147a1.235 1.235 0 0 0-.422.386 1.87 1.87 0 0 0-.27.58 2.759 2.759 0 0 0-.006 1.366c.055.215.141.406.258.574.114.164.254.297.422.398.172.098.375.147.61.147Zm9.263.867h1.072v1.137h-1.072V402h-1.4v-1.904h-3.692l-.035-.862 3.686-5.765h1.441v5.49Zm-3.697 0h2.297v-3.615l-.164.304-2.133 3.311Z"
              className="294"
            />
            <path
              d="M537.529 364h-5.724v-.973l2.777-3.023c.23-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.554-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.424 6.424 0 0 1-.557.744c-.21.25-.441.508-.691.774l-1.898 2.027h3.972V364Zm2.912-1.154c.485 0 .897-.055 1.237-.164.34-.11.619-.266.838-.469.234-.223.406-.477.515-.762.11-.289.18-.599.211-.931v-.03a1.989 1.989 0 0 1-.662.492c-.141.067-.297.12-.469.159a2.46 2.46 0 0 1-.556.058c-.414 0-.776-.078-1.084-.234a2.24 2.24 0 0 1-.762-.627 2.738 2.738 0 0 1-.463-.914 3.827 3.827 0 0 1-.152-1.084c0-.41.06-.795.181-1.154a2.91 2.91 0 0 1 .539-.956 2.53 2.53 0 0 1 .862-.638c.344-.16.734-.24 1.172-.24.441 0 .832.084 1.172.252.343.167.634.396.873.685.25.313.439.691.568 1.137.129.441.193.906.193 1.394v.492a7.72 7.72 0 0 1-.234 1.922 3.89 3.89 0 0 1-.826 1.6c-.321.375-.742.67-1.266.885-.519.215-1.146.322-1.881.322h-.117v-1.195h.111Zm1.413-2.754a1.4 1.4 0 0 0 .867-.293c.121-.09.226-.195.316-.317a1.79 1.79 0 0 0 .229-.404v-.486c0-.34-.039-.641-.118-.903a2.13 2.13 0 0 0-.298-.656 1.317 1.317 0 0 0-.452-.398 1.126 1.126 0 0 0-.55-.141c-.219 0-.414.049-.586.147a1.235 1.235 0 0 0-.422.386 1.87 1.87 0 0 0-.27.58 2.759 2.759 0 0 0-.006 1.366c.055.215.141.406.258.574.114.164.254.297.422.398.172.098.375.147.61.147Zm10.16-3.838-3.41 7.746h-1.477l3.41-7.359h-4.424v-1.172h5.901v.785Z"
              className="297"
            />
            <path
              d="M506.529 382h-5.724v-.973l2.777-3.023c.23-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.554-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.424 6.424 0 0 1-.557.744c-.21.25-.441.508-.691.774l-1.898 2.027h3.972V382Zm2.912-1.154c.485 0 .897-.055 1.237-.164.34-.11.619-.266.838-.469.234-.223.406-.477.515-.762.11-.289.18-.599.211-.931v-.03a1.989 1.989 0 0 1-.662.492c-.141.067-.297.12-.469.159a2.46 2.46 0 0 1-.556.058c-.414 0-.776-.078-1.084-.234a2.24 2.24 0 0 1-.762-.627 2.738 2.738 0 0 1-.463-.914 3.827 3.827 0 0 1-.152-1.084c0-.41.06-.795.181-1.154a2.91 2.91 0 0 1 .539-.956 2.53 2.53 0 0 1 .862-.638c.344-.16.734-.24 1.172-.24.441 0 .832.084 1.172.252.343.167.634.396.873.685.25.313.439.691.568 1.137.129.441.193.906.193 1.394v.492a7.72 7.72 0 0 1-.234 1.922 3.89 3.89 0 0 1-.826 1.6c-.321.375-.742.67-1.266.885-.519.215-1.146.322-1.881.322h-.117v-1.195h.111Zm1.413-2.754a1.4 1.4 0 0 0 .867-.293c.121-.09.226-.195.316-.317a1.79 1.79 0 0 0 .229-.404v-.486c0-.34-.039-.641-.118-.903a2.13 2.13 0 0 0-.298-.656 1.317 1.317 0 0 0-.452-.398 1.126 1.126 0 0 0-.55-.141c-.219 0-.414.049-.586.147a1.235 1.235 0 0 0-.422.386 1.87 1.87 0 0 0-.27.58 2.759 2.759 0 0 0-.006 1.366c.055.215.141.406.258.574.114.164.254.297.422.398.172.098.375.147.61.147Zm9.966-2.373c0 .258-.043.498-.129.72a1.92 1.92 0 0 1-.351.598 2.302 2.302 0 0 1-.322.317 2.269 2.269 0 0 1-.405.257c.176.082.338.178.487.287.152.106.285.229.398.37a2.134 2.134 0 0 1 .51 1.412c0 .394-.072.744-.217 1.049a2.165 2.165 0 0 1-.592.761 2.621 2.621 0 0 1-.89.469 3.64 3.64 0 0 1-1.09.158c-.399 0-.77-.053-1.114-.158a2.556 2.556 0 0 1-.884-.469 2.144 2.144 0 0 1-.598-.756 2.482 2.482 0 0 1-.211-1.054c0-.235.031-.457.094-.668.066-.211.16-.407.281-.586.121-.172.266-.326.434-.463a2.68 2.68 0 0 1 .574-.358 2.293 2.293 0 0 1-.492-.328 2.093 2.093 0 0 1-.615-.955 2.031 2.031 0 0 1-.088-.603c0-.379.064-.715.193-1.008.133-.293.314-.541.545-.744.226-.203.498-.356.814-.457.321-.106.67-.158 1.049-.158.375 0 .721.052 1.037.158.321.101.6.254.838.457.231.199.412.447.545.744.133.293.199.629.199 1.008Zm-1.213 3.885c0-.211-.035-.403-.105-.575a1.365 1.365 0 0 0-.281-.457 1.307 1.307 0 0 0-.446-.281 1.568 1.568 0 0 0-.568-.1c-.215 0-.408.034-.58.1-.168.066-.313.16-.434.281a1.382 1.382 0 0 0-.281.457 1.704 1.704 0 0 0-.094.58c0 .219.034.416.1.592.066.172.162.317.287.434.121.113.266.201.434.263.172.059.365.088.58.088.203 0 .388-.031.556-.093.172-.063.321-.153.446-.27.117-.121.211-.266.281-.434.07-.171.105-.367.105-.585Zm-.181-3.833a1.38 1.38 0 0 0-.094-.521 1.291 1.291 0 0 0-.246-.41 1.188 1.188 0 0 0-.387-.258 1.294 1.294 0 0 0-.504-.094c-.183 0-.349.032-.498.094a1.097 1.097 0 0 0-.375.252 1.123 1.123 0 0 0-.234.404c-.055.16-.082.338-.082.533 0 .192.027.368.082.528.055.156.137.289.246.398.105.114.232.201.381.264.148.062.314.094.498.094.183 0 .349-.032.498-.094a1.154 1.154 0 0 0 .627-.662 1.54 1.54 0 0 0 .088-.528Z"
              className="298"
            />
            <path
              d="M452.529 383h-5.724v-.973l2.777-3.023c.23-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.554-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.424 6.424 0 0 1-.557.744c-.21.25-.441.508-.691.774l-1.898 2.027h3.972V383Zm7.248-3.252c0 .547-.064 1.031-.193 1.453a2.875 2.875 0 0 1-.545 1.049 2.237 2.237 0 0 1-.867.656c-.34.145-.727.217-1.16.217-.43 0-.817-.072-1.16-.217a2.286 2.286 0 0 1-.873-.656 2.877 2.877 0 0 1-.557-1.049 5.121 5.121 0 0 1-.188-1.453v-2.021c0-.547.063-1.03.188-1.448.129-.422.312-.777.551-1.066.238-.285.527-.5.867-.645.344-.148.73-.222 1.16-.222.434 0 .82.074 1.16.222.344.145.637.36.879.645.234.289.416.644.545 1.066.129.418.193.901.193 1.448v2.021Zm-4.136-.498 2.713-2.057a3.226 3.226 0 0 0-.129-.791 1.447 1.447 0 0 0-.287-.545 1.034 1.034 0 0 0-.405-.281 1.435 1.435 0 0 0-.533-.094c-.215 0-.404.038-.568.112a1.05 1.05 0 0 0-.411.328 1.656 1.656 0 0 0-.287.639 3.94 3.94 0 0 0-.093.914v1.775Zm2.724.732v-1.711l-2.713 2.045c.02.27.061.508.123.715.067.207.155.379.264.516.109.148.244.26.404.334.164.074.354.111.569.111.211 0 .396-.035.556-.105a1.14 1.14 0 0 0 .411-.323c.128-.164.224-.378.287-.644.066-.266.099-.578.099-.938Zm4.283 1.864c.485 0 .897-.055 1.237-.164.34-.11.619-.266.838-.469.234-.223.406-.477.515-.762.11-.289.18-.599.211-.931v-.03a1.989 1.989 0 0 1-.662.492c-.141.067-.297.12-.469.159a2.46 2.46 0 0 1-.556.058c-.414 0-.776-.078-1.084-.234a2.24 2.24 0 0 1-.762-.627 2.738 2.738 0 0 1-.463-.914 3.827 3.827 0 0 1-.152-1.084c0-.41.06-.795.181-1.154a2.91 2.91 0 0 1 .539-.956 2.53 2.53 0 0 1 .862-.638c.344-.16.734-.24 1.172-.24.441 0 .832.084 1.172.252.343.167.634.396.873.685.25.313.439.691.568 1.137.129.441.193.906.193 1.394v.492a7.72 7.72 0 0 1-.234 1.922 3.89 3.89 0 0 1-.826 1.6c-.321.375-.742.67-1.266.885-.519.215-1.146.322-1.881.322h-.117v-1.195h.111Zm1.413-2.754a1.4 1.4 0 0 0 .867-.293c.121-.09.226-.195.316-.317a1.79 1.79 0 0 0 .229-.404v-.486c0-.34-.039-.641-.118-.903a2.13 2.13 0 0 0-.298-.656 1.317 1.317 0 0 0-.452-.398 1.126 1.126 0 0 0-.55-.141c-.219 0-.414.049-.586.147a1.235 1.235 0 0 0-.422.386 1.87 1.87 0 0 0-.27.58 2.759 2.759 0 0 0-.006 1.366c.055.215.141.406.258.574.114.164.254.297.422.398.172.098.375.147.61.147Z"
              className="209"
            />
            <path
              d="M479.529 374h-5.724v-.973l2.777-3.023c.23-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.554-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.424 6.424 0 0 1-.557.744c-.21.25-.441.508-.691.774l-1.898 2.027h3.972V374Zm5.567 0h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V374Zm8.888-3.252c0 .547-.064 1.031-.193 1.453a2.875 2.875 0 0 1-.545 1.049 2.237 2.237 0 0 1-.867.656c-.34.145-.727.217-1.16.217-.43 0-.817-.072-1.16-.217a2.286 2.286 0 0 1-.873-.656 2.877 2.877 0 0 1-.557-1.049 5.121 5.121 0 0 1-.188-1.453v-2.021c0-.547.063-1.03.188-1.448.129-.422.312-.777.551-1.066.238-.285.527-.5.867-.645.344-.148.73-.222 1.16-.222.434 0 .82.074 1.16.222.344.145.637.36.879.645.234.289.416.644.545 1.066.129.418.193.901.193 1.448v2.021Zm-4.136-.498 2.713-2.057a3.226 3.226 0 0 0-.129-.791 1.433 1.433 0 0 0-.287-.545 1.034 1.034 0 0 0-.405-.281 1.435 1.435 0 0 0-.533-.094c-.215 0-.404.038-.568.112a1.04 1.04 0 0 0-.41.328 1.642 1.642 0 0 0-.288.639 3.94 3.94 0 0 0-.093.914v1.775Zm2.724.732v-1.711l-2.713 2.045c.02.27.061.508.123.715.067.207.155.379.264.516.109.148.244.26.404.334.164.074.354.111.569.111.211 0 .396-.035.556-.105a1.14 1.14 0 0 0 .411-.323c.128-.164.224-.378.287-.644.066-.266.099-.578.099-.938Z"
              className="210"
            />
            <path
              d="M500.529 408h-5.724v-.973l2.777-3.023c.23-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.554-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.424 6.424 0 0 1-.557.744c-.21.25-.441.508-.691.774l-1.898 2.027h3.972V408Zm5.567 0h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V408Zm8.847 0h-5.724v-.973l2.777-3.023c.231-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.342 1.342 0 0 0-.527-.099c-.25 0-.467.035-.651.105a1.22 1.22 0 0 0-.457.299 1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.555-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.205.498-.358.744a6.528 6.528 0 0 1-.556.744c-.211.25-.442.508-.692.774l-1.898 2.027h3.972V408Z"
              className="212"
            />
            <path
              d="M529.529 413h-5.724v-.973l2.777-3.023c.23-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.554-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.424 6.424 0 0 1-.557.744c-.21.25-.441.508-.691.774l-1.898 2.027h3.972V413Zm2.912-1.154c.485 0 .897-.055 1.237-.164.34-.11.619-.266.838-.469.234-.223.406-.477.515-.762.11-.289.18-.599.211-.931v-.03a1.989 1.989 0 0 1-.662.492c-.141.067-.297.12-.469.159a2.46 2.46 0 0 1-.556.058c-.414 0-.776-.078-1.084-.234a2.24 2.24 0 0 1-.762-.627 2.738 2.738 0 0 1-.463-.914 3.827 3.827 0 0 1-.152-1.084c0-.41.06-.795.181-1.154a2.91 2.91 0 0 1 .539-.956 2.53 2.53 0 0 1 .862-.638c.344-.16.734-.24 1.172-.24.441 0 .832.084 1.172.252.343.167.634.396.873.685.25.313.439.691.568 1.137.129.441.193.906.193 1.394v.492a7.72 7.72 0 0 1-.234 1.922 3.89 3.89 0 0 1-.826 1.6c-.321.375-.742.67-1.266.885-.519.215-1.146.322-1.881.322h-.117v-1.195h.111Zm1.413-2.754a1.4 1.4 0 0 0 .867-.293c.121-.09.226-.195.316-.317a1.79 1.79 0 0 0 .229-.404v-.486c0-.34-.039-.641-.118-.903a2.13 2.13 0 0 0-.298-.656 1.317 1.317 0 0 0-.452-.398 1.126 1.126 0 0 0-.55-.141c-.219 0-.414.049-.586.147a1.235 1.235 0 0 0-.422.386 1.87 1.87 0 0 0-.27.58 2.759 2.759 0 0 0-.006 1.366c.055.215.141.406.258.574.114.164.254.297.422.398.172.098.375.147.61.147Zm8.841-4.664v1.189h-.093c-.465 0-.87.065-1.213.194a2.382 2.382 0 0 0-1.418 1.341 3.507 3.507 0 0 0-.241 1.02c.094-.106.204-.207.329-.305.125-.101.263-.191.416-.269.144-.075.304-.133.48-.176.176-.047.361-.07.557-.07.414 0 .773.078 1.078.234.308.156.562.367.762.633.203.265.351.57.445.914.098.344.146.701.146 1.072 0 .406-.062.787-.187 1.143a2.673 2.673 0 0 1-.533.92c-.239.265-.53.474-.873.627-.34.148-.729.222-1.166.222-.45 0-.85-.086-1.202-.258a2.64 2.64 0 0 1-.89-.697 3.137 3.137 0 0 1-.586-1.072 4.248 4.248 0 0 1-.199-1.307v-.58c0-.687.088-1.342.263-1.963a3.95 3.95 0 0 1 .891-1.611 3.473 3.473 0 0 1 1.301-.891c.515-.207 1.105-.31 1.769-.31h.164Zm-1.529 4.06c-.168 0-.328.026-.48.076a1.668 1.668 0 0 0-.422.211c-.118.09-.223.194-.317.311a1.71 1.71 0 0 0-.234.393v.433c0 .34.037.639.111.897.078.257.184.472.317.644.132.172.287.303.463.393.175.09.363.134.562.134.219 0 .414-.042.586-.128.172-.09.318-.211.439-.364.121-.156.213-.34.276-.55.062-.215.094-.448.094-.698 0-.238-.032-.463-.094-.674a1.716 1.716 0 0 0-.264-.562 1.24 1.24 0 0 0-.439-.375 1.226 1.226 0 0 0-.598-.141Z"
              className="296"
            />
            <path
              d="M559.529 399h-5.724v-.973l2.777-3.023c.23-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.554-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.424 6.424 0 0 1-.557.744c-.21.25-.441.508-.691.774l-1.898 2.027h3.972V399Zm2.912-1.154c.485 0 .897-.055 1.237-.164.34-.11.619-.266.838-.469.234-.223.406-.477.515-.762.11-.289.18-.599.211-.931v-.03a1.989 1.989 0 0 1-.662.492c-.141.067-.297.12-.469.159a2.46 2.46 0 0 1-.556.058c-.414 0-.776-.078-1.084-.234a2.24 2.24 0 0 1-.762-.627 2.738 2.738 0 0 1-.463-.914 3.827 3.827 0 0 1-.152-1.084c0-.41.06-.795.181-1.154a2.91 2.91 0 0 1 .539-.956 2.53 2.53 0 0 1 .862-.638c.344-.16.734-.24 1.172-.24.441 0 .832.084 1.172.252.343.167.634.396.873.685.25.313.439.691.568 1.137.129.441.193.906.193 1.394v.492a7.72 7.72 0 0 1-.234 1.922 3.89 3.89 0 0 1-.826 1.6c-.321.375-.742.67-1.266.885-.519.215-1.146.322-1.881.322h-.117v-1.195h.111Zm1.413-2.754a1.4 1.4 0 0 0 .867-.293c.121-.09.226-.195.316-.317a1.79 1.79 0 0 0 .229-.404v-.486c0-.34-.039-.641-.118-.903a2.13 2.13 0 0 0-.298-.656 1.317 1.317 0 0 0-.452-.398 1.126 1.126 0 0 0-.55-.141c-.219 0-.414.049-.586.147a1.235 1.235 0 0 0-.422.386 1.87 1.87 0 0 0-.27.58 2.759 2.759 0 0 0-.006 1.366c.055.215.141.406.258.574.114.164.254.297.422.398.172.098.375.147.61.147Zm4.869-.322.457-4.301h4.588v1.242h-3.422l-.223 2.045c.141-.082.324-.16.551-.235.23-.074.494-.111.791-.111.402 0 .762.067 1.078.199.32.133.592.323.814.569.219.25.387.552.504.908.118.352.176.748.176 1.189 0 .391-.057.76-.17 1.108a2.437 2.437 0 0 1-.51.902 2.356 2.356 0 0 1-.861.61c-.348.148-.758.222-1.23.222-.36 0-.704-.051-1.032-.152a2.663 2.663 0 0 1-.873-.469 2.463 2.463 0 0 1-.627-.756 2.545 2.545 0 0 1-.275-1.049h1.365c.051.418.203.739.457.961.258.223.586.334.985.334.234 0 .437-.043.609-.129.172-.086.316-.207.434-.363a1.63 1.63 0 0 0 .246-.551c.054-.218.082-.455.082-.709 0-.246-.033-.47-.1-.673a1.49 1.49 0 0 0-.287-.54 1.283 1.283 0 0 0-.48-.351 1.621 1.621 0 0 0-.668-.129c-.168 0-.315.014-.44.041a1.46 1.46 0 0 0-.592.27 2.535 2.535 0 0 0-.228.193l-1.119-.275Z"
              className="295"
            />
            <path
              d="M620.529 420h-5.724v-.973l2.777-3.023c.23-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.554-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.424 6.424 0 0 1-.557.744c-.21.25-.441.508-.691.774l-1.898 2.027h3.972V420Zm2.912-1.154c.485 0 .897-.055 1.237-.164.34-.11.619-.266.838-.469.234-.223.406-.477.515-.762.11-.289.18-.599.211-.931v-.03a1.989 1.989 0 0 1-.662.492c-.141.067-.297.12-.469.159a2.46 2.46 0 0 1-.556.058c-.414 0-.776-.078-1.084-.234a2.24 2.24 0 0 1-.762-.627 2.738 2.738 0 0 1-.463-.914 3.827 3.827 0 0 1-.152-1.084c0-.41.06-.795.181-1.154a2.91 2.91 0 0 1 .539-.956 2.53 2.53 0 0 1 .862-.638c.344-.16.734-.24 1.172-.24.441 0 .832.084 1.172.252.343.167.634.396.873.685.25.313.439.691.568 1.137.129.441.193.906.193 1.394v.492a7.72 7.72 0 0 1-.234 1.922 3.89 3.89 0 0 1-.826 1.6c-.321.375-.742.67-1.266.885-.519.215-1.146.322-1.881.322h-.117v-1.195h.111Zm1.413-2.754a1.4 1.4 0 0 0 .867-.293c.121-.09.226-.195.316-.317a1.79 1.79 0 0 0 .229-.404v-.486c0-.34-.039-.641-.118-.903a2.13 2.13 0 0 0-.298-.656 1.317 1.317 0 0 0-.452-.398 1.126 1.126 0 0 0-.55-.141c-.219 0-.414.049-.586.147a1.235 1.235 0 0 0-.422.386 1.87 1.87 0 0 0-.27.58 2.759 2.759 0 0 0-.006 1.366c.055.215.141.406.258.574.114.164.254.297.422.398.172.098.375.147.61.147ZM634.943 420h-5.724v-.973l2.777-3.023c.231-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.342 1.342 0 0 0-.527-.099c-.25 0-.467.035-.651.105a1.22 1.22 0 0 0-.457.299 1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.555-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.205.498-.358.744a6.528 6.528 0 0 1-.556.744c-.211.25-.442.508-.692.774l-1.898 2.027h3.972V420Z"
              className="292"
            />
            <path
              d="M476.529 397h-5.724v-.973l2.777-3.023c.23-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.554-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.424 6.424 0 0 1-.557.744c-.21.25-.441.508-.691.774l-1.898 2.027h3.972V397Zm5.567 0h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V397Zm7.207 0h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V397Z"
              className="211"
            />
            <path
              d="M448.529 407h-5.724v-.973l2.777-3.023c.23-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.554-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.424 6.424 0 0 1-.557.744c-.21.25-.441.508-.691.774l-1.898 2.027h3.972V407Zm7.248-3.252c0 .547-.064 1.031-.193 1.453a2.875 2.875 0 0 1-.545 1.049 2.237 2.237 0 0 1-.867.656c-.34.145-.727.217-1.16.217-.43 0-.817-.072-1.16-.217a2.286 2.286 0 0 1-.873-.656 2.877 2.877 0 0 1-.557-1.049 5.121 5.121 0 0 1-.188-1.453v-2.021c0-.547.063-1.03.188-1.448.129-.422.312-.777.551-1.066.238-.285.527-.5.867-.645.344-.148.73-.222 1.16-.222.434 0 .82.074 1.16.222.344.145.637.36.879.645.234.289.416.644.545 1.066.129.418.193.901.193 1.448v2.021Zm-4.136-.498 2.713-2.057a3.226 3.226 0 0 0-.129-.791 1.447 1.447 0 0 0-.287-.545 1.034 1.034 0 0 0-.405-.281 1.435 1.435 0 0 0-.533-.094c-.215 0-.404.038-.568.112a1.05 1.05 0 0 0-.411.328 1.656 1.656 0 0 0-.287.639 3.94 3.94 0 0 0-.093.914v1.775Zm2.724.732v-1.711l-2.713 2.045c.02.27.061.508.123.715.067.207.155.379.264.516.109.148.244.26.404.334.164.074.354.111.569.111.211 0 .396-.035.556-.105a1.14 1.14 0 0 0 .411-.323c.128-.164.224-.378.287-.644.066-.266.099-.578.099-.938Zm8.455-3.263c0 .258-.043.498-.129.72a1.92 1.92 0 0 1-.351.598 2.302 2.302 0 0 1-.322.317 2.269 2.269 0 0 1-.405.257c.176.082.338.178.487.287.152.106.285.229.398.37a2.134 2.134 0 0 1 .51 1.412c0 .394-.072.744-.217 1.049a2.165 2.165 0 0 1-.592.761 2.621 2.621 0 0 1-.89.469 3.64 3.64 0 0 1-1.09.158c-.399 0-.77-.053-1.114-.158a2.556 2.556 0 0 1-.884-.469 2.144 2.144 0 0 1-.598-.756 2.482 2.482 0 0 1-.211-1.054c0-.235.031-.457.094-.668.066-.211.16-.407.281-.586.121-.172.266-.326.434-.463a2.68 2.68 0 0 1 .574-.358 2.293 2.293 0 0 1-.492-.328 2.093 2.093 0 0 1-.615-.955 2.031 2.031 0 0 1-.088-.603c0-.379.064-.715.193-1.008.133-.293.314-.541.545-.744.226-.203.498-.356.814-.457.321-.106.67-.158 1.049-.158.375 0 .721.052 1.037.158.321.101.6.254.838.457.231.199.412.447.545.744.133.293.199.629.199 1.008Zm-1.213 3.885c0-.211-.035-.403-.105-.575a1.365 1.365 0 0 0-.281-.457 1.307 1.307 0 0 0-.446-.281 1.568 1.568 0 0 0-.568-.1c-.215 0-.408.034-.58.1-.168.066-.313.16-.434.281a1.382 1.382 0 0 0-.281.457 1.704 1.704 0 0 0-.094.58c0 .219.034.416.1.592.066.172.162.317.287.434.121.113.266.201.434.263.172.059.365.088.58.088.203 0 .388-.031.556-.093.172-.063.321-.153.446-.27.117-.121.211-.266.281-.434.07-.171.105-.367.105-.585Zm-.181-3.833a1.38 1.38 0 0 0-.094-.521 1.291 1.291 0 0 0-.246-.41 1.188 1.188 0 0 0-.387-.258 1.294 1.294 0 0 0-.504-.094c-.183 0-.349.032-.498.094a1.097 1.097 0 0 0-.375.252 1.123 1.123 0 0 0-.234.404c-.055.16-.082.338-.082.533 0 .192.027.368.082.528.055.156.137.289.246.398.105.114.232.201.381.264.148.062.314.094.498.094.183 0 .349-.032.498-.094a1.154 1.154 0 0 0 .627-.662 1.54 1.54 0 0 0 .088-.528Z"
              className="208"
            />
            <path
              d="M632.529 387h-5.724v-.973l2.777-3.023c.23-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.554-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.424 6.424 0 0 1-.557.744c-.21.25-.441.508-.691.774l-1.898 2.027h3.972V387Zm2.912-1.154c.485 0 .897-.055 1.237-.164.34-.11.619-.266.838-.469.234-.223.406-.477.515-.762.11-.289.18-.599.211-.931v-.03a1.989 1.989 0 0 1-.662.492c-.141.067-.297.12-.469.159a2.46 2.46 0 0 1-.556.058c-.414 0-.776-.078-1.084-.234a2.24 2.24 0 0 1-.762-.627 2.738 2.738 0 0 1-.463-.914 3.827 3.827 0 0 1-.152-1.084c0-.41.06-.795.181-1.154a2.91 2.91 0 0 1 .539-.956 2.53 2.53 0 0 1 .862-.638c.344-.16.734-.24 1.172-.24.441 0 .832.084 1.172.252.343.167.634.396.873.685.25.313.439.691.568 1.137.129.441.193.906.193 1.394v.492a7.72 7.72 0 0 1-.234 1.922 3.89 3.89 0 0 1-.826 1.6c-.321.375-.742.67-1.266.885-.519.215-1.146.322-1.881.322h-.117v-1.195h.111Zm1.413-2.754a1.4 1.4 0 0 0 .867-.293c.121-.09.226-.195.316-.317a1.79 1.79 0 0 0 .229-.404v-.486c0-.34-.039-.641-.118-.903a2.13 2.13 0 0 0-.298-.656 1.317 1.317 0 0 0-.452-.398 1.126 1.126 0 0 0-.55-.141c-.219 0-.414.049-.586.147a1.235 1.235 0 0 0-.422.386 1.87 1.87 0 0 0-.27.58 2.759 2.759 0 0 0-.006 1.366c.055.215.141.406.258.574.114.164.254.297.422.398.172.098.375.147.61.147Zm6.14-.99h.838c.25 0 .469-.034.656-.1a1.23 1.23 0 0 0 .463-.293c.113-.109.199-.244.258-.404.062-.164.094-.34.094-.528 0-.203-.03-.384-.088-.545a1.102 1.102 0 0 0-.246-.41 1.138 1.138 0 0 0-.416-.246 1.704 1.704 0 0 0-.569-.088c-.191 0-.369.03-.533.088a1.198 1.198 0 0 0-.703.621c-.066.149-.1.315-.1.498h-1.4c0-.34.068-.652.205-.937a2.3 2.3 0 0 1 .568-.744c.243-.207.528-.369.856-.487a3.258 3.258 0 0 1 1.09-.175c.402 0 .771.052 1.107.158.34.101.629.254.867.457a2.1 2.1 0 0 1 .563.762c.133.3.199.65.199 1.048 0 .176-.027.352-.082.528a1.96 1.96 0 0 1-.234.509 2.264 2.264 0 0 1-.961.809c.254.086.469.199.644.34.18.137.326.291.44.463.113.176.195.365.246.568.051.199.076.406.076.621 0 .399-.074.754-.223 1.067a2.222 2.222 0 0 1-.597.779 2.706 2.706 0 0 1-.914.492 3.766 3.766 0 0 1-1.131.164c-.367 0-.721-.051-1.061-.152a2.673 2.673 0 0 1-.896-.457 2.308 2.308 0 0 1-.621-.75 2.286 2.286 0 0 1-.229-1.049h1.401c0 .187.033.361.099.521.07.157.17.29.299.399.125.113.273.201.445.264.176.062.369.093.58.093.227 0 .43-.029.61-.088.183-.062.338-.154.463-.275.121-.113.213-.254.275-.422.066-.172.1-.367.1-.586a1.61 1.61 0 0 0-.112-.633 1.135 1.135 0 0 0-.322-.439 1.393 1.393 0 0 0-.51-.252 2.264 2.264 0 0 0-.656-.088h-.838v-1.101Z"
              className="293"
            />
            <path
              d="M668.529 388h-5.724v-.973l2.777-3.023c.23-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.554-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.424 6.424 0 0 1-.557.744c-.21.25-.441.508-.691.774l-1.898 2.027h3.972V388Zm2.912-1.154c.485 0 .897-.055 1.237-.164.34-.11.619-.266.838-.469.234-.223.406-.477.515-.762.11-.289.18-.599.211-.931v-.03a1.989 1.989 0 0 1-.662.492c-.141.067-.297.12-.469.159a2.46 2.46 0 0 1-.556.058c-.414 0-.776-.078-1.084-.234a2.24 2.24 0 0 1-.762-.627 2.738 2.738 0 0 1-.463-.914 3.827 3.827 0 0 1-.152-1.084c0-.41.06-.795.181-1.154a2.91 2.91 0 0 1 .539-.956 2.53 2.53 0 0 1 .862-.638c.344-.16.734-.24 1.172-.24.441 0 .832.084 1.172.252.343.167.634.396.873.685.25.313.439.691.568 1.137.129.441.193.906.193 1.394v.492a7.72 7.72 0 0 1-.234 1.922 3.89 3.89 0 0 1-.826 1.6c-.321.375-.742.67-1.266.885-.519.215-1.146.322-1.881.322h-.117v-1.195h.111Zm1.413-2.754a1.4 1.4 0 0 0 .867-.293c.121-.09.226-.195.316-.317a1.79 1.79 0 0 0 .229-.404v-.486c0-.34-.039-.641-.118-.903a2.13 2.13 0 0 0-.298-.656 1.317 1.317 0 0 0-.452-.398 1.126 1.126 0 0 0-.55-.141c-.219 0-.414.049-.586.147a1.235 1.235 0 0 0-.422.386 1.87 1.87 0 0 0-.27.58 2.759 2.759 0 0 0-.006 1.366c.055.215.141.406.258.574.114.164.254.297.422.398.172.098.375.147.61.147Zm10.13.656c0 .547-.064 1.031-.193 1.453a2.875 2.875 0 0 1-.545 1.049 2.237 2.237 0 0 1-.867.656c-.34.145-.727.217-1.16.217-.43 0-.817-.072-1.16-.217a2.286 2.286 0 0 1-.873-.656 2.877 2.877 0 0 1-.557-1.049 5.121 5.121 0 0 1-.188-1.453v-2.021c0-.547.063-1.03.188-1.448.129-.422.312-.777.551-1.066.238-.285.527-.5.867-.645.344-.148.73-.222 1.16-.222.434 0 .82.074 1.16.222.344.145.637.36.879.645.234.289.416.644.545 1.066.129.418.193.901.193 1.448v2.021Zm-4.136-.498 2.713-2.057a3.226 3.226 0 0 0-.129-.791 1.433 1.433 0 0 0-.287-.545 1.034 1.034 0 0 0-.405-.281 1.435 1.435 0 0 0-.533-.094c-.215 0-.404.038-.568.112a1.04 1.04 0 0 0-.41.328 1.642 1.642 0 0 0-.288.639 3.94 3.94 0 0 0-.093.914v1.775Zm2.724.732v-1.711l-2.713 2.045c.02.27.061.508.123.715.067.207.155.379.264.516.109.148.244.26.404.334.164.074.354.111.569.111.211 0 .396-.035.556-.105a1.14 1.14 0 0 0 .411-.323c.128-.164.224-.378.287-.644.066-.266.099-.578.099-.938Z"
              className="290"
            />
            <path
              d="M691.529 412h-5.724v-.973l2.777-3.023c.23-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.554-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.424 6.424 0 0 1-.557.744c-.21.25-.441.508-.691.774l-1.898 2.027h3.972V412Zm7.084-6.281c0 .258-.043.498-.129.72a1.92 1.92 0 0 1-.351.598 2.302 2.302 0 0 1-.322.317 2.269 2.269 0 0 1-.405.257c.176.082.338.178.487.287.152.106.285.229.398.37a2.134 2.134 0 0 1 .51 1.412c0 .394-.072.744-.217 1.049a2.165 2.165 0 0 1-.592.761 2.621 2.621 0 0 1-.89.469 3.64 3.64 0 0 1-1.09.158c-.399 0-.77-.053-1.114-.158a2.556 2.556 0 0 1-.884-.469 2.144 2.144 0 0 1-.598-.756 2.482 2.482 0 0 1-.211-1.054c0-.235.031-.457.094-.668.066-.211.16-.407.281-.586.121-.172.266-.326.434-.463a2.68 2.68 0 0 1 .574-.358 2.293 2.293 0 0 1-.492-.328 2.093 2.093 0 0 1-.616-.955 2.064 2.064 0 0 1-.087-.603c0-.379.064-.715.193-1.008.133-.293.314-.541.545-.744.226-.203.498-.356.814-.457.321-.106.67-.158 1.049-.158.375 0 .721.052 1.037.158.321.101.6.254.838.457.231.199.412.447.545.744.133.293.199.629.199 1.008Zm-1.213 3.885c0-.211-.035-.403-.105-.575a1.365 1.365 0 0 0-.281-.457 1.307 1.307 0 0 0-.446-.281 1.572 1.572 0 0 0-.568-.1c-.215 0-.408.034-.58.1-.168.066-.313.16-.434.281a1.365 1.365 0 0 0-.281.457 1.704 1.704 0 0 0-.094.58c0 .219.034.416.1.592.066.172.162.317.287.434.121.113.266.201.434.263.172.059.365.088.58.088.203 0 .388-.031.556-.093.172-.063.321-.153.446-.27.117-.121.211-.266.281-.434.07-.171.105-.367.105-.585Zm-.181-3.833a1.38 1.38 0 0 0-.094-.521 1.291 1.291 0 0 0-.246-.41 1.188 1.188 0 0 0-.387-.258 1.294 1.294 0 0 0-.504-.094c-.183 0-.349.032-.498.094a1.097 1.097 0 0 0-.375.252 1.123 1.123 0 0 0-.234.404c-.055.16-.082.338-.082.533 0 .192.027.368.082.528.055.156.137.289.246.398.105.114.232.201.381.264.148.062.314.094.498.094.183 0 .349-.032.498-.094a1.154 1.154 0 0 0 .627-.662 1.54 1.54 0 0 0 .088-.528Zm8.601-.052c0 .258-.043.498-.129.72a1.92 1.92 0 0 1-.351.598 2.302 2.302 0 0 1-.322.317 2.269 2.269 0 0 1-.405.257c.176.082.338.178.487.287.152.106.285.229.398.37a2.134 2.134 0 0 1 .51 1.412c0 .394-.072.744-.217 1.049a2.165 2.165 0 0 1-.592.761 2.621 2.621 0 0 1-.89.469 3.64 3.64 0 0 1-1.09.158c-.399 0-.77-.053-1.114-.158a2.556 2.556 0 0 1-.884-.469 2.144 2.144 0 0 1-.598-.756 2.482 2.482 0 0 1-.211-1.054c0-.235.031-.457.094-.668.066-.211.16-.407.281-.586.121-.172.266-.326.434-.463a2.68 2.68 0 0 1 .574-.358 2.293 2.293 0 0 1-.492-.328 2.093 2.093 0 0 1-.615-.955 2.031 2.031 0 0 1-.088-.603c0-.379.064-.715.193-1.008.133-.293.314-.541.545-.744.226-.203.498-.356.814-.457.321-.106.67-.158 1.049-.158.375 0 .721.052 1.037.158.321.101.6.254.838.457.231.199.412.447.545.744.133.293.199.629.199 1.008Zm-1.213 3.885c0-.211-.035-.403-.105-.575a1.365 1.365 0 0 0-.281-.457 1.307 1.307 0 0 0-.446-.281 1.568 1.568 0 0 0-.568-.1c-.215 0-.408.034-.58.1-.168.066-.313.16-.434.281a1.382 1.382 0 0 0-.281.457 1.704 1.704 0 0 0-.094.58c0 .219.034.416.1.592.066.172.162.317.287.434.121.113.266.201.434.263.172.059.365.088.58.088.203 0 .388-.031.556-.093.172-.063.321-.153.446-.27.117-.121.211-.266.281-.434.07-.171.105-.367.105-.585Zm-.181-3.833a1.38 1.38 0 0 0-.094-.521 1.291 1.291 0 0 0-.246-.41 1.188 1.188 0 0 0-.387-.258 1.294 1.294 0 0 0-.504-.094c-.183 0-.349.032-.498.094a1.097 1.097 0 0 0-.375.252 1.123 1.123 0 0 0-.234.404c-.055.16-.082.338-.082.533 0 .192.027.368.082.528.055.156.137.289.246.398.105.114.232.201.381.264.148.062.314.094.498.094.183 0 .349-.032.498-.094a1.154 1.154 0 0 0 .627-.662 1.54 1.54 0 0 0 .088-.528Z"
              className="288"
            />
            <path
              d="M658.529 419h-5.724v-.973l2.777-3.023c.23-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.554-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.424 6.424 0 0 1-.557.744c-.21.25-.441.508-.691.774l-1.898 2.027h3.972V419Zm2.912-1.154c.485 0 .897-.055 1.237-.164.34-.11.619-.266.838-.469.234-.223.406-.477.515-.762.11-.289.18-.599.211-.931v-.03a1.989 1.989 0 0 1-.662.492c-.141.067-.297.12-.469.159a2.46 2.46 0 0 1-.556.058c-.414 0-.776-.078-1.084-.234a2.24 2.24 0 0 1-.762-.627 2.738 2.738 0 0 1-.463-.914 3.827 3.827 0 0 1-.152-1.084c0-.41.06-.795.181-1.154a2.91 2.91 0 0 1 .539-.956 2.53 2.53 0 0 1 .862-.638c.344-.16.734-.24 1.172-.24.441 0 .832.084 1.172.252.343.167.634.396.873.685.25.313.439.691.568 1.137.129.441.193.906.193 1.394v.492a7.72 7.72 0 0 1-.234 1.922 3.89 3.89 0 0 1-.826 1.6c-.321.375-.742.67-1.266.885-.519.215-1.146.322-1.881.322h-.117v-1.195h.111Zm1.413-2.754a1.4 1.4 0 0 0 .867-.293c.121-.09.226-.195.316-.317a1.79 1.79 0 0 0 .229-.404v-.486c0-.34-.039-.641-.118-.903a2.13 2.13 0 0 0-.298-.656 1.317 1.317 0 0 0-.452-.398 1.126 1.126 0 0 0-.55-.141c-.219 0-.414.049-.586.147a1.235 1.235 0 0 0-.422.386 1.87 1.87 0 0 0-.27.58 2.759 2.759 0 0 0-.006 1.366c.055.215.141.406.258.574.114.164.254.297.422.398.172.098.375.147.61.147Zm8.449 3.908h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V419Z"
              className="291"
            />
            <path
              d="M683.529 429h-5.724v-.973l2.777-3.023c.23-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.554-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.424 6.424 0 0 1-.557.744c-.21.25-.441.508-.691.774l-1.898 2.027h3.972V429Zm7.084-6.281c0 .258-.043.498-.129.72a1.92 1.92 0 0 1-.351.598 2.302 2.302 0 0 1-.322.317 2.269 2.269 0 0 1-.405.257c.176.082.338.178.487.287.152.106.285.229.398.37a2.134 2.134 0 0 1 .51 1.412c0 .394-.072.744-.217 1.049a2.165 2.165 0 0 1-.592.761 2.621 2.621 0 0 1-.89.469 3.64 3.64 0 0 1-1.09.158c-.399 0-.77-.053-1.114-.158a2.556 2.556 0 0 1-.884-.469 2.144 2.144 0 0 1-.598-.756 2.482 2.482 0 0 1-.211-1.054c0-.235.031-.457.094-.668.066-.211.16-.407.281-.586.121-.172.266-.326.434-.463a2.68 2.68 0 0 1 .574-.358 2.293 2.293 0 0 1-.492-.328 2.093 2.093 0 0 1-.616-.955 2.064 2.064 0 0 1-.087-.603c0-.379.064-.715.193-1.008.133-.293.314-.541.545-.744.226-.203.498-.356.814-.457.321-.106.67-.158 1.049-.158.375 0 .721.052 1.037.158.321.101.6.254.838.457.231.199.412.447.545.744.133.293.199.629.199 1.008Zm-1.213 3.885c0-.211-.035-.403-.105-.575a1.365 1.365 0 0 0-.281-.457 1.307 1.307 0 0 0-.446-.281 1.572 1.572 0 0 0-.568-.1c-.215 0-.408.034-.58.1-.168.066-.313.16-.434.281a1.365 1.365 0 0 0-.281.457 1.704 1.704 0 0 0-.094.58c0 .219.034.416.1.592.066.172.162.317.287.434.121.113.266.201.434.263.172.059.365.088.58.088.203 0 .388-.031.556-.093.172-.063.321-.153.446-.27.117-.121.211-.266.281-.434.07-.171.105-.367.105-.585Zm-.181-3.833a1.38 1.38 0 0 0-.094-.521 1.291 1.291 0 0 0-.246-.41 1.188 1.188 0 0 0-.387-.258 1.294 1.294 0 0 0-.504-.094c-.183 0-.349.032-.498.094a1.097 1.097 0 0 0-.375.252 1.123 1.123 0 0 0-.234.404c-.055.16-.082.338-.082.533 0 .192.027.368.082.528.055.156.137.289.246.398.105.114.232.201.381.264.148.062.314.094.498.094.183 0 .349-.032.498-.094a1.154 1.154 0 0 0 .627-.662 1.54 1.54 0 0 0 .088-.528Zm4.429 5.075c.485 0 .897-.055 1.237-.164.34-.11.619-.266.838-.469.234-.223.406-.477.515-.762.11-.289.18-.599.211-.931v-.03a1.989 1.989 0 0 1-.662.492c-.141.067-.297.12-.469.159a2.46 2.46 0 0 1-.556.058c-.414 0-.776-.078-1.084-.234a2.24 2.24 0 0 1-.762-.627 2.738 2.738 0 0 1-.463-.914 3.827 3.827 0 0 1-.152-1.084c0-.41.06-.795.181-1.154a2.91 2.91 0 0 1 .539-.956 2.53 2.53 0 0 1 .862-.638c.344-.16.734-.24 1.172-.24.441 0 .832.084 1.172.252.343.167.634.396.873.685.25.313.439.691.568 1.137.129.441.193.906.193 1.394v.492a7.72 7.72 0 0 1-.234 1.922 3.89 3.89 0 0 1-.826 1.6c-.321.375-.742.67-1.266.885-.519.215-1.146.322-1.881.322h-.117v-1.195h.111Zm1.413-2.754a1.4 1.4 0 0 0 .867-.293c.121-.09.226-.195.316-.317a1.79 1.79 0 0 0 .229-.404v-.486c0-.34-.039-.641-.118-.903a2.13 2.13 0 0 0-.298-.656 1.317 1.317 0 0 0-.452-.398 1.126 1.126 0 0 0-.55-.141c-.219 0-.414.049-.586.147a1.235 1.235 0 0 0-.422.386 1.87 1.87 0 0 0-.27.58 2.759 2.759 0 0 0-.006 1.366c.055.215.141.406.258.574.114.164.254.297.422.398.172.098.375.147.61.147Z"
              className="289"
            />
            <path
              d="M627.529 332h-5.724v-.973l2.777-3.023c.23-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.554-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.424 6.424 0 0 1-.557.744c-.21.25-.441.508-.691.774l-1.898 2.027h3.972V332Zm7.278-7.746L631.396 332h-1.476l3.41-7.359h-4.424v-1.172h5.901v.785Zm7.207 0-3.41 7.746h-1.477l3.41-7.359h-4.424v-1.172h5.901v.785Z"
              className="277"
            />
            <path
              d="M662.529 312h-5.724v-.973l2.777-3.023c.23-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.554-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.424 6.424 0 0 1-.557.744c-.21.25-.441.508-.691.774l-1.898 2.027h3.972V312Zm7.278-7.746L666.396 312h-1.476l3.41-7.359h-4.424v-1.172h5.901v.785Zm1.916 3.516.457-4.301h4.588v1.242h-3.422l-.223 2.045c.141-.082.324-.16.551-.235.23-.074.494-.111.791-.111.402 0 .762.067 1.078.199.32.133.592.323.814.569.219.25.387.552.504.908.118.352.176.748.176 1.189 0 .391-.057.76-.17 1.108a2.437 2.437 0 0 1-.51.902 2.356 2.356 0 0 1-.861.61c-.348.148-.758.222-1.23.222-.36 0-.704-.051-1.032-.152a2.663 2.663 0 0 1-.873-.469 2.463 2.463 0 0 1-.627-.756 2.545 2.545 0 0 1-.275-1.049h1.365c.051.418.203.739.457.961.258.223.586.334.985.334.234 0 .437-.043.609-.129.172-.086.316-.207.434-.363a1.63 1.63 0 0 0 .246-.551c.054-.218.082-.455.082-.709 0-.246-.033-.47-.1-.673a1.49 1.49 0 0 0-.287-.54 1.283 1.283 0 0 0-.48-.351 1.621 1.621 0 0 0-.668-.129c-.168 0-.315.014-.44.041a1.46 1.46 0 0 0-.592.27 2.535 2.535 0 0 0-.228.193l-1.119-.275Z"
              className="275"
            />
            <path
              d="M664.529 334h-5.724v-.973l2.777-3.023c.23-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.554-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.424 6.424 0 0 1-.557.744c-.21.25-.441.508-.691.774l-1.898 2.027h3.972V334Zm7.278-7.746L668.396 334h-1.476l3.41-7.359h-4.424v-1.172h5.901v.785Zm6.31 4.705h1.072v1.137h-1.072V334h-1.4v-1.904h-3.692l-.035-.862 3.686-5.765h1.441v5.49Zm-3.697 0h2.297v-3.615l-.164.304-2.133 3.311Z"
              className="274"
            />
            <path
              d="M654.529 358h-5.724v-.973l2.777-3.023c.23-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.554-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.424 6.424 0 0 1-.557.744c-.21.25-.441.508-.691.774l-1.898 2.027h3.972V358Zm7.278-7.746L658.396 358h-1.476l3.41-7.359h-4.424v-1.172h5.901v.785Zm3.187 2.848h.838c.25 0 .469-.034.656-.1a1.23 1.23 0 0 0 .463-.293c.113-.109.199-.244.258-.404.062-.164.094-.34.094-.528 0-.203-.03-.384-.088-.545a1.102 1.102 0 0 0-.246-.41 1.138 1.138 0 0 0-.416-.246 1.704 1.704 0 0 0-.569-.088c-.191 0-.369.03-.533.088a1.198 1.198 0 0 0-.703.621c-.066.149-.1.315-.1.498h-1.4c0-.34.068-.652.205-.937a2.3 2.3 0 0 1 .568-.744c.243-.207.528-.369.856-.487a3.258 3.258 0 0 1 1.09-.175c.402 0 .771.052 1.107.158.34.101.629.254.867.457a2.1 2.1 0 0 1 .563.762c.133.3.199.65.199 1.048 0 .176-.027.352-.082.528a1.96 1.96 0 0 1-.234.509 2.264 2.264 0 0 1-.961.809c.254.086.469.199.644.34.18.137.326.291.44.463.113.176.195.365.246.568.051.199.076.406.076.621 0 .399-.074.754-.223 1.067a2.222 2.222 0 0 1-.597.779 2.706 2.706 0 0 1-.914.492 3.766 3.766 0 0 1-1.131.164c-.367 0-.721-.051-1.061-.152a2.673 2.673 0 0 1-.896-.457 2.308 2.308 0 0 1-.621-.75 2.286 2.286 0 0 1-.229-1.049h1.401c0 .187.033.361.099.521.07.157.17.29.299.399.125.113.273.201.445.264.176.062.369.093.58.093.227 0 .43-.029.61-.088.183-.062.338-.154.463-.275.121-.113.213-.254.275-.422.066-.172.1-.367.1-.586a1.61 1.61 0 0 0-.112-.633 1.135 1.135 0 0 0-.322-.439 1.393 1.393 0 0 0-.51-.252 2.264 2.264 0 0 0-.656-.088h-.838v-1.101Z"
              className="273"
            />
            <path
              d="M684.529 360h-5.724v-.973l2.777-3.023c.23-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.554-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.424 6.424 0 0 1-.557.744c-.21.25-.441.508-.691.774l-1.898 2.027h3.972V360Zm7.278-7.746L688.396 360h-1.476l3.41-7.359h-4.424v-1.172h5.901v.785Zm5.496 7.746h-1.412v-6.797l-2.186.803v-1.236l3.51-1.301h.088V360Z"
              className="271"
            />
            <path
              d="M695.529 389h-5.724v-.973l2.777-3.023c.23-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.554-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.424 6.424 0 0 1-.557.744c-.21.25-.441.508-.691.774l-1.898 2.027h3.972V389Zm7.278-7.746L699.396 389h-1.476l3.41-7.359h-4.424v-1.172h5.901v.785Zm7.136 7.746h-5.724v-.973l2.777-3.023c.231-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.342 1.342 0 0 0-.527-.099c-.25 0-.467.035-.651.105a1.22 1.22 0 0 0-.457.299 1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.555-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.205.498-.358.744a6.528 6.528 0 0 1-.556.744c-.211.25-.442.508-.692.774l-1.898 2.027h3.972V389Z"
              className="272"
            />
            <path
              d="M724.529 376h-5.724v-.973l2.777-3.023c.23-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.554-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.424 6.424 0 0 1-.557.744c-.21.25-.441.508-.691.774l-1.898 2.027h3.972V376Zm7.278-7.746L728.396 376h-1.476l3.41-7.359h-4.424v-1.172h5.901v.785Zm7.177 4.494c0 .547-.064 1.031-.193 1.453a2.875 2.875 0 0 1-.545 1.049 2.237 2.237 0 0 1-.867.656c-.34.145-.727.217-1.16.217-.43 0-.817-.072-1.16-.217a2.286 2.286 0 0 1-.873-.656 2.877 2.877 0 0 1-.557-1.049 5.121 5.121 0 0 1-.188-1.453v-2.021c0-.547.063-1.03.188-1.448.129-.422.312-.777.551-1.066.238-.285.527-.5.867-.645.344-.148.73-.222 1.16-.222.434 0 .82.074 1.16.222.344.145.637.36.879.645.234.289.416.644.545 1.066.129.418.193.901.193 1.448v2.021Zm-4.136-.498 2.713-2.057a3.226 3.226 0 0 0-.129-.791 1.433 1.433 0 0 0-.287-.545 1.034 1.034 0 0 0-.405-.281 1.435 1.435 0 0 0-.533-.094c-.215 0-.404.038-.568.112a1.04 1.04 0 0 0-.41.328 1.642 1.642 0 0 0-.288.639 3.94 3.94 0 0 0-.093.914v1.775Zm2.724.732v-1.711l-2.713 2.045c.02.27.061.508.123.715.067.207.155.379.264.516.109.148.244.26.404.334.164.074.354.111.569.111.211 0 .396-.035.556-.105a1.14 1.14 0 0 0 .411-.323c.128-.164.224-.378.287-.644.066-.266.099-.578.099-.938Z"
              className="270"
            />
            <path
              d="M715.529 403h-5.724v-.973l2.777-3.023c.23-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.554-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.424 6.424 0 0 1-.557.744c-.21.25-.441.508-.691.774l-1.898 2.027h3.972V403Zm7.084-6.281c0 .258-.043.498-.129.72a1.92 1.92 0 0 1-.351.598 2.302 2.302 0 0 1-.322.317 2.269 2.269 0 0 1-.405.257c.176.082.338.178.487.287.152.106.285.229.398.37a2.134 2.134 0 0 1 .51 1.412c0 .394-.072.744-.217 1.049a2.165 2.165 0 0 1-.592.761 2.621 2.621 0 0 1-.89.469 3.64 3.64 0 0 1-1.09.158c-.399 0-.77-.053-1.114-.158a2.556 2.556 0 0 1-.884-.469 2.144 2.144 0 0 1-.598-.756 2.482 2.482 0 0 1-.211-1.054c0-.235.031-.457.094-.668.066-.211.16-.407.281-.586.121-.172.266-.326.434-.463a2.68 2.68 0 0 1 .574-.358 2.293 2.293 0 0 1-.492-.328 2.093 2.093 0 0 1-.616-.955 2.064 2.064 0 0 1-.087-.603c0-.379.064-.715.193-1.008.133-.293.314-.541.545-.744.226-.203.498-.356.814-.457.321-.106.67-.158 1.049-.158.375 0 .721.052 1.037.158.321.101.6.254.838.457.231.199.412.447.545.744.133.293.199.629.199 1.008Zm-1.213 3.885c0-.211-.035-.403-.105-.575a1.365 1.365 0 0 0-.281-.457 1.307 1.307 0 0 0-.446-.281 1.572 1.572 0 0 0-.568-.1c-.215 0-.408.034-.58.1-.168.066-.313.16-.434.281a1.365 1.365 0 0 0-.281.457 1.704 1.704 0 0 0-.094.58c0 .219.034.416.1.592.066.172.162.317.287.434.121.113.266.201.434.263.172.059.365.088.58.088.203 0 .388-.031.556-.093.172-.063.321-.153.446-.27.117-.121.211-.266.281-.434.07-.171.105-.367.105-.585Zm-.181-3.833a1.38 1.38 0 0 0-.094-.521 1.291 1.291 0 0 0-.246-.41 1.188 1.188 0 0 0-.387-.258 1.294 1.294 0 0 0-.504-.094c-.183 0-.349.032-.498.094a1.097 1.097 0 0 0-.375.252 1.123 1.123 0 0 0-.234.404c-.055.16-.082.338-.082.533 0 .192.027.368.082.528.055.156.137.289.246.398.105.114.232.201.381.264.148.062.314.094.498.094.183 0 .349-.032.498-.094a1.154 1.154 0 0 0 .627-.662 1.54 1.54 0 0 0 .088-.528Zm8.795-1.517-3.41 7.746h-1.477l3.41-7.359h-4.424v-1.172h5.901v.785Z"
              className="287"
            />
            <path
              d="M740.529 400h-5.724v-.973l2.777-3.023c.23-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.554-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.424 6.424 0 0 1-.557.744c-.21.25-.441.508-.691.774l-1.898 2.027h3.972V400Zm7.084-6.281c0 .258-.043.498-.129.72a1.92 1.92 0 0 1-.351.598 2.302 2.302 0 0 1-.322.317 2.269 2.269 0 0 1-.405.257c.176.082.338.178.487.287.152.106.285.229.398.37a2.134 2.134 0 0 1 .51 1.412c0 .394-.072.744-.217 1.049a2.165 2.165 0 0 1-.592.761 2.621 2.621 0 0 1-.89.469 3.64 3.64 0 0 1-1.09.158c-.399 0-.77-.053-1.114-.158a2.556 2.556 0 0 1-.884-.469 2.144 2.144 0 0 1-.598-.756 2.482 2.482 0 0 1-.211-1.054c0-.235.031-.457.094-.668.066-.211.16-.407.281-.586.121-.172.266-.326.434-.463a2.68 2.68 0 0 1 .574-.358 2.293 2.293 0 0 1-.492-.328 2.093 2.093 0 0 1-.616-.955 2.064 2.064 0 0 1-.087-.603c0-.379.064-.715.193-1.008.133-.293.314-.541.545-.744.226-.203.498-.356.814-.457.321-.106.67-.158 1.049-.158.375 0 .721.052 1.037.158.321.101.6.254.838.457.231.199.412.447.545.744.133.293.199.629.199 1.008Zm-1.213 3.885c0-.211-.035-.403-.105-.575a1.365 1.365 0 0 0-.281-.457 1.307 1.307 0 0 0-.446-.281 1.572 1.572 0 0 0-.568-.1c-.215 0-.408.034-.58.1-.168.066-.313.16-.434.281a1.365 1.365 0 0 0-.281.457 1.704 1.704 0 0 0-.094.58c0 .219.034.416.1.592.066.172.162.317.287.434.121.113.266.201.434.263.172.059.365.088.58.088.203 0 .388-.031.556-.093.172-.063.321-.153.446-.27.117-.121.211-.266.281-.434.07-.171.105-.367.105-.585Zm-.181-3.833a1.38 1.38 0 0 0-.094-.521 1.291 1.291 0 0 0-.246-.41 1.188 1.188 0 0 0-.387-.258 1.294 1.294 0 0 0-.504-.094c-.183 0-.349.032-.498.094a1.097 1.097 0 0 0-.375.252 1.123 1.123 0 0 0-.234.404c-.055.16-.082.338-.082.533 0 .192.027.368.082.528.055.156.137.289.246.398.105.114.232.201.381.264.148.062.314.094.498.094.183 0 .349-.032.498-.094a1.154 1.154 0 0 0 .627-.662 1.54 1.54 0 0 0 .088-.528Zm7.476-2.343v1.189h-.093c-.465 0-.87.065-1.213.194a2.382 2.382 0 0 0-1.418 1.341 3.507 3.507 0 0 0-.241 1.02c.094-.106.204-.207.329-.305.125-.101.263-.191.416-.269.144-.075.304-.133.48-.176.176-.047.361-.07.557-.07.414 0 .773.078 1.078.234.308.156.562.367.762.633.203.265.351.57.445.914.098.344.146.701.146 1.072 0 .406-.062.787-.187 1.143a2.673 2.673 0 0 1-.533.92c-.239.265-.53.474-.873.627-.34.148-.729.222-1.166.222-.45 0-.85-.086-1.202-.258a2.64 2.64 0 0 1-.89-.697 3.137 3.137 0 0 1-.586-1.072 4.248 4.248 0 0 1-.199-1.307v-.58c0-.687.088-1.342.263-1.963a3.95 3.95 0 0 1 .891-1.611 3.473 3.473 0 0 1 1.301-.891c.515-.207 1.105-.31 1.769-.31h.164Zm-1.529 4.06c-.168 0-.328.026-.48.076a1.668 1.668 0 0 0-.422.211c-.118.09-.223.194-.317.311a1.71 1.71 0 0 0-.234.393v.433c0 .34.037.639.111.897.078.257.184.472.317.644.132.172.287.303.463.393.175.09.363.134.562.134.219 0 .414-.042.586-.128.172-.09.318-.211.439-.364.121-.156.213-.34.276-.55.062-.215.094-.448.094-.698 0-.238-.032-.463-.094-.674a1.716 1.716 0 0 0-.264-.562 1.24 1.24 0 0 0-.439-.375 1.226 1.226 0 0 0-.598-.141Z"
              className="286"
            />
            <path
              d="M321.529 358h-5.724v-.973l2.777-3.023c.23-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.554-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.424 6.424 0 0 1-.557.744c-.21.25-.441.508-.691.774l-1.898 2.027h3.972V358Zm7.248-3.252c0 .547-.064 1.031-.193 1.453a2.875 2.875 0 0 1-.545 1.049 2.237 2.237 0 0 1-.867.656c-.34.145-.727.217-1.16.217-.43 0-.817-.072-1.16-.217a2.286 2.286 0 0 1-.873-.656 2.877 2.877 0 0 1-.557-1.049 5.121 5.121 0 0 1-.188-1.453v-2.021c0-.547.063-1.03.188-1.448.129-.422.312-.777.551-1.066.238-.285.527-.5.867-.645.344-.148.73-.222 1.16-.222.434 0 .82.074 1.16.222.344.145.637.36.879.645.234.289.416.644.545 1.066.129.418.193.901.193 1.448v2.021Zm-4.136-.498 2.713-2.057a3.226 3.226 0 0 0-.129-.791 1.447 1.447 0 0 0-.287-.545 1.034 1.034 0 0 0-.405-.281 1.435 1.435 0 0 0-.533-.094c-.215 0-.404.038-.568.112a1.05 1.05 0 0 0-.411.328 1.656 1.656 0 0 0-.287.639 3.94 3.94 0 0 0-.093.914v1.775Zm2.724.732v-1.711l-2.713 2.045c.02.27.061.508.123.715.067.207.155.379.264.516.109.148.244.26.404.334.164.074.354.111.569.111.211 0 .396-.035.556-.105a1.14 1.14 0 0 0 .411-.323c.128-.164.224-.378.287-.644.066-.266.099-.578.099-.938Zm7.752-.023h1.072v1.137h-1.072V358h-1.4v-1.904h-3.692l-.035-.862 3.686-5.765h1.441v5.49Zm-3.697 0h2.297v-3.615l-.164.304-2.133 3.311Z"
              className="204"
            />
            <path
              d="M281.58 14.102h.838c.25 0 .469-.034.656-.1a1.23 1.23 0 0 0 .463-.293 1.07 1.07 0 0 0 .258-.404 1.48 1.48 0 0 0 .094-.528c0-.203-.03-.384-.088-.545a1.095 1.095 0 0 0-.246-.41 1.125 1.125 0 0 0-.416-.246 1.69 1.69 0 0 0-.569-.088c-.191 0-.369.03-.533.088a1.186 1.186 0 0 0-.703.621c-.066.149-.1.315-.1.498h-1.4c0-.34.068-.652.205-.937a2.3 2.3 0 0 1 .568-.744 2.71 2.71 0 0 1 .856-.487 3.255 3.255 0 0 1 1.09-.175c.402 0 .771.052 1.107.158.34.101.629.254.867.457.243.207.43.46.563.761.133.301.199.65.199 1.05 0 .175-.027.35-.082.527a1.953 1.953 0 0 1-.234.51 2.274 2.274 0 0 1-.961.808c.254.086.468.2.644.34.18.137.326.29.44.463a1.9 1.9 0 0 1 .246.568c.051.2.076.406.076.621 0 .399-.074.754-.223 1.067a2.217 2.217 0 0 1-.597.779 2.713 2.713 0 0 1-.914.492c-.348.11-.725.164-1.131.164-.367 0-.721-.05-1.061-.152a2.662 2.662 0 0 1-.896-.457 2.31 2.31 0 0 1-.621-.75 2.283 2.283 0 0 1-.229-1.049h1.4c0 .188.034.361.1.521.07.157.17.29.299.399.125.113.273.201.445.264.176.062.369.093.58.093.227 0 .43-.029.61-.088.183-.062.338-.154.463-.275a1.09 1.09 0 0 0 .275-.422c.066-.172.1-.367.1-.586 0-.246-.038-.457-.112-.633a1.132 1.132 0 0 0-.322-.439 1.392 1.392 0 0 0-.51-.252 2.278 2.278 0 0 0-.656-.088h-.838v-1.101ZM292.736 19h-5.724v-.973l2.777-3.023c.231-.254.424-.48.58-.68a5.4 5.4 0 0 0 .381-.556c.094-.168.16-.325.199-.47a1.626 1.626 0 0 0-.023-.99 1.169 1.169 0 0 0-.258-.421 1.202 1.202 0 0 0-.41-.276 1.336 1.336 0 0 0-.528-.1c-.25 0-.466.036-.65.106s-.336.17-.457.299a1.318 1.318 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.37.068-.72.205-1.049.137-.332.332-.62.586-.867.25-.246.555-.441.914-.586a3.25 3.25 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.29.838.504.222.215.392.473.51.773.117.297.175.625.175.985 0 .27-.045.531-.134.785-.086.25-.206.498-.358.744a6.52 6.52 0 0 1-.556.744c-.211.25-.442.508-.692.774l-1.898 2.027h3.972V19Zm7.207 0h-5.724v-.973l2.777-3.023c.231-.254.424-.48.58-.68a5.4 5.4 0 0 0 .381-.556c.094-.168.16-.325.199-.47a1.626 1.626 0 0 0-.023-.99 1.169 1.169 0 0 0-.258-.421 1.202 1.202 0 0 0-.41-.276 1.335 1.335 0 0 0-.527-.1c-.25 0-.467.036-.651.106-.183.07-.336.17-.457.299a1.318 1.318 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.37.068-.72.205-1.049.137-.332.332-.62.586-.867.25-.246.555-.441.914-.586a3.25 3.25 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.29.838.504.222.215.392.473.51.773.117.297.175.625.175.985 0 .27-.045.531-.134.785-.086.25-.205.498-.358.744a6.52 6.52 0 0 1-.556.744c-.211.25-.442.508-.692.774l-1.898 2.027h3.972V19Z"
              className="322"
            />
            <path
              d="M402.58 14.102h.838c.25 0 .469-.034.656-.1a1.23 1.23 0 0 0 .463-.293 1.07 1.07 0 0 0 .258-.404 1.48 1.48 0 0 0 .094-.528c0-.203-.03-.384-.088-.545a1.095 1.095 0 0 0-.246-.41 1.125 1.125 0 0 0-.416-.246 1.69 1.69 0 0 0-.569-.088c-.191 0-.369.03-.533.088a1.186 1.186 0 0 0-.703.621c-.066.149-.1.315-.1.498h-1.4c0-.34.068-.652.205-.937a2.3 2.3 0 0 1 .568-.744 2.71 2.71 0 0 1 .856-.487 3.255 3.255 0 0 1 1.09-.175c.402 0 .771.052 1.107.158.34.101.629.254.867.457.243.207.43.46.563.761.133.301.199.65.199 1.05 0 .175-.027.35-.082.527a1.953 1.953 0 0 1-.234.51 2.274 2.274 0 0 1-.961.808c.254.086.468.2.644.34.18.137.326.29.44.463a1.9 1.9 0 0 1 .246.568c.051.2.076.406.076.621 0 .399-.074.754-.223 1.067a2.217 2.217 0 0 1-.597.779 2.713 2.713 0 0 1-.914.492c-.348.11-.725.164-1.131.164-.367 0-.721-.05-1.061-.152a2.662 2.662 0 0 1-.896-.457 2.31 2.31 0 0 1-.621-.75 2.283 2.283 0 0 1-.229-1.049h1.4c0 .188.034.361.1.521.07.157.17.29.299.399.125.113.273.201.445.264.176.062.369.093.58.093.227 0 .43-.029.61-.088.183-.062.338-.154.463-.275a1.09 1.09 0 0 0 .275-.422c.066-.172.1-.367.1-.586 0-.246-.038-.457-.112-.633a1.132 1.132 0 0 0-.322-.439 1.392 1.392 0 0 0-.51-.252 2.278 2.278 0 0 0-.656-.088h-.838v-1.101ZM413.736 19h-5.724v-.973l2.777-3.023c.231-.254.424-.48.58-.68a5.4 5.4 0 0 0 .381-.556c.094-.168.16-.325.199-.47a1.626 1.626 0 0 0-.023-.99 1.169 1.169 0 0 0-.258-.421 1.202 1.202 0 0 0-.41-.276 1.336 1.336 0 0 0-.528-.1c-.25 0-.466.036-.65.106s-.336.17-.457.299a1.318 1.318 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.37.068-.72.205-1.049.137-.332.332-.62.586-.867.25-.246.555-.441.914-.586a3.25 3.25 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.29.838.504.222.215.392.473.51.773.117.297.175.625.175.985 0 .27-.045.531-.134.785-.086.25-.206.498-.358.744a6.52 6.52 0 0 1-.556.744c-.211.25-.442.508-.692.774l-1.898 2.027h3.972V19Zm5.959-8.572v1.19h-.093c-.465 0-.87.064-1.213.192a2.385 2.385 0 0 0-1.418 1.342 3.498 3.498 0 0 0-.241 1.02c.094-.106.204-.207.329-.305a2.35 2.35 0 0 1 .416-.27c.144-.074.304-.132.48-.175.176-.047.361-.07.557-.07.414 0 .773.078 1.078.234.308.156.562.367.762.633.203.265.351.57.445.914.098.344.146.701.146 1.072 0 .406-.062.787-.187 1.143a2.665 2.665 0 0 1-.533.92 2.55 2.55 0 0 1-.873.627c-.34.148-.729.222-1.166.222-.45 0-.85-.086-1.202-.258a2.652 2.652 0 0 1-.89-.697 3.134 3.134 0 0 1-.586-1.072 4.246 4.246 0 0 1-.199-1.307v-.58c0-.687.088-1.342.263-1.963a3.95 3.95 0 0 1 .891-1.611 3.476 3.476 0 0 1 1.301-.89c.515-.208 1.105-.311 1.769-.311h.164Zm-1.529 4.06a1.601 1.601 0 0 0-.902.287 1.722 1.722 0 0 0-.551.703v.434c0 .34.037.639.111.897.078.257.184.472.317.644.132.172.287.303.463.393.175.09.363.134.562.134.219 0 .414-.043.586-.128.172-.09.318-.211.439-.364a1.67 1.67 0 0 0 .276-.55c.062-.215.094-.448.094-.698 0-.238-.032-.463-.094-.674a1.713 1.713 0 0 0-.264-.562 1.237 1.237 0 0 0-.439-.375 1.23 1.23 0 0 0-.598-.14Z"
              className="326"
            />
            <path
              d="M525.58 14.102h.838c.25 0 .469-.034.656-.1a1.23 1.23 0 0 0 .463-.293 1.07 1.07 0 0 0 .258-.404 1.48 1.48 0 0 0 .094-.528c0-.203-.03-.384-.088-.545a1.095 1.095 0 0 0-.246-.41 1.125 1.125 0 0 0-.416-.246 1.69 1.69 0 0 0-.569-.088c-.191 0-.369.03-.533.088a1.186 1.186 0 0 0-.703.621c-.066.149-.1.315-.1.498h-1.4c0-.34.068-.652.205-.937a2.3 2.3 0 0 1 .568-.744 2.71 2.71 0 0 1 .856-.487 3.255 3.255 0 0 1 1.09-.175c.402 0 .771.052 1.107.158.34.101.629.254.867.457.243.207.43.46.563.761.133.301.199.65.199 1.05 0 .175-.027.35-.082.527a1.953 1.953 0 0 1-.234.51 2.274 2.274 0 0 1-.961.808c.254.086.468.2.644.34.18.137.326.29.44.463a1.9 1.9 0 0 1 .246.568c.051.2.076.406.076.621 0 .399-.074.754-.223 1.067a2.217 2.217 0 0 1-.597.779 2.713 2.713 0 0 1-.914.492c-.348.11-.725.164-1.131.164-.367 0-.721-.05-1.061-.152a2.662 2.662 0 0 1-.896-.457 2.31 2.31 0 0 1-.621-.75 2.283 2.283 0 0 1-.229-1.049h1.4c0 .188.034.361.1.521.07.157.17.29.299.399.125.113.273.201.445.264.176.062.369.093.58.093.227 0 .43-.029.61-.088.183-.062.338-.154.463-.275a1.09 1.09 0 0 0 .275-.422c.066-.172.1-.367.1-.586 0-.246-.038-.457-.112-.633a1.132 1.132 0 0 0-.322-.439 1.392 1.392 0 0 0-.51-.252 2.278 2.278 0 0 0-.656-.088h-.838v-1.101ZM536.736 19h-5.724v-.973l2.777-3.023c.231-.254.424-.48.58-.68a5.4 5.4 0 0 0 .381-.556c.094-.168.16-.325.199-.47a1.626 1.626 0 0 0-.023-.99 1.169 1.169 0 0 0-.258-.421 1.202 1.202 0 0 0-.41-.276 1.336 1.336 0 0 0-.528-.1c-.25 0-.466.036-.65.106s-.336.17-.457.299a1.318 1.318 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.37.068-.72.205-1.049.137-.332.332-.62.586-.867.25-.246.555-.441.914-.586a3.25 3.25 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.29.838.504.222.215.392.473.51.773.117.297.175.625.175.985 0 .27-.045.531-.134.785-.086.25-.206.498-.358.744a6.52 6.52 0 0 1-.556.744c-.211.25-.442.508-.692.774l-1.898 2.027h3.972V19Zm5.567 0h-1.412v-6.797l-2.186.803V11.77l3.51-1.301h.088V19Z"
              className="321"
            />
            <path
              d="M647.58 15.102h.838c.25 0 .469-.034.656-.1a1.23 1.23 0 0 0 .463-.293 1.07 1.07 0 0 0 .258-.404 1.48 1.48 0 0 0 .094-.528c0-.203-.03-.384-.088-.545a1.095 1.095 0 0 0-.246-.41 1.125 1.125 0 0 0-.416-.246 1.69 1.69 0 0 0-.569-.088c-.191 0-.369.03-.533.088a1.186 1.186 0 0 0-.703.621c-.066.149-.1.315-.1.498h-1.4c0-.34.068-.652.205-.937a2.3 2.3 0 0 1 .568-.744 2.71 2.71 0 0 1 .856-.487 3.255 3.255 0 0 1 1.09-.175c.402 0 .771.052 1.107.158.34.101.629.254.867.457.243.207.43.46.563.761.133.301.199.65.199 1.05 0 .175-.027.35-.082.527a1.953 1.953 0 0 1-.234.51 2.274 2.274 0 0 1-.961.808c.254.086.468.2.644.34.18.137.326.29.44.463a1.9 1.9 0 0 1 .246.568c.051.2.076.406.076.621 0 .399-.074.754-.223 1.067a2.217 2.217 0 0 1-.597.779 2.713 2.713 0 0 1-.914.492c-.348.11-.725.164-1.131.164-.367 0-.721-.05-1.061-.152a2.662 2.662 0 0 1-.896-.457 2.31 2.31 0 0 1-.621-.75 2.283 2.283 0 0 1-.229-1.049h1.4c0 .188.034.361.1.521.07.157.17.29.299.399.125.113.273.201.445.264.176.062.369.093.58.093.227 0 .43-.029.61-.088.183-.062.338-.154.463-.275a1.09 1.09 0 0 0 .275-.422c.066-.172.1-.367.1-.586 0-.246-.038-.457-.112-.633a1.132 1.132 0 0 0-.322-.439 1.392 1.392 0 0 0-.51-.252 2.278 2.278 0 0 0-.656-.088h-.838v-1.101ZM658.736 20h-5.724v-.973l2.777-3.023c.231-.254.424-.48.58-.68a5.4 5.4 0 0 0 .381-.556c.094-.168.16-.325.199-.47a1.626 1.626 0 0 0-.023-.99 1.169 1.169 0 0 0-.258-.421 1.202 1.202 0 0 0-.41-.276 1.336 1.336 0 0 0-.528-.1c-.25 0-.466.036-.65.106s-.336.17-.457.299a1.318 1.318 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.37.068-.72.205-1.049.137-.332.332-.62.586-.867.25-.246.555-.441.914-.586a3.25 3.25 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.29.838.504.222.215.392.473.51.773.117.297.175.625.175.985 0 .27-.045.531-.134.785-.086.25-.206.498-.358.744a6.52 6.52 0 0 1-.556.744c-.211.25-.442.508-.692.774l-1.898 2.027h3.972V20Zm7.278-7.746L662.604 20h-1.477l3.41-7.36h-4.424v-1.17h5.901v.785Z"
              className="327"
            />
            <path
              d="M604.58 26.102h.838c.25 0 .469-.034.656-.1a1.23 1.23 0 0 0 .463-.293 1.07 1.07 0 0 0 .258-.404 1.48 1.48 0 0 0 .094-.528c0-.203-.03-.384-.088-.545a1.095 1.095 0 0 0-.246-.41 1.125 1.125 0 0 0-.416-.246 1.69 1.69 0 0 0-.569-.088c-.191 0-.369.03-.533.088a1.186 1.186 0 0 0-.703.621c-.066.149-.1.315-.1.498h-1.4c0-.34.068-.652.205-.937a2.3 2.3 0 0 1 .568-.744 2.71 2.71 0 0 1 .856-.487 3.255 3.255 0 0 1 1.09-.175c.402 0 .771.052 1.107.158.34.101.629.254.867.457.243.207.43.46.563.762.133.3.199.65.199 1.048 0 .176-.027.352-.082.528a1.953 1.953 0 0 1-.234.51 2.274 2.274 0 0 1-.961.808c.254.086.468.2.644.34.18.137.326.29.44.463a1.9 1.9 0 0 1 .246.568c.051.2.076.406.076.621 0 .399-.074.754-.223 1.067a2.217 2.217 0 0 1-.597.779 2.713 2.713 0 0 1-.914.492c-.348.11-.725.164-1.131.164-.367 0-.721-.05-1.061-.152a2.662 2.662 0 0 1-.896-.457 2.31 2.31 0 0 1-.621-.75 2.283 2.283 0 0 1-.229-1.049h1.4c0 .188.034.361.1.521.07.157.17.29.299.399.125.113.273.201.445.264.176.062.369.093.58.093.227 0 .43-.029.61-.088.183-.062.338-.154.463-.275a1.09 1.09 0 0 0 .275-.422c.066-.172.1-.367.1-.586 0-.246-.038-.457-.112-.633a1.132 1.132 0 0 0-.322-.439 1.392 1.392 0 0 0-.51-.252 2.278 2.278 0 0 0-.656-.088h-.838v-1.101ZM614.096 31h-1.412v-6.797l-2.186.803V23.77l3.51-1.301h.088V31Zm4.552-1.154c.485 0 .897-.055 1.237-.164.34-.11.619-.266.838-.47a2.06 2.06 0 0 0 .515-.76c.11-.29.18-.6.211-.933v-.029a1.996 1.996 0 0 1-.662.492c-.141.067-.297.12-.469.159a2.46 2.46 0 0 1-.556.058c-.414 0-.776-.078-1.084-.234a2.246 2.246 0 0 1-.762-.627 2.736 2.736 0 0 1-.463-.914 3.825 3.825 0 0 1-.152-1.084c0-.41.06-.795.181-1.154a2.91 2.91 0 0 1 .539-.956c.235-.27.522-.482.862-.638.344-.16.734-.24 1.172-.24.441 0 .832.084 1.172.252.343.168.634.396.873.685.25.313.439.691.568 1.137.129.441.193.906.193 1.394v.492a7.72 7.72 0 0 1-.234 1.922 3.892 3.892 0 0 1-.826 1.6c-.321.375-.742.67-1.266.885-.519.215-1.146.322-1.881.322h-.117v-1.195h.111Zm1.413-2.754a1.4 1.4 0 0 0 .867-.293c.121-.09.226-.195.316-.317.094-.125.17-.26.229-.404v-.486c0-.34-.039-.64-.118-.902a2.12 2.12 0 0 0-.298-.657 1.318 1.318 0 0 0-.452-.398 1.128 1.128 0 0 0-.55-.14c-.219 0-.414.048-.586.146a1.245 1.245 0 0 0-.422.386 1.865 1.865 0 0 0-.27.58 2.755 2.755 0 0 0-.006 1.365c.055.215.141.407.258.575.114.164.254.297.422.398.172.098.375.147.61.147Z"
              className="319"
            />
            <path
              d="M712.58 14.102h.838c.25 0 .469-.034.656-.1a1.23 1.23 0 0 0 .463-.293 1.07 1.07 0 0 0 .258-.404 1.48 1.48 0 0 0 .094-.528c0-.203-.03-.384-.088-.545a1.095 1.095 0 0 0-.246-.41 1.125 1.125 0 0 0-.416-.246 1.69 1.69 0 0 0-.569-.088c-.191 0-.369.03-.533.088a1.186 1.186 0 0 0-.703.621c-.066.149-.1.315-.1.498h-1.4c0-.34.068-.652.205-.937a2.3 2.3 0 0 1 .568-.744 2.71 2.71 0 0 1 .856-.487 3.255 3.255 0 0 1 1.09-.175c.402 0 .771.052 1.107.158.34.101.629.254.867.457.243.207.43.46.563.761.133.301.199.65.199 1.05 0 .175-.027.35-.082.527a1.953 1.953 0 0 1-.234.51 2.274 2.274 0 0 1-.961.808c.254.086.468.2.644.34.18.137.326.29.44.463a1.9 1.9 0 0 1 .246.568c.051.2.076.406.076.621 0 .399-.074.754-.223 1.067a2.217 2.217 0 0 1-.597.779 2.713 2.713 0 0 1-.914.492c-.348.11-.725.164-1.131.164-.367 0-.721-.05-1.061-.152a2.662 2.662 0 0 1-.896-.457 2.31 2.31 0 0 1-.621-.75 2.283 2.283 0 0 1-.229-1.049h1.4c0 .188.034.361.1.521.07.157.17.29.299.399.125.113.273.201.445.264.176.062.369.093.58.093.227 0 .43-.029.61-.088.183-.062.338-.154.463-.275a1.09 1.09 0 0 0 .275-.422c.066-.172.1-.367.1-.586 0-.246-.038-.457-.112-.633a1.132 1.132 0 0 0-.322-.439 1.392 1.392 0 0 0-.51-.252 2.278 2.278 0 0 0-.656-.088h-.838v-1.101ZM723.736 19h-5.724v-.973l2.777-3.023c.231-.254.424-.48.58-.68a5.4 5.4 0 0 0 .381-.556c.094-.168.16-.325.199-.47a1.626 1.626 0 0 0-.023-.99 1.169 1.169 0 0 0-.258-.421 1.202 1.202 0 0 0-.41-.276 1.336 1.336 0 0 0-.528-.1c-.25 0-.466.036-.65.106s-.336.17-.457.299a1.318 1.318 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.37.068-.72.205-1.049.137-.332.332-.62.586-.867.25-.246.555-.441.914-.586a3.25 3.25 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.29.838.504.222.215.392.473.51.773.117.297.175.625.175.985 0 .27-.045.531-.134.785-.086.25-.206.498-.358.744a6.52 6.52 0 0 1-.556.744c-.211.25-.442.508-.692.774l-1.898 2.027h3.972V19Zm7.248-3.252c0 .547-.064 1.031-.193 1.453a2.877 2.877 0 0 1-.545 1.049 2.24 2.24 0 0 1-.867.656 2.94 2.94 0 0 1-1.16.217c-.43 0-.817-.072-1.16-.217a2.29 2.29 0 0 1-.873-.656 2.878 2.878 0 0 1-.557-1.049 5.123 5.123 0 0 1-.188-1.453v-2.021c0-.547.063-1.03.188-1.448.129-.422.312-.777.551-1.066.238-.285.527-.5.867-.645.344-.148.73-.222 1.16-.222.434 0 .82.074 1.16.222.344.145.637.36.879.645.234.289.416.644.545 1.066.129.418.193.9.193 1.448v2.021Zm-4.136-.498 2.713-2.057a3.219 3.219 0 0 0-.129-.79 1.425 1.425 0 0 0-.287-.546 1.03 1.03 0 0 0-.405-.28 1.425 1.425 0 0 0-.533-.095c-.215 0-.404.038-.568.112a1.046 1.046 0 0 0-.41.328 1.642 1.642 0 0 0-.288.638 3.948 3.948 0 0 0-.093.915v1.775Zm2.724.732v-1.711l-2.713 2.045c.02.27.061.508.123.715.067.207.155.38.264.516.109.148.244.26.404.334.164.074.354.111.569.111.211 0 .396-.035.556-.105a1.14 1.14 0 0 0 .411-.323 1.66 1.66 0 0 0 .287-.644 3.92 3.92 0 0 0 .099-.938Z"
              className="320"
            />
            <path
              d="M363.736 32h-5.724v-.973l2.777-3.023c.231-.254.424-.48.58-.68a5.4 5.4 0 0 0 .381-.556c.094-.168.16-.325.199-.47a1.626 1.626 0 0 0-.023-.99 1.169 1.169 0 0 0-.258-.421 1.202 1.202 0 0 0-.41-.276 1.336 1.336 0 0 0-.528-.1c-.25 0-.466.036-.65.106s-.336.17-.457.299a1.318 1.318 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.37.068-.72.205-1.049.137-.332.332-.62.586-.867.25-.246.555-.441.914-.586a3.25 3.25 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.29.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .27-.045.531-.134.785-.086.25-.206.498-.358.744a6.52 6.52 0 0 1-.556.744c-.211.25-.442.508-.692.774l-1.898 2.027h3.972V32Z"
              className="2"
            />
            <path
              d="M458.787 38.102h.838c.25 0 .469-.034.656-.1a1.23 1.23 0 0 0 .463-.293 1.07 1.07 0 0 0 .258-.404 1.48 1.48 0 0 0 .094-.528c0-.203-.03-.384-.088-.545a1.095 1.095 0 0 0-.246-.41 1.125 1.125 0 0 0-.416-.246 1.69 1.69 0 0 0-.569-.088c-.191 0-.369.03-.533.088a1.186 1.186 0 0 0-.703.621c-.066.149-.1.315-.1.498h-1.4c0-.34.068-.652.205-.937a2.3 2.3 0 0 1 .568-.744 2.71 2.71 0 0 1 .856-.487 3.255 3.255 0 0 1 1.09-.175c.402 0 .771.052 1.107.158.34.101.629.254.867.457.243.207.43.46.563.761.133.301.199.65.199 1.05 0 .175-.027.35-.082.527a1.953 1.953 0 0 1-.234.51 2.274 2.274 0 0 1-.961.808c.254.086.469.2.644.34.18.137.326.29.44.463a1.9 1.9 0 0 1 .246.568c.051.2.076.406.076.621 0 .399-.074.754-.223 1.067a2.217 2.217 0 0 1-.597.779 2.713 2.713 0 0 1-.914.492c-.348.11-.725.164-1.131.164-.367 0-.721-.05-1.061-.152a2.662 2.662 0 0 1-.896-.457 2.31 2.31 0 0 1-.621-.75 2.283 2.283 0 0 1-.229-1.049h1.401c0 .188.033.361.099.521.07.157.17.29.299.399.125.113.273.201.445.264.176.062.369.093.58.093.227 0 .43-.029.61-.088.183-.062.338-.154.463-.275a1.09 1.09 0 0 0 .275-.422c.066-.172.1-.367.1-.586a1.61 1.61 0 0 0-.112-.633 1.132 1.132 0 0 0-.322-.439 1.392 1.392 0 0 0-.51-.252 2.278 2.278 0 0 0-.656-.088h-.838v-1.101Z"
              className="3"
            />
            <path
              d="M522.91 68.959h1.072v1.137h-1.072V72h-1.4v-1.904h-3.692l-.035-.862 3.686-5.765h1.441v5.49Zm-3.697 0h2.297v-3.615l-.164.304-2.133 3.311Z"
              className="4"
            />
            <path
              d="m558.516 47.77.457-4.301h4.588v1.242h-3.422l-.223 2.045c.141-.082.324-.16.551-.234.23-.075.494-.112.791-.112.402 0 .762.067 1.078.2.32.132.592.322.814.568.219.25.387.553.504.908.117.352.176.748.176 1.19 0 .39-.057.76-.17 1.107a2.44 2.44 0 0 1-.51.902 2.35 2.35 0 0 1-.861.61c-.348.148-.758.222-1.23.222-.36 0-.704-.05-1.032-.152a2.651 2.651 0 0 1-.873-.469 2.466 2.466 0 0 1-.627-.756 2.55 2.55 0 0 1-.275-1.049h1.365c.051.418.203.739.457.961.258.223.586.334.985.334.234 0 .437-.043.609-.129.172-.085.316-.207.434-.363.109-.152.191-.336.246-.55.054-.22.082-.456.082-.71 0-.246-.034-.47-.1-.674a1.48 1.48 0 0 0-.287-.538 1.277 1.277 0 0 0-.481-.352 1.615 1.615 0 0 0-.667-.129c-.168 0-.315.014-.44.041a1.648 1.648 0 0 0-.322.105 1.541 1.541 0 0 0-.27.165 2.59 2.59 0 0 0-.228.193l-1.119-.276Z"
              className="5"
            />
            <path
              d="M255.807 434.959h1.072v1.137h-1.072V438h-1.401v-1.904h-3.691l-.035-.862 3.685-5.765h1.442v5.49Zm-3.698 0h2.297v-3.615l-.164.304-2.133 3.311Zm10.09 3.041h-1.412v-6.797l-2.185.803v-1.236l3.509-1.301h.088V438Z"
              className="41"
            />
            <path
              d="M301.807 414.959h1.072v1.137h-1.072V418h-1.401v-1.904h-3.691l-.035-.862 3.685-5.765h1.442v5.49Zm-3.698 0h2.297v-3.615l-.164.304-2.133 3.311Zm7.436 1.887c.484 0 .896-.055 1.236-.164.34-.11.619-.266.838-.469.235-.223.406-.477.516-.762.109-.289.179-.599.211-.931v-.03a2.038 2.038 0 0 1-.662.492c-.141.067-.297.12-.469.159a2.468 2.468 0 0 1-.557.058c-.414 0-.775-.078-1.084-.234a2.26 2.26 0 0 1-.762-.627 2.717 2.717 0 0 1-.462-.914 3.792 3.792 0 0 1-.153-1.084c0-.41.061-.795.182-1.154a2.91 2.91 0 0 1 .539-.956c.234-.269.521-.482.861-.638.344-.16.735-.24 1.172-.24.442 0 .832.084 1.172.252.344.167.635.396.873.685.25.313.44.691.568 1.137.129.441.194.906.194 1.394v.492c0 .672-.078 1.313-.235 1.922a3.877 3.877 0 0 1-.826 1.6c-.32.375-.742.67-1.265.885-.52.215-1.147.322-1.881.322h-.117v-1.195h.111Zm1.412-2.754a1.41 1.41 0 0 0 .867-.293c.121-.09.227-.195.317-.317.093-.125.17-.259.228-.404v-.486c0-.34-.039-.641-.117-.903a2.13 2.13 0 0 0-.299-.656 1.314 1.314 0 0 0-.451-.398 1.132 1.132 0 0 0-.551-.141c-.219 0-.414.049-.586.147a1.244 1.244 0 0 0-.422.386 1.846 1.846 0 0 0-.269.58c-.059.219-.088.45-.088.692 0 .234.027.459.082.674.055.215.141.406.258.574.113.164.254.297.422.398.172.098.375.147.609.147Z"
              className="49"
            />
            <path
              d="M323.529 424h-5.724v-.973l2.777-3.023c.23-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.554-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.424 6.424 0 0 1-.557.744c-.21.25-.441.508-.691.774l-1.898 2.027h3.972V424Zm7.248-3.252c0 .547-.064 1.031-.193 1.453a2.875 2.875 0 0 1-.545 1.049 2.237 2.237 0 0 1-.867.656c-.34.145-.727.217-1.16.217-.43 0-.817-.072-1.16-.217a2.286 2.286 0 0 1-.873-.656 2.877 2.877 0 0 1-.557-1.049 5.121 5.121 0 0 1-.188-1.453v-2.021c0-.547.063-1.03.188-1.448.129-.422.312-.777.551-1.066.238-.285.527-.5.867-.645.344-.148.73-.222 1.16-.222.434 0 .82.074 1.16.222.344.145.637.36.879.645.234.289.416.644.545 1.066.129.418.193.901.193 1.448v2.021Zm-4.136-.498 2.713-2.057a3.226 3.226 0 0 0-.129-.791 1.447 1.447 0 0 0-.287-.545 1.034 1.034 0 0 0-.405-.281 1.435 1.435 0 0 0-.533-.094c-.215 0-.404.038-.568.112a1.05 1.05 0 0 0-.411.328 1.656 1.656 0 0 0-.287.639 3.94 3.94 0 0 0-.093.914v1.775Zm2.724.732v-1.711l-2.713 2.045c.02.27.061.508.123.715.067.207.155.379.264.516.109.148.244.26.404.334.164.074.354.111.569.111.211 0 .396-.035.556-.105a1.14 1.14 0 0 0 .411-.323c.128-.164.224-.378.287-.644.066-.266.099-.578.099-.938Zm4.629-1.88h.838c.25 0 .469-.034.656-.1a1.23 1.23 0 0 0 .463-.293c.113-.109.199-.244.258-.404.062-.164.094-.34.094-.528 0-.203-.03-.384-.088-.545a1.102 1.102 0 0 0-.246-.41 1.138 1.138 0 0 0-.416-.246 1.704 1.704 0 0 0-.569-.088c-.191 0-.369.03-.533.088a1.198 1.198 0 0 0-.703.621c-.066.149-.1.315-.1.498h-1.4c0-.34.068-.652.205-.937a2.3 2.3 0 0 1 .568-.744c.243-.207.528-.369.856-.487a3.258 3.258 0 0 1 1.09-.175c.402 0 .771.052 1.107.158.34.101.629.254.867.457a2.1 2.1 0 0 1 .563.762c.133.3.199.65.199 1.048 0 .176-.027.352-.082.528a1.96 1.96 0 0 1-.234.509 2.264 2.264 0 0 1-.961.809c.254.086.469.199.644.34.18.137.326.291.44.463.113.176.195.365.246.568.051.199.076.406.076.621 0 .399-.074.754-.223 1.067a2.222 2.222 0 0 1-.597.779 2.706 2.706 0 0 1-.914.492 3.766 3.766 0 0 1-1.131.164c-.367 0-.721-.051-1.061-.152a2.673 2.673 0 0 1-.896-.457 2.308 2.308 0 0 1-.621-.75 2.286 2.286 0 0 1-.229-1.049h1.401c0 .187.033.361.099.521.07.157.17.29.299.399.125.113.273.201.445.264.176.062.369.093.58.093.227 0 .43-.029.61-.088.183-.062.338-.154.463-.275.121-.113.213-.254.275-.422.066-.172.1-.367.1-.586a1.61 1.61 0 0 0-.112-.633 1.135 1.135 0 0 0-.322-.439 1.393 1.393 0 0 0-.51-.252 2.264 2.264 0 0 0-.656-.088h-.838v-1.101Z"
              className="203"
            />
            <path
              d="M336.529 410h-5.724v-.973l2.777-3.023c.23-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.343 1.343 0 0 0-.528-.099c-.25 0-.466.035-.65.105-.184.071-.336.17-.457.299a1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.554-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.206.498-.358.744a6.424 6.424 0 0 1-.557.744c-.21.25-.441.508-.691.774l-1.898 2.027h3.972V410Zm7.248-3.252c0 .547-.064 1.031-.193 1.453a2.875 2.875 0 0 1-.545 1.049 2.237 2.237 0 0 1-.867.656c-.34.145-.727.217-1.16.217-.43 0-.817-.072-1.16-.217a2.286 2.286 0 0 1-.873-.656 2.877 2.877 0 0 1-.557-1.049 5.121 5.121 0 0 1-.188-1.453v-2.021c0-.547.063-1.03.188-1.448.129-.422.312-.777.551-1.066.238-.285.527-.5.867-.645.344-.148.73-.222 1.16-.222.434 0 .82.074 1.16.222.344.145.637.36.879.645.234.289.416.644.545 1.066.129.418.193.901.193 1.448v2.021Zm-4.136-.498 2.713-2.057a3.226 3.226 0 0 0-.129-.791 1.447 1.447 0 0 0-.287-.545 1.034 1.034 0 0 0-.405-.281 1.435 1.435 0 0 0-.533-.094c-.215 0-.404.038-.568.112a1.05 1.05 0 0 0-.411.328 1.656 1.656 0 0 0-.287.639 3.94 3.94 0 0 0-.093.914v1.775Zm2.724.732v-1.711l-2.713 2.045c.02.27.061.508.123.715.067.207.155.379.264.516.109.148.244.26.404.334.164.074.354.111.569.111.211 0 .396-.035.556-.105a1.14 1.14 0 0 0 .411-.323c.128-.164.224-.378.287-.644.066-.266.099-.578.099-.938Zm8.578 3.018h-5.724v-.973l2.777-3.023c.231-.254.424-.481.58-.68.156-.203.283-.388.381-.556.094-.168.16-.325.199-.469a1.622 1.622 0 0 0-.023-.99 1.168 1.168 0 0 0-.668-.698 1.342 1.342 0 0 0-.527-.099c-.25 0-.467.035-.651.105a1.22 1.22 0 0 0-.457.299 1.322 1.322 0 0 0-.281.498c-.063.191-.094.41-.094.656h-1.406c0-.371.068-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.555-.441.914-.586a3.263 3.263 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.611.289.838.504.222.215.392.473.51.774.117.296.175.625.175.984 0 .269-.045.531-.134.785-.086.25-.205.498-.358.744a6.528 6.528 0 0 1-.556.744c-.211.25-.442.508-.692.774l-1.898 2.027h3.972V410Z"
              className="202"
            />
            <path
              d="M363.51 405.719c0 .258-.043.498-.129.72a1.904 1.904 0 0 1-.352.598 2.249 2.249 0 0 1-.726.574c.176.082.338.178.486.287.152.106.285.229.399.37.16.187.285.4.374.638.09.239.135.496.135.774 0 .394-.072.744-.217 1.049a2.152 2.152 0 0 1-.591.761 2.617 2.617 0 0 1-.891.469 3.635 3.635 0 0 1-1.09.158c-.398 0-.769-.053-1.113-.158a2.552 2.552 0 0 1-.885-.469 2.144 2.144 0 0 1-.598-.756 2.497 2.497 0 0 1-.21-1.054c0-.235.031-.457.093-.668.067-.211.16-.407.282-.586.121-.172.265-.326.433-.463a2.68 2.68 0 0 1 .574-.358 2.157 2.157 0 0 1-.861-.755 2.074 2.074 0 0 1-.334-1.131c0-.379.065-.715.193-1.008a2.181 2.181 0 0 1 1.36-1.201 3.32 3.32 0 0 1 1.049-.158c.375 0 .72.052 1.037.158.32.101.599.254.838.457.23.199.412.447.545.744.132.293.199.629.199 1.008Zm-1.213 3.885c0-.211-.035-.403-.106-.575a1.365 1.365 0 0 0-.281-.457 1.303 1.303 0 0 0-.445-.281 1.574 1.574 0 0 0-.569-.1c-.214 0-.408.034-.58.1-.168.066-.312.16-.433.281a1.365 1.365 0 0 0-.281.457 1.68 1.68 0 0 0-.094.58c0 .219.033.416.099.592.067.172.163.317.288.434.121.113.265.201.433.263.172.059.365.088.58.088a1.6 1.6 0 0 0 .557-.093c.172-.063.32-.153.445-.27.117-.121.211-.266.281-.434.071-.171.106-.367.106-.585Zm-.182-3.833a1.38 1.38 0 0 0-.094-.521 1.256 1.256 0 0 0-.246-.41 1.194 1.194 0 0 0-.386-.258 1.301 1.301 0 0 0-.504-.094c-.184 0-.35.032-.498.094-.145.059-.27.143-.375.252a1.11 1.11 0 0 0-.235.404 1.66 1.66 0 0 0-.082.533c0 .192.028.368.082.528.055.156.137.289.246.398a1.1 1.1 0 0 0 .381.264c.149.062.315.094.498.094.184 0 .35-.032.498-.094.149-.063.276-.15.381-.264.106-.109.188-.242.246-.398.059-.16.088-.336.088-.528Zm8.602-.052c0 .258-.043.498-.129.72a1.904 1.904 0 0 1-.352.598 2.249 2.249 0 0 1-.726.574c.176.082.338.178.486.287.152.106.285.229.399.37a2.134 2.134 0 0 1 .509 1.412c0 .394-.072.744-.216 1.049a2.165 2.165 0 0 1-.592.761 2.617 2.617 0 0 1-.891.469 3.635 3.635 0 0 1-1.09.158c-.398 0-.769-.053-1.113-.158a2.552 2.552 0 0 1-.885-.469 2.13 2.13 0 0 1-.597-.756 2.482 2.482 0 0 1-.211-1.054c0-.235.031-.457.093-.668.067-.211.16-.407.282-.586.121-.172.265-.326.433-.463a2.68 2.68 0 0 1 .574-.358 2.157 2.157 0 0 1-.861-.755 2.074 2.074 0 0 1-.334-1.131c0-.379.065-.715.193-1.008a2.181 2.181 0 0 1 1.36-1.201 3.32 3.32 0 0 1 1.049-.158c.375 0 .72.052 1.037.158.32.101.599.254.838.457.23.199.412.447.545.744.132.293.199.629.199 1.008Zm-1.213 3.885c0-.211-.035-.403-.106-.575a1.365 1.365 0 0 0-.281-.457 1.303 1.303 0 0 0-.445-.281 1.572 1.572 0 0 0-.568-.1c-.215 0-.409.034-.581.1-.168.066-.312.16-.433.281a1.365 1.365 0 0 0-.281.457 1.68 1.68 0 0 0-.094.58c0 .219.033.416.099.592.067.172.163.317.288.434.121.113.265.201.433.263.172.059.365.088.58.088a1.6 1.6 0 0 0 .557-.093c.172-.063.32-.153.445-.27.117-.121.211-.266.281-.434.071-.171.106-.367.106-.585Zm-.182-3.833a1.4 1.4 0 0 0-.34-.931 1.194 1.194 0 0 0-.386-.258 1.301 1.301 0 0 0-.504-.094c-.184 0-.35.032-.498.094-.145.059-.27.143-.375.252a1.11 1.11 0 0 0-.235.404 1.66 1.66 0 0 0-.082.533c0 .192.028.368.082.528.055.156.137.289.246.398a1.1 1.1 0 0 0 .381.264c.149.062.315.094.498.094.184 0 .35-.032.498-.094.149-.063.276-.15.381-.264.106-.109.188-.242.246-.398.059-.16.088-.336.088-.528Z"
              className="88"
            />
            <path
              d="M376.51 422.719c0 .258-.043.498-.129.72a1.904 1.904 0 0 1-.352.598 2.249 2.249 0 0 1-.726.574c.176.082.338.178.486.287.152.106.285.229.399.37.16.187.285.4.374.638.09.239.135.496.135.774 0 .394-.072.744-.217 1.049a2.152 2.152 0 0 1-.591.761 2.617 2.617 0 0 1-.891.469 3.635 3.635 0 0 1-1.09.158c-.398 0-.769-.053-1.113-.158a2.552 2.552 0 0 1-.885-.469 2.144 2.144 0 0 1-.598-.756 2.497 2.497 0 0 1-.21-1.054c0-.235.031-.457.093-.668.067-.211.16-.407.282-.586.121-.172.265-.326.433-.463a2.68 2.68 0 0 1 .574-.358 2.157 2.157 0 0 1-.861-.755 2.074 2.074 0 0 1-.334-1.131c0-.379.065-.715.193-1.008a2.181 2.181 0 0 1 1.36-1.201 3.32 3.32 0 0 1 1.049-.158c.375 0 .72.052 1.037.158.32.101.599.254.838.457.23.199.412.447.545.744.132.293.199.629.199 1.008Zm-1.213 3.885c0-.211-.035-.403-.106-.575a1.365 1.365 0 0 0-.281-.457 1.303 1.303 0 0 0-.445-.281 1.574 1.574 0 0 0-.569-.1c-.214 0-.408.034-.58.1-.168.066-.312.16-.433.281a1.365 1.365 0 0 0-.281.457 1.68 1.68 0 0 0-.094.58c0 .219.033.416.099.592.067.172.163.317.288.434.121.113.265.201.433.263.172.059.365.088.58.088a1.6 1.6 0 0 0 .557-.093c.172-.063.32-.153.445-.27.117-.121.211-.266.281-.434.071-.171.106-.367.106-.585Zm-.182-3.833a1.38 1.38 0 0 0-.094-.521 1.256 1.256 0 0 0-.246-.41 1.194 1.194 0 0 0-.386-.258 1.301 1.301 0 0 0-.504-.094c-.184 0-.35.032-.498.094-.145.059-.27.143-.375.252a1.11 1.11 0 0 0-.235.404 1.66 1.66 0 0 0-.082.533c0 .192.028.368.082.528.055.156.137.289.246.398a1.1 1.1 0 0 0 .381.264c.149.062.315.094.498.094.184 0 .35-.032.498-.094.149-.063.276-.15.381-.264.106-.109.188-.242.246-.398.059-.16.088-.336.088-.528Zm8.795-1.517L380.5 429h-1.477l3.411-7.359h-4.424v-1.172h5.9v.785Z"
              className="87"
            />
            <path
              d="M347.51 430.719c0 .258-.043.498-.129.72a1.904 1.904 0 0 1-.352.598 2.249 2.249 0 0 1-.726.574c.176.082.338.178.486.287.152.106.285.229.399.37.16.187.285.4.374.638.09.239.135.496.135.774 0 .394-.072.744-.217 1.049a2.152 2.152 0 0 1-.591.761 2.617 2.617 0 0 1-.891.469 3.635 3.635 0 0 1-1.09.158c-.398 0-.769-.053-1.113-.158a2.552 2.552 0 0 1-.885-.469 2.144 2.144 0 0 1-.598-.756 2.497 2.497 0 0 1-.21-1.054c0-.235.031-.457.093-.668.067-.211.16-.407.282-.586.121-.172.265-.326.433-.463a2.68 2.68 0 0 1 .574-.358 2.157 2.157 0 0 1-.861-.755 2.074 2.074 0 0 1-.334-1.131c0-.379.065-.715.193-1.008a2.181 2.181 0 0 1 1.36-1.201 3.32 3.32 0 0 1 1.049-.158c.375 0 .72.052 1.037.158.32.101.599.254.838.457.23.199.412.447.545.744.132.293.199.629.199 1.008Zm-1.213 3.885c0-.211-.035-.403-.106-.575a1.365 1.365 0 0 0-.281-.457 1.303 1.303 0 0 0-.445-.281 1.574 1.574 0 0 0-.569-.1c-.214 0-.408.034-.58.1-.168.066-.312.16-.433.281a1.365 1.365 0 0 0-.281.457 1.68 1.68 0 0 0-.094.58c0 .219.033.416.099.592.067.172.163.317.288.434.121.113.265.201.433.263.172.059.365.088.58.088a1.6 1.6 0 0 0 .557-.093c.172-.063.32-.153.445-.27.117-.121.211-.266.281-.434.071-.171.106-.367.106-.585Zm-.182-3.833a1.38 1.38 0 0 0-.094-.521 1.256 1.256 0 0 0-.246-.41 1.194 1.194 0 0 0-.386-.258 1.301 1.301 0 0 0-.504-.094c-.184 0-.35.032-.498.094-.145.059-.27.143-.375.252a1.11 1.11 0 0 0-.235.404 1.66 1.66 0 0 0-.082.533c0 .192.028.368.082.528.055.156.137.289.246.398a1.1 1.1 0 0 0 .381.264c.149.062.315.094.498.094.184 0 .35-.032.498-.094.149-.063.276-.15.381-.264.106-.109.188-.242.246-.398.059-.16.088-.336.088-.528ZM354.84 437h-5.725v-.973l2.778-3.023c.23-.254.423-.481.58-.68.156-.203.283-.388.381-.556.093-.168.16-.325.199-.469.043-.149.064-.297.064-.445 0-.2-.029-.381-.088-.545a1.141 1.141 0 0 0-.258-.422 1.215 1.215 0 0 0-.41-.276 1.342 1.342 0 0 0-.527-.099c-.25 0-.467.035-.65.105-.184.071-.336.17-.457.299a1.337 1.337 0 0 0-.282.498c-.062.191-.093.41-.093.656h-1.407c0-.371.069-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.555-.441.914-.586a3.27 3.27 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.612.289.838.504.223.215.393.473.51.774.117.296.176.625.176.984 0 .269-.045.531-.135.785-.086.25-.205.498-.357.744a6.541 6.541 0 0 1-.557.744c-.211.25-.441.508-.691.774l-1.899 2.027h3.973V437Z"
              className="82"
            />
            <path
              d="M345.51 469.719c0 .258-.043.498-.129.72a1.904 1.904 0 0 1-.352.598 2.249 2.249 0 0 1-.726.574c.176.082.338.178.486.287.152.106.285.229.399.37.16.187.285.4.374.638.09.239.135.496.135.774 0 .394-.072.744-.217 1.049a2.152 2.152 0 0 1-.591.761 2.617 2.617 0 0 1-.891.469 3.635 3.635 0 0 1-1.09.158c-.398 0-.769-.053-1.113-.158a2.552 2.552 0 0 1-.885-.469 2.144 2.144 0 0 1-.598-.756 2.497 2.497 0 0 1-.21-1.054c0-.235.031-.457.093-.668.067-.211.16-.407.282-.586.121-.172.265-.326.433-.463a2.68 2.68 0 0 1 .574-.358 2.157 2.157 0 0 1-.861-.755 2.074 2.074 0 0 1-.334-1.131c0-.379.065-.715.193-1.008a2.181 2.181 0 0 1 1.36-1.201 3.32 3.32 0 0 1 1.049-.158c.375 0 .72.052 1.037.158.32.101.599.254.838.457.23.199.412.447.545.744.132.293.199.629.199 1.008Zm-1.213 3.885c0-.211-.035-.403-.106-.575a1.365 1.365 0 0 0-.281-.457 1.303 1.303 0 0 0-.445-.281 1.574 1.574 0 0 0-.569-.1c-.214 0-.408.034-.58.1-.168.066-.312.16-.433.281a1.365 1.365 0 0 0-.281.457 1.68 1.68 0 0 0-.094.58c0 .219.033.416.099.592.067.172.163.317.288.434.121.113.265.201.433.263.172.059.365.088.58.088a1.6 1.6 0 0 0 .557-.093c.172-.063.32-.153.445-.27.117-.121.211-.266.281-.434.071-.171.106-.367.106-.585Zm-.182-3.833a1.38 1.38 0 0 0-.094-.521 1.256 1.256 0 0 0-.246-.41 1.194 1.194 0 0 0-.386-.258 1.301 1.301 0 0 0-.504-.094c-.184 0-.35.032-.498.094-.145.059-.27.143-.375.252a1.11 1.11 0 0 0-.235.404 1.66 1.66 0 0 0-.082.533c0 .192.028.368.082.528.055.156.137.289.246.398a1.1 1.1 0 0 0 .381.264c.149.062.315.094.498.094.184 0 .35-.032.498-.094.149-.063.276-.15.381-.264.106-.109.188-.242.246-.398.059-.16.088-.336.088-.528Zm7.084 6.229h-1.412v-6.797l-2.185.803v-1.236l3.509-1.301h.088V476Z"
              className="81"
            />
            <path
              d="m362.703 488.254-3.41 7.746h-1.477l3.411-7.359h-4.424v-1.172h5.9v.785Zm2.842 6.592c.484 0 .896-.055 1.236-.164.34-.11.619-.266.838-.469.235-.223.406-.477.516-.762.109-.289.179-.599.211-.931v-.03a2.038 2.038 0 0 1-.662.492c-.141.067-.297.12-.469.159a2.468 2.468 0 0 1-.557.058c-.414 0-.775-.078-1.084-.234a2.26 2.26 0 0 1-.762-.627 2.717 2.717 0 0 1-.462-.914 3.792 3.792 0 0 1-.153-1.084c0-.41.061-.795.182-1.154a2.91 2.91 0 0 1 .539-.956c.234-.269.521-.482.861-.638.344-.16.735-.24 1.172-.24.442 0 .832.084 1.172.252.344.167.635.396.873.685.25.313.44.691.568 1.137.129.441.194.906.194 1.394v.492c0 .672-.078 1.313-.235 1.922a3.877 3.877 0 0 1-.826 1.6c-.32.375-.742.67-1.265.885-.52.215-1.147.322-1.881.322h-.117v-1.195h.111Zm1.412-2.754a1.41 1.41 0 0 0 .867-.293c.121-.09.227-.195.317-.317.093-.125.17-.259.228-.404v-.486c0-.34-.039-.641-.117-.903a2.13 2.13 0 0 0-.299-.656 1.314 1.314 0 0 0-.451-.398 1.132 1.132 0 0 0-.551-.141c-.219 0-.414.049-.586.147a1.244 1.244 0 0 0-.422.386 1.846 1.846 0 0 0-.269.58c-.059.219-.088.45-.088.692 0 .234.027.459.082.674.055.215.141.406.258.574.113.164.254.297.422.398.172.098.375.147.609.147Z"
              className="79"
            />
            <path
              d="M384.51 458.719c0 .258-.043.498-.129.72a1.904 1.904 0 0 1-.352.598 2.249 2.249 0 0 1-.726.574c.176.082.338.178.486.287.152.106.285.229.399.37.16.187.285.4.374.638.09.239.135.496.135.774 0 .394-.072.744-.217 1.049a2.152 2.152 0 0 1-.591.761 2.617 2.617 0 0 1-.891.469 3.635 3.635 0 0 1-1.09.158c-.398 0-.769-.053-1.113-.158a2.552 2.552 0 0 1-.885-.469 2.144 2.144 0 0 1-.598-.756 2.497 2.497 0 0 1-.21-1.054c0-.235.031-.457.093-.668.067-.211.16-.407.282-.586.121-.172.265-.326.433-.463a2.68 2.68 0 0 1 .574-.358 2.157 2.157 0 0 1-.861-.755 2.074 2.074 0 0 1-.334-1.131c0-.379.065-.715.193-1.008a2.181 2.181 0 0 1 1.36-1.201 3.32 3.32 0 0 1 1.049-.158c.375 0 .72.052 1.037.158.32.101.599.254.838.457.23.199.412.447.545.744.132.293.199.629.199 1.008Zm-1.213 3.885c0-.211-.035-.403-.106-.575a1.365 1.365 0 0 0-.281-.457 1.303 1.303 0 0 0-.445-.281 1.574 1.574 0 0 0-.569-.1c-.214 0-.408.034-.58.1-.168.066-.312.16-.433.281a1.365 1.365 0 0 0-.281.457 1.68 1.68 0 0 0-.094.58c0 .219.033.416.099.592.067.172.163.317.288.434.121.113.265.201.433.263.172.059.365.088.58.088a1.6 1.6 0 0 0 .557-.093c.172-.063.32-.153.445-.27.117-.121.211-.266.281-.434.071-.171.106-.367.106-.585Zm-.182-3.833a1.38 1.38 0 0 0-.094-.521 1.256 1.256 0 0 0-.246-.41 1.194 1.194 0 0 0-.386-.258 1.301 1.301 0 0 0-.504-.094c-.184 0-.35.032-.498.094-.145.059-.27.143-.375.252a1.11 1.11 0 0 0-.235.404 1.66 1.66 0 0 0-.082.533c0 .192.028.368.082.528.055.156.137.289.246.398a1.1 1.1 0 0 0 .381.264c.149.062.315.094.498.094.184 0 .35-.032.498-.094.149-.063.276-.15.381-.264.106-.109.188-.242.246-.398.059-.16.088-.336.088-.528Zm7.477-2.343v1.189h-.094c-.465 0-.869.065-1.213.194a2.384 2.384 0 0 0-1.418 1.341 3.474 3.474 0 0 0-.24 1.02c.094-.106.203-.207.328-.305.125-.101.264-.191.416-.269.145-.075.305-.133.481-.176a2.14 2.14 0 0 1 .556-.07c.414 0 .774.078 1.078.234.309.156.563.367.762.633.203.265.352.57.445.914.098.344.147.701.147 1.072 0 .406-.063.787-.188 1.143a2.657 2.657 0 0 1-.533.92 2.548 2.548 0 0 1-.873.627c-.34.148-.728.222-1.166.222-.449 0-.85-.086-1.201-.258a2.634 2.634 0 0 1-.891-.697 3.137 3.137 0 0 1-.586-1.072 4.279 4.279 0 0 1-.199-1.307v-.58c0-.687.088-1.342.264-1.963a3.936 3.936 0 0 1 .89-1.611 3.489 3.489 0 0 1 1.301-.891c.516-.207 1.106-.31 1.77-.31h.164Zm-1.53 4.06c-.167 0-.328.026-.48.076a1.684 1.684 0 0 0-.422.211c-.117.09-.222.194-.316.311a1.713 1.713 0 0 0-.235.393v.433c0 .34.037.639.112.897.078.257.183.472.316.644.133.172.287.303.463.393.176.09.363.134.562.134.219 0 .415-.042.586-.128.172-.09.319-.211.44-.364.121-.156.213-.34.275-.55.063-.215.094-.448.094-.698 0-.238-.031-.463-.094-.674a1.694 1.694 0 0 0-.263-.562 1.243 1.243 0 0 0-.44-.375 1.226 1.226 0 0 0-.598-.141Z"
              className="86"
            />
            <path
              d="M392.51 499.719c0 .258-.043.498-.129.72a1.904 1.904 0 0 1-.352.598 2.249 2.249 0 0 1-.726.574c.176.082.338.178.486.287.152.106.285.229.399.37.16.187.285.4.374.638.09.239.135.496.135.774 0 .394-.072.744-.217 1.049a2.152 2.152 0 0 1-.591.761 2.617 2.617 0 0 1-.891.469 3.635 3.635 0 0 1-1.09.158c-.398 0-.769-.053-1.113-.158a2.552 2.552 0 0 1-.885-.469 2.144 2.144 0 0 1-.598-.756 2.497 2.497 0 0 1-.21-1.054c0-.235.031-.457.093-.668.067-.211.16-.407.282-.586.121-.172.265-.326.433-.463a2.68 2.68 0 0 1 .574-.358 2.157 2.157 0 0 1-.861-.755 2.074 2.074 0 0 1-.334-1.131c0-.379.065-.715.193-1.008a2.181 2.181 0 0 1 1.36-1.201 3.32 3.32 0 0 1 1.049-.158c.375 0 .72.052 1.037.158.32.101.599.254.838.457.23.199.412.447.545.744.132.293.199.629.199 1.008Zm-1.213 3.885c0-.211-.035-.403-.106-.575a1.365 1.365 0 0 0-.281-.457 1.303 1.303 0 0 0-.445-.281 1.574 1.574 0 0 0-.569-.1c-.214 0-.408.034-.58.1-.168.066-.312.16-.433.281a1.365 1.365 0 0 0-.281.457 1.68 1.68 0 0 0-.094.58c0 .219.033.416.099.592.067.172.163.317.288.434.121.113.265.201.433.263.172.059.365.088.58.088a1.6 1.6 0 0 0 .557-.093c.172-.063.32-.153.445-.27.117-.121.211-.266.281-.434.071-.171.106-.367.106-.585Zm-.182-3.833a1.38 1.38 0 0 0-.094-.521 1.256 1.256 0 0 0-.246-.41 1.194 1.194 0 0 0-.386-.258 1.301 1.301 0 0 0-.504-.094c-.184 0-.35.032-.498.094-.145.059-.27.143-.375.252a1.11 1.11 0 0 0-.235.404 1.66 1.66 0 0 0-.082.533c0 .192.028.368.082.528.055.156.137.289.246.398a1.1 1.1 0 0 0 .381.264c.149.062.315.094.498.094.184 0 .35-.032.498-.094.149-.063.276-.15.381-.264.106-.109.188-.242.246-.398.059-.16.088-.336.088-.528Zm8.766 2.977c0 .547-.065 1.031-.193 1.453a2.89 2.89 0 0 1-.545 1.049 2.248 2.248 0 0 1-.868.656 2.926 2.926 0 0 1-1.16.217c-.429 0-.816-.072-1.16-.217a2.286 2.286 0 0 1-.873-.656 2.892 2.892 0 0 1-.557-1.049 5.123 5.123 0 0 1-.187-1.453v-2.021c0-.547.062-1.03.187-1.448.129-.422.313-.777.551-1.066.238-.285.528-.5.867-.645a2.91 2.91 0 0 1 1.161-.222c.433 0 .82.074 1.16.222.343.145.636.36.879.645.234.289.416.644.545 1.066.128.418.193.901.193 1.448v2.021Zm-4.137-.498 2.713-2.057a3.226 3.226 0 0 0-.129-.791 1.419 1.419 0 0 0-.287-.545 1.024 1.024 0 0 0-.404-.281 1.439 1.439 0 0 0-.533-.094c-.215 0-.405.038-.569.112a1.04 1.04 0 0 0-.41.328 1.627 1.627 0 0 0-.287.639 3.881 3.881 0 0 0-.094.914v1.775Zm2.725.732v-1.711l-2.713 2.045c.019.27.06.508.123.715.066.207.154.379.264.516.109.148.244.26.404.334.164.074.353.111.568.111.211 0 .397-.035.557-.105.16-.075.297-.182.41-.323.129-.164.225-.378.287-.644.067-.266.1-.578.1-.938Z"
              className="80"
            />
            <path
              d="M400.338 427.846c.484 0 .896-.055 1.236-.164.34-.11.619-.266.838-.469a2.08 2.08 0 0 0 .516-.762c.109-.289.179-.599.211-.931v-.03a2.038 2.038 0 0 1-.662.492c-.141.067-.297.12-.469.159a2.468 2.468 0 0 1-.557.058c-.414 0-.775-.078-1.084-.234a2.25 2.25 0 0 1-.762-.627 2.717 2.717 0 0 1-.462-.914 3.792 3.792 0 0 1-.153-1.084c0-.41.061-.795.182-1.154a2.91 2.91 0 0 1 .539-.956c.234-.269.521-.482.861-.638.344-.16.735-.24 1.172-.24.442 0 .832.084 1.172.252.344.167.635.396.873.685.25.313.44.691.568 1.137.129.441.194.906.194 1.394v.492c0 .672-.078 1.313-.235 1.922a3.877 3.877 0 0 1-.826 1.6c-.32.375-.742.67-1.265.885-.52.215-1.147.322-1.881.322h-.117v-1.195h.111Zm1.412-2.754a1.41 1.41 0 0 0 .867-.293c.121-.09.227-.195.317-.317.093-.125.17-.259.228-.404v-.486c0-.34-.039-.641-.117-.903a2.13 2.13 0 0 0-.299-.656 1.314 1.314 0 0 0-.451-.398 1.132 1.132 0 0 0-.551-.141c-.219 0-.414.049-.586.147a1.244 1.244 0 0 0-.422.386 1.846 1.846 0 0 0-.269.58c-.059.219-.088.45-.088.692 0 .234.027.459.082.674.055.215.141.406.258.574.113.164.254.297.422.398.171.098.375.147.609.147Zm6.141-.99h.838c.25 0 .468-.034.656-.1.187-.07.342-.168.463-.293a1.05 1.05 0 0 0 .257-.404 1.46 1.46 0 0 0 .094-.528c0-.203-.029-.384-.088-.545a1.076 1.076 0 0 0-.246-.41 1.13 1.13 0 0 0-.416-.246 1.698 1.698 0 0 0-.568-.088c-.192 0-.369.03-.533.088a1.198 1.198 0 0 0-.703.621 1.2 1.2 0 0 0-.1.498h-1.4c0-.34.068-.652.205-.937.136-.285.326-.533.568-.744.242-.207.527-.369.855-.487a3.262 3.262 0 0 1 1.09-.175c.403 0 .772.052 1.108.158.34.101.629.254.867.457.242.207.43.461.562.762.133.3.2.65.2 1.048 0 .176-.028.352-.082.528a1.93 1.93 0 0 1-.235.509 2.227 2.227 0 0 1-.961.809c.254.086.469.199.645.34.179.137.326.291.439.463.114.176.196.365.246.568.051.199.077.406.077.621 0 .399-.075.754-.223 1.067a2.236 2.236 0 0 1-.598.779 2.696 2.696 0 0 1-.914.492 3.761 3.761 0 0 1-1.131.164c-.367 0-.72-.051-1.06-.152a2.678 2.678 0 0 1-.897-.457 2.308 2.308 0 0 1-.621-.75 2.299 2.299 0 0 1-.228-1.049h1.4c0 .187.033.361.1.521.07.157.17.29.298.399.125.113.274.201.446.264.176.062.369.093.58.093.226 0 .43-.029.609-.088a1.21 1.21 0 0 0 .463-.275c.121-.113.213-.254.276-.422.066-.172.099-.367.099-.586a1.63 1.63 0 0 0-.111-.633 1.145 1.145 0 0 0-.322-.439 1.401 1.401 0 0 0-.51-.252 2.269 2.269 0 0 0-.656-.088h-.838v-1.101Z"
              className="93"
            />
            <path
              d="M424.338 464.846c.484 0 .896-.055 1.236-.164.34-.11.619-.266.838-.469a2.08 2.08 0 0 0 .516-.762c.109-.289.179-.599.211-.931v-.03a2.038 2.038 0 0 1-.662.492c-.141.067-.297.12-.469.159a2.468 2.468 0 0 1-.557.058c-.414 0-.775-.078-1.084-.234a2.25 2.25 0 0 1-.762-.627 2.717 2.717 0 0 1-.462-.914 3.792 3.792 0 0 1-.153-1.084c0-.41.061-.795.182-1.154a2.91 2.91 0 0 1 .539-.956c.234-.269.521-.482.861-.638.344-.16.735-.24 1.172-.24.442 0 .832.084 1.172.252.344.167.635.396.873.685.25.313.44.691.568 1.137.129.441.194.906.194 1.394v.492c0 .672-.078 1.313-.235 1.922a3.877 3.877 0 0 1-.826 1.6c-.32.375-.742.67-1.265.885-.52.215-1.147.322-1.881.322h-.117v-1.195h.111Zm1.412-2.754a1.41 1.41 0 0 0 .867-.293c.121-.09.227-.195.317-.317.093-.125.17-.259.228-.404v-.486c0-.34-.039-.641-.117-.903a2.13 2.13 0 0 0-.299-.656 1.314 1.314 0 0 0-.451-.398 1.132 1.132 0 0 0-.551-.141c-.219 0-.414.049-.586.147a1.244 1.244 0 0 0-.422.386 1.846 1.846 0 0 0-.269.58c-.059.219-.088.45-.088.692 0 .234.027.459.082.674.055.215.141.406.258.574.113.164.254.297.422.398.171.098.375.147.609.147ZM435.84 466h-5.725v-.973l2.778-3.023c.23-.254.423-.481.58-.68.156-.203.283-.388.381-.556.093-.168.16-.325.199-.469.043-.149.064-.297.064-.445 0-.2-.029-.381-.088-.545a1.141 1.141 0 0 0-.258-.422 1.215 1.215 0 0 0-.41-.276 1.342 1.342 0 0 0-.527-.099c-.25 0-.467.035-.65.105-.184.071-.336.17-.457.299a1.337 1.337 0 0 0-.282.498c-.062.191-.093.41-.093.656h-1.407c0-.371.069-.72.205-1.049.137-.332.332-.621.586-.867.25-.246.555-.441.914-.586a3.27 3.27 0 0 1 1.213-.216c.418 0 .791.06 1.119.181.332.121.612.289.838.504.223.215.393.473.51.774.117.296.176.625.176.984 0 .269-.045.531-.135.785-.086.25-.205.498-.357.744a6.541 6.541 0 0 1-.557.744c-.211.25-.441.508-.691.774l-1.899 2.027h3.973V466Z"
              className="92"
            />
            <path
              d="M673.488 43.428v1.19h-.093c-.465 0-.87.064-1.213.192a2.371 2.371 0 0 0-1.418 1.342 3.498 3.498 0 0 0-.241 1.02c.094-.106.204-.207.329-.305a2.35 2.35 0 0 1 .416-.27c.144-.074.304-.132.48-.175.176-.047.361-.07.557-.07.414 0 .773.078 1.078.234.308.156.562.367.762.633.203.265.351.57.445.914.098.344.146.701.146 1.072 0 .406-.062.787-.187 1.143a2.665 2.665 0 0 1-.533.92 2.55 2.55 0 0 1-.873.627c-.34.148-.729.222-1.166.222-.45 0-.85-.086-1.202-.258a2.652 2.652 0 0 1-.89-.697 3.134 3.134 0 0 1-.586-1.072 4.246 4.246 0 0 1-.199-1.307v-.58c0-.687.088-1.342.263-1.963a3.95 3.95 0 0 1 .891-1.611 3.476 3.476 0 0 1 1.301-.89c.515-.208 1.105-.311 1.769-.311h.164Zm-1.529 4.06a1.601 1.601 0 0 0-.902.287 1.86 1.86 0 0 0-.317.31 1.687 1.687 0 0 0-.234.393v.434c0 .34.037.639.111.897.078.257.184.472.317.644.132.172.287.303.462.393.176.09.364.135.563.135.219 0 .414-.044.586-.13.172-.09.318-.21.439-.363a1.67 1.67 0 0 0 .276-.55c.062-.215.094-.448.094-.698 0-.238-.032-.463-.094-.674a1.713 1.713 0 0 0-.264-.562 1.237 1.237 0 0 0-.439-.375 1.23 1.23 0 0 0-.598-.14Z"
              className="6"
            />
          </g>
          <g id="legend">
            <path
              id="D&#195;&#169;part"
              d="M1211.01 948.6V940.069H1213.12C1213.49 940.069 1213.83 940.112 1214.16 940.198C1214.48 940.28 1214.77 940.395 1215.04 940.543C1215.33 940.696 1215.58 940.887 1215.81 941.118C1216.03 941.348 1216.22 941.606 1216.38 941.891C1216.53 942.188 1216.65 942.514 1216.74 942.87C1216.82 943.225 1216.87 943.604 1216.87 944.006V944.674C1216.87 945.061 1216.83 945.428 1216.74 945.776C1216.67 946.12 1216.55 946.434 1216.41 946.719C1216.26 946.997 1216.08 947.249 1215.88 947.475C1215.67 947.702 1215.45 947.895 1215.2 948.055C1214.92 948.231 1214.6 948.366 1214.26 948.459C1213.92 948.553 1213.56 948.6 1213.16 948.6H1211.01ZM1212.43 941.217V947.458H1213.16C1213.41 947.458 1213.64 947.428 1213.85 947.37C1214.06 947.307 1214.25 947.219 1214.42 947.106C1214.59 946.989 1214.74 946.842 1214.88 946.667C1215.01 946.487 1215.12 946.282 1215.21 946.051C1215.28 945.856 1215.34 945.643 1215.38 945.413C1215.42 945.182 1215.44 944.936 1215.44 944.674V943.995C1215.44 943.737 1215.42 943.493 1215.38 943.262C1215.34 943.032 1215.28 942.819 1215.21 942.624C1215.12 942.385 1214.99 942.17 1214.83 941.979C1214.68 941.784 1214.49 941.625 1214.28 941.504C1214.12 941.415 1213.95 941.346 1213.75 941.299C1213.56 941.249 1213.34 941.221 1213.12 941.217H1212.43ZM1221.27 948.717C1220.81 948.717 1220.38 948.639 1219.99 948.483C1219.6 948.327 1219.27 948.11 1218.99 947.833C1218.71 947.559 1218.5 947.237 1218.34 946.866C1218.2 946.491 1218.12 946.086 1218.12 945.653V945.413C1218.12 944.917 1218.2 944.467 1218.36 944.065C1218.51 943.663 1218.73 943.319 1219 943.034C1219.27 942.749 1219.59 942.53 1219.95 942.377C1220.31 942.221 1220.7 942.143 1221.11 942.143C1221.57 942.143 1221.97 942.221 1222.32 942.377C1222.67 942.53 1222.97 942.743 1223.21 943.016C1223.45 943.293 1223.63 943.624 1223.75 944.006C1223.87 944.389 1223.93 944.807 1223.93 945.26V945.864H1219.53V945.893C1219.58 946.17 1219.64 946.403 1219.73 946.59C1219.82 946.778 1219.95 946.946 1220.1 947.094C1220.26 947.25 1220.44 947.372 1220.65 947.458C1220.87 947.543 1221.1 947.586 1221.36 947.586C1221.7 947.586 1222.03 947.52 1222.33 947.387C1222.63 947.25 1222.88 947.057 1223.07 946.807L1223.82 947.534C1223.61 947.838 1223.29 948.112 1222.85 948.354C1222.42 948.596 1221.89 948.717 1221.27 948.717ZM1221.1 943.28C1220.91 943.28 1220.72 943.317 1220.55 943.391C1220.38 943.461 1220.23 943.563 1220.1 943.696C1219.96 943.833 1219.85 943.997 1219.76 944.188C1219.67 944.379 1219.61 944.596 1219.56 944.838H1222.55V944.745C1222.55 944.561 1222.51 944.379 1222.45 944.2C1222.38 944.016 1222.29 943.856 1222.16 943.719C1222.05 943.586 1221.9 943.481 1221.72 943.403C1221.54 943.321 1221.34 943.28 1221.1 943.28ZM1221.45 939.799H1223.04L1221.44 941.399H1220.37L1221.45 939.799ZM1225.53 951.038V942.26H1226.82L1226.88 942.911C1226.96 942.805 1227.06 942.709 1227.16 942.624C1227.26 942.538 1227.37 942.463 1227.49 942.401C1227.64 942.319 1227.81 942.256 1227.99 942.213C1228.17 942.167 1228.37 942.143 1228.57 942.143C1228.98 942.143 1229.34 942.221 1229.65 942.377C1229.96 942.534 1230.22 942.754 1230.43 943.04C1230.64 943.325 1230.8 943.667 1230.91 944.065C1231.02 944.459 1231.07 944.895 1231.07 945.372V945.495C1231.07 945.952 1231.02 946.377 1230.91 946.772C1230.8 947.167 1230.64 947.506 1230.43 947.792C1230.22 948.081 1229.96 948.307 1229.65 948.471C1229.34 948.635 1228.99 948.717 1228.59 948.717C1228.37 948.717 1228.16 948.694 1227.97 948.647C1227.78 948.6 1227.6 948.532 1227.44 948.442C1227.35 948.387 1227.26 948.325 1227.17 948.254C1227.09 948.184 1227.01 948.108 1226.93 948.026V951.038H1225.53ZM1229.67 945.372C1229.67 945.086 1229.64 944.819 1229.58 944.569C1229.53 944.315 1229.44 944.094 1229.32 943.907C1229.2 943.719 1229.05 943.571 1228.86 943.461C1228.67 943.352 1228.45 943.297 1228.19 943.297C1228.04 943.297 1227.91 943.313 1227.78 943.344C1227.66 943.375 1227.55 943.42 1227.45 943.479C1227.34 943.542 1227.24 943.62 1227.15 943.713C1227.07 943.807 1227 943.913 1226.93 944.03V946.848C1226.99 946.958 1227.06 947.057 1227.13 947.147C1227.21 947.237 1227.3 947.315 1227.4 947.381C1227.51 947.444 1227.63 947.495 1227.76 947.534C1227.89 947.569 1228.04 947.586 1228.2 947.586C1228.46 947.586 1228.68 947.532 1228.87 947.422C1229.06 947.309 1229.21 947.157 1229.32 946.965C1229.45 946.77 1229.53 946.547 1229.59 946.297C1229.64 946.043 1229.67 945.776 1229.67 945.495V945.372ZM1236.78 948.6C1236.74 948.522 1236.7 948.428 1236.67 948.319C1236.65 948.206 1236.63 948.088 1236.61 947.967C1236.51 948.069 1236.4 948.167 1236.27 948.26C1236.15 948.35 1236.02 948.428 1235.86 948.495C1235.71 948.565 1235.55 948.62 1235.37 948.659C1235.2 948.698 1235.01 948.717 1234.8 948.717C1234.48 948.717 1234.17 948.67 1233.9 948.577C1233.63 948.479 1233.4 948.346 1233.21 948.178C1233.01 948.014 1232.86 947.817 1232.75 947.586C1232.65 947.352 1232.59 947.1 1232.59 946.831C1232.59 946.483 1232.66 946.176 1232.8 945.911C1232.94 945.641 1233.14 945.418 1233.41 945.243C1233.66 945.079 1233.96 944.954 1234.32 944.868C1234.68 944.782 1235.09 944.739 1235.55 944.739H1236.57V944.311C1236.57 944.147 1236.54 943.999 1236.48 943.866C1236.42 943.733 1236.34 943.618 1236.24 943.52C1236.13 943.422 1235.99 943.348 1235.82 943.297C1235.66 943.243 1235.48 943.215 1235.27 943.215C1235.07 943.215 1234.91 943.239 1234.76 943.286C1234.62 943.333 1234.5 943.397 1234.41 943.479C1234.32 943.553 1234.25 943.645 1234.2 943.754C1234.16 943.86 1234.14 943.973 1234.14 944.094H1232.73C1232.73 943.84 1232.79 943.596 1232.91 943.362C1233.03 943.127 1233.2 942.92 1233.43 942.741C1233.65 942.557 1233.91 942.413 1234.24 942.307C1234.56 942.198 1234.93 942.143 1235.34 942.143C1235.71 942.143 1236.06 942.19 1236.38 942.284C1236.7 942.374 1236.98 942.508 1237.22 942.688C1237.45 942.868 1237.64 943.096 1237.77 943.374C1237.9 943.647 1237.97 943.963 1237.97 944.323V947.141C1237.97 947.426 1237.99 947.684 1238.03 947.915C1238.07 948.141 1238.13 948.336 1238.21 948.5V948.6H1236.78ZM1235.07 947.592C1235.26 947.592 1235.43 947.569 1235.58 947.522C1235.74 947.475 1235.89 947.415 1236.02 947.34C1236.15 947.266 1236.26 947.182 1236.35 947.088C1236.44 946.995 1236.52 946.897 1236.57 946.795V945.624H1235.66C1235.36 945.624 1235.1 945.653 1234.87 945.711C1234.65 945.766 1234.47 945.846 1234.34 945.952C1234.22 946.042 1234.14 946.149 1234.08 946.274C1234.02 946.399 1233.99 946.54 1233.99 946.696C1233.99 946.825 1234.02 946.946 1234.07 947.059C1234.11 947.168 1234.18 947.262 1234.27 947.34C1234.36 947.418 1234.47 947.481 1234.6 947.528C1234.74 947.571 1234.89 947.592 1235.07 947.592ZM1244.32 942.143C1244.55 942.143 1244.76 942.159 1244.98 942.19C1245.19 942.221 1245.36 942.258 1245.48 942.301L1245.28 943.684C1245.07 943.637 1244.85 943.602 1244.64 943.579C1244.43 943.555 1244.23 943.543 1244.02 943.543C1243.79 943.543 1243.57 943.567 1243.39 943.614C1243.2 943.661 1243.03 943.733 1242.89 943.831C1242.73 943.924 1242.6 944.043 1242.49 944.188C1242.38 944.333 1242.29 944.499 1242.22 944.686V948.6H1240.82V942.26H1242.13L1242.19 943.139L1242.19 943.286C1242.45 942.93 1242.76 942.651 1243.12 942.448C1243.48 942.245 1243.88 942.143 1244.32 942.143ZM1249.96 940.713V942.26H1252.34V943.309H1249.96V946.338C1249.96 946.573 1249.98 946.77 1250.04 946.93C1250.1 947.086 1250.18 947.209 1250.28 947.299C1250.38 947.393 1250.5 947.459 1250.64 947.499C1250.78 947.538 1250.94 947.557 1251.1 947.557C1251.23 947.557 1251.35 947.551 1251.48 947.54C1251.61 947.528 1251.73 947.512 1251.85 947.493C1251.97 947.477 1252.08 947.459 1252.18 947.44C1252.29 947.417 1252.38 947.397 1252.45 947.381L1252.6 948.348C1252.5 948.411 1252.37 948.465 1252.23 948.512C1252.09 948.555 1251.94 948.592 1251.77 948.624C1251.61 948.655 1251.44 948.678 1251.26 948.694C1251.08 948.713 1250.91 948.723 1250.73 948.723C1250.41 948.723 1250.11 948.68 1249.84 948.594C1249.58 948.504 1249.35 948.366 1249.16 948.178C1248.97 947.995 1248.82 947.758 1248.71 947.469C1248.6 947.18 1248.55 946.833 1248.55 946.426V943.309H1247.01V942.26H1248.55V940.713H1249.96Z"
              fill="#151515"
            />
            <path
              id="Vector"
              d="M1192.2 948.59C1195.51 948.59 1198.2 945.904 1198.2 942.59C1198.2 939.277 1195.51 936.59 1192.2 936.59C1188.89 936.59 1186.2 939.277 1186.2 942.59C1186.2 945.904 1188.89 948.59 1192.2 948.59Z"
              fill="#F51AA4"
              stroke="#151515"
              strokeWidth="1"
              strokeMiterlimit="10"
            />
            <path
              id="Mains"
              d="M1314.75 940.069L1315.81 943.719L1316.97 940.069H1318.73V948.6H1317.4V945.706L1317.48 941.897L1316.17 945.969H1315.44L1314.25 942.038L1314.33 945.706V948.6H1313.01V940.069H1314.75ZM1324.37 948.6C1324.33 948.522 1324.3 948.428 1324.27 948.319C1324.25 948.206 1324.22 948.088 1324.2 947.967C1324.11 948.069 1324 948.167 1323.87 948.26C1323.75 948.35 1323.61 948.428 1323.46 948.495C1323.31 948.565 1323.14 948.62 1322.97 948.659C1322.79 948.698 1322.6 948.717 1322.4 948.717C1322.07 948.717 1321.77 948.67 1321.5 948.577C1321.23 948.479 1321 948.346 1320.81 948.178C1320.61 948.014 1320.46 947.817 1320.35 947.586C1320.24 947.352 1320.19 947.1 1320.19 946.831C1320.19 946.483 1320.26 946.176 1320.4 945.911C1320.54 945.641 1320.74 945.418 1321 945.243C1321.25 945.079 1321.55 944.954 1321.91 944.868C1322.28 944.782 1322.69 944.739 1323.14 944.739H1324.16V944.311C1324.16 944.147 1324.13 943.999 1324.08 943.866C1324.02 943.733 1323.94 943.618 1323.83 943.52C1323.72 943.422 1323.58 943.348 1323.42 943.297C1323.26 943.243 1323.07 943.215 1322.86 943.215C1322.67 943.215 1322.5 943.239 1322.36 943.286C1322.22 943.333 1322.1 943.397 1322.01 943.479C1321.91 943.553 1321.84 943.645 1321.8 943.754C1321.75 943.86 1321.73 943.973 1321.73 944.094H1320.33C1320.33 943.84 1320.39 943.596 1320.51 943.362C1320.62 943.127 1320.8 942.92 1321.02 942.741C1321.24 942.557 1321.51 942.413 1321.83 942.307C1322.16 942.198 1322.52 942.143 1322.94 942.143C1323.31 942.143 1323.66 942.19 1323.98 942.284C1324.3 942.374 1324.58 942.508 1324.81 942.688C1325.05 942.868 1325.23 943.096 1325.36 943.374C1325.5 943.647 1325.56 943.963 1325.56 944.323V947.141C1325.56 947.426 1325.58 947.684 1325.62 947.915C1325.67 948.141 1325.73 948.336 1325.8 948.5V948.6H1324.37ZM1322.67 947.592C1322.85 947.592 1323.02 947.569 1323.18 947.522C1323.34 947.475 1323.48 947.415 1323.61 947.34C1323.74 947.266 1323.85 947.182 1323.95 947.088C1324.04 946.995 1324.11 946.897 1324.16 946.795V945.624H1323.26C1322.96 945.624 1322.69 945.653 1322.47 945.711C1322.25 945.766 1322.07 945.846 1321.94 945.952C1321.82 946.042 1321.73 946.149 1321.67 946.274C1321.62 946.399 1321.59 946.54 1321.59 946.696C1321.59 946.825 1321.61 946.946 1321.66 947.059C1321.71 947.168 1321.78 947.262 1321.87 947.34C1321.96 947.418 1322.07 947.481 1322.2 947.528C1322.33 947.571 1322.49 947.592 1322.67 947.592ZM1327.85 942.26H1331.22V947.44H1333.08V948.6H1327.85V947.44H1329.81V943.426H1327.85V942.26ZM1329.68 940.62C1329.68 940.506 1329.7 940.403 1329.74 940.309C1329.77 940.211 1329.83 940.127 1329.91 940.057C1329.98 939.991 1330.06 939.94 1330.16 939.905C1330.26 939.866 1330.37 939.846 1330.5 939.846C1330.71 939.846 1330.88 939.901 1331.01 940.01C1331.14 940.116 1331.22 940.252 1331.24 940.42C1331.26 940.592 1331.23 940.743 1331.15 940.872C1331.06 940.997 1330.94 941.081 1330.77 941.124C1330.69 941.198 1330.59 941.247 1330.48 941.27C1330.37 941.293 1330.24 941.284 1330.1 941.241C1329.96 941.198 1329.86 941.122 1329.78 941.012C1329.71 940.899 1329.68 940.768 1329.68 940.62ZM1334.74 948.6V942.26H1336L1336.09 943.163C1336.18 943.042 1336.27 942.93 1336.37 942.829C1336.48 942.723 1336.59 942.629 1336.71 942.547C1336.9 942.418 1337.1 942.319 1337.32 942.249C1337.55 942.178 1337.78 942.143 1338.03 942.143C1338.35 942.143 1338.65 942.19 1338.92 942.284C1339.19 942.377 1339.42 942.526 1339.61 942.729C1339.8 942.932 1339.95 943.192 1340.05 943.508C1340.16 943.821 1340.21 944.2 1340.21 944.645V948.6H1338.81V944.668C1338.81 944.407 1338.78 944.188 1338.72 944.012C1338.67 943.836 1338.58 943.696 1338.47 943.59C1338.35 943.485 1338.22 943.411 1338.06 943.368C1337.9 943.321 1337.71 943.297 1337.5 943.297C1337.33 943.297 1337.17 943.321 1337.02 943.368C1336.88 943.411 1336.74 943.473 1336.62 943.555C1336.53 943.618 1336.44 943.694 1336.36 943.784C1336.27 943.874 1336.2 943.971 1336.14 944.077V948.6H1334.74ZM1346.09 946.883C1346.09 946.774 1346.06 946.676 1346.01 946.59C1345.97 946.504 1345.89 946.422 1345.77 946.344C1345.65 946.274 1345.49 946.208 1345.3 946.145C1345.1 946.083 1344.86 946.024 1344.57 945.969C1344.2 945.895 1343.86 945.803 1343.56 945.694C1343.26 945.584 1343 945.452 1342.78 945.295C1342.56 945.147 1342.4 944.971 1342.27 944.768C1342.15 944.565 1342.09 944.329 1342.09 944.059C1342.09 943.801 1342.15 943.557 1342.27 943.327C1342.4 943.092 1342.58 942.887 1342.81 942.711C1343.03 942.536 1343.31 942.397 1343.63 942.295C1343.95 942.194 1344.31 942.143 1344.71 942.143C1345.13 942.143 1345.51 942.196 1345.84 942.301C1346.18 942.403 1346.46 942.543 1346.7 942.723C1346.93 942.903 1347.11 943.116 1347.23 943.362C1347.36 943.608 1347.42 943.874 1347.42 944.159H1346.02C1346.02 944.042 1345.99 943.93 1345.94 943.825C1345.9 943.715 1345.83 943.618 1345.73 943.532C1345.62 943.43 1345.48 943.35 1345.31 943.292C1345.14 943.229 1344.94 943.198 1344.71 943.198C1344.5 943.198 1344.31 943.221 1344.15 943.268C1343.99 943.311 1343.86 943.372 1343.76 943.45C1343.66 943.52 1343.58 943.604 1343.53 943.702C1343.48 943.795 1343.46 943.895 1343.46 944C1343.46 944.11 1343.48 944.209 1343.52 944.299C1343.57 944.385 1343.64 944.461 1343.75 944.528C1343.85 944.598 1343.99 944.663 1344.17 944.721C1344.36 944.78 1344.59 944.833 1344.86 944.879C1345.25 944.95 1345.6 945.036 1345.92 945.137C1346.25 945.239 1346.52 945.364 1346.75 945.512C1346.97 945.668 1347.15 945.852 1347.27 946.063C1347.4 946.274 1347.46 946.524 1347.46 946.813C1347.46 947.094 1347.39 947.352 1347.26 947.586C1347.13 947.821 1346.95 948.022 1346.71 948.19C1346.47 948.358 1346.18 948.489 1345.84 948.583C1345.51 948.676 1345.13 948.723 1344.72 948.723C1344.27 948.723 1343.86 948.663 1343.5 948.542C1343.15 948.42 1342.86 948.26 1342.62 948.061C1342.38 947.866 1342.19 947.641 1342.07 947.387C1341.94 947.133 1341.88 946.875 1341.88 946.614H1343.24C1343.25 946.809 1343.3 946.975 1343.39 947.112C1343.49 947.245 1343.6 947.352 1343.75 947.434C1343.88 947.52 1344.04 947.583 1344.21 947.622C1344.39 947.657 1344.57 947.674 1344.75 947.674C1344.99 947.674 1345.2 947.649 1345.38 947.598C1345.56 947.547 1345.71 947.479 1345.82 947.393C1345.91 947.323 1345.98 947.247 1346.02 947.165C1346.07 947.079 1346.09 946.985 1346.09 946.883Z"
              fill="#151515"
            />
            <path
              id="Vector_2"
              d="M1294.21 948.59C1297.52 948.59 1300.21 945.904 1300.21 942.59C1300.21 939.277 1297.52 936.59 1294.21 936.59C1290.9 936.59 1288.21 939.277 1288.21 942.59C1288.21 945.904 1290.9 948.59 1294.21 948.59Z"
              fill="#FCF300"
              stroke="#151515"
              strokeWidth="1"
              strokeMiterlimit="10"
            />
            <path
              id="Pieds"
              d="M1407.18 945.348V948.6H1405.78V940.069H1408.63C1409.06 940.073 1409.46 940.137 1409.82 940.262C1410.18 940.387 1410.49 940.565 1410.75 940.795C1411.01 941.026 1411.22 941.305 1411.36 941.633C1411.51 941.961 1411.58 942.331 1411.58 942.741C1411.58 943.135 1411.51 943.493 1411.36 943.813C1411.22 944.129 1411.01 944.401 1410.75 944.627C1410.49 944.858 1410.18 945.036 1409.82 945.161C1409.46 945.286 1409.06 945.348 1408.63 945.348H1407.18ZM1407.18 944.2H1408.63C1408.87 944.196 1409.08 944.159 1409.27 944.088C1409.46 944.014 1409.62 943.913 1409.76 943.784C1409.89 943.655 1409.99 943.502 1410.06 943.327C1410.13 943.151 1410.16 942.959 1410.16 942.752C1410.16 942.526 1410.13 942.321 1410.06 942.137C1409.99 941.95 1409.89 941.788 1409.76 941.651C1409.62 941.514 1409.46 941.409 1409.27 941.334C1409.08 941.26 1408.87 941.221 1408.63 941.217H1407.18V944.2ZM1413.24 942.26H1416.6V947.44H1418.46V948.6H1413.24V947.44H1415.19V943.426H1413.24V942.26ZM1415.06 940.62C1415.06 940.506 1415.08 940.403 1415.12 940.309C1415.16 940.211 1415.21 940.127 1415.29 940.057C1415.36 939.991 1415.44 939.94 1415.54 939.905C1415.64 939.866 1415.76 939.846 1415.88 939.846C1416.09 939.846 1416.26 939.901 1416.39 940.01C1416.52 940.116 1416.6 940.252 1416.62 940.42C1416.65 940.592 1416.62 940.743 1416.53 940.872C1416.44 940.997 1416.32 941.081 1416.16 941.124C1416.07 941.198 1415.98 941.247 1415.86 941.27C1415.75 941.293 1415.62 941.284 1415.49 941.241C1415.35 941.198 1415.24 941.122 1415.17 941.012C1415.09 940.899 1415.06 940.768 1415.06 940.62ZM1423.08 948.717C1422.61 948.717 1422.18 948.639 1421.79 948.483C1421.41 948.327 1421.07 948.11 1420.8 947.833C1420.52 947.559 1420.3 947.237 1420.15 946.866C1420 946.491 1419.93 946.086 1419.93 945.653V945.413C1419.93 944.917 1420.01 944.467 1420.16 944.065C1420.32 943.663 1420.53 943.319 1420.81 943.034C1421.08 942.749 1421.4 942.53 1421.76 942.377C1422.12 942.221 1422.51 942.143 1422.92 942.143C1423.37 942.143 1423.78 942.221 1424.13 942.377C1424.48 942.53 1424.78 942.743 1425.01 943.016C1425.25 943.293 1425.43 943.624 1425.55 944.006C1425.68 944.389 1425.74 944.807 1425.74 945.26V945.864H1421.34V945.893C1421.38 946.17 1421.45 946.403 1421.54 946.59C1421.63 946.778 1421.75 946.946 1421.91 947.094C1422.07 947.25 1422.25 947.372 1422.46 947.458C1422.68 947.543 1422.91 947.586 1423.16 947.586C1423.51 947.586 1423.84 947.52 1424.14 947.387C1424.44 947.25 1424.68 947.057 1424.88 946.807L1425.63 947.534C1425.42 947.838 1425.09 948.112 1424.66 948.354C1424.22 948.596 1423.7 948.717 1423.08 948.717ZM1422.91 943.28C1422.71 943.28 1422.53 943.317 1422.35 943.391C1422.19 943.461 1422.04 943.563 1421.9 943.696C1421.77 943.833 1421.66 943.997 1421.57 944.188C1421.48 944.379 1421.41 944.596 1421.37 944.838H1424.35V944.745C1424.35 944.561 1424.32 944.379 1424.25 944.2C1424.19 944.016 1424.09 943.856 1423.97 943.719C1423.85 943.586 1423.71 943.481 1423.53 943.403C1423.35 943.321 1423.15 943.28 1422.91 943.28ZM1427.14 945.383C1427.14 944.903 1427.2 944.465 1427.31 944.071C1427.43 943.672 1427.6 943.331 1427.82 943.045C1428.03 942.76 1428.29 942.54 1428.6 942.383C1428.91 942.223 1429.26 942.143 1429.66 942.143C1430.01 942.143 1430.31 942.206 1430.58 942.331C1430.84 942.452 1431.08 942.625 1431.28 942.852V939.6H1432.68V948.6H1431.41L1431.34 947.938C1431.14 948.188 1430.9 948.381 1430.62 948.518C1430.34 948.651 1430.01 948.717 1429.64 948.717C1429.26 948.717 1428.91 948.637 1428.6 948.477C1428.29 948.313 1428.03 948.086 1427.82 947.797C1427.6 947.512 1427.43 947.174 1427.32 946.784C1427.2 946.389 1427.14 945.963 1427.14 945.506V945.383ZM1428.54 945.506C1428.54 945.788 1428.57 946.053 1428.62 946.303C1428.68 946.553 1428.76 946.77 1428.88 946.954C1429 947.145 1429.15 947.295 1429.33 947.405C1429.52 947.51 1429.74 947.563 1430 947.563C1430.31 947.563 1430.57 947.495 1430.78 947.358C1430.99 947.217 1431.15 947.028 1431.28 946.79V944.065C1431.15 943.831 1430.99 943.645 1430.78 943.508C1430.58 943.368 1430.32 943.297 1430.01 943.297C1429.75 943.297 1429.52 943.352 1429.33 943.461C1429.15 943.571 1429 943.721 1428.89 943.913C1428.77 944.104 1428.68 944.327 1428.62 944.581C1428.57 944.831 1428.54 945.098 1428.54 945.383V945.506ZM1438.68 946.883C1438.68 946.774 1438.65 946.676 1438.6 946.59C1438.56 946.504 1438.48 946.422 1438.36 946.344C1438.24 946.274 1438.08 946.208 1437.89 946.145C1437.69 946.083 1437.45 946.024 1437.16 945.969C1436.79 945.895 1436.45 945.803 1436.15 945.694C1435.85 945.584 1435.59 945.452 1435.37 945.295C1435.15 945.147 1434.99 944.971 1434.86 944.768C1434.74 944.565 1434.68 944.329 1434.68 944.059C1434.68 943.801 1434.74 943.557 1434.86 943.327C1434.99 943.092 1435.17 942.887 1435.4 942.711C1435.62 942.536 1435.9 942.397 1436.22 942.295C1436.54 942.194 1436.9 942.143 1437.3 942.143C1437.72 942.143 1438.1 942.196 1438.43 942.301C1438.77 942.403 1439.05 942.543 1439.29 942.723C1439.52 942.903 1439.7 943.116 1439.82 943.362C1439.95 943.608 1440.01 943.874 1440.01 944.159H1438.61C1438.61 944.042 1438.58 943.93 1438.53 943.825C1438.49 943.715 1438.42 943.618 1438.32 943.532C1438.21 943.43 1438.07 943.35 1437.9 943.292C1437.73 943.229 1437.53 943.198 1437.3 943.198C1437.09 943.198 1436.9 943.221 1436.74 943.268C1436.58 943.311 1436.45 943.372 1436.35 943.45C1436.25 943.52 1436.18 943.604 1436.12 943.702C1436.07 943.795 1436.05 943.895 1436.05 944C1436.05 944.11 1436.07 944.209 1436.11 944.299C1436.16 944.385 1436.23 944.461 1436.34 944.528C1436.44 944.598 1436.58 944.663 1436.76 944.721C1436.95 944.78 1437.18 944.833 1437.45 944.879C1437.84 944.95 1438.19 945.036 1438.51 945.137C1438.84 945.239 1439.11 945.364 1439.34 945.512C1439.56 945.668 1439.74 945.852 1439.86 946.063C1439.99 946.274 1440.05 946.524 1440.05 946.813C1440.05 947.094 1439.98 947.352 1439.85 947.586C1439.72 947.821 1439.54 948.022 1439.3 948.19C1439.06 948.358 1438.77 948.489 1438.43 948.583C1438.1 948.676 1437.72 948.723 1437.31 948.723C1436.86 948.723 1436.45 948.663 1436.09 948.542C1435.74 948.42 1435.45 948.26 1435.21 948.061C1434.97 947.866 1434.78 947.641 1434.66 947.387C1434.53 947.133 1434.47 946.875 1434.47 946.614H1435.83C1435.84 946.809 1435.89 946.975 1435.98 947.112C1436.08 947.245 1436.19 947.352 1436.34 947.434C1436.47 947.52 1436.63 947.583 1436.8 947.622C1436.98 947.657 1437.16 947.674 1437.34 947.674C1437.58 947.674 1437.79 947.649 1437.97 947.598C1438.15 947.547 1438.3 947.479 1438.41 947.393C1438.5 947.323 1438.57 947.247 1438.61 947.165C1438.66 947.079 1438.68 946.985 1438.68 946.883Z"
              fill="#151515"
            />
            <path
              id="Vector_3"
              d="M1386.8 948.59C1390.11 948.59 1392.8 945.904 1392.8 942.59C1392.8 939.277 1390.11 936.59 1386.8 936.59C1383.49 936.59 1380.8 939.277 1380.8 942.59C1380.8 945.904 1383.49 948.59 1386.8 948.59Z"
              fill="#75DDDD"
              stroke="#151515"
              strokeWidth="1"
              strokeMiterlimit="10"
            />
          </g>
        </g>
      </svg>
    </div>
  );
};

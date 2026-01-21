"use client";

import { DEFAULT_PROBLEM } from "@/lib/config";
import { _isId } from "@/lib/store";
import { PanZoom, Problem } from "@/lib/types";
import panzoom from "@panzoom/panzoom";
import clsx from "clsx";
import { useAtom } from "jotai";
import { RefObject, useEffect, useState } from "react";
import { getSocket } from "../lib/socket";

type WallProps = {
  svgRef: RefObject<SVGSVGElement | null>;
  panzoomRef: RefObject<PanZoom | null>;
};

export default function Wall({ svgRef, panzoomRef }: WallProps) {
  const [isId] = useAtom(_isId);

  const [currentProblemId, setCurrentProblemId] = useState<Problem["id"]>(
    DEFAULT_PROBLEM.id,
  );

  useEffect(() => {
    const socket = getSocket();
    socket.connect();

    socket.on("current", (nextProblemId: Problem["id"]) => {
      console.log("Current problem ID", nextProblemId);

      setCurrentProblemId(nextProblemId);

      // svgRef.current?.querySelectorAll("#holds *").forEach((el) => {
      //   el.classList.remove("hold");
      // });

      // for (const hold in problem.holds) {
      //   svgRef.current
      //     ?.querySelector<SVGElement>(`[data-name='${hold}']`)
      //     ?.classList.add(problem.holds[hold]);
      // }

      // setCurrentProblem(problem);
    });

    return () => {
      socket.off("current");
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!svgRef.current) return;

    panzoomRef.current = panzoom(svgRef.current, {
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
  }, []);

  // const handleOnClick = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
  //   const target = e.target as SVGElement;
  //   const targetId = target.dataset.name;

  //   if (!targetId) return;

  //   const holds = { ...currentProblem?.holds };

  //   if (holds[targetId]) {
  //     delete holds[targetId];
  //   } else {
  //     holds[targetId] = mode;
  //   }

  //   const nextProblem = {
  //     ...currentProblem,
  //     holds,
  //   };

  //   const socket = getSocket();
  //   // socket.emit("current", nextProblem);
  // };

  return (
    <div className="h-full overflow-visible!">
      {/* <button
        onClick={() => {
          const nextProblemIndex = (currentProblemId + 1) % 10; // Assuming 10 problems
          const socket = getSocket();
          socket.emit("current", nextProblemIndex);
        }}
      >
        Next
      </button> */}
      <svg
        ref={svgRef}
        width={1500}
        height={960}
        viewBox="0 0 1500 960"
        className="touch-none max-w-full h-full"
        // onClick={handleOnClick}
      >
        <g id="map" className="map">
          <g id="wall">
            <path
              id="wall_2"
              d="M852 924.65L864.469 481M852 924.65L864.48 480.44L1453.5 924.65L852 924.65Z"
              stroke="#151515"
              fill="#f5f5f5"
              strokeWidth="1"
              strokeMiterlimit="10"
              strokeLinejoin="round"
            />
            <path
              id="wall_3"
              d="M939 307L931.5 325L864.469 481M939 307L1453.5 630.55V924.65L864.48 480.44L939 307Z"
              stroke="#151515"
              fill="#f5f5f5"
              strokeWidth="1"
              strokeMiterlimit="10"
              strokeLinejoin="round"
            />
            <path
              id="wall_4"
              d="M939 307L871.6 227.25L864.469 481L931.5 325L939 307ZM939 307L864.48 480.44"
              stroke="#151515"
              fill="#f5f5f5"
              strokeWidth="1"
              strokeMiterlimit="10"
              strokeLinejoin="round"
            />
            <path
              id="wall_5"
              d="M852 924.65H213.4L167.65 897.4L121.9 870.15L104.4 863.65L113.7 10.3501L129.5 5.75H736.2L871.6 227.25L864.469 481L852 924.65ZM852 924.65L864.48 480.44"
              stroke="#151515"
              fill="#f5f5f5"
              strokeWidth="1"
              strokeMiterlimit="10"
              strokeLinejoin="round"
            />
            <path
              id="wall_6"
              d="M113.5 10L56 536.69L80.5 825.7L104.2 863.3L113.5 10Z"
              stroke="#151515"
              fill="#f5f5f5"
              strokeWidth="1"
              strokeMiterlimit="10"
              strokeLinejoin="round"
            />
          </g>
          <g id="grips" className="grips">
            <g id="29" data-name="29">
              <path
                fill="#BFB6BB"
                stroke="#151515"
                strokeWidth="1"
                d="M123 823.5 110.5 757 302 880l-179-56.5Z"
                data-name="29"
              />
            </g>
            <g id="314" data-name="314">
              <path
                id="314-c"
                d="M485.5 873.5L485 784L555 834.5L485.5 873.5Z"
                fill="#BFB6BB"
                stroke="#151515"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                id="314-r"
                d="M526.5 914.5L555 834.5L485.5 873.5L526.5 914.5Z"
                fill="#BFB6BB"
                stroke="#151515"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                id="314-l"
                d="M485 784L415 837L485.5 873.5L485 784Z"
                fill="#BFB6BB"
                stroke="#151515"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            <g id="320" data-name="320">
              <path
                fill="#BFB6BB"
                stroke="#151515"
                strokeLinecap="round"
                strokeWidth="1"
                d="M732.209 6H708v18.51h24.209V6Z"
                data-name="320"
              />
            </g>
            <g id="327" data-name="327">
              <path
                fill="#BFB6BB"
                stroke="#151515"
                strokeLinecap="round"
                strokeWidth="1"
                d="M668.209 6H644v18.51h24.209V6Z"
                data-name="327"
              />
            </g>
            <g id="321" data-name="321">
              <path
                fill="#BFB6BB"
                stroke="#151515"
                strokeLinecap="round"
                strokeWidth="1"
                d="M546.209 6H522v18.51h24.209V6Z"
                data-name="321"
              />
            </g>
            <g id="323" data-name="323">
              <path
                fill="#BFB6BB"
                stroke="#151515"
                strokeLinecap="round"
                strokeWidth="1"
                d="M167.209 6H143v18.51h24.209V6Z"
                data-name="323"
              />
            </g>
            <g id="322" data-name="322">
              <path
                fill="#BFB6BB"
                stroke="#151515"
                strokeLinecap="round"
                strokeWidth="1"
                d="M302.209 6H278v18.51h24.209V6Z"
                data-name="322"
              />
            </g>
            <g id="326" data-name="326">
              <path
                fill="#BFB6BB"
                stroke="#151515"
                strokeLinecap="round"
                strokeWidth="1"
                d="M423.209 6H399v18.51h24.209V6Z"
                data-name="326"
              />
            </g>
            <g id="193" data-name="193">
              <path
                id="194"
                d="M761.5 798L804 826.5L765.5 857L761.5 798Z"
                fill="#BFB6BB"
                stroke="#151515"
                strokeWidth="1"
                strokeLinejoin="round"
              />
              <path
                id="195"
                d="M716 834L761.5 798L765.5 857L716 834Z"
                fill="#BFB6BB"
                stroke="#151515"
                strokeWidth="1"
                strokeLinejoin="round"
              />
              <path
                id="197"
                d="M731 882.5L716 834L765.5 857L731 882.5Z"
                fill="#BFB6BB"
                stroke="#151515"
                strokeWidth="1"
                strokeLinejoin="round"
              />
              <path
                id="196"
                d="M761.5 798L765.5 857"
                stroke="#151515"
                strokeWidth="1"
                strokeLinejoin="round"
              />
            </g>
          </g>
          <g id="holds" className="holds">
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
        </g>
      </svg>
    </div>
  );
}

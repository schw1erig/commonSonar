package org.common.common.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class FrontEndController
{
    @RequestMapping(value="/homepage", method= RequestMethod.GET)
    public String index() {
        return "homepage";
    }
}
